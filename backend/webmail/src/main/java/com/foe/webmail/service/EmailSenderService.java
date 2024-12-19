package com.foe.webmail.service;

import com.foe.webmail.constants.MailStatus;
import com.foe.webmail.dto.EmailComposeDto;
import com.foe.webmail.dto.PermanentFileDto;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.MailAttachment;
import com.foe.webmail.entity.User;
import com.foe.webmail.mappers.PermenantFileDtoToMailAttachements;
import com.foe.webmail.repository.MailRepository;
import com.foe.webmail.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class EmailSenderService {
    private final UserRepository userRepository;
    private final MailRepository mailRepository;
    private final PermanentFileService permanentFileService;
    private final PermenantFileDtoToMailAttachements permenantFileDtoToMailAttachements;
    private final AttachmentsUploadService attachmentsUploadService;

    public EmailSenderService(UserRepository userRepository,
                              PermanentFileService permanentFileService,
                              MailRepository mailRepository,
                              PermenantFileDtoToMailAttachements permenantFileDtoToMailAttachements,
                              AttachmentsUploadService attachmentsUploadService) {
        this.userRepository = userRepository;
        this.mailRepository = mailRepository;
        this.permanentFileService = permanentFileService;
        this.permenantFileDtoToMailAttachements = permenantFileDtoToMailAttachements;
        this.attachmentsUploadService = attachmentsUploadService;
    }
    public void sendEmail(EmailComposeDto emailComposeDto, String sender){

        List<User> receivers = userRepository.findByUsernameIn(emailComposeDto.getReceivers());
        if (receivers.isEmpty()) {
            throw new RuntimeException("no receivers found");
        } //check if no receivers don't involve in async process

        List<PermanentFileDto> permanentFileDtos =
                permanentFileService.mapMultiPartToPermanentFileDto(emailComposeDto.getFiles());

        CompletableFuture.runAsync(() ->
                UploadFilesThenSave(emailComposeDto,permanentFileDtos,sender,receivers)
        )
                .thenRun(() ->
                permanentFileService.deletePermanentFiles(permanentFileDtos)
        );
    }
    private void UploadFilesThenSave(EmailComposeDto emailComposeDto,List<PermanentFileDto> permanentFileDtos, String user,List<User> receivers) {

        User sender = userRepository.findByUsername(user).get();

        CompletableFuture<Void> allFutures = attachmentsUploadService.uploadFilesAsync(permanentFileDtos) ;

        Mail email = Mail.builder()
                .subject(emailComposeDto.getSubject())
                .body(emailComposeDto.getBody())
                .sender(sender)
                .receivers(receivers)
                .date(LocalDateTime.now())
                .importance(emailComposeDto.getImportance())
                .status(MailStatus.INBOX)
                .build();

        List<MailAttachment> mailAttachments = permenantFileDtoToMailAttachements.convert(permanentFileDtos,email);
        email.setAttachments(mailAttachments);

        allFutures.join();
        mailRepository.save(email);
    }
}

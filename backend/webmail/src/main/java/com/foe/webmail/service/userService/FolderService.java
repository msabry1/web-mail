package com.foe.webmail.service.userService;


import com.foe.webmail.dto.FolderDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Folder;
import com.foe.webmail.entity.User;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.mappers.MailPreviewMapper;
import com.foe.webmail.repository.FoldersRepository;
import com.foe.webmail.repository.UserRepository;
import com.foe.webmail.service.mailService.MailFiltrationService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class FolderService {

    FoldersRepository foldersRepository;
    UserRepository userRepository;
    MailPreviewMapper mailPreviewMapper;
    MailFiltrationService mailFiltrationService;


    public FolderService(FoldersRepository foldersRepository, UserRepository userRepository,
                         MailPreviewMapper mailPreviewMapper, MailFiltrationService mailFiltrationService) {
        this.foldersRepository = foldersRepository;
        this.userRepository = userRepository;
        this.mailPreviewMapper = mailPreviewMapper;
        this.mailFiltrationService = mailFiltrationService;
    }

    public Folder createFolder(FolderDTO folderDto, User user) {
        Folder folder = new Folder();
        folder.setName(folderDto.getFolderName());
        folder.setUser(user);
        return foldersRepository.save(folder);
    }

    public List<MailPreviewDTO> getFolderMails(Long id) {
        Optional<Folder> folder = foldersRepository.findById(id) ;
        List<Mail> mails = new ArrayList<>();
        if(folder.isPresent()) {
            mails = folder.get().getMails();
        }
        return mailPreviewMapper.toMailPreviewDTOs(mails);
    }

    public void deleteFolder(Long id) {
        foldersRepository.deleteById(id);
    }

    public Long filterAndAdd (String folderName, MailFilterDTO mailFilterDTO,User user) {
        Folder folder = new Folder();
        folder.setName(folderName);
        folder.setUser(user);
        folder = foldersRepository.save(folder);
        mailFilterDTO.setReceiver(user.getUsername());
        List<Mail> mails = mailFiltrationService.getMailByFilters(mailFilterDTO);
        for (Mail mail : mails) {
            foldersRepository.addMailToFolder(folder.getId(), mail.getId());
        }
        return folder.getId();
    }

    public void addMail(Long mailId,Long folderId, User user) {
        Optional<Folder> folderOp = foldersRepository.findById(folderId);
        Folder folder = folderOp.orElse(null);
        if(folder != null || !folder.getUser().getUsername().equals(user.getUsername())) {
            throw new IllegalArgumentException("unknwon folder");
        }
        foldersRepository.addMailToFolder(folder.getId(), mailId);
    }
}

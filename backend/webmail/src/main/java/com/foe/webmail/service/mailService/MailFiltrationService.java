package com.foe.webmail.service.mailService;

import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.mappers.MailPreviewMapper;
import com.foe.webmail.repository.MailRepository;
import com.foe.webmail.service.mailService.filters.MailSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class MailFiltrationService {

    MailPreviewMapper mailMapper;
    MailRepository mailRepository;

    public MailFiltrationService(MailPreviewMapper mailMapper, MailRepository mailRepository) {
        this.mailMapper = mailMapper;
        this.mailRepository = mailRepository;
    }


    public List<MailPreviewDTO> getMailsPreviewDtoByFilter(MailFilterDTO mailFilterDTO) {

        List<Mail> mails = getMailByFilters(mailFilterDTO);

        List<MailPreviewDTO> mailPreviewDTOs = new ArrayList<>();
        for (Mail mail : mails) {
            MailPreviewDTO mailPreviewDTO = mailMapper.toMailPreviewDTO(mail);
            mailPreviewDTOs.add(mailPreviewDTO);
        }

        return mailPreviewDTOs;
    }


    public List<Mail> getMailByFilters(MailFilterDTO mailFilterDTO) {

        if(mailFilterDTO.getDate() == null || mailFilterDTO.getDate().isEmpty()){
            mailFilterDTO.setDate("1000-01-01 00:00:00");
        }
        Specification<Mail> specification = Specification.where(
                     MailSpecifications.hasStatus(mailFilterDTO.getStatus()))
                .and(MailSpecifications.hasSubjectLike(mailFilterDTO.getSubject()))
                .and(MailSpecifications.hasDateAfter(LocalDateTime.parse(mailFilterDTO.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))))
                .and(MailSpecifications.hasFolder(mailFilterDTO.getFolder()))
                .and(MailSpecifications.hasSender(mailFilterDTO.getSender()))
                .and(MailSpecifications.hasReceiver(mailFilterDTO.getReceiver()))
                .and(MailSpecifications.hasBodyLike(mailFilterDTO.getBody()))
                .and(MailSpecifications.hasAttachmentsLike(mailFilterDTO.getAttachmentName()));

        return mailRepository.findAll(specification);
    }
}
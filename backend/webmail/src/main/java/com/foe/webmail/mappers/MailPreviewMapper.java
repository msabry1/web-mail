package com.foe.webmail.mappers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.User;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MailPreviewMapper {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static MailPreviewDTO toMailPreviewDTO(Mail mail) {
        MailPreviewDTO mailPreviewDTO = new MailPreviewDTO();

        mailPreviewDTO.setId(mail.getId());
        mailPreviewDTO.setSender(mail.getSender().getUsername());

        mailPreviewDTO.setSubject(mail.getSubject());
        mailPreviewDTO.setDate(mail.getDate());
        mailPreviewDTO.setPriority(mail.getImportance());
        mailPreviewDTO.setIsRead(mail.getIsSeen());
        mailPreviewDTO.setIsStarred(mail.getIsStared());

        List<String> receiverUsernames = mail.getReceivers().stream()
                .map(User::getUsername)
                .collect(Collectors.toList());
        mailPreviewDTO.setReceivers(receiverUsernames);

        return mailPreviewDTO;
    }

    public static Mail mapToMail(MailPreviewDTO mailPreviewDTO) {
        Mail mail = new Mail();
        mail.setId(mailPreviewDTO.getId());
        mail.setSubject(mailPreviewDTO.getSubject());
        mail.setDate(mailPreviewDTO.getDate());
        mail.setImportance(mailPreviewDTO.getPriority());
        mail.setIsSeen(mailPreviewDTO.getIsRead());
        mail.setIsStared(mailPreviewDTO.getIsStarred());

        return mail;
    }
}

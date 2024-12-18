package com.foe.webmail.mappers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MailPreviewMapper {

    public MailPreviewDTO toMailPreviewDTO(Mail mail) {
        MailPreviewDTO mailPreviewDTO = new MailPreviewDTO();

        mailPreviewDTO.setId(mail.getId());
        mailPreviewDTO.setSender(mail.getSender().getUsername());
        mailPreviewDTO.setSubject(mail.getSubject());
        mailPreviewDTO.setDate(mail.getDate());
        mailPreviewDTO.setImportance(mail.getImportance());
        mailPreviewDTO.setIsSeen(mail.getIsSeen());
        mailPreviewDTO.setIsStared(mail.getIsStared());

        List<String> receiverUsernames = mail.getReceivers().stream()
                .map(User::getUsername)
                .collect(Collectors.toList());
        mailPreviewDTO.setReceivers(receiverUsernames);

        return mailPreviewDTO;
    }
}

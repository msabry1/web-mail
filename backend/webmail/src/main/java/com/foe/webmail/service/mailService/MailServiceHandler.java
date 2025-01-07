package com.foe.webmail.service.mailService;


import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.UserPrinciple;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailServiceHandler {

    MailFiltrationService mailFiltrationService;

    public MailServiceHandler(MailFiltrationService mailFiltrationService) {
        this.mailFiltrationService = mailFiltrationService;
    }

    public List<MailPreviewDTO> getSentMails(MailFilterDTO mailFilterDTO, UserPrinciple userPrinciple) {
        mailFilterDTO.setSender(userPrinciple.getUsername());
        return mailFiltrationService.getMailsPreviewDtoByFilter(mailFilterDTO);
    }

    public List<MailPreviewDTO> getReceivedMails(MailFilterDTO mailFilterDTO, UserPrinciple userPrinciple) {
        mailFilterDTO.setReceiver(userPrinciple.getUsername());
        return mailFiltrationService.getMailsPreviewDtoByFilter(mailFilterDTO);
    }
}

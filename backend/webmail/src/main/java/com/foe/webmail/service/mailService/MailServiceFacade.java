package com.foe.webmail.service.mailService;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MailServiceFacade {

    MailDetailsService mailDetailsService;
    MailServiceHandler mailServiceHandler;
    MailDeleteService mailDeleteService;

    public MailServiceFacade(MailDetailsService mailDetailsService,
                             MailServiceHandler mailServiceHandler,
                             MailDeleteService mailDeleteService) {
        this.mailDetailsService = mailDetailsService;
        this.mailServiceHandler = mailServiceHandler;
        this.mailDeleteService = mailDeleteService;
    }

    public List<MailPreviewDTO> getSentMails(MailFilterDTO mailFilterDTO, User user) {
        return mailServiceHandler.getSentMails(mailFilterDTO, user);
    }

    public List<MailPreviewDTO> getReceivedMails(MailFilterDTO mailFilterDTO, User user) {
        return mailServiceHandler.getReceivedMails(mailFilterDTO, user);
    }

    public FullMailDTO getFullMailById(Long id) {
        return mailDetailsService.getFullMailById(id);
    }

    public void DeleteMail(Long id) {
        mailDeleteService.delete(id);
    }

}

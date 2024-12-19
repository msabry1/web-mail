package com.foe.webmail.service.mailService;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.UserPrinciple;
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

    public List<MailPreviewDTO> getSentMails(MailFilterDTO mailFilterDTO, UserPrinciple userPrinciple) {
        return mailServiceHandler.getSentMails(mailFilterDTO, userPrinciple);
    }

    public List<MailPreviewDTO> getReceivedMails(MailFilterDTO mailFilterDTO, UserPrinciple userPrinciple) {
        return mailServiceHandler.getReceivedMails(mailFilterDTO, userPrinciple);
    }

    public FullMailDTO getFullMailById(Long id) {
        return mailDetailsService.getFullMailById(id);
    }

    public void DeleteMail(Long id) {
        mailDeleteService.delete(id);
    }

}

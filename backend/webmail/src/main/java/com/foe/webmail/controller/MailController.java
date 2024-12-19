package com.foe.webmail.controller;


import com.foe.webmail.dto.FullMailDTO;

import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.service.mailService.MailServiceFacade;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MailController {

    MailServiceFacade mailServiceFacade;

    public MailController(MailServiceFacade mailServiceFacade) {
        this.mailServiceFacade = mailServiceFacade;
    }

    @GetMapping("mails/sent")
    public List<MailPreviewDTO> sentMails(@RequestBody MailFilterDTO mailFilterDTO,
                                          @AuthenticationPrincipal UserPrinciple user) {
        return mailServiceFacade.getSentMails(mailFilterDTO, user);
    }

    @GetMapping("mails/received")
    public List<MailPreviewDTO> receivedMails(@RequestBody MailFilterDTO mailFilterDTO,
                                      @AuthenticationPrincipal UserPrinciple user) {
        return mailServiceFacade.getReceivedMails(mailFilterDTO, user);
    }

    @GetMapping("mails/{id}")
    public FullMailDTO mails(@PathVariable Long id) {
        return mailServiceFacade.getFullMailById(id);
    }

    @DeleteMapping("mails/{id}")
    public void deleteMail(@PathVariable Long id) {
        mailServiceFacade.DeleteMail(id);
    }

}

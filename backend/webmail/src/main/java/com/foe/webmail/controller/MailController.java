package com.foe.webmail.controller;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.service.mailService.MailServiceFacade;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MailController {

    MailServiceFacade mailServiceFacade;

    public MailController(MailServiceFacade mailServiceFacade) {
        this.mailServiceFacade = mailServiceFacade;
    }

    @GetMapping("mails")
    public List<MailPreviewDTO> mails(@RequestBody MailFilterDTO mailFilterDTO) {
        return mailServiceFacade.getMailsPreviewDtoByFilter(mailFilterDTO);
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

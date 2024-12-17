package com.foe.webmail.controller;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.service.IMailFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MailController {

    IMailFilterService mailService;

    @Autowired
    MailController(IMailFilterService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("mails")
    public List<MailPreviewDTO> mails(@RequestBody MailFilterDTO mailFilterDTO) {
        return mailService.getMailsPreviewDtoByFilter(mailFilterDTO);
    }

    @GetMapping("mails/{id}")
    public FullMailDTO mails(@PathVariable Long id) {
        m
    }
}

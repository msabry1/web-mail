package com.foe.webmail.controller;


import com.foe.webmail.dto.EmailComposeDto;
import com.foe.webmail.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class TestController {

    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping("/compose")
    public String compose(EmailComposeDto emailComposeDto) {
        emailSenderService.sendEmail(emailComposeDto,"a");
        return "Sended";
    }
}

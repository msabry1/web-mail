package com.foe.webmail.service.mailService;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.repository.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MailDetailsService  {

    MailRepository mailRepository;

    @Autowired
    public MailDetailsService(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }

    public FullMailDTO getFullMailById(Long id) {
        FullMailDTO fullMailDTO = null ;
        Optional<Mail> mail = mailRepository.findById(id);
        if(mail.isPresent()) {
             fullMailDTO = FullMailDTO.builder().attachments(mail.get().getAttachments())
             .body(mail.get().getBody())
             .id(mail.get().getId())
             .build();
        }
        return fullMailDTO;
    }
}

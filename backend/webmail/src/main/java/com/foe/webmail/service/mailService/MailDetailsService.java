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
        FullMailDTO fullMailDTO = new FullMailDTO() ;
        Optional<Mail> mail = mailRepository.findById(id);
        if(mail.isPresent()) {
             fullMailDTO.setAttachments(mail.get().getAttachments());
             fullMailDTO.setBody(mail.get().getBody());
             fullMailDTO.setId(mail.get().getId());
        } else {
            fullMailDTO.setAttachments(null);
            fullMailDTO.setBody(null);
            fullMailDTO.setId(null);
        }
        return fullMailDTO;
    }
}

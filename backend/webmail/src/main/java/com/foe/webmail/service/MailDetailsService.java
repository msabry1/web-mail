package com.foe.webmail.service;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.repository.MailRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MailDetailsService implements IMailDetailsService {

    MailRepository mailRepository;

    @Override
    public FullMailDTO getFullMailById(Long id) {
        FullMailDTO fullMailDTO = new FullMailDTO();
        Optional<Mail> mail = mailRepository.findById(id);
        if(mail.isPresent()) {
            fullMailDTO.setId(mail.get().getId());
            fullMailDTO.setAttachments(mail.get().getAttachments());

        }
    }
}

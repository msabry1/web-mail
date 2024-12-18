package com.foe.webmail.service.mailService;

import com.foe.webmail.repository.MailRepository;
import org.springframework.stereotype.Service;

@Service
public class MailDeleteService {

    MailRepository mailRepository;

    MailDeleteService(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }

    public void delete(Long id) {
        mailRepository.deleteById(id);
    }
}

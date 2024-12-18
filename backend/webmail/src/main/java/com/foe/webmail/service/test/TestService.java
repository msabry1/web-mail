package com.foe.webmail.service.test;

import com.foe.webmail.entity.Mail;
import com.foe.webmail.repository.MailRepository;
import com.foe.webmail.service.mailService.filters.MailSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestService {

    MailRepository mailRepository;

    public TestService(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }

    public List<Mail> getMailBystatusAndDateAndSubject(String status, LocalDateTime date, String subject) {
        Specification<Mail> specification = Specification.where(MailSpecifications.hasStatus(status))
                .and(MailSpecifications.hasDateAfter(date))
                .and(MailSpecifications.hasSubjectLike(subject))
                .and(MailSpecifications.hasFolder("star"));
        return mailRepository.findAll(specification);
    }
}

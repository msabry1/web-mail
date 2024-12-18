package com.foe.webmail.service.mailService;


import com.foe.webmail.dto.FullMailDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MailServiceFacade {

    MailDetailsService mailDetailsService;
    MailFiltrationService mailFiltrationService;
    MailDeleteService mailDeleteService;

    public MailServiceFacade(MailDetailsService mailDetailsService,
                             MailFiltrationService mailFiltrationService,
                             MailDeleteService mailDeleteService) {
        this.mailDetailsService = mailDetailsService;
        this.mailFiltrationService = mailFiltrationService;
        this.mailDeleteService = mailDeleteService;
    }

    public List<MailPreviewDTO> getMailsPreviewDtoByFilter(MailFilterDTO mailFilterDTO) {
        return mailFiltrationService.getMailsPreviewDtoByFilter(mailFilterDTO);
    }

    public FullMailDTO getFullMailById(Long id) {
        return mailDetailsService.getFullMailById(id);
    }

    public void DeleteMail(Long id) {
        mailDeleteService.delete(id);
    }

}

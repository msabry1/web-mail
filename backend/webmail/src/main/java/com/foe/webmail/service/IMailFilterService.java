package com.foe.webmail.service;

import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;

import java.util.List;

public interface IMailFilterService {

    List<MailPreviewDTO> getMailsPreviewDtoByFilter(MailFilterDTO mailFilterDTO);
}

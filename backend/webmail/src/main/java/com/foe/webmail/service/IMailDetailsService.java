package com.foe.webmail.service;

import com.foe.webmail.dto.FullMailDTO;

public interface IMailDetailsService {

    FullMailDTO getFullMailById(Long id);
}

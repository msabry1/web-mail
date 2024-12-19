package com.foe.webmail.mappers;

import com.foe.webmail.dto.PermanentFileDto;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.MailAttachment;
import com.foe.webmail.entity.User;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PermenantFileDtoToMailAttachements {
    public List<MailAttachment> convert(List<PermanentFileDto> permanentFileDtos, Mail mail){
        return permanentFileDtos.stream().map(permanentFileDto -> {
                    return MailAttachment.builder()
                    .link(permanentFileDto.getKey())
                    .mail(mail)
                    .frontId("NA")
                    .name(permanentFileDto.getFileName())
                    .build();
        })
                .toList();
    }
}

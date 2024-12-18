package com.foe.webmail.dto;

import com.foe.webmail.entity.MailAttachment;
import lombok.Data;

import java.util.List;


@Data
public class FullMailDTO {
    private Long id;
    private String body;
    private List<MailAttachment> attachments;
}

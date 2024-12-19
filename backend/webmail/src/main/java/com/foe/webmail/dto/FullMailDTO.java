package com.foe.webmail.dto;

import com.foe.webmail.entity.MailAttachment;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class FullMailDTO {
    private Long id;
    private String body;
    private List<MailAttachment> attachments;
}

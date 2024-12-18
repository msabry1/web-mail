package com.foe.webmail.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
public class MailPreviewDTO {
    private Long id;
    private String sender;
    private String subject;
    private LocalDateTime date;
    private String priority;
    private Boolean isRead;
    private Boolean isStarred;
    private List<String> receivers;
}

package com.foe.webmail.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
public class MailPreviewDTO {

    private Long id;
    private String senderOrReceiver;
    private String subject;
    private LocalDateTime date;
    private String importance;
    private List<String> receivers;

}

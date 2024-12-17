package com.foe.webmail.dto;

import lombok.Data;

@Data
public class MailFilterDTO {

    private String subject;
    private String body;
    private String date;
    private String attachmentName;
    private String sender;
    private String receiver;
    private String folder;
    private String status;
}

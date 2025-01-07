package com.foe.webmail.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
@Builder
public class EmailComposeDto {
    private String subject;
    private String body;
    private String importance;
    private List<MultipartFile> files;
    private List<String> receivers;
}

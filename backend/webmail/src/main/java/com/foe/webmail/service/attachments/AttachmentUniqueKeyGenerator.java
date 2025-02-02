package com.foe.webmail.service.attachments;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class AttachmentUniqueKeyGenerator {
    public static String generateKey(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        return uuid + "_" + fileName;
    }
}

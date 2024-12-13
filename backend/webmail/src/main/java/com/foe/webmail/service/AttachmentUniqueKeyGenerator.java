package com.foe.webmail.service;

import com.foe.webmail.dto.MultipartFileDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class AttachmentUniqueKeyGenerator {
    public static String generateKey(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        return uuid + "_" + fileName;
    }
}

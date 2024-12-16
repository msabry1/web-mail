package com.foe.webmail.mappers;

import com.foe.webmail.dto.MultipartFileDto;
import com.foe.webmail.service.AttachmentUniqueKeyGenerator;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class MultipartFileDtoMapper {
    public static List<MultipartFileDto> mapToDto(List<MultipartFile> files) {
    return files.stream()
        .map(file -> new MultipartFileDto(
                AttachmentUniqueKeyGenerator.generateKey(file),
                file)
        )
        .toList();
    }
}

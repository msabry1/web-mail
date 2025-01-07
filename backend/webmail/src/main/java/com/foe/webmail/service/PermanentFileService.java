package com.foe.webmail.service;

import com.foe.webmail.dto.PermanentFileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
@Service
public class PermanentFileService {
    private final FileConverterHandlerService fileConverterHandlerService;

    @Autowired
    public PermanentFileService(FileConverterHandlerService fileConverterHandlerService) {
        this.fileConverterHandlerService = fileConverterHandlerService;
    }

    public List<PermanentFileDto> mapMultiPartToPermanentFileDto(List<MultipartFile> files) {

        if (files == null || files.isEmpty()) {
            return Collections.emptyList();
        }
    return files.stream()
        .map(file -> {
            String uniqueFileName = AttachmentUniqueKeyGenerator.generateKey(file);
            try {
                return new PermanentFileDto(
                        uniqueFileName,
                        file.getOriginalFilename(),
                        fileConverterHandlerService.convertMultipartFileToFile(file,uniqueFileName));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            }
        )
        .toList();
    }
    public void deletePermanentFiles(List<PermanentFileDto> permanentFileDtos) {
        permanentFileDtos.forEach(permanentFileDto -> {
            permanentFileDto.getFile().delete();
        });
    }
}

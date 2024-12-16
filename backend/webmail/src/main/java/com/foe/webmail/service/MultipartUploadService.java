package com.foe.webmail.service;

import com.foe.webmail.dto.MultipartFileDto;
import com.foe.webmail.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class MultipartUploadService {
    private final AttachmentRepository attachmentRepository;

    @Autowired
    public MultipartUploadService(AttachmentRepository attachmentRepository){
        this.attachmentRepository = attachmentRepository;
    }

    public List<CompletableFuture<Void>> uploadFilesAsync(
            List<MultipartFileDto> filesDto
    ) {
        return filesDto.parallelStream()
                .map(fileDto -> {
                    try {
                        return attachmentRepository.upload(fileDto.getKey(), fileDto.getFile());
                    } catch (IOException | InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

}
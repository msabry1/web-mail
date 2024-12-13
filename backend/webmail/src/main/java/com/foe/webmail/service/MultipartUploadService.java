package com.foe.webmail.service;

import com.foe.webmail.aws.AWSAttachmentRepository;
import com.foe.webmail.dto.MultipartFileDto;
import com.foe.webmail.repository.AttachmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
@RequiredArgsConstructor
public class MultipartUploadService {
    @Autowired
    private AttachmentRepository attachmentRepository;

    public List<CompletableFuture<Void>> uploadFilesAsync(
            List<MultipartFileDto> filesDto
    ) {
        return filesDto.stream()
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
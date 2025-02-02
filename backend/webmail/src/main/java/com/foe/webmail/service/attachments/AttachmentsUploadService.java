package com.foe.webmail.service.attachments;

import com.foe.webmail.dto.PermanentFileDto;
import com.foe.webmail.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class AttachmentsUploadService {
    private final AttachmentRepository attachmentRepository;

    @Autowired
    public AttachmentsUploadService(AttachmentRepository attachmentRepository){
        this.attachmentRepository = attachmentRepository;
    }

    public CompletableFuture<Void> uploadFilesAsync(
            List<PermanentFileDto> filesDto
    ) {
        List<CompletableFuture<Void>> filesUploadingPromises =  filesDto.parallelStream()
                .map(fileDto -> {
                    try {
                        return attachmentRepository.upload(fileDto.getKey(), fileDto.getFile());
                    } catch (IOException | InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
        return CompletableFuture.allOf(filesUploadingPromises.toArray(new CompletableFuture[0]));
    }

}
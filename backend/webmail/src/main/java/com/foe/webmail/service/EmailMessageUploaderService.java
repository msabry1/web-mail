package com.foe.webmail.service;

import com.foe.webmail.dto.MultipartFileDto;
import com.foe.webmail.mappers.MultipartFileDtoMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class EmailMessageUploaderService {

    @Autowired
    private MultipartUploadService multipartUploadService;

    public void upload(String Message, List<MultipartFile> files) {
        List<MultipartFileDto> fileDtos = MultipartFileDtoMapper.mapToDto(files);

        List<CompletableFuture<Void>> filesFutureResponse = multipartUploadService.uploadFilesAsync(fileDtos);

        CompletableFuture<Void> allFutures = CompletableFuture.allOf(filesFutureResponse.toArray(new CompletableFuture[0]));
        allFutures.join();
    }
}

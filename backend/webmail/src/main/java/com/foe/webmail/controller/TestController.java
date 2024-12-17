package com.foe.webmail.controller;


import com.foe.webmail.aws.AWSAttachmentRepository;

import com.foe.webmail.service.EmailMessageUploaderService;
import com.foe.webmail.service.MultipartUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
public class TestController {

    @Autowired
    EmailMessageUploaderService emailMessageUploaderService;

    @RequestMapping("/upload")
    public String upload(List<MultipartFile> files) throws IOException, InterruptedException {

//        CompletableFuture.runAsync(() ->
//                emailMessageUploaderService.upload("msg",List.of(file1, file2))
//        );
        emailMessageUploaderService.upload("msg",files);
        return "uploading";
    }
}

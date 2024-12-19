package com.foe.webmail.repository;

import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

public interface AttachmentRepository {
    CompletableFuture<Void> upload(String key, File file) throws IOException, InterruptedException;
    CompletableFuture<Void> delete(String key);
}

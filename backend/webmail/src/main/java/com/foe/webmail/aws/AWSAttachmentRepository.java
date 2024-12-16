package com.foe.webmail.aws;

import com.foe.webmail.repository.AttachmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class AWSAttachmentRepository implements AttachmentRepository {

  @Value("${aws.s3.bucket_name}")
  private String bucketName;

   private final S3AsyncClient s3AsyncClient;

    @Autowired
    public AWSAttachmentRepository(S3AsyncClient s3AsyncClient) {
        this.s3AsyncClient = s3AsyncClient;
    }
    @Override
    public CompletableFuture<Void> upload(String key, MultipartFile file) throws IOException, InterruptedException {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        return s3AsyncClient.putObject(
                putObjectRequest,
                AsyncRequestBody.fromBytes(file.getBytes())
        ).thenApply(response -> null);
    }

    @Override
    public CompletableFuture<Void> delete(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        return s3AsyncClient.deleteObject(
                deleteObjectRequest
        ).thenApply(response -> null);
    }
}

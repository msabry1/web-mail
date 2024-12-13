package com.foe.webmail.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class AWSConfiguration {

    @Value("${aws.region}")
    private String awsRegion;

    private final AwsCredentialsProvider credentialsProvider;

    public AWSConfiguration(AwsCredentialsProvider awsCredentialsProvider) {
        this.credentialsProvider = awsCredentialsProvider;
    }
    @Bean
    public S3AsyncClient s3AsyncClient() {
        return S3AsyncClient.builder()
                .credentialsProvider(credentialsProvider)
                .region(Region.of(awsRegion))
                .build();
    }

    @Bean
    public Executor asyncExecutor() {
        return Executors.newFixedThreadPool(
                Math.min(100, Runtime.getRuntime().availableProcessors() * 2)
        );
    }
}

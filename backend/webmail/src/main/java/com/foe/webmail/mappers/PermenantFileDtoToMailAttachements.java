package com.foe.webmail.mappers;

import com.foe.webmail.dto.PermanentFileDto;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.MailAttachment;
import com.foe.webmail.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PermenantFileDtoToMailAttachements {
    @Value("${aws.s3.bucket_name}")
    private String bucketName;

    @Value("${aws.region}")
    private String awsRegion;


    public List<MailAttachment> convert(List<PermanentFileDto> permanentFileDtos, Mail mail){
        return permanentFileDtos.stream().map(permanentFileDto -> MailAttachment.builder()
        .link(String.format("https://%s.s3.%s.amazonaws.com/%s"
                ,bucketName,awsRegion,permanentFileDto.getKey())
        )
        .mail(mail)
        .frontId("NA")
        .name(permanentFileDto.getFileName())
        .build())
                .toList();
    }
}

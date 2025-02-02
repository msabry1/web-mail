package com.foe.webmail.service.attachments;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class FileConverterHandlerService {

    private final File directory ;


    public FileConverterHandlerService(@Value("${file.upload.directory}")
                                       String directoryPath) {
        this.directory = new File(directoryPath);
        if (!directory.exists()) {
            boolean createdDirectory = directory.mkdirs();
            if (!createdDirectory) {
                throw new RuntimeException("can't create directory for files");
            }
        }
    }
    public File convertMultipartFileToFile(MultipartFile multipartFile,String uniqueFileName) throws IOException {

        File file = new File(directory, uniqueFileName);
        multipartFile.transferTo(file);
        return file;
    }
}

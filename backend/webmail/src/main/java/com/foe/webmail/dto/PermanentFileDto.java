package com.foe.webmail.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.File;

@Data
@AllArgsConstructor
public class PermanentFileDto {
    private String key;
    private String fileName;
    private File file;
}

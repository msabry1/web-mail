package com.foe.webmail.dto;

import lombok.Data;

@Data
public class AddMailToFolderDto {
    private Long folderId;
    private Long mailId;
}

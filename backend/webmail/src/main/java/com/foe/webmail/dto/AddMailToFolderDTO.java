package com.foe.webmail.dto;

import lombok.Data;

@Data
public class AddMailToFolderDTO {
    private Long folderId;
    private Long mailId;
}

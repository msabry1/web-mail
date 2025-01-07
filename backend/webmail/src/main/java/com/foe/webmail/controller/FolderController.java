package com.foe.webmail.controller;


import com.foe.webmail.dto.FolderDTO;
import com.foe.webmail.dto.MailFilterDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Folder;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.service.userService.FolderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FolderController {

    FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("folder")
    public ResponseEntity<Folder> createFolder(@RequestBody FolderDTO folderDto,
                                               @AuthenticationPrincipal UserPrinciple user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(folderService.createFolder(folderDto, user));
    }

    @GetMapping("folder/{id}")
    public ResponseEntity<List<MailPreviewDTO>> getFolder(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(folderService.getFolderMails(id));
    }


    @PostMapping("folder/filter/{folderName}")
    public ResponseEntity<Long> getFolderFiltered(@RequestBody MailFilterDTO mailFilterDTO,
                                                                  @PathVariable String folderName,
                                                                  @AuthenticationPrincipal UserPrinciple user) {
        return ResponseEntity.status(HttpStatus.OK).body(folderService.filterAndAdd(folderName, mailFilterDTO, user));
    }

    @DeleteMapping("folder/{id}")
    public ResponseEntity<Folder> deleteFolder(@PathVariable Long id) {
        folderService.deleteFolder(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

package com.foe.webmail.dto;

import com.foe.webmail.entity.Contact;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private List<String> foldersNames;
    private List<Contact> contacts;
}

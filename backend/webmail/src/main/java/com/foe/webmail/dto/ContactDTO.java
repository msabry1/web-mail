package com.foe.webmail.dto;


import lombok.Data;

import java.util.List;

@Data
public class ContactDTO {
    private Long id;
    private String name;
    private List<String> usernames;
}

package com.foe.webmail.controller;


import com.foe.webmail.dto.ContactDTO;
import com.foe.webmail.entity.User;
import com.foe.webmail.security.user.CurrentUser;
import com.foe.webmail.service.userService.ContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContactController {

    ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    @PostMapping("users/contact")
    public ContactDTO addContact(@RequestBody ContactDTO contactDTO,
                                 @CurrentUser User user) {
        return contactService.addContact(contactDTO, user);
    }

    @GetMapping("users/contact")
    public List<ContactDTO> getContact(@CurrentUser User user) {
        return contactService.getContacts(user);
    }

    @DeleteMapping("users/contact/{id}")
    public void deleteContact(@PathVariable Long id,@CurrentUser User user) {
        contactService.deleteContact(id);
    }
}

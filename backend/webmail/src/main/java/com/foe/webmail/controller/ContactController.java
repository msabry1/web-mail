package com.foe.webmail.controller;


import com.foe.webmail.dto.ContactDTO;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.service.userService.ContactService;
import com.foe.webmail.service.userService.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class ContactController {

    ContactService contactService;

    public ContactController(UserService userService, ContactService contactService) {
        this.contactService = contactService;
    }
    @PostMapping("users/contact")
    public ContactDTO addContact(@RequestBody ContactDTO contactDTO,
                                 @AuthenticationPrincipal UserPrinciple userPrinciple) {
        return contactService.addContact(contactDTO, userPrinciple);
    }

    @DeleteMapping("users/contact/{id}")
    public void deleteContact(@PathVariable Long id, @AuthenticationPrincipal UserPrinciple user) {
        contactService.deleteContact(id);
    }
}

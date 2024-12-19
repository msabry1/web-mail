package com.foe.webmail.controller;


import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.service.userService.ContactService;
import com.foe.webmail.service.userService.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    UserService userService;
    ContactService contactService;

    UserController(UserService userService, ContactService contactService) {
        this.userService = userService;
        this.contactService = contactService;
    }

    @GetMapping("users")
    public UserDTO getUsers(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        return userService.getUserByToken(userPrinciple);
    }

}

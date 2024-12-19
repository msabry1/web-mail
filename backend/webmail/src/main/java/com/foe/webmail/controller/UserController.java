package com.foe.webmail.controller;


import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.service.userService.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public UserDTO getUsers(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        return userService.getUserByUsername(userPrinciple.getUsername());
    }

}

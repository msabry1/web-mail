package com.foe.webmail.controller;


import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.service.userService.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("users/{id}")
    public UserDTO getUsers(@PathVariable Long id) {
        return userService.getUserById(id);
    }

}

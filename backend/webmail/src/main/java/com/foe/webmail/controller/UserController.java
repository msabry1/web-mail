package com.foe.webmail.controller;


import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.User;
import com.foe.webmail.mappers.UserMapper;
import com.foe.webmail.security.user.CurrentUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserMapper userMapper;

    UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @PostMapping("/users")
    public UserDTO getUsers(@CurrentUser User user) {
        return userMapper.userToUserDTO(user);
    }

}

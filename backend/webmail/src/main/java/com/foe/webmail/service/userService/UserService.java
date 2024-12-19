package com.foe.webmail.service.userService;


import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.User;
import com.foe.webmail.mappers.UserMapper;
import com.foe.webmail.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(value -> userMapper.userToUserDTO(value)).orElse(null);
    }

    public UserDTO getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(value -> userMapper.userToUserDTO(value)).orElse(null);
    }
}

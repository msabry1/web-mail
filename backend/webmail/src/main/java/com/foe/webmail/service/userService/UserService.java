package com.foe.webmail.service.userService;


import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.User;
import com.foe.webmail.entity.UserPrinciple;
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

    public UserDTO getUserByToken(UserPrinciple userPrinciple) {
        Optional<User> user = userRepository.findByUsername(userPrinciple.getUsername());
        return user.map(value -> userMapper.userToUserDTO(value)).orElse(null);
    }
}

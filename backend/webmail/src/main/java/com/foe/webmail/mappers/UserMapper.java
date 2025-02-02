package com.foe.webmail.mappers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foe.webmail.dto.AuthenticationDto;
import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.Folder;
import com.foe.webmail.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    private final ObjectMapper objectMapper;
    private final ContactMapper contactMapper;
    private final PasswordEncoder passwordEncoder;

    public UserMapper(ObjectMapper objectMapper, ContactMapper contactMapper, PasswordEncoder passwordEncoder) {
        this.objectMapper = objectMapper;
        this.contactMapper = contactMapper;
        this.passwordEncoder = passwordEncoder;
    }


    public UserDTO userToUserDTO(User user) {

        UserDTO userDTO = objectMapper.convertValue(user, UserDTO.class);

        if (user.getFolders() != null) {
            List<String> folderNames = user.getFolders().stream()
                    .map(Folder::getName)
                    .collect(Collectors.toList());
            userDTO.setFoldersNames(folderNames);
        }
        userDTO.setContactsDto(contactMapper.toContactDtoList(user.getContacts()));

        return userDTO;
    }

    public User toUser(AuthenticationDto.RegisterRequest request) {
        return User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();
    }

    public AuthenticationDto.AuthenticationResponse toAuthenticationResponse(String jwt, User user) {
        return AuthenticationDto.AuthenticationResponse.builder()
                .token(jwt)
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
}

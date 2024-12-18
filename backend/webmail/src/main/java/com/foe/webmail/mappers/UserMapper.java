package com.foe.webmail.mappers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    private final ObjectMapper objectMapper;

    public UserMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }


    public UserDTO userToUserDTO(User user) {

        UserDTO userDTO = objectMapper.convertValue(user, UserDTO.class);


        if (user.getFolders() != null) {
            List<String> folderNames = user.getFolders().stream()
                    .map(folder -> folder.getName())
                    .collect(Collectors.toList());
            userDTO.setFoldersNames(folderNames);
        }

        return userDTO;
    }

    public User userDTOToUser(UserDTO userDTO) {

        return objectMapper.convertValue(userDTO, User.class);
    }
}

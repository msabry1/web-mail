package com.foe.webmail.mappers;

import com.foe.webmail.dto.UserDTO;
import com.foe.webmail.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "foldersNames", expression = "java(user.getFolders() != null ? user.getFolders().stream().map(folder -> folder.getName()).collect(Collectors.toList()) : null)")
    UserDTO toDto(User user);

    @Mapping(target = "folders", ignore = true)
    @Mapping(target = "sentMails", ignore = true)
    User toEntity(UserDTO userDto);
}

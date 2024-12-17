package com.foe.webmail.mappers;

import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.User;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MailPreviewMapper {


    @Mapping(target = "sender", source = "sender", qualifiedByName = "mapSender")
    @Mapping(target = "receivers", source = "receivers", qualifiedByName = "mapReceivers")
    MailPreviewDTO toMailPreviewDTO(Mail mail);


    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receivers", ignore = true)
    @Mapping(target = "attachments", ignore = true)
    @Mapping(target = "folders", ignore = true)
    Mail toMailEntity(MailPreviewDTO dto);


    @Named("mapSender")
    default String mapSender(User sender) {
        return sender != null ? sender.getUsername() : null;
    }

    @Named("mapReceivers")
    default List<String> mapReceivers(List<User> receivers) {
        return receivers != null
                ? receivers.stream().map(User::getUsername).collect(Collectors.toList())
                : null;
    }
}
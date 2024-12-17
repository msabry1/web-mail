package com.foe.webmail.mappertest;


import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.User;
import com.foe.webmail.mappers.MailPreviewMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.Arrays;


import static org.junit.jupiter.api.Assertions.*;

class MailMapperTest {

    private MailPreviewMapper mailMapper;

    @BeforeEach
    void setUp() {

        mailMapper = Mappers.getMapper(MailPreviewMapper.class);
    }

    @Test
    void testToMailPreviewDTO() {
        // Arrange
        User sender = new User();
        sender.setId(1L);
        sender.setUsername("john_doe");

        User receiver1 = new User();
        receiver1.setId(2L);
        receiver1.setUsername("jane_doe");

        User receiver2 = new User();
        receiver2.setId(3L);
        receiver2.setUsername("smith");

        Mail mail = new Mail();
        mail.setId(100L);
        mail.setSender(sender);
        mail.setReceivers(Arrays.asList(receiver1, receiver2));
        mail.setSubject("Test Subject");
        mail.setDate(LocalDateTime.now());
        mail.setImportance("High");
        mail.setIsSeen(true);
        mail.setIsStared(false);

        // Act
        MailPreviewDTO dto = mailMapper.toMailPreviewDTO(mail);

        // Assert
        assertNotNull(dto);
        assertEquals(mail.getId(), dto.getId());
        assertEquals(mail.getSender().getUsername(), dto.getSender());
        assertEquals(mail.getSubject(), dto.getSubject());
        assertEquals(mail.getDate(), dto.getDate());
        assertEquals(mail.getImportance(), dto.getImportance());
        assertEquals(mail.getIsSeen(), dto.getIsSeen());
        assertEquals(mail.getIsStared(), dto.getIsStared());
        assertEquals(2, dto.getReceivers().size());
        assertTrue(dto.getReceivers().contains("jane_doe"));
        assertTrue(dto.getReceivers().contains("smith"));
    }

    @Test
    void testToMailEntity() {
        // Arrange
        MailPreviewDTO dto = new MailPreviewDTO();
        dto.setId(200L);
        dto.setSender("john_doe");
        dto.setReceivers(Arrays.asList("jane_doe", "smith"));
        dto.setSubject("Test Subject");
        dto.setDate(LocalDateTime.now());
        dto.setImportance("Low");
        dto.setIsSeen(false);
        dto.setIsStared(true);

        // Act
        Mail mail = mailMapper.toMailEntity(dto);

        // Assert
        assertNotNull(mail);
        assertEquals(dto.getId(), mail.getId());
        assertEquals(dto.getSubject(), mail.getSubject());
        assertEquals(dto.getDate(), mail.getDate());
        assertEquals(dto.getImportance(), mail.getImportance());
        assertEquals(dto.getIsSeen(), mail.getIsSeen());
        assertEquals(dto.getIsStared(), mail.getIsStared());

        // sender and receivers are ignored in this mapping
        assertNull(mail.getSender());
        assertNull(mail.getReceivers());
    }

}


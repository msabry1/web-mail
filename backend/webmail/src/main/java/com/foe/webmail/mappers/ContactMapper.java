package com.foe.webmail.mappers;

import com.foe.webmail.dto.ContactDTO;
import com.foe.webmail.entity.Contact;
import com.foe.webmail.entity.ContactEmails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ContactMapper {

    public ContactDTO toContactDTO(Contact contact) {
        if (contact == null) {
            return null;
        }

        ContactDTO contactDTO = new ContactDTO();
        contactDTO.setId(contact.getId());
        contactDTO.setName(contact.getName());
        List<String> emails = contact.getEmails().stream()
                .map(ContactEmails::getEmail)
                .collect(Collectors.toList());
        contactDTO.setUsernames(emails);

        return contactDTO;
    }

    public Contact toContactEntity(ContactDTO contactDTO) {
        if (contactDTO == null) {
            return null;
        }

        Contact contact = new Contact();
        contact.setId(contactDTO.getId());
        contact.setName(contactDTO.getName());
        List<ContactEmails> emails = contactDTO.getUsernames().stream()
                .map(email -> {
                    ContactEmails contactEmail = new ContactEmails();
                    contactEmail.setEmail(email);
                    contactEmail.setContact(contact);
                    return contactEmail;
                })
                .collect(Collectors.toList());
        contact.setEmails(emails);

        return contact;
    }

    public List<ContactDTO> toContactDtoList(List<Contact> contacts) {
        List<ContactDTO> contactDTOS = new ArrayList<>();
        for (Contact contact : contacts) {
            contactDTOS.add(toContactDTO(contact));
        }
        return contactDTOS;
    }
}

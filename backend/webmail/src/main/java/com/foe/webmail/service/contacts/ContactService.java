package com.foe.webmail.service.contacts;


import com.foe.webmail.dto.ContactDTO;
import com.foe.webmail.entity.Contact;
import com.foe.webmail.entity.User;
import com.foe.webmail.mappers.ContactMapper;
import com.foe.webmail.repository.ContactRepository;
import com.foe.webmail.repository.UserRepository;
import com.foe.webmail.service.contacts.filter.ContactSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    ContactRepository contactRepository;
    ContactMapper contactMapper;
    UserRepository userRepository;

    public ContactService(ContactRepository contactRepository, ContactMapper contactMapper,
                          UserRepository userRepository) {
        this.contactRepository = contactRepository;
        this.contactMapper = contactMapper;
        this.userRepository = userRepository;
    }

    public ContactDTO addContact(ContactDTO contactDTO, User user) {
        Contact contact = contactMapper.toContactEntity(contactDTO);
        contact.setUser(user);
        return contactMapper.toContactDTO(contactRepository.save(contact));
    }

    public List<ContactDTO> getContacts(User user) {
        Specification<Contact> spec = Specification.where(
                ContactSpecification.hasUsername(user.getUsername())
        );
        List<Contact> contacts = contactRepository.findAll(spec);
        List<ContactDTO> contactDTOS = new ArrayList<>();
        for (Contact contact : contacts) {
            contactDTOS.add(contactMapper.toContactDTO(contact));
        }
        return contactDTOS ;
    }

    public void deleteContact(Long id) {
         contactRepository.deleteById(id);
    }
}

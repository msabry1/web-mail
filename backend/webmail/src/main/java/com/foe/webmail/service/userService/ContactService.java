package com.foe.webmail.service.userService;


import com.foe.webmail.dto.ContactDTO;
import com.foe.webmail.entity.Contact;
import com.foe.webmail.entity.User;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.mappers.ContactMapper;
import com.foe.webmail.repository.ContactRepository;
import com.foe.webmail.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public ContactDTO addContact(ContactDTO contactDTO, UserPrinciple userPrinciple) {
        Contact contact = contactMapper.toContactEntity(contactDTO);
        Optional<User> user = userRepository.findByUsername(userPrinciple.getUsername());
        if( user.isPresent() ) {
            contact.setUser(user.get());
        } else {
            throw new IllegalArgumentException("no such a user");
        }
        return contactMapper.toContactDTO(contactRepository.save(contact));
    }

    public void deleteContact(Long id) {
         contactRepository.deleteById(id);
    }
}

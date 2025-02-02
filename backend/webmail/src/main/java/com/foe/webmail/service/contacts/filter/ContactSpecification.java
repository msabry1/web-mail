package com.foe.webmail.service.contacts.filter;

import com.foe.webmail.entity.Contact;
import com.foe.webmail.entity.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;



public class ContactSpecification {

    public static Specification<Contact> hasUsername(String username) {
        return (root, query, criteriaBuilder) -> {
            Join<Contact, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("username"), username);
        };
    }
}

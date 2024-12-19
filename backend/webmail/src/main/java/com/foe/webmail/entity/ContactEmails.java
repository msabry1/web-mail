package com.foe.webmail.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "Contact_emails")
public class ContactEmails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @ManyToOne(fetch = FetchType.LAZY, optional=false)
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    @JsonIgnore
    private Contact contact;
}

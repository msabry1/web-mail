package com.foe.webmail.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "Contact_emails")
public class ContactEmails extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @ManyToOne(fetch = FetchType.LAZY, optional=false)
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    private Contact contact;
}

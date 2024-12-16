package com.foe.webmail.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Mail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String body;
    private LocalDateTime date;
    private String importance;
    private String status;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "mail")
    private List<MailAttachment> attachments;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private User sender;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Mail_Receiver",
            joinColumns = @JoinColumn(name = "mail_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    )
    private List<User> receivers;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "mails")
    private List<Folder> folders;
}

package com.foe.webmail.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;



@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Folder extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name="Folder_Mail",
            joinColumns = { @JoinColumn(name = "folder_id", referencedColumnName = "id") },
            inverseJoinColumns = {@JoinColumn(name = "mail_id", referencedColumnName = "id")}
    )
    private List<Mail> mails;
}

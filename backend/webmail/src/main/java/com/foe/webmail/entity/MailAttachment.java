package com.foe.webmail.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailAttachment{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="mail_id")
    @JsonIgnore
    private Mail mail;

    private String frontId;
    private String link;
    private String name;
}

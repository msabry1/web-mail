package com.foe.webmail.repository;

import com.foe.webmail.entity.Mail;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MailRepository extends JpaRepository<Mail, Long>, JpaSpecificationExecutor<Mail> {
}

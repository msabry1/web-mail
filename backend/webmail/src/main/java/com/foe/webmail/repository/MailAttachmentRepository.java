package com.foe.webmail.repository;

import com.foe.webmail.entity.MailAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailAttachmentRepository extends JpaRepository<MailAttachment, Long> {
}

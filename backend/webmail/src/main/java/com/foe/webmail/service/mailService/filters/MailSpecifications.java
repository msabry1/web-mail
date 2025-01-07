package com.foe.webmail.service.mailService.filters;

import com.foe.webmail.entity.Folder;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.MailAttachment;
import com.foe.webmail.entity.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDateTime;



public class MailSpecifications {

    public static Specification<Mail> hasSubjectLike(String subject) {
        return (root, query, cb) -> {
            if (subject == null || subject.isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(root.get("subject"), "%" + subject + "%");
        };
    }

    public static Specification<Mail> hasBodyLike(String body) {
        return (root, query, cb) -> {
            if (body == null || body.isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(root.get("body"), "%" + body + "%");
        };
    }

    public static Specification<Mail> hasStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<Mail> hasDateAfter(LocalDateTime date) {
        return (root, query, cb) -> {
            if (date == null) {
                return cb.conjunction();
            }
            return cb.greaterThan(root.get("date"), date);
        };
    }

    public static Specification<Mail> hasAttachmentsLike(String attachmentName) {
        return (root, query, cb) -> {
            if (attachmentName == null || attachmentName.isEmpty()) {
                return cb.conjunction();
            }
            Join<Mail, MailAttachment> attachmentJoin = root.join("attachments");
            return cb.like(attachmentJoin.get("name"), "%" + attachmentName + "%");
        };
    }

    public static Specification<Mail> hasReceiver(String receiverUsername) {
        return (root, query, cb) -> {
            if (receiverUsername == null || receiverUsername.isEmpty()) {
                return cb.conjunction();
            }
            Join<Mail, User> receiversJoin = root.join("receivers");
            return cb.like(receiversJoin.get("username"), "%" + receiverUsername + "%");
        };
    }

    public static Specification<Mail> hasSender(String senderUsername) {
        return (root, query, cb) -> {
            if (senderUsername == null || senderUsername.isEmpty()) {
                return cb.conjunction();
            }
            Join<Mail, User> senderJoin = root.join("sender");
            return cb.like(senderJoin.get("username"), "%" + senderUsername + "%");
        };
    }

    public static Specification<Mail> hasFolder(String folderName) {
        return (root, query, cb) -> {
            if (folderName == null || folderName.isEmpty()) {
                return cb.conjunction();
            }
            Join<Mail, Folder> folderJoin = root.join("folders");
            return cb.equal(folderJoin.get("name"), folderName);
        };
    }

    public static Specification<Mail> hasImportance(String importance) {
        return (root, query, cb) -> {
            if (importance == null || importance.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("importance"), importance);
        };
    }

}


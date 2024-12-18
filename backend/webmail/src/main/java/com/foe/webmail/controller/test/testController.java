package com.foe.webmail.controller.test;


import com.foe.webmail.dto.AddMailToFolderDTO;
import com.foe.webmail.entity.*;
import com.foe.webmail.repository.*;
import com.foe.webmail.service.test.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
public class testController {

    private final UserRepository userRepository;
    private final MailRepository mailRepository;
    private final FoldersRepository foldersRepository;
    private final ContactRepository contactRepository;
    private final TestService testService;
    private final MailAttachmentRepository mailAttachmentRepository;

    @Autowired
    public testController (UserRepository userRepository, MailRepository mailRepository,
                           FoldersRepository foldersRepository, ContactRepository contactRepository,
                           TestService testService, MailAttachmentRepository mailAttachmentRepository) {
        this.userRepository = userRepository;
        this.mailRepository = mailRepository;
        this.foldersRepository = foldersRepository;
        this.contactRepository = contactRepository;
        this.testService = testService;
        this.mailAttachmentRepository = mailAttachmentRepository;
    }

    @PostMapping("test")
    public User test(@RequestBody User user) {
        userRepository.save(user);
        return user;
    }

    @GetMapping("test/{id}")
    public User test2(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    @PostMapping("mail")
    public Mail test3(@RequestBody Mail mail) {
        Optional<User> sender = userRepository.findById(Long.valueOf("1"));
        mail.setSender(sender.get());
        Optional<User> receiver = userRepository.findById(Long.valueOf("2"));
        List<User> users = Arrays.asList(receiver.get());
        mail.setReceivers(users);
        List<Folder> flist = foldersRepository.findAll();
        mail.setFolders(flist);
        mailRepository.save(mail);
        return mail;
    }

    @PostMapping("folder")
    public Folder test4(@RequestBody Folder folder) {
        Optional<User> user = userRepository.findById(Long.valueOf("1"));
        folder.setUser(user.get());
        folder.setMails(mailRepository.findAll());
        foldersRepository.save(folder);
        return folder;
    }

    @PostMapping("contact")
    public Contact test5(@RequestBody Contact contact) {
        Optional<User> user = userRepository.findById(Long.valueOf("1"));
        contact.setUser(user.get());
        for(ContactEmails c : contact.getEmails()){
            c.setContact(contact);
        }
        contactRepository.save(contact);
        return contact;
    }

    @GetMapping("mailtest")
    public List<Mail> test6() {
        String oldDateString = "1900-05-15T10:30:00";
        LocalDateTime oldDate = LocalDateTime.parse(oldDateString);
        return testService.getMailBystatusAndDateAndSubject("inbox", oldDate, "ac");
    }

    @PostMapping("addMailToFolder")
    public AddMailToFolderDTO addMailToFolder(@RequestBody AddMailToFolderDTO dto) {
        foldersRepository.addMailToFolder(dto.getFolderId(), dto.getMailId());
        return dto;
    }

    @PostMapping("att")
    public MailAttachment addAttachment(@RequestBody MailAttachment attachment){
        attachment.setMail(mailRepository.findById(Long.valueOf("11")).get());
        mailAttachmentRepository.save(attachment);
        return attachment;
    }

    @GetMapping("user")
    public User getUser(){
        return userRepository.findById(Long.valueOf("1")).get();
    }

}

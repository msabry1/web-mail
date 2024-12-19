package com.foe.webmail.service.userService;


import com.foe.webmail.dto.FolderDTO;
import com.foe.webmail.dto.MailPreviewDTO;
import com.foe.webmail.entity.Folder;
import com.foe.webmail.entity.User;
import com.foe.webmail.entity.Mail;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.mappers.MailPreviewMapper;
import com.foe.webmail.repository.FoldersRepository;
import com.foe.webmail.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
public class FolderService {

    FoldersRepository foldersRepository;
    UserRepository userRepository;
    MailPreviewMapper mailPreviewMapper;

    public FolderService(FoldersRepository foldersRepository, UserRepository userRepository,
                         MailPreviewMapper mailPreviewMapper) {
        this.foldersRepository = foldersRepository;
        this.userRepository = userRepository;
        this.mailPreviewMapper = mailPreviewMapper;
    }

    public Folder createFolder(FolderDTO folderDto, UserPrinciple userPrinciple) {
        Folder folder = new Folder();
        folder.setName(folderDto.getFolderName());
        Optional<User> user = userRepository.findByUsername(userPrinciple.getUsername());
        folder.setUser(user.get());
        return foldersRepository.save(folder);
    }

    public List<MailPreviewDTO> getFolderMails(Long id) {
        Optional<Folder> folder = foldersRepository.findById(id) ;
        List<Mail> mails = new ArrayList<>();
        if(folder.isPresent()) {
            mails = folder.get().getMails();
        }
        return mailPreviewMapper.toMailPreviewDTOs(mails);
    }

    public void deleteFolder(Long id) {
        foldersRepository.deleteById(id);
    }
}

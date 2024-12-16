package com.foe.webmail.repository;

import com.foe.webmail.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface FoldersRepository extends JpaRepository<Folder, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO folder_mail (folder_id, mail_id) VALUES (:folderId, :mailId)", nativeQuery = true)
    void addMailToFolder(@Param("folderId") Long folderId, @Param("mailId") Long mailId);


}

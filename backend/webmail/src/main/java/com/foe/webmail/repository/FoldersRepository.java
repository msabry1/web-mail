package com.foe.webmail.repository;

import com.foe.webmail.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoldersRepository extends JpaRepository<Folder, Long> {
}

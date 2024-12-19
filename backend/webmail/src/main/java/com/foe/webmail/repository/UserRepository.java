package com.foe.webmail.repository;

import com.foe.webmail.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByUsernameIn(List<String> usernames);
}

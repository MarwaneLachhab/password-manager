package com.passwordmanager.repository;

import com.passwordmanager.model.PasswordEntry;
import com.passwordmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PasswordEntryRepository extends JpaRepository<PasswordEntry, Long> {
    List<PasswordEntry> findByUser(User user);
}

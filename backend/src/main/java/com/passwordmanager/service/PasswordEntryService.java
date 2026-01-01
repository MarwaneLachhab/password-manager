package com.passwordmanager.service;

import com.passwordmanager.model.PasswordEntry;
import com.passwordmanager.model.User;
import com.passwordmanager.repository.PasswordEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PasswordEntryService {
    @Autowired
    private PasswordEntryRepository passwordEntryRepository;

    public List<PasswordEntry> getPasswordsForUser(User user) {
        return passwordEntryRepository.findByUser(user);
    }

    public PasswordEntry save(PasswordEntry entry) {
        return passwordEntryRepository.save(entry);
    }

    public Optional<PasswordEntry> getById(Long id) {
        return passwordEntryRepository.findById(id);
    }

    public void delete(Long id) {
        passwordEntryRepository.deleteById(id);
    }
}

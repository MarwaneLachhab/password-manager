package com.passwordmanager.controller;

import com.passwordmanager.model.PasswordEntry;
import com.passwordmanager.model.User;
import com.passwordmanager.repository.UserRepository;
import com.passwordmanager.service.PasswordEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/passwords")
public class PasswordEntryController {
    @Autowired
    private PasswordEntryService passwordEntryService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<PasswordEntry>> getPasswords(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(passwordEntryService.getPasswordsForUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addPassword(@PathVariable Long userId, @RequestBody Map<String, String> payload) {
        return userRepository.findById(userId).map(user -> {
            PasswordEntry entry = new PasswordEntry();
            entry.setUser(user);
            entry.setTitle(payload.get("title"));
            entry.setPassword(payload.get("password"));
            entry.setUrl(payload.get("url"));
            passwordEntryService.save(entry);
            return ResponseEntity.ok(Map.of("success", true));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{userId}/{entryId}")
    public ResponseEntity<?> deletePassword(@PathVariable Long userId, @PathVariable Long entryId) {
        return userRepository.findById(userId).map(user -> {
            passwordEntryService.delete(entryId);
            return ResponseEntity.ok(Map.of("success", true));
        }).orElse(ResponseEntity.notFound().build());
    }
}

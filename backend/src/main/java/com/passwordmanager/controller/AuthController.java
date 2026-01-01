package com.passwordmanager.controller;

import com.passwordmanager.model.User;
import com.passwordmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        return userService.findByUsername(username)
                .filter(user -> userService.checkPassword(user, password))
                .map(user -> ResponseEntity.ok().body(Map.of("success", true, "userId", user.getId())))
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("success", false, "message", "Invalid credentials")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        if (userService.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Username already exists"));
        }
        User user = userService.register(username, password);
        return ResponseEntity.ok().body(Map.of("success", true, "userId", user.getId()));
    }
}

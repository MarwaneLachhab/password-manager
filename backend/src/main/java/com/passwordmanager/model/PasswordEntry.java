package com.passwordmanager.model;

import jakarta.persistence.*;

@Entity
public class PasswordEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String password;

    private String url;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}

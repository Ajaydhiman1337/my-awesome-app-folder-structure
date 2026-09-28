package com.example.app.service;

import java.util.Optional;

public interface UserService {
    void registerUser(String userId, String displayName);

    Optional<String> findDisplayName(String userId);
}
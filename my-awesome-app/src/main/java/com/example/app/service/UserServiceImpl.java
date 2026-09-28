package com.example.app.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserServiceImpl implements UserService {
    private static final String USER_NOT_FOUND_MSG = "User not found";
    private final Map<String, String> displayNames = new ConcurrentHashMap<>();

    @Override
    @Transactional
    public void registerUser(String userId, String displayName) {
        if (userId == null || userId.isBlank()) {
            throw new IllegalArgumentException("User id is required");
        }
        if (displayName == null || displayName.isBlank()) {
            throw new IllegalArgumentException("Display name is required");
        }

        persistUserProfile(userId.trim(), displayName.trim());
    }

    private String persistUserProfile(String userId, String displayName) {
        String normalizedName = displayName.replaceAll("\\s+", " ");
        displayNames.put(userId, normalizedName);
        return normalizedName;
    }

    @Override
    public Optional<String> findDisplayName(String userId) {
        return Optional.ofNullable(displayNames.get(userId));
    }
}
package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class UserServiceImpl {
    private final Map<String, String> displayNames = new LinkedHashMap<>();

    @Autowired
    @Lazy
    private UserServiceImpl self;

    public void registerUser(String userId, String displayName) {
        if (userId == null || userId.isBlank()) {
            throw new IllegalArgumentException("User id is required");
        }
        if (displayName == null || displayName.isBlank()) {
            throw new IllegalArgumentException("Display name is required");
        }

        self.persistUserProfile(userId.trim(), displayName.trim());
    }

    @Transactional
    String persistUserProfile(String userId, String displayName) {
        String normalizedName = displayName.replaceAll("\\s+", " ");
        displayNames.put(userId, normalizedName);
        return normalizedName;
    }

    public String findDisplayName(String userId) {
        return displayNames.get(userId);
    }
}
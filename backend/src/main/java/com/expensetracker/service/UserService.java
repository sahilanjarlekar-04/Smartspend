package com.expensetracker.service;

import com.expensetracker.dto.AuthRequest;
import com.expensetracker.dto.AuthResponse;
import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse registerUser(AuthRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return new AuthResponse(false, "Username is required", null, null, null, null);
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return new AuthResponse(false, "Email address is required", null, null, null, null);
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return new AuthResponse(false, "Password is required", null, null, null, null);
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "Username already exists. Please pick another.", null, null, null, null);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email address is already registered.", null, null, null, null);
        }

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim());
        user.setPassword(request.getPassword()); // Plaintext / Hash string for class demo
        user.setFullName(request.getFullName() != null ? request.getFullName().trim() : request.getUsername());

        User saved = userRepository.save(user);

        return new AuthResponse(true, "Registration successful! You can now log in.", saved.getId(), saved.getUsername(), saved.getEmail(), saved.getFullName());
    }

    public AuthResponse loginUser(AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return new AuthResponse(false, "Please provide username and password", null, null, null, null);
        }

        Optional<User> userOpt = userRepository.findByUsername(request.getUsername().trim());
        if (userOpt.isEmpty()) {
            // Also attempt finding by email
            userOpt = userRepository.findByEmail(request.getUsername().trim());
        }

        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "User account not found", null, null, null, null);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Invalid credentials / incorrect password", null, null, null, null);
        }

        return new AuthResponse(true, "Login successful!", user.getId(), user.getUsername(), user.getEmail(), user.getFullName());
    }
}

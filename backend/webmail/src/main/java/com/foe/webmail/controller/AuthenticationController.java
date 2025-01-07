package com.foe.webmail.controller;

import com.foe.webmail.dto.AuthenticationDto;
import com.foe.webmail.service.security.AuthenticationService.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationDto.AuthenticationResponse> register(
            @Valid @RequestBody AuthenticationDto.RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationDto.AuthenticationResponse> login(
            @Valid @RequestBody AuthenticationDto.LoginRequest request
    ) {
        return ResponseEntity.ok(authenticationService.login(request));
    }
}

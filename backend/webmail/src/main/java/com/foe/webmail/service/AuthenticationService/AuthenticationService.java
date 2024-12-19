package com.foe.webmail.service.AuthenticationService;

import com.foe.webmail.dto.AuthenticationDto;
import com.foe.webmail.entity.User;
import com.foe.webmail.repository.UserRepository;
import com.foe.webmail.entity.UserPrinciple;
import com.foe.webmail.service.JwtService.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationDto.AuthenticationResponse register(AuthenticationDto.RegisterRequest request) {
        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        // Save user
        User savedUser = userRepository.save(user);

        // Create UserPrinciple and generate token
        UserPrinciple userPrinciple = new UserPrinciple(savedUser);
        String jwt = jwtService.generateToken(userPrinciple);

        // Return authentication response
        return new AuthenticationDto.AuthenticationResponse(
                jwt,
                savedUser.getUsername(),
                savedUser.getFirstName(),
                savedUser.getLastName()
        );
    }

    public AuthenticationDto.AuthenticationResponse login(AuthenticationDto.LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // Set authentication in context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get user principle
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();

        // Generate JWT
        String jwt = jwtService.generateToken(userPrinciple);

        // Return authentication response
        return new AuthenticationDto.AuthenticationResponse(
                jwt,
                userPrinciple.getUsername(),
                userPrinciple.getUser().getFirstName(),
                userPrinciple.getUser().getLastName()
        );
    }
}

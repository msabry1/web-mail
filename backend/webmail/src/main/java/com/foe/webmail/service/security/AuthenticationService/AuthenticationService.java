package com.foe.webmail.service.security.AuthenticationService;

import com.foe.webmail.dto.AuthenticationDto;
import com.foe.webmail.entity.User;
import com.foe.webmail.mappers.UserMapper;
import com.foe.webmail.repository.UserRepository;
import com.foe.webmail.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthenticationDto.AuthenticationResponse register(AuthenticationDto.RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = userMapper.toUser(request);
        userRepository.save(user);

        String jwt = jwtUtil.generateToken(user.getUsername());

        return userMapper.toAuthenticationResponse(jwt, user);
    }

    public AuthenticationDto.AuthenticationResponse login(AuthenticationDto.LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String jwt = jwtUtil.generateToken(request.getUsername());

        return new AuthenticationDto.AuthenticationResponse(
                jwt,
                user.getUsername(),
                user.getFirstName(),
                user.getLastName()
        );
    }
}

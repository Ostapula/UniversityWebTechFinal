package com.computer.shop.services;

import com.computer.shop.models.dto.ErrorMessageDTO;
import com.computer.shop.models.dto.ForgotPasswordResponseDTO;
import com.computer.shop.models.dto.LoginResponseDTO;
import com.computer.shop.models.user.Role;
import com.computer.shop.models.user.User;
import com.computer.shop.repository.RoleRepository;
import com.computer.shop.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    private final JwtDecoder jwtDecoder;

    private final EmailService emailService;

    private final CodeService codeService;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenService tokenService, JwtDecoder jwtDecoder, EmailService emailService, CodeService codeService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.jwtDecoder = jwtDecoder;
        this.emailService = emailService;
        this.codeService = codeService;
    }

    public ResponseEntity<?> registerUser(String username, String name, String email, String password, String address, String postalcode, String city, String phone) {
        try {
            ErrorMessageDTO errorMessageDTO = new ErrorMessageDTO();
            if (userRepository.findByUsername(username).isPresent()) {
                errorMessageDTO.setMessage("The username " + username + " is taken! Please, try another one.");
                return new ResponseEntity<>(errorMessageDTO, HttpStatus.UNAUTHORIZED);
            }
            if (userRepository.existsByEmail(email)) {
                errorMessageDTO.setMessage("The email " + email + " is already used! Please, try another one.");
                return new ResponseEntity<>(errorMessageDTO, HttpStatus.UNAUTHORIZED);
            }
            String encodedPasword = passwordEncoder.encode(password);
            Role userRole = roleRepository.findByAuthority("USER").get();

            Set<Role> authorities = new HashSet<>();

            authorities.add(userRole);

            User user = userRepository.save(new User(username, name, email, encodedPasword, address, postalcode, city, phone, authorities));
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex, HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<?> loginUser(String username, String password) {
        try {
            userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User is not found!"));
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = tokenService.generateJwt(auth);
            User user = userRepository.findByUsername(username).get();
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getPassword(), user.getAddress(), user.getPostalcode(), user.getCity(), user.getPhone(), token);
            return new ResponseEntity<>(loginResponseDTO, HttpStatus.OK);

        } catch (AuthenticationException e) {
            ErrorMessageDTO errorMessageDTO = new ErrorMessageDTO();
            errorMessageDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(errorMessageDTO, HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<?> validateAndCheckAdminJwtToken(String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Jwt jwt = jwtDecoder.decode(token);

            List<String> roles = jwt.getClaimAsStringList("roles");
            boolean isAdmin = roles != null && roles.contains("ADMIN");
            return ResponseEntity.ok(Map.of("isValid", true, "isAdmin", isAdmin));
        } catch (JwtValidationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("isValid", false, "error", e.getMessage()));

        }
    }
    public ResponseEntity<Map<String, Object>> validateJwtToken(String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            jwtDecoder.decode(token);
            return ResponseEntity.ok(Map.of("isValid", true));
        } catch (JwtValidationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("isValid", false, "error", e.getMessage()));
        }
    }
    public ResponseEntity<?> forgotPassword(String username) {
        try {
            User user = userRepository.findByUsername(username).get();
            System.out.println(user);
            emailService.sendHtmlMessage(user.getEmail(), "Password Reset Request", codeService.generateCode());
            ForgotPasswordResponseDTO forgotPasswordResponseDTO = new ForgotPasswordResponseDTO("Email was sent", user.getId());
            return new ResponseEntity<>(forgotPasswordResponseDTO, HttpStatusCode.valueOf(200));
        } catch (Exception ex) {
            ErrorMessageDTO errorMessageDTO = new ErrorMessageDTO();
            errorMessageDTO.setMessage(ex.getMessage());
            return new ResponseEntity<>(errorMessageDTO, HttpStatus.UNAUTHORIZED);
        }
    }
    public ResponseEntity<?> checkCode(String code) {
        try {
            if (codeService.isCodeValid(code)) {
                ForgotPasswordResponseDTO forgotPasswordResponseDTO = new ForgotPasswordResponseDTO("Email was sent");
                System.out.println("The code is valid!");
                return new ResponseEntity<>(forgotPasswordResponseDTO, HttpStatusCode.valueOf(200));
            } else {
                ForgotPasswordResponseDTO forgotPasswordResponseDTO = new ForgotPasswordResponseDTO("The code is expired");
                return new ResponseEntity<>(forgotPasswordResponseDTO, HttpStatusCode.valueOf(401));
            }
        } catch (Exception e) {
            ErrorMessageDTO errorMessageDTO = new ErrorMessageDTO();
            errorMessageDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(errorMessageDTO, HttpStatus.UNAUTHORIZED);
        }
    }
}

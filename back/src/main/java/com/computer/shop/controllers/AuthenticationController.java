package com.computer.shop.controllers;

import com.computer.shop.models.dto.RegistrationDTO;
import com.computer.shop.services.AuthenticationService;
import com.computer.shop.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    private final UserService userService;

    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registration(@RequestBody RegistrationDTO body) {
        return authenticationService.registerUser(body.getUsername(), body.getName(), body.getEmail(), body.getPassword(), body.getAddress(), body.getPostalcode(), body.getCity(), body.getPhone());
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestBody RegistrationDTO body) {
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }

    @GetMapping(value = "/validate-token")
    public ResponseEntity<?> validateJwtToken(@RequestHeader("Authorization") String tokenHeader) {
        return authenticationService.validateAndCheckAdminJwtToken(tokenHeader);
    }

    @PostMapping(value = "/forgot-password/{username}")
    public ResponseEntity<?> forgotPasswordUser(@PathVariable String username) {
        System.out.println(username);
        return authenticationService.forgotPassword(username);
    }

    @PostMapping(value = "/forgot-password-code/{code}")
    public ResponseEntity<?> forgotPasswordCodeUser(@PathVariable String code) {
        return authenticationService.checkCode(code);
    }

    @PutMapping("/change-pass/{id}")
    public ResponseEntity<?> changeUserPassword(@RequestBody RegistrationDTO body, @PathVariable Long id) {
        return userService.changePassword(id, body.getPassword());
    }
}

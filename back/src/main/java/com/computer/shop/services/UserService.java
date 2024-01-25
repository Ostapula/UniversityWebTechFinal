package com.computer.shop.services;

import com.computer.shop.models.dto.ErrorMessageDTO;
import com.computer.shop.models.user.User;
import com.computer.shop.repository.OrderRepository;
import com.computer.shop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, OrderRepository orderRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User is not found!"));
    }

    @Transactional
    public ResponseEntity<?> getUserOrders(Long id) {
        try {
            return new ResponseEntity<>(orderRepository.findAllByUserId(id), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<?> changeUserDetails(Long id, String username, String name, String email, String address, String postalCode, String city, String phone) {
        User user = userRepository.findById(id).map(
                user1 -> {
                    if (!user1.getUsername().equals(username)) {
                        if (userRepository.findByUsername(username).isEmpty())
                            user1.setUsername(username);
                        else {
                            throw new RuntimeException("The username " + username + " is taken! Please, try another one.");
                        }
                    }
                    if (!user1.getEmail().equals(email)) {
                        if (!userRepository.existsByEmail(email))
                            user1.setEmail(email);
                        else {
                            throw new RuntimeException("The email " + email + " is already used! Please, try another one.");
                        }
                    }
                    user1.setName(name);
                    user1.setAddress(address);
                    user1.setPostalcode(postalCode);
                    user1.setCity(city);
                    user1.setPhone(phone);
                    return userRepository.save(user1);
                }
        ).orElseThrow(() -> new RuntimeException("User not found!"));

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ResponseEntity<?> changePassword(Long id, String password) {
        User user = userRepository.findById(id).map(
                user1 -> {
                    user1.setPassword(passwordEncoder.encode(password));
                    return userRepository.save(user1);
                }
        ).orElseThrow(() -> new RuntimeException("User not found!"));
        return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
    }
}

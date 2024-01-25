package com.computer.shop.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String password;
    private String address;
    private String postalcode;
    private String city;
    private String phone;
    private String jwt;
}

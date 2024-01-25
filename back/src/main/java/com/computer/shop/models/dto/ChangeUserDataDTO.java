package com.computer.shop.models.dto;

import lombok.Data;

@Data
public class ChangeUserDataDTO {
    private String username;
    private String name;
    private String email;
    private String address;
    private String postalcode;
    private String city;
    private String phone;
}

package com.computer.shop.models.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ForgotPasswordResponseDTO {
    private String message;
    private Long id;

    public ForgotPasswordResponseDTO(String message) {
        this.message = message;
    }
}

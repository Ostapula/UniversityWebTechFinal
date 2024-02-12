package com.computer.shop.models.workshop;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class WorkshopDTO {
    private String date;
    private String time;
    private String service;
    private String description;
    private boolean done;
    private LocalDateTime localDateTime;
}

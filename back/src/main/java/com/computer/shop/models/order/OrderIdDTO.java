package com.computer.shop.models.order;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderIdDTO {
    private Long computerCase;
    private Long motherboard;
    private Long gpu;
    private Long cpu;
    private Long ram;
    private Long hardMemory;
    private Long powerSupply;
    private Long cooler;
    private double sum;
}

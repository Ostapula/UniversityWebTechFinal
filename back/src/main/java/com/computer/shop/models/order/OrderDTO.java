package com.computer.shop.models.order;

import com.computer.shop.models.shopitems.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDTO {
    private ComputerCase computerCase;
    private Motherboard motherboard;
    private GPU gpu;
    private CPU cpu;
    private RAM ram;
    private HardMemory hardMemory;
    private PowerSupply powerSupply;
    private Cooler cooler;
    private double sum;
}

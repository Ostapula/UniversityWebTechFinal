package com.computer.shop.models.order;

import com.computer.shop.models.shopitems.*;
import com.computer.shop.models.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "Order")
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    @SequenceGenerator(name = "order_sequence", sequenceName = "order_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    @Column(unique = true, updatable = false)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "computerCase_id")
    private ComputerCase computerCase;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "motherboard_id")
    private Motherboard motherboard;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gpu_id")
    private GPU gpu;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cpu_id")
    private CPU cpu;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ram_id")
    private RAM ram;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hardMemory_id")
    private HardMemory hardMemory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "powerSupply_id")
    private PowerSupply powerSupply;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cooler_id")
    private Cooler cooler;

    private double sum;
    private LocalDateTime date;

    public Order(User user, ComputerCase computerCase, Motherboard motherboard, GPU gpu, CPU cpu, RAM ram, HardMemory hardMemory, PowerSupply powerSupply, Cooler cooler, double sum, LocalDateTime date) {
        this.user = user;
        this.computerCase = computerCase;
        this.motherboard = motherboard;
        this.gpu = gpu;
        this.cpu = cpu;
        this.ram = ram;
        this.hardMemory = hardMemory;
        this.powerSupply = powerSupply;
        this.cooler = cooler;
        this.sum = sum;
        this.date = date;
    }

    public Order(Long id, User user, ComputerCase computerCase, Motherboard motherboard, GPU gpu, CPU cpu, RAM ram, HardMemory hardMemory, PowerSupply powerSupply, Cooler cooler, double sum, LocalDateTime date) {
        this.id = id;
        this.user = user;
        this.computerCase = computerCase;
        this.motherboard = motherboard;
        this.gpu = gpu;
        this.cpu = cpu;
        this.ram = ram;
        this.hardMemory = hardMemory;
        this.powerSupply = powerSupply;
        this.cooler = cooler;
        this.sum = sum;
        this.date = date;
    }
}

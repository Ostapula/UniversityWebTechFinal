package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "CPU")
@Table(name = "cpu")
@Data
@NoArgsConstructor
public class CPU {
    @Id
    @SequenceGenerator(name = "cpu_sequence", sequenceName = "cpu_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cpu_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public CPU(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public CPU(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

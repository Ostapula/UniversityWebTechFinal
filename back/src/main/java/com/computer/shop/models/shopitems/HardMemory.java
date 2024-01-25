package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "HardMemory")
@Table(name = "hardmemory")
@Data
@NoArgsConstructor
public class HardMemory {
    @Id
    @SequenceGenerator(name = "hardmemory_sequence", sequenceName = "hardmemory_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hardmemory_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public HardMemory(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public HardMemory(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

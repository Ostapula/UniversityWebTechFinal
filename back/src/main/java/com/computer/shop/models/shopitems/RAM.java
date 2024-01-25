package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "RAM")
@Table(name = "ram")
@Data
@NoArgsConstructor
public class RAM {
    @Id
    @SequenceGenerator(name = "ram_sequence", sequenceName = "ram_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ram_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public RAM(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public RAM(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

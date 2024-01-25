package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "Motherboard")
@Table(name = "motherboard")
@Data
@NoArgsConstructor
public class Motherboard {
    @Id
    @SequenceGenerator(name = "motherboard_sequence", sequenceName = "motherboard_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "motherboard_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public Motherboard(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public Motherboard(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

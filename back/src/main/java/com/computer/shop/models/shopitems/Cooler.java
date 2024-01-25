package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "Cooler")
@Table(name = "cooler")
@Data
@NoArgsConstructor
public class Cooler {
    @Id
    @SequenceGenerator(name = "cooler_sequence", sequenceName = "cooler_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cooler_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public Cooler(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public Cooler(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

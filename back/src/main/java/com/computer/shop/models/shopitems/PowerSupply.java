package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "PowerSupply")
@Table(name = "powersupply")
@Data
@NoArgsConstructor
public class PowerSupply {
    @Id
    @SequenceGenerator(name = "powersupply_sequence", sequenceName = "powersupply_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "powersupply_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public PowerSupply(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public PowerSupply(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

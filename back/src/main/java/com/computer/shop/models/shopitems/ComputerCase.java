package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "ComputerCase")
@Table(name = "computercase")
@Data
@NoArgsConstructor
public class ComputerCase {
    @Id
    @SequenceGenerator(name = "computercase_sequence", sequenceName = "computercase_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "computercase_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public ComputerCase(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public ComputerCase(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

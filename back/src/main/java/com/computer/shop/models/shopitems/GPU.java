package com.computer.shop.models.shopitems;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "GPU")
@Table(name = "gpu")
@Data
@NoArgsConstructor
public class GPU {
    @Id
    @SequenceGenerator(name = "gpu_sequence", sequenceName = "gpu_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gpu_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;

    public GPU(String name, String description, Double price, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public GPU(Long id, String name, String description, Double price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

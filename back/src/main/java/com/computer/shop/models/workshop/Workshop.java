package com.computer.shop.models.workshop;

import com.computer.shop.models.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "workshops")
@Entity(name = "Workshop")
@NoArgsConstructor
@Data
public class Workshop {
    @Id
    @SequenceGenerator(name = "workshop_sequence", sequenceName = "workshop_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workshop_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    private String date;
    private String time;
    private String service;
    private String description;
    private boolean done;
    private LocalDateTime localDateTime;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Workshop(Long id, String date, String time, String service, String description, boolean done, LocalDateTime localDateTime, User user) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.service = service;
        this.description = description;
        this.done = done;
        this.localDateTime = localDateTime;
        this.user = user;
    }

    public Workshop(String date, String time, String service, String description, boolean done, LocalDateTime localDateTime, User user) {
        this.date = date;
        this.time = time;
        this.service = service;
        this.description = description;
        this.done = done;
        this.localDateTime = localDateTime;
        this.user = user;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }
}

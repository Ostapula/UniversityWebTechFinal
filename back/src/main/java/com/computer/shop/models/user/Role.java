package com.computer.shop.models.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity(name = "Role")
@Table(name = "roles")
@Data
@NoArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    @SequenceGenerator(name = "role_sequence", sequenceName = "role_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_sequence")
    @Column(name = "role_id", unique = true, updatable = false)
    private Long roleId;
    private String authority;

    public Role(String authority) {
        this.authority = authority;
    }

    public Role(Long roleId, String authority) {
        this.roleId = roleId;
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }
}

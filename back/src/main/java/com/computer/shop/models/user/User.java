package com.computer.shop.models.user;

import com.computer.shop.models.order.Order;
import com.computer.shop.models.workshop.Workshop;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Entity(name = "User")
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @Column(unique = true, updatable = false)
    private Long id;
    @Column(unique = true)
    private String username;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String address;
    private String postalcode;
    private String city;
    private String phone;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role_junction",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> authorities;

    @JsonBackReference
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<Order> orders;

    @JsonBackReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Workshop> workshops;

    public User(String username, String name, String email, String password, String address, String postalcode, String city, String phone, Set<Role> authorities) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.postalcode = postalcode;
        this.city = city;
        this.phone = phone;
        this.authorities = authorities;
    }

    public User(Long id, String username, String name, String email, String password, String address, String postalcode, String city, String phone, Set<Role> authorities) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.postalcode = postalcode;
        this.city = city;
        this.phone = phone;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }
}

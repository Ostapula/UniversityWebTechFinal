package com.computer.shop.repository;

import com.computer.shop.models.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUserId (Long user_id);
}

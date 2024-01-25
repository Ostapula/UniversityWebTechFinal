package com.computer.shop.controllers;

import com.computer.shop.models.order.Order;
import com.computer.shop.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class AdminController {

    private final OrderRepository orderRepository;

    public AdminController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/get-all-orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}

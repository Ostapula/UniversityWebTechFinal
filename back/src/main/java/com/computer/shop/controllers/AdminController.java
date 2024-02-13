package com.computer.shop.controllers;

import com.computer.shop.models.order.Order;
import com.computer.shop.models.workshop.Workshop;
import com.computer.shop.repository.OrderRepository;
import com.computer.shop.repository.WorkshopRepository;
import com.computer.shop.services.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class AdminController {

    private final OrderRepository orderRepository;

    private final WorkshopRepository workshopRepository;

    private final AdminService adminService;

    public AdminController(OrderRepository orderRepository, WorkshopRepository workshopRepository, AdminService adminService) {
        this.orderRepository = orderRepository;
        this.workshopRepository = workshopRepository;
        this.adminService = adminService;
    }

    @GetMapping("/get-all-orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/get-all-workshops")
    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }

    @PutMapping("/done-workshop/{id}")
    public ResponseEntity<?> doneWorkshop(@PathVariable Long id) {
        return adminService.completeWorkshop(id);
    }
}

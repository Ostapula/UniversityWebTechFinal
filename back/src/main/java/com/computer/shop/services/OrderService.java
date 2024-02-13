package com.computer.shop.services;

import com.computer.shop.models.order.Order;
import com.computer.shop.models.shopitems.*;
import com.computer.shop.repository.OrderRepository;
import com.computer.shop.repository.UserRepository;
import com.computer.shop.repository.shopitemsrepository.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final ComputerCaseRepository computerCaseRepository;

    private final MotherboardRepository motherboardRepository;

    private final GPURepository gpuRepository;

    private final CPURepository cpuRepository;

    private final RAMRepository ramRepository;

    private final HardMemoryRepository hardMemoryRepository;

    private final PowerSupplyRepository powerSupplyRepository;

    private final CoolerRepository coolerRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ComputerCaseRepository computerCaseRepository, MotherboardRepository motherboardRepository, GPURepository gpuRepository, CPURepository cpuRepository, RAMRepository ramRepository, HardMemoryRepository hardMemoryRepository, PowerSupplyRepository powerSupplyRepository, CoolerRepository coolerRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.computerCaseRepository = computerCaseRepository;
        this.motherboardRepository = motherboardRepository;
        this.gpuRepository = gpuRepository;
        this.cpuRepository = cpuRepository;
        this.ramRepository = ramRepository;
        this.hardMemoryRepository = hardMemoryRepository;
        this.powerSupplyRepository = powerSupplyRepository;
        this.coolerRepository = coolerRepository;
    }

    @Transactional
    public ResponseEntity<?> newOrder(Long id, Long computerCase, Long motherboard, Long gpu, Long cpu, Long ram, Long hardMemory, Long powerSupply, Long cooler, double sum) {
        try {
            ComputerCase computerCase1 = computerCaseRepository.findById(computerCase).get();
            Motherboard motherboard1 = motherboardRepository.findById(motherboard).get();
            GPU gpu1 = gpuRepository.findById(gpu).get();
            CPU cpu1 = cpuRepository.findById(cpu).get();
            RAM ram1 = ramRepository.findById(ram).get();
            HardMemory hardMemory1 = hardMemoryRepository.findById(hardMemory).get();
            PowerSupply powerSupply1 = powerSupplyRepository.findById(powerSupply).get();
            Cooler cooler1 = coolerRepository.findById(cooler).get();
            Order order = new Order(userRepository.findById(id).get(), computerCase1, motherboard1, gpu1, cpu1, ram1, hardMemory1, powerSupply1, cooler1, sum, LocalDateTime.now());

            return new ResponseEntity<>(orderRepository.save(order), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }
}

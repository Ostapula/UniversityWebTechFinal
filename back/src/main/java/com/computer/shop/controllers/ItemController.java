package com.computer.shop.controllers;

import com.computer.shop.models.shopitems.*;
import com.computer.shop.repository.shopitemsrepository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class ItemController {

    private final ComputerCaseRepository computerCaseRepository;

    private final MotherboardRepository motherboardRepository;

    private final GPURepository gpuRepository;

    private final CPURepository cpuRepository;

    private final RAMRepository ramRepository;

    private final HardMemoryRepository hardMemoryRepository;

    private final PowerSupplyRepository powerSupplyRepository;

    private final CoolerRepository coolerRepository;

    public ItemController(ComputerCaseRepository computerCaseRepository, MotherboardRepository motherboardRepository, GPURepository gpuRepository, CPURepository cpuRepository, RAMRepository ramRepository, HardMemoryRepository hardMemoryRepository, PowerSupplyRepository powerSupplyRepository, CoolerRepository coolerRepository) {
        this.computerCaseRepository = computerCaseRepository;
        this.motherboardRepository = motherboardRepository;
        this.gpuRepository = gpuRepository;
        this.cpuRepository = cpuRepository;
        this.ramRepository = ramRepository;
        this.hardMemoryRepository = hardMemoryRepository;
        this.powerSupplyRepository = powerSupplyRepository;
        this.coolerRepository = coolerRepository;
    }

    @GetMapping("/get-computer-cases")
    public ResponseEntity<List<ComputerCase>> getComputerCases(){
        return new ResponseEntity<>(computerCaseRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-motherboard")
    public ResponseEntity<List<Motherboard>> getMotherboard(){
        return new ResponseEntity<>(motherboardRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-gpu")
    public ResponseEntity<List<GPU>> getGPU(){
        return new ResponseEntity<>(gpuRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-cpu")
    public ResponseEntity<List<CPU>> getCPU(){
        return new ResponseEntity<>(cpuRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-ram")
    public ResponseEntity<List<RAM>> getRAM(){
        return new ResponseEntity<>(ramRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-memory")
    public ResponseEntity<List<HardMemory>> getHardMemory(){
        return new ResponseEntity<>(hardMemoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-power-supply")
    public ResponseEntity<List<PowerSupply>> getPowerSupply(){
        return new ResponseEntity<>(powerSupplyRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get-cooler")
    public ResponseEntity<List<Cooler>> getCooler(){
        return new ResponseEntity<>(coolerRepository.findAll(), HttpStatus.OK);
    }
}

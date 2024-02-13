package com.computer.shop.services;

import com.computer.shop.models.workshop.Workshop;
import com.computer.shop.repository.UserRepository;
import com.computer.shop.repository.WorkshopRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WorkshopService {
    private final WorkshopRepository workshopRepository;

    private final UserRepository userRepository;

    public WorkshopService(WorkshopRepository workshopRepository, UserRepository userRepository) {
        this.workshopRepository = workshopRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResponseEntity<?> newWorkshop(String date, String time, String service, String description, Long id) {
        try {
            var workshop = new Workshop(date, time, service, description, false, LocalDateTime.now(),userRepository.findById(id).get());
            return new ResponseEntity<>(workshopRepository.save(workshop), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }
}

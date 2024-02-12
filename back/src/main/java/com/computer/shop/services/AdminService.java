package com.computer.shop.services;

import com.computer.shop.models.workshop.Workshop;
import com.computer.shop.repository.WorkshopRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {

    private final WorkshopRepository workshopRepository;

    public AdminService(WorkshopRepository workshopRepository) {
        this.workshopRepository = workshopRepository;
    }

    public ResponseEntity<?> completeWorkshop(Long id) {
        try {
            Workshop workshop = workshopRepository.findById(id).get();
            workshop.setDone(true);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

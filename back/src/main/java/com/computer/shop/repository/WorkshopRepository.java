package com.computer.shop.repository;

import com.computer.shop.models.workshop.Workshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
    List<Workshop> findAllByUserId (Long user_id);

    @Override
    Optional<Workshop> findById (Long id);
}

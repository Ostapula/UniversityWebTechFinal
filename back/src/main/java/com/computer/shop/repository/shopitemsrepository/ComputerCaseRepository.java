package com.computer.shop.repository.shopitemsrepository;

import com.computer.shop.models.shopitems.ComputerCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComputerCaseRepository extends JpaRepository<ComputerCase, Long> {
}

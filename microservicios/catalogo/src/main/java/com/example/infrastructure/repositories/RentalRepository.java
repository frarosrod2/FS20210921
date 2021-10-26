package com.example.infrastructure.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domains.entities.Inventory;
import com.example.domains.entities.Rental;

public interface RentalRepository  extends JpaRepository<Rental, Integer> {


}

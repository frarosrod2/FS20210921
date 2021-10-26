package com.example.infrastructure.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domains.entities.Inventory;

public interface InventoryRepository  extends JpaRepository<Inventory, Integer> {


}

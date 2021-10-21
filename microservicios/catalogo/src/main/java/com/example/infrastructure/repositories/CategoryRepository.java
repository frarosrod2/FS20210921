package com.example.infrastructure.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domains.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	<T> List<T> findByCategoryIdNotNull();
	
	List<Category> findByNameStartingWithOrderByNameDesc(String prefijo);
	
	
}

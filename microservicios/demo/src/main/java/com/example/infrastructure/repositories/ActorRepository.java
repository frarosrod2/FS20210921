package com.example.infrastructure.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.domains.entities.Actor;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
	
	List<Actor> findByFirstNameStartingWithOrderByLastNameDesc(String prefijo);
	
	List<Actor> findByLastUpdateGreatherThan(LocalDate fecha);
	
	@Query("FROM Actor a WHERE a.last_update > ?1")
	List<Actor> laMia(LocalDate fecha);
}

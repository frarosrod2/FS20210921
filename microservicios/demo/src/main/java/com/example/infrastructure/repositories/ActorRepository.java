package com.example.infrastructure.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.domains.entities.Actor;
import com.example.domains.entities.dtos.ActorDTO;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
	
	<T> List<T> findByActorIdNotNull();
	
	List<Actor> findByFirstNameStartingWithOrderByLastNameDesc(String prefijo);
	
}

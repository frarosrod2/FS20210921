package com.example.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domains.entities.Actor;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
	

}

package com.example.infrastructure.repositories;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.domains.entities.Actor;
import com.example.domains.entities.dtos.ActorDTO;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
	
	List<Actor> findByFirstNameStartingWithOrderByLastNameDesc(String prefijo);
	List<Actor> findByLastUpdateGreaterThan(LocalDate fecha);
	
//	List<ActorDTO> findByActorIdNotNull();
//	List<ActorShort> findByActorIdNotNull();
	<T> List<T> findByActorIdIsNotNull(Class<T> type);
	<T> Iterable<T> findByActorIdIsNotNull(Sort sort, Class<T> type);
	<T> Page<T> findByActorIdIsNotNull(Pageable pageable, Class<T> type);
	
	@Query("FROM Actor a WHERE a.lastUpdate > ?1")
	List<Actor> laMia(Date fecha);
}

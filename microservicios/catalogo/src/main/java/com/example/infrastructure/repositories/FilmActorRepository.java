package com.example.infrastructure.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;

public interface FilmActorRepository  extends JpaRepository<FilmActor, Integer> {


}

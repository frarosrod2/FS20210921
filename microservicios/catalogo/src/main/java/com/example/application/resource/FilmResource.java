package com.example.application.resource;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.domains.contracts.services.FilmService;
import com.example.domains.entities.Film;
import com.example.domains.entities.dtos.ActorDTO;
import com.example.domains.entities.dtos.FilmDTO;
import com.example.domains.entities.dtos.FilmDTOCreate;
import com.example.exceptions.BadRequestException;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;

import lombok.Value;

@RestController
@RequestMapping(path = "/peliculas")
public class FilmResource {
	@Value
	public static class PageCount {
		private int pages;
		private int rows;
	}

	@Autowired
	FilmService srv;

	@GetMapping
	public List<FilmDTO> getAll(@RequestParam(required = false) String sort) {
		if (sort == null)
			return srv.getByProjection(FilmDTO.class);
		else
			return (List<FilmDTO>) srv.getByProjection(Sort.by(sort), FilmDTO.class);
	}

	@GetMapping(params = "page")
	public Page<FilmDTO> getAllPageable(Pageable item) {
		return srv.getByProjection(item, FilmDTO.class);
	}

		@GetMapping(path = "/{id}")
		public FilmDTO getOne(@PathVariable int id) throws NotFoundException {
			var film = srv.getOne(id);
			if(film.isEmpty())
				throw new NotFoundException();
			else
				return FilmDTO.from(film.get());
		}
		
		@PostMapping
		public ResponseEntity<Object> create(@Valid @RequestBody FilmDTOCreate item) throws BadRequestException, DuplicateKeyException, InvalidDataException {
			if(item == null)
				throw new BadRequestException("Faltan los datos");
			Film newFilm = FilmDTOCreate.from(item);
			var newItem = srv.add(newFilm);
			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newItem.getFilmId()).toUri();
			return ResponseEntity.created(location).build();

		}

		

}
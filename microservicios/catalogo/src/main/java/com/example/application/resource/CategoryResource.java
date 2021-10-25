package com.example.application.resource;

import java.net.URI;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
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

import com.example.domains.contracts.services.CategoryService;
import com.example.domains.entities.Category;
import com.example.domains.entities.dtos.ActorDTO;
import com.example.domains.entities.dtos.CategoryDTO;
import com.example.domains.entities.dtos.FilmShort;
import com.example.domains.services.CategoryServiceImpl;
import com.example.exceptions.BadRequestException;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;
import com.example.infrastructure.repositories.CategoryRepository;

import lombok.Value;

@RestController
@RequestMapping(path = "/categorias")
public class CategoryResource {
	@Value
	public static class PageCount {
		private int pages;
		private int rows;
	}

	@Autowired
	CategoryServiceImpl srv;

	@GetMapping
	public List<CategoryDTO> getAll() {
		return srv.getAll().stream().sorted(Comparator.comparing(Category::getName)).map(x -> CategoryDTO.from(x)).collect(Collectors.toList());
	}

	@GetMapping(path = "/{id}")
	public CategoryDTO getOne(@PathVariable int id) throws NotFoundException {
		var cat = srv.getOne(id);
		if (cat.isEmpty())
			throw new NotFoundException();
		else
			return CategoryDTO.from(cat.get());
	}
	
	@GetMapping(path = "/{id}/peliculas")
	@Transactional
	public List<FilmShort> getPelis(@PathVariable int id) throws NotFoundException {
		var cat = srv.getOne(id);
		if(cat.isEmpty())
			throw new NotFoundException();
		else {
			return (List<FilmShort>) cat.get().getFilmCategories().stream().map(item -> FilmShort.from(item.getFilm())).collect(Collectors.toList());
		}
	}
	

	@PostMapping
	public ResponseEntity<Object> create(@Valid @RequestBody CategoryDTO item) throws BadRequestException, DuplicateKeyException, InvalidDataException {
		if(item == null)
			throw new BadRequestException("Faltan los datos");
		var newItem = srv.add(CategoryDTO.from(item));
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
			.buildAndExpand(newItem.getCategoryId()).toUri();
		return ResponseEntity.created(location).build();

	}
	
	@PutMapping("/{id}")
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public CategoryDTO update(@PathVariable int id, @Valid @RequestBody CategoryDTO item) throws BadRequestException, NotFoundException, InvalidDataException {
		if(item == null)
			throw new BadRequestException("Faltan los datos");
		if(id != item.getCategoryId())
			throw new BadRequestException("No coinciden los identificadores");
		return CategoryDTO.from(srv.modify(CategoryDTO.from(item)));	
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable int id) {
		srv.deleteById(id);
	}

}

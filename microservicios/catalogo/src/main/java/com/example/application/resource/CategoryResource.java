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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.Value;

@RestController
@RequestMapping(path = "/categorias")
@Api(value = "Manteniento de categorias", description = "Permite mantener la lista de categorias utilizadas en el reparto de las peliculas")
public class CategoryResource {
	@Value
	public static class PageCount {
		private int pages;
		private int rows;
	}

	@Autowired
	CategoryServiceImpl srv;

	@GetMapping
	@ApiOperation(value = "Obtener todas las categor??as")
	public List<CategoryDTO> getAll() {
		return srv.getAll().stream().sorted(Comparator.comparing(Category::getName)).map(x -> CategoryDTO.from(x)).collect(Collectors.toList());
	}
	
	@ApiOperation(value = "Obtener una categor??a")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Categor??a encontrada"),
		@ApiResponse(code = 404, message = "Categor??a no encontrada")
	})
	@GetMapping(path = "/{id}")
	public CategoryDTO getOne(@PathVariable int id) throws NotFoundException {
		var cat = srv.getOne(id);
		if (cat.isEmpty())
			throw new NotFoundException();
		else
			return CategoryDTO.from(cat.get());
	}
	
	@ApiOperation(value = "Obtener todas las pel??culas de una categor??a")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Categor??a encontrada"),
		@ApiResponse(code = 404, message = "Categor??a no encontrada")
	})
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
	
	@ApiOperation(value = "A??adir una nueva categor??a")
	@ApiResponses({
		@ApiResponse(code = 201, message = "Categor??a a??adida"),
		@ApiResponse(code = 404, message = "Categor??a no encontrada")
	})
	@PostMapping
	public ResponseEntity<Object> create(@Valid @RequestBody CategoryDTO item) throws BadRequestException, DuplicateKeyException, InvalidDataException {
		if(item == null)
			throw new BadRequestException("Faltan los datos");
		var newItem = srv.add(CategoryDTO.from(item));
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
			.buildAndExpand(newItem.getCategoryId()).toUri();
		return ResponseEntity.created(location).build();

	}
	
	@ApiOperation(value = "Modificar una categor??a existente", notes = "Los identificadores deben coincidir")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Categor??a encontrada"),
		@ApiResponse(code = 404, message = "Categor??a no encontrada")
	})
	@PutMapping("/{id}")
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public CategoryDTO update(@PathVariable int id, @Valid @RequestBody CategoryDTO item) throws BadRequestException, NotFoundException, InvalidDataException {
		if(item == null)
			throw new BadRequestException("Faltan los datos");
		if(id != item.getCategoryId())
			throw new BadRequestException("No coinciden los identificadores");
		return CategoryDTO.from(srv.modify(CategoryDTO.from(item)));	
	}

	@ApiOperation(value = "Borrar una categor??a existente")
	@ApiResponses({
		@ApiResponse(code = 204, message = "Categor??a borrada"),
		@ApiResponse(code = 404, message = "Categor??a no encontrada")
	})
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable int id) {
		srv.deleteById(id);
	}

}

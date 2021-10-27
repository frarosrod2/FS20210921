package com.example.application.resource;

import java.net.URI;
import java.util.List;

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

import com.example.domains.contracts.services.FilmActorService;
import com.example.domains.contracts.services.FilmCategoryService;
import com.example.domains.contracts.services.FilmService;
import com.example.domains.contracts.services.InventoryService;
import com.example.domains.contracts.services.RentalService;
import com.example.domains.entities.Actor;
import com.example.domains.entities.Category;
import com.example.domains.entities.Film;
import com.example.domains.entities.dtos.ActorDTO;
import com.example.domains.entities.dtos.FilmDTO;
import com.example.domains.entities.dtos.FilmDTOCreate;
import com.example.exceptions.BadRequestException;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;
import com.example.infrastructure.repositories.FilmRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.Value;
import lombok.experimental.var;

@RestController
@RequestMapping(path = "/peliculas")
@Api(value = "Manteniento de peliculas", description = "Permite mantener la lista de peliculas")
public class FilmResource {
	@Value
	public static class PageCount {
		private int pages;
		private int rows;
	}

	@Autowired
	FilmService srv;
	
	@Autowired
	FilmRepository dao;

	@Autowired
	FilmActorService srvFilmActorService;

	@Autowired
	FilmCategoryService srvFilmCategoryService;
	
	@Autowired
	InventoryService srvInventoryService;
	
	@Autowired
	RentalService srvRentalService;	
	
	@ApiOperation(value = "Listado de las peliculas")
	@GetMapping
	public List<FilmDTO> getAll(@RequestParam(required = false) String sort) {
		if (sort == null)
			return srv.getByProjection(FilmDTO.class);
		else
			return (List<FilmDTO>) srv.getByProjection(Sort.by(sort), FilmDTO.class);
	}

	@ApiOperation(value = "Listado con la versión paginada de las peliculas")
	@GetMapping(params = "page")
	public Page<FilmDTO> getAllPageable(Pageable item) {
		return srv.getByProjection(item, FilmDTO.class);
	}

	@ApiOperation(value = "Obtener una película")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Película encontrada"),
		@ApiResponse(code = 404, message = "Película no encontrada")
	})
	@GetMapping(path = "/{id}")
	public FilmDTO getOne(@PathVariable int id) throws NotFoundException {
		var film = srv.getOne(id);
		if (film.isEmpty())
			throw new NotFoundException();
		else
			return FilmDTO.from(film.get());
	}

	@ApiOperation(value = "Añadir una nueva película")
	@ApiResponses({
		@ApiResponse(code = 201, message = "Película añadida"),
		@ApiResponse(code = 404, message = "Película no encontrada")
	})
	@PostMapping
	@Transactional
	public ResponseEntity<Object> create(@Valid @RequestBody FilmDTOCreate item)
			throws BadRequestException, DuplicateKeyException, InvalidDataException {
		Film newFilm = FilmDTOCreate.from(item);
		if (newFilm.isInvalid())
			throw new InvalidDataException(newFilm.getErroString());
		if (srv.getOne(item.getFilmId()).isPresent())
			throw new InvalidDataException("Duplicate key");
		var f = dao.save(newFilm);
		item.getActors().stream()
		.forEach(id -> newFilm.addFilmActor(new Actor(id)));
		item.getCategories().stream()
		.forEach(id -> newFilm.addFilmcategory(new Category(id)));
		dao.save(newFilm);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newFilm.getFilmId()).toUri();
		return ResponseEntity.created(location).build();
	}

	@ApiOperation(value = "Modificar una película existente", notes = "Los identificadores deben coincidir")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Película encontrada"),
		@ApiResponse(code = 404, message = "Película no encontrada")
	})
	@PutMapping("/{id}")
	public FilmDTO update(@PathVariable int id, @Valid @RequestBody FilmDTOCreate item)
			throws BadRequestException, NotFoundException, InvalidDataException {
		if (item == null)
			throw new BadRequestException("Faltan los datos");
		if (id != item.getFilmId())
			throw new BadRequestException("No coinciden los identificadores");
		return FilmDTO.from(srv.modify(FilmDTOCreate.from(item)));
	}

	@ApiOperation(value = "Borrar una película existente")
	@ApiResponses({
		@ApiResponse(code = 204, message = "Película borrada"),
		@ApiResponse(code = 404, message = "Película no encontrada")
	})
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable int id) throws NotFoundException, InvalidDataException {
		var film = srv.getOne(id);
		if (film.isEmpty())
			throw new NotFoundException();
		else
			film.get().getFilmActors().forEach(x -> {
				try {
					srvFilmActorService.delete(x);
				} catch (InvalidDataException e) {
					e.printStackTrace();
				}
			});
		film.get().getFilmCategories().forEach(x -> {
			try {
				srvFilmCategoryService.delete(x);
			} catch (InvalidDataException e) {
				e.printStackTrace();
			}
		});
		film.get().getInventories().forEach(x -> {
			try {
				x.getRentals().forEach(y -> {
					try {
						srvRentalService.delete(y);
					} catch (InvalidDataException e) {
						e.printStackTrace();
					}
				});
				srvInventoryService.delete(x);
			} catch (InvalidDataException e) {
				e.printStackTrace();
			}
		});
		srv.deleteById(id);
	}

}

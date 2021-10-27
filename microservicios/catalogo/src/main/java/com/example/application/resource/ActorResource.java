package com.example.application.resource;


import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.example.domains.contracts.services.ActorService;
import com.example.domains.entities.dtos.ActorDTO;
import com.example.domains.entities.dtos.FilmShort;
import com.example.exceptions.BadRequestException;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping(path = "/actores")
@Api(value = "Manteniento de actores", description = "Permite mantener la lista de actores utilizados en el reparto de las peliculas")
public class ActorResource {
	@Autowired
	ActorService srv;

	@GetMapping
	@ApiOperation(value = "Obtener todos los actores")
	public List<ActorDTO> getAll(@RequestParam(required = false) String sort) {
		if(sort== null)
			return srv.getByProjection(ActorDTO.class);
		else
			return (List<ActorDTO>) srv.getByProjection(Sort.by(sort), ActorDTO.class);
	}

	@ApiOperation(value = "Obtener actores paginados")
	@GetMapping(params = "page")
	public Page<ActorDTO> getAllPageable(Pageable item) {
		return srv.getByProjection(item, ActorDTO.class);
	}

	@ApiOperation(value = "Obtener un actor")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Actor encontrado"),
		@ApiResponse(code = 404, message = "Actor no encontrado")
	})
	@GetMapping(path = "/{id}")
	public ActorDTO getOne(@PathVariable int id) throws NotFoundException {
		var actor = srv.getOne(id);
		if(actor.isEmpty())
			throw new NotFoundException();
		else
			return ActorDTO.from(actor.get());
	}

	@ApiOperation(value = "Obtener todas las películas de un actor")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Actor encontrado"),
		@ApiResponse(code = 404, message = "Actor no encontrado")
	})
	@GetMapping(path = "/{id}/peliculas")
	@Transactional
	public List<FilmShort> getPelis(@PathVariable int id) throws NotFoundException {
		var actor = srv.getOne(id);
		if(actor.isEmpty())
			throw new NotFoundException();
		else {
			return (List<FilmShort>) actor.get().getFilmActors().stream().map(item -> FilmShort.from(item)).collect(Collectors.toList());
		}
	}

	@ApiOperation(value = "Añadir un nuevo actor")
	@ApiResponses({
		@ApiResponse(code = 201, message = "Actor añadido"),
		@ApiResponse(code = 404, message = "Actor no encontrado")
	})
	@Transactional
	@PostMapping
	public ResponseEntity<Object> create(@Valid @RequestBody ActorDTO item) throws BadRequestException, DuplicateKeyException, InvalidDataException {
		if(item == null)
			throw new BadRequestException("Faltan los datos");
		var newItem = srv.add(ActorDTO.from(item));
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
			.buildAndExpand(newItem.getActorId()).toUri();
		return ResponseEntity.created(location).build();

	}

	@ApiOperation(value = "Modificar un actor existente", notes = "Los identificadores deben coincidir")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Actor encontrado"),
		@ApiResponse(code = 404, message = "Actor no encontrado")
	})
	@PutMapping("/{id}")
	public ActorDTO update(@PathVariable int id, @Valid @RequestBody ActorDTO item) throws BadRequestException, NotFoundException, InvalidDataException {
		if(item == null)
			throw new BadRequestException("Faltan los datos");
		if(id != item.getActorId())
			throw new BadRequestException("No coinciden los identificadores");
		return ActorDTO.from(srv.modify(ActorDTO.from(item)));	
	}

	@ApiOperation(value = "Borrar un actor existente")
	@ApiResponses({
		@ApiResponse(code = 204, message = "Actor borrado"),
		@ApiResponse(code = 404, message = "Actor no encontrado")
	})
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable int id) {
		srv.deleteById(id);
	}

}

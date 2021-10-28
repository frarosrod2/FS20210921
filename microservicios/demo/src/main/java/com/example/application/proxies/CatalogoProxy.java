package com.example.application.proxies;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.example.domains.entities.dtos.Categoria;
import com.example.domains.entities.dtos.FilmShort;

@FeignClient(name="catalogo-service")
public interface CatalogoProxy {

	@GetMapping
	String getRaiz();
	
	@GetMapping(path = "/categorias")
	List<Categoria> getCategorias();
	
	@GetMapping(path = "/categorias/{id}")
	Categoria getCategoria(@PathVariable int id);
	
	@GetMapping(path = "/categorias/{id}/peliculas")
	List<FilmShort> getPeliculasCategoria(@PathVariable int id);
	
	@PostMapping(path = "/categorias")
	void addCategoria(Categoria item);
	
	@PutMapping(path = "/categorias/{id}")
	Categoria modifyCategoria(@PathVariable int id, @PathVariable Categoria item);
	
	@DeleteMapping(path = "/categorias/{id}")
	Categoria deleteCategoria(@PathVariable int id);
	
	
	
}

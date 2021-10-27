package com.example.application.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.domains.entities.Actor;
import com.example.domains.entities.dtos.ActorDTO;

import lombok.Data;

@RestController
public class DemosResource {

	@GetMapping("/params/{id}")
	public String cotilla(
	        @PathVariable String id,
	        @RequestParam(required = false, defaultValue = "valor por defecto") String nom,
	        @RequestHeader("Accept-Language") String language) { 
	    StringBuilder sb = new StringBuilder();
	    sb.append("id: " + id + "\n");
	    sb.append("nom: " + nom + "\n");
	    sb.append("language: " + language + "\n");
	    return sb.toString();
	}
	
	@GetMapping(path = "/params/{id}", produces = {"text/xml"})
	public String cotillaXML(
	        @PathVariable String id,
	        @RequestParam(required = false, defaultValue = "valor por defecto") String nom,
	        @RequestHeader("Accept-Language") String language) { 
	    StringBuilder sb = new StringBuilder();
	    sb.append("<raiz><id>: " + id + "</id>\n");
	    sb.append("<nombre>: " + nom + "</nombre>\n");
	    sb.append("<idioma>: " + language + "</idioma>\n</raiz>\n");
	    return sb.toString();
	}
	
	@GetMapping(path = "/salida")
	@ResponseStatus(code = HttpStatus.OK)
	public ActorDTO salidaGet() {
		return ActorDTO.from(new Actor(0, "Pepe", "Grillo"));
	}

	@PostMapping(path = "/salida")
	@ResponseStatus(code = HttpStatus.OK)
	public ActorDTO salidaPost(@RequestBody ActorDTO item) {
		return item;
	}
	
	@Autowired
	RestTemplate rest;
	
	@Data
	public static class Categorias{
		private int id;
		private String categoria;
	}

	@GetMapping("/categorias/{id}")
	public Categorias traeDatos(@PathVariable int id){
		return rest.getForObject("http://host.docker.internal:8010/categorias/{id}", Categorias.class, id);)
	}
}

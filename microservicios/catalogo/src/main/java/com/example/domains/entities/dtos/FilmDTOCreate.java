package com.example.domains.entities.dtos;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.domains.entities.Actor;
import com.example.domains.entities.Category;
import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;
import com.example.domains.entities.Language;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class FilmDTOCreate {

	@ApiModelProperty(value = "Identificador de la pelicula", required = true, accessMode = AccessMode.READ_ONLY)
	private int filmId;
	@ApiModelProperty(value = "Duración de la pelicula", required = true)
	private int length;
	@ApiModelProperty(value = "Clasificación de la pelicula", allowableValues = "G, PG, PG-13, R, NC-17")
	private String rating;
	@ApiModelProperty(value = "Descripcion de la pelicula" )
	private String description;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy")
	@ApiModelProperty(value = "Año de lanzamiento" )
	private Short releaseYear;
	@ApiModelProperty(value = "Duración de alquiler de pelicula" )
	private byte rentalDuration;
	@ApiModelProperty(value = "Calificación del alquiler de la pelicula" )
	private BigDecimal rentalRate;
	@ApiModelProperty(value = "Coste de reemplazo de la pelicula" )
	private BigDecimal replacementCost;
	@ApiModelProperty(value = "Titulo de la pelicula", required = true, allowableValues = "Un maximo de 255 caracteres")
	private String title;
	@ApiModelProperty(value = "Id del idioma de la pelicula" )
	private int languageId;
	@ApiModelProperty(value = "Idioma original de la pelicula" )
	private Language languageVO;
	@ApiModelProperty(value = "Id de los actores de la pelicula" )
 	private List<Integer> actors = new ArrayList<Integer>();
	@ApiModelProperty(value = "Id de las categorías de la pelicula" )
 	private List<Integer> categories = new ArrayList<Integer>();	

	public static Film from(FilmDTOCreate source) {
		Film peli = new Film(
			source.getFilmId(),
			source.getLength(),
			source.getRating(),
			source.getDescription(),
			source.getReleaseYear(),
			source.getRentalDuration(),
			source.getRentalRate(),
			source.getReplacementCost(),
			source.getTitle(),
			new Language(source.languageId),
			source.getLanguageVO());
		return peli;
	}
	
}

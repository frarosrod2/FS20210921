package com.example.domains.entities.dtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import com.example.domains.entities.Actor;
import com.example.domains.entities.Category;
import com.example.domains.entities.Film;
import com.example.domains.entities.Language;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApiModel(value = "FilmDTO", description = "Detalles de las peliculas")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmDTO {

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
	@ApiModelProperty(value = "Titulo de la pelicula", required = true, allowableValues = "Un maximo de 255 caracteres")
	private String title;
	@ApiModelProperty(value = "Idioma de la pelicula" )
	private String language;
	@ApiModelProperty(value = "Idioma original de la pelicula" )
	private String languageVO;
	@ApiModelProperty(value = "Actores de la pelicula" )
	private List<String> actors;
	@ApiModelProperty(value = "Categorías de la pelicula" )
	private List<String> categories;

	public static FilmDTO from(Film source) {
		return new FilmDTO(source.getFilmId(), source.getLength(), source.getRating(), source.getDescription(),
				source.getReleaseYear(), source.getRentalDuration(), source.getTitle(), source.getLanguage().getName(),
				source.getLanguageVO() != null ? source.getLanguageVO().getName() : null,
				source.getFilmActors() != null ? source.getFilmActors().stream().map(x -> x.getActor().getFirstName())
						.collect(Collectors.toList()) : null,
				source.getFilmCategories() != null ? source.getFilmCategories().stream()
						.map(x -> x.getCategory().getName()).collect(Collectors.toList()) : null);
	}
}

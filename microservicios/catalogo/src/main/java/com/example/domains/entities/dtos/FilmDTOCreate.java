package com.example.domains.entities.dtos;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.domains.entities.Actor;
import com.example.domains.entities.Category;
import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;
import com.example.domains.entities.FilmCategory;
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
	private Integer languageId;
	@ApiModelProperty(value = "Idioma original de la pelicula" )
	private Integer languageVO;
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
			new Language(source.languageId));
		return peli;
	}
	
	public Film update(Film target) {
		//target.setFilmId(filmId);
		target.setDescription(description);
		if(target.getLength() != length) target.setLength(length);
		target.setRating(rating);
		target.setReleaseYear(releaseYear);
		target.setRentalDuration(rentalDuration);
		target.setRentalRate(rentalRate);
		target.setReplacementCost(replacementCost);
		target.setTitle(title);
		if (languageId == null) {
			target.setLanguage(null);
		} else if(target.getLanguage() == null || (target.getLanguage() != null && target.getLanguage().getLanguageId() != languageId)) {
			target.setLanguage(new Language(languageId));
		}
		if (languageVO == null) {
			target.setLanguageVO(null);
		} else if(target.getLanguageVO() == null || (target.getLanguageVO() != null && target.getLanguageVO().getLanguageId() != languageVO)) {
			target.setLanguageVO(new Language(languageVO));
		}
		// Borra los actores que sobran
		List<FilmActor> delAct = target.getFilmActors().stream()
			.filter(item -> !actors.contains(item.getActor().getActorId()))
			.collect(Collectors.toList());
		delAct.forEach(item -> target.removeFilmActor(item));
		// Añade los actores que faltan
		actors.stream()
			.filter(item -> !target.getFilmActors().stream().anyMatch(o -> o.getActor().getActorId() == item))
			.forEach(item -> target.addFilmActor(new Actor(item)));
		// Borra las categorias que sobran
		List<FilmCategory> delCat = target.getFilmCategories().stream()
			.filter(item -> !categories.contains(item.getCategory().getCategoryId()))
			.collect(Collectors.toList());
		delCat.forEach(item -> target.removeFilmCategory(item));
		// Añade las categorias que faltan
		categories.stream()
			.filter(item -> !target.getFilmCategories().stream().anyMatch(o -> o.getCategory().getCategoryId() == item))
			.forEach(item -> target.addFilmCategory(new Category(item)));
		return target;
	}
	
}

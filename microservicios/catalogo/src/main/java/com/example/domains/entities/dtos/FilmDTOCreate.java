package com.example.domains.entities.dtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import com.example.domains.entities.Actor;
import com.example.domains.entities.Category;
import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;
import com.example.domains.entities.Language;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class FilmDTOCreate {

	private int filmId;
	private int length;
	private String rating;
	private String description;
	private Short releaseYear;
	private byte rentalDuration;
	private BigDecimal rentalRate;
	private BigDecimal replacementCost;
	private String title;
	private int languageId;
	private Language languageVO;
	private List<Integer> filmActors; 
	
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
		source.getFilmActors().forEach(x -> peli.addFilmActor(new Actor(x)));
		return peli;
	}
	
}

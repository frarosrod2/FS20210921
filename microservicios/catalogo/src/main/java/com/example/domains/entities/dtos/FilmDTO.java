package com.example.domains.entities.dtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import com.example.domains.entities.Actor;
import com.example.domains.entities.Category;
import com.example.domains.entities.Film;
import com.example.domains.entities.Language;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class FilmDTO {

	private int filmId;
	private int length;
	private String rating;
	private String description;
	private Short releaseYear;
	private byte rentalDuration;
	private String title;
	private String language;
	private String languageVO;
	private List<String> actors; 
	private List<String> categories;
	
	public static FilmDTO from(Film source) {
		return new FilmDTO(
			source.getFilmId(),
			source.getLength(),
			source.getRating(),
			source.getDescription(),
			source.getReleaseYear(),
			source.getRentalDuration(),
			source.getTitle(),
			source.getLanguage().getName(),
			source.getLanguageVO() != null ? source.getLanguageVO().getName() : null,
			source.getFilmActors() != null ? source.getFilmActors().stream().map(x -> x.getActor().getFullName()).collect(Collectors.toList()) : null,
			source.getFilmCategories() != null ? source.getFilmCategories().stream().map(x -> x.getCategory().getName()).collect(Collectors.toList()) : null);
	}
}

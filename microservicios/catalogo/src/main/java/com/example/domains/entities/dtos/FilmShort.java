package com.example.domains.entities.dtos;

import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FilmShort {
	private int filmId;
	private String title;

	public static FilmShort from(Film source) {
		return new FilmShort(source.getFilmId(), source.getTitle());
	}
	public static FilmShort from(FilmActor source) {
		return new FilmShort(source.getFilm().getFilmId(), source.getFilm().getTitle());
	}
}

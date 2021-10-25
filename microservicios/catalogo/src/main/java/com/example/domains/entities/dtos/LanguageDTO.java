package com.example.domains.entities.dtos;

import com.example.domains.entities.Language;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class LanguageDTO {

	private int languageId;

	public static Language from(LanguageDTO source) {
		return new Language(
			source.getLanguageId());
	}
	
	public static LanguageDTO from(Language source) {
		return new LanguageDTO(
			source.getLanguageId());
	}
}

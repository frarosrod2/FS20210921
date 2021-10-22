package com.example.domains.entities.dtos;

import com.example.domains.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class CategoryDTO {

	private int categoryId;

	public static Category from(CategoryDTO source) {
		return new Category(
			source.getCategoryId());
	}
	
	public static CategoryDTO from(Category source) {
		return new CategoryDTO(
			source.getCategoryId());
	}
}

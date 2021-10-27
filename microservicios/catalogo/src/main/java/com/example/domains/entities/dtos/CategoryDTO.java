package com.example.domains.entities.dtos;

import com.example.domains.entities.Category;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApiModel(value = "CategoryDTO", description = "Version editable de las categorías")
@Data @AllArgsConstructor @NoArgsConstructor
public class CategoryDTO {

	@ApiModelProperty(value = "Identificador de la categoría", required = true, accessMode = AccessMode.READ_ONLY)
	private int categoryId;
	
	@ApiModelProperty(name = "Nombre", value = "Nombre de la categoría",required = true)
	private String name;

	public static Category from(CategoryDTO source) {
		return new Category(
			source.getCategoryId(),
			source.getName());
	}
	
	public static CategoryDTO from(Category source) {
		return new CategoryDTO(
			source.getCategoryId(),
			source.getName());
	}
}

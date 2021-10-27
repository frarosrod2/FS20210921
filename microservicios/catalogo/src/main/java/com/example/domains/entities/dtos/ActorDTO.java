package com.example.domains.entities.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.domains.entities.Actor;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApiModel(value = "ActorDTO", description = "Version editable de los actores")
@Data @AllArgsConstructor @NoArgsConstructor
public class ActorDTO {

	@ApiModelProperty(value = "Identificador del actor", required = true, accessMode = AccessMode.READ_ONLY)
	private int actorId;
	
	@NotBlank
	@Size(max=45)
	@ApiModelProperty(name = "Nombre", value = "Nombre de pila del actor",required = true)
	private String firstName;
	
	@NotBlank
	@Size(max=45)
	@ApiModelProperty(name = "Apellido", value = "Apellido del actor",required = true)
	private String lastName;

	public static Actor from(ActorDTO source) {
		return new Actor(
			source.getActorId(),
			source.getFirstName(),
			source.getLastName());
	}
	
	public static ActorDTO from(Actor source) {
		return new ActorDTO(
			source.getActorId(),
			source.getFirstName(),
			source.getLastName());
	}
}

package com.example.domains.entities.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.domains.entities.Actor;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@ApiModel(value = "Actor", description = "Datos del actor para su edición")
public class ActorDTO {

	@JsonProperty("id")
	private int actorId;
	
	@JsonProperty("nombre")
	@NotBlank
	@Size(max = 45)
	@ApiModelProperty(name = "Nombre")
	private String firstName;
	@JsonProperty("apellidos")
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

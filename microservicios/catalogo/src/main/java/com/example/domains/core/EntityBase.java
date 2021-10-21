package com.example.domains.core;

import java.beans.Transient;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class EntityBase<E> {

	private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

	public Set<ConstraintViolation<E>> getErrors() {

		return validator.validate((E) this);
	}

	public boolean isValid() {
		return getErrors().size() == 0;
	}
	
	@JsonIgnore
	@Transient
	public String getErroString() {
		Set<ConstraintViolation<E>> lst = getErrors();
		if(lst.isEmpty()) return "";
		StringBuilder sb = new StringBuilder("ERRORES:");
		lst.forEach(item -> sb.append(" " + item.getPropertyPath() + ": " + item.getMessage() + "."));
		return sb.toString();
	}


	
	public boolean isInvalid() {
		return !isValid();
	}
}

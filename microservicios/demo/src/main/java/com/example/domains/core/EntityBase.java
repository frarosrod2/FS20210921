package com.example.domains.core;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

public abstract class EntityBase<E> {

	private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

	public Set<ConstraintViolation<E>> getErrors() {

		return validator.validate((E) this);
	}

	public boolean isValid() {
		return getErrors().size() == 0;
	}
	
	public boolean isInvalid() {
		return !isValid();
	}
}

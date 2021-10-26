package com.example.domains.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domains.contracts.services.FilmActorService;
import com.example.domains.entities.FilmActor;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;
import com.example.infrastructure.repositories.FilmActorRepository;

@Service
public class FilmActorServiceImpl implements FilmActorService {

	@Autowired
	private FilmActorRepository dao;
	
	@Override
	public List<FilmActor> getAll() {
		return dao.findAll();
	}

	@Override
	public Optional<FilmActor> getOne(Integer id) {
		return dao.findById(id);
	}

	@Override
	public FilmActor add(FilmActor item) throws DuplicateKeyException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public FilmActor modify(FilmActor item) throws NotFoundException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public void delete(FilmActor item) throws InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		dao.delete(item);

	}

	@Override
	public void deleteById(Integer id) {
		dao.deleteById(id);
	}


}

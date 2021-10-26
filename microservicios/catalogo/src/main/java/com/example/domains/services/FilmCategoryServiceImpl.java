package com.example.domains.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domains.contracts.services.FilmCategoryService;
import com.example.domains.entities.FilmCategory;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;
import com.example.infrastructure.repositories.FilmCategoryRepository;

@Service
public class FilmCategoryServiceImpl implements FilmCategoryService {

	@Autowired
	private FilmCategoryRepository dao;
	
	@Override
	public List<FilmCategory> getAll() {
		return dao.findAll();
	}

	@Override
	public Optional<FilmCategory> getOne(Integer id) {
		return dao.findById(id);
	}

	@Override
	public FilmCategory add(FilmCategory item) throws DuplicateKeyException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public FilmCategory modify(FilmCategory item) throws NotFoundException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public void delete(FilmCategory item) throws InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		dao.delete(item);

	}

	@Override
	public void deleteById(Integer id) {
		dao.deleteById(id);
	}


}

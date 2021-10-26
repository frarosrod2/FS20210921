package com.example.domains.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domains.contracts.services.RentalService;
import com.example.domains.entities.Rental;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;
import com.example.infrastructure.repositories.RentalRepository;

@Service
public class RentalServiceImpl implements RentalService {

	@Autowired
	private RentalRepository dao;
	
	@Override
	public List<Rental> getAll() {
		return dao.findAll();
	}

	@Override
	public Optional<Rental> getOne(Integer id) {
		return dao.findById(id);
	}

	@Override
	public Rental add(Rental item) throws DuplicateKeyException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public Rental modify(Rental item) throws NotFoundException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public void delete(Rental item) throws InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		dao.delete(item);

	}

	@Override
	public void deleteById(Integer id) {
		dao.deleteById(id);
	}


}

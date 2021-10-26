package com.example.domains.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domains.contracts.services.InventoryService;
import com.example.domains.entities.Inventory;
import com.example.exceptions.DuplicateKeyException;
import com.example.exceptions.InvalidDataException;
import com.example.exceptions.NotFoundException;
import com.example.infrastructure.repositories.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	private InventoryRepository dao;
	
	@Override
	public List<Inventory> getAll() {
		return dao.findAll();
	}

	@Override
	public Optional<Inventory> getOne(Integer id) {
		return dao.findById(id);
	}

	@Override
	public Inventory add(Inventory item) throws DuplicateKeyException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public Inventory modify(Inventory item) throws NotFoundException, InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		return dao.save(item);
	}

	@Override
	public void delete(Inventory item) throws InvalidDataException {
		if(item==null)
			throw new InvalidDataException("Faltan los datos");
		dao.delete(item);

	}

	@Override
	public void deleteById(Integer id) {
		dao.deleteById(id);
	}


}

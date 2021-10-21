package com.example.domains.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.domains.contracts.services.ActorService;
import com.example.domains.entities.Actor;
import com.example.infrastructure.repositories.ActorRepository;

public class ActorServiceImpl implements ActorService {

	@Autowired
	private ActorRepository dao;
	
	@Override
	public List<Actor> getAll() {
		return dao.findAll();
	}

	@Override
	public Optional<Actor> getOne(Integer id) {
		return dao.findById(id);
	}

	@Override
	public Actor add(Actor item) {
		if(getOne(item.getActorId()).isPresent()) {
			
		}
		return dao.save(item);
	}

	@Override
	public Actor modify(Actor item) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Actor item) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub

	}

}

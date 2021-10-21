package com.example;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.domains.contracts.services.CategoryService;
import com.example.domains.entities.Category;
import com.example.infrastructure.repositories.CategoryRepository;

@SpringBootApplication
public class CatalogoApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(CatalogoApplication.class, args);
	}
	
	@Autowired
	CategoryRepository dao;
	
	@Autowired
	CategoryService srv;
	
	@Override
	@Transactional
	public void run(String... args) throws Exception {
		
		Optional<Category> a = dao.findById(1);
		System.out.println("TEST");
		if(a.isPresent())
			System.out.println(a.get());
		else {
			System.out.println("No encontrado");
		}
		
		dao.findAll().forEach(System.out::println);
	}

}

package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.infrastructure.repositories.ActorRepository;

import springfox.documentation.oas.annotations.EnableOpenApi;

@EnableOpenApi
@SpringBootApplication
public class DemoApplication {

	@Autowired
	ActorRepository dao;
	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
		public void run(String... args) throws Exception {
			
			dao.findAll().forEach(System.out::println);
		}

}

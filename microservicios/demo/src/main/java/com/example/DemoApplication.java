package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.example.infrastructure.repositories.ActorRepository;

import springfox.documentation.oas.annotations.EnableOpenApi;

@EnableOpenApi
@EnableEurekaClient
@SpringBootApplication
public class DemoApplication {

	@Autowired
	ActorRepository dao;
	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Bean public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
		public void run(String... args) throws Exception {
			
			dao.findAll().forEach(System.out::println);
		}

}

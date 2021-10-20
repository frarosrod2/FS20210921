package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.ioc.Servicio;

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	Servicio srv;
	
	@Test
	void inyecciones() {
		assertEquals("Soy una taza", srv.saluda());
	}

}

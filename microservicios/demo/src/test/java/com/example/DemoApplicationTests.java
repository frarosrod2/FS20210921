package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.ioc.Formato;
import com.example.ioc.Servicio;

@SpringBootTest
@ActiveProfiles("Test")
class DemoApplicationTests {

	@Autowired
//	@Qualifier("dos")
	Servicio srv;
	
	@Autowired
	Formato formato;
	
	@Test
	void inyeccionesTaza() {
		assertEquals("Soy una taza", srv.saluda());
	}

	@Test
	void inyeccionesTetera() {
		assertEquals("Soy una tetera", srv.saluda());
		assertEquals("HOLA", formato.formatea("hola"));
		assertEquals(1, formato.getCont());
	}
}

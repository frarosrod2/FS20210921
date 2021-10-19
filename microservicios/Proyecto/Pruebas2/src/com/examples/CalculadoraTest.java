package com.examples;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullSource;
import org.mockito.Mock;
import org.mockito.exceptions.base.MockitoException;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CalculadoraTest {
	Calculadora calc;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
		calc = new Calculadora();
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@ParameterizedTest(name = "Suma {index} => {0} + {1} = {2}")
	@CsvSource({ "2,2,4", "0,0,0", "1,-1,0" })
	void testSuma(double a, double b, double rslt) {
		assertEquals(rslt, calc.suma(a, b));
	}

	@Nested
	@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
	class Divisiones {
		@RepeatedTest(value = 5, name = "{displayName} {currentRepetition}/{totalRepetitions}")
		void testDivideDoubleDouble() {
//		assertThrows(Exception.class, () -> calc.divide(1.0, 0));
			assertAll("Divisiones enteras", () -> assertEquals(2, calc.divide(4., 2.)),
					() -> assertEquals(Double.POSITIVE_INFINITY, calc.divide(4., 0)));

		}

		@Test
		@DisplayName("DivisionEntera")
		void testDivideIntInt() {
			assertEquals(2, calc.divide(4, 2));
			assertThrows(Exception.class, () -> calc.divide(1, 0));

		}
	}

	@ParameterizedTest(name = "Nif => {0}")
	@CsvSource({ "17477215K", "17477216E" })
	void testNifTrue(String nif) {
		assertTrue(calc.isNif(nif));
	}

	@ParameterizedTest(name = "Nif => {0}")
	@CsvSource(value = { "''", "12345678I", "125678I", "174772158", "' '" }, nullValues = { "null" })
	void testNifFalse(String nif) {
		assertFalse(calc.isNif(nif));
	}

	@ParameterizedTest
	@NullSource
	void testNifNull(String nif) {
		assertFalse(calc.isNif(nif));
	}
	
	@Nested
	@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
	class Mockeado {
		@Mock
		Calculadora calculadora;
		
		@Test
		void suma_mock() {
			when(calculadora.suma(2., 2.)).thenReturn(2.);
			assertEquals(calculadora.suma(2., 2.), 2);
		}
	}
}

package com.example.ioc;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("Test")
public class ServicioMockImpl implements Servicio {

	@Override
	public String saluda() {
		return "Soy el doble de prueba";
	}

}

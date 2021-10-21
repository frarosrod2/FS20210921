package com.example.ioc;

import org.springframework.stereotype.Service;

@Service
public class ServicioImpl implements Servicio {

	@Override
	public String saluda() {
		
		return "Soy una taza";
	}

}

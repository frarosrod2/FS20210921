package com.example.ioc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
//@Qualifier("uno")
@Profile("default")
public class ServicioImpl implements Servicio {

	@Autowired
	private Formato frml;
	
	
	@Override
	public String saluda() {
		return frml.formatea("Soy una taza");
	}

	public int getCont(int cont) {
		return cont;
	}
}

package com.example.ioc;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class Formato {

	private int cont = 0;
	
	public String formatea(String cad) {
		cont++;
		return cad != null ? cad.toUpperCase() : cad;
	}
	
	public int getCont() {
		return cont;
	}
}

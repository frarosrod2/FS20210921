package com.examples;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Calculadora {
	public double suma(double a, double b) {
		return a + b;
	}

	public double divide(double a, double b) {
		return a / b;
	}

	public int divide(int a, int b) {
		return a / b;
	}

	public boolean isNif(String nif) {
		try {
			Pattern pat = Pattern.compile("[0-9]{7,8}[A-Za-z]");
			if (!pat.matcher(nif).matches()) {
				return false;
			} else {
				String letterValue = nif.substring(nif.length() - 1);
				String numberValue = nif.substring(0, nif.length() - 1);
				return Objects.equals(letterValue.toUpperCase(),
						String.valueOf("TRWAGMYFPDXBNJZSQVHLCKE".charAt(Integer.valueOf(numberValue) % 23)));
			}
		} catch (Exception e) {
			return false;
		}

	}

}

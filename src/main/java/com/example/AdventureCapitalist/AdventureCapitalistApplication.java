package com.example.AdventureCapitalist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AdventureCapitalistApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdventureCapitalistApplication.class, args);
		Services lServices = new Services();
		System.out.println(lServices.getWorld().getName() + " toto");
	}

}

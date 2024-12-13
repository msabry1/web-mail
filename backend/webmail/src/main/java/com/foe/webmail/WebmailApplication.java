package com.foe.webmail;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class WebmailApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebmailApplication.class, args);
	}

	@PostConstruct
	public void test(){

	}

}

package com.foe.webmail;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;


@SpringBootApplication
@EnableAsync
public class WebmailApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebmailApplication.class, args);
	}

	@PostConstruct
	public void test(){

	}

}

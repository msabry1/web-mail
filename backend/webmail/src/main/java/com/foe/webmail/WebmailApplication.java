package com.foe.webmail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WebmailApplication {
	@Value("${DB_PASSWORD}")
	private static String dbPassword;
	public static void main(String[] args) {
		SpringApplication.run(WebmailApplication.class, args);
    System.out.println(dbPassword);
	}

}

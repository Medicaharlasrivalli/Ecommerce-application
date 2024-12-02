package com.valli.password_reset_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PasswordResetServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PasswordResetServiceApplication.class, args);
	}

}

package com.valli.password_reset_service.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valli.password_reset_service.service.PasswordResetService;



@RestController
@RequestMapping("/password")
public class PasswordResetController {

	@Autowired
	PasswordResetService passwordResetService;
	
	@PostMapping("/reset-request")
	public ResponseEntity<Object> resetRequest(@RequestBody Map<String, String> request){
		String email=request.get("email");
		System.out.println(email);
		return passwordResetService.resetRequest(email);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<Object> resetPassword(@RequestBody Map<String,String> request){
		String token=request.get("token");
		String newPassword=request.get("newPassword");
		return passwordResetService.resetPassword(token, newPassword);	
	}
	
}

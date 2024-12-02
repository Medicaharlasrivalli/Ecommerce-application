package com.valli.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.valli.user_service.model.User;
import com.valli.user_service.security.JWTService;
import com.valli.user_service.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:3000")
public class UserController {
	
	@Autowired
	UserService userService;
	
	
	@PostMapping("/register")
	public ResponseEntity<Object> userRegister(@RequestBody User user ){
		return userService.userRegister(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Object> userLogin(@RequestBody User user){
		return userService.userLogin(user.getEmail(),user.getPassword());
	}
	
	@PostMapping("/verify")
	public ResponseEntity<String> verifyUser(@RequestBody User user){
		return userService.verifyUser(user);
	}
	
	@GetMapping("/validate")
	public boolean validateToken(@RequestParam("token") String token) {
		return userService.validateToken(token);
	}
	
	@PostMapping("/getUser")
	public ResponseEntity<User> getUserByEmail(@RequestBody String email){
		System.out.println(email);
		return userService.getUserByEmail(email);
	}
	
	@PutMapping("/password/{user_id}")
	public ResponseEntity<String> updatePassword(@RequestParam String user_id,@RequestBody String password){
		return userService.updatePassword(user_id,password);
	}
}

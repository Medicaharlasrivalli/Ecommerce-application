package com.valli.password_reset_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.valli.password_reset_service.model.User;

@FeignClient("USER-SERVICE")
public interface UserInterface {
	
	@PostMapping("/users/getUser")
	public ResponseEntity<User> getUserByEmail(@RequestBody String email);
	
	@PutMapping("/users/password/{user_id}")
	public ResponseEntity<String> updatePassword(@RequestParam String user_id,@RequestBody String password);

}

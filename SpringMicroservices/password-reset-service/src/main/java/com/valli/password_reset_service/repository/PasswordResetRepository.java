package com.valli.password_reset_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.valli.password_reset_service.model.PasswordResetToken;
import com.valli.password_reset_service.model.User;

public interface PasswordResetRepository extends MongoRepository<PasswordResetToken,String> {
	PasswordResetToken findByToken(String token);
	PasswordResetToken findByUser(User user);
}

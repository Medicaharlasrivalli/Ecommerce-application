package com.valli.user_service.repo;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.valli.user_service.model.User;
import java.util.List;


public interface UserRepository extends MongoRepository<User,String>{
	List<User> findByEmail(String email);

}

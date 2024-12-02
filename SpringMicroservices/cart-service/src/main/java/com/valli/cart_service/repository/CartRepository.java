package com.valli.cart_service.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.valli.cart_service.model.Cart;

public interface CartRepository extends MongoRepository<Cart, String>{

}

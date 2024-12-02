package com.valli.orders_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.valli.orders_service.model.Orders;

public interface OrdersRepository extends MongoRepository<Orders,String>{

}

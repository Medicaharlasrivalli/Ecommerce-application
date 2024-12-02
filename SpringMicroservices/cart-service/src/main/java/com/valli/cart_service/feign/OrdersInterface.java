package com.valli.cart_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.valli.cart_service.model.Order;


@FeignClient("ORDERS-SERVICE")
public interface OrdersInterface {
	@PostMapping("orders/addOrders/{id}")
	public ResponseEntity<Object> addOrder(@PathVariable String id,@RequestBody Order order);
}

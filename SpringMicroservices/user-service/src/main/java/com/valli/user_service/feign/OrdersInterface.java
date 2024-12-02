package com.valli.user_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.valli.user_service.model.Order;

@FeignClient("ORDERS-SERVICE")
public interface OrdersInterface {
	@PostMapping("/orders/createOrders")
	public ResponseEntity<String> createOrders(@RequestBody List<Order> list);
}

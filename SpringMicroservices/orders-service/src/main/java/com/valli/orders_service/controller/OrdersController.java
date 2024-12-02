package com.valli.orders_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valli.orders_service.model.Item;
import com.valli.orders_service.model.Order;
import com.valli.orders_service.service.OrdersService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/orders")
public class OrdersController {
	
	@Autowired
	OrdersService ordersService;
	
	@PostMapping("/createOrders")
	public ResponseEntity<String> createOrders(@RequestBody List<Order> list){
		return ordersService.createOrder(list);
	}
	
	@PostMapping("/addOrders/{id}")
	public ResponseEntity<Object> addOrder(@PathVariable String id,@RequestBody Order order){
		return ordersService.addOrder(id,order);
	}
	
	@GetMapping("/getOrders/{id}")
	public ResponseEntity<Object> getOrders(@PathVariable String id){
		return ordersService.getOrders(id);
	}
	
}

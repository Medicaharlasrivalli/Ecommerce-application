package com.valli.orders_service.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.valli.orders_service.model.Item;
import com.valli.orders_service.model.Order;
import com.valli.orders_service.model.Orders;
import com.valli.orders_service.repository.OrdersRepository;

@Service
public class OrdersService {

	@Autowired
	OrdersRepository ordersRepository;
	
	public ResponseEntity<String> createOrder(List<Order> list) {
		try {
			Orders order=new Orders();
			order.setItems(list);
			Orders ordersSaved=ordersRepository.save(order);
			return new ResponseEntity<>(ordersSaved.getId(),HttpStatus.OK);
			}catch (Exception e) {
				e.printStackTrace();
			}	
			return new ResponseEntity<>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> addOrder(String id, Order order) {
		try {
			Orders orders=ordersRepository.findById(id).get();
			List<Order> items=orders.getItems();
			items.add(order);
			orders.setItems(items);
			Orders savedOrders=ordersRepository.save(orders);
			List<Order> items1=savedOrders.getItems();
			Collections.reverse(items1);	
			savedOrders.setItems(items1);
			return new ResponseEntity<Object>(savedOrders,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("Fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> getOrders(String id) {
		try {
			Orders orders=ordersRepository.findById(id).get();
			List<Order> itemsList=orders.getItems();
			Collections.reverse(itemsList);
			orders.setItems(itemsList);
			return  new ResponseEntity<Object>(orders,HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("Fail",HttpStatus.BAD_REQUEST);
	}

}

package com.valli.orders_service.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Orders {
	@Id
	private String id;
	private List<Order> items;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<Order> getItems() {
		return items;
	}
	public void setItems(List<Order> items) {
		this.items = items;
	}
	
}

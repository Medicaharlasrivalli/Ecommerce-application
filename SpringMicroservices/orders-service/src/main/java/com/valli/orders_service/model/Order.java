package com.valli.orders_service.model;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
public class Order {
	private String id;
	public Order() {
        this.id = UUID.randomUUID().toString();
        this.orderDate = LocalDate.now();
    }
	private List<Item> item;
	private LocalDate orderDate;
	private String address;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<Item> getItem() {
		return item;
	}
	public void setItem(List<Item> item) {
		this.item = item;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public LocalDate getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}
	
}

package com.valli.cart_service.model;
import java.util.List;
import java.util.UUID;
public class Order {
	private String id;
	public Order() {
        this.id = UUID.randomUUID().toString();
    }
	private List<Item> item;
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
	
}

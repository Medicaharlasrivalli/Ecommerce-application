package com.valli.user_service.model;
import java.util.UUID;
public class Order {
	private String id;
	public Order() {
        this.id = UUID.randomUUID().toString();
    }
	private Item item;
	private String address;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
}

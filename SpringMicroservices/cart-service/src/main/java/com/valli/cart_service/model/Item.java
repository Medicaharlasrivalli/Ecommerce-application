package com.valli.cart_service.model;



import org.bson.types.Binary;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class Item {
	private String id;
	private String name;
	@JsonDeserialize(using = BinaryDeserializer.class)
	private Binary images;
	private String description;
	private float price;
	private int quantity;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Binary getImages() {
		return images;
	}
	public void setImages(Binary images) {
		this.images = images;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", images=" + images + ", description=" + description + ", price="
				+ price + ", quantity=" + quantity + "]";
	}
		
}

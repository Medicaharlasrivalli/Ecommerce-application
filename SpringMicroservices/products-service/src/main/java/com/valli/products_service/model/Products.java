package com.valli.products_service.model;

import java.util.List;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Products {
	@Id
	private String id;
	private String name;
	private List<Binary> images;
	private String description;
	private float price;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Binary> getImages() {
		return images;
	}
	public void setImages(List<Binary> images) {
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
		return "Products [id=" + id + ", name=" + name + ", images=" + images + ", description=" + description
				+ ", price=" + price + "]";
	}
	
}

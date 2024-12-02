package com.valli.wishlist_service.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "wishlist")
public class WishList {
	@Id
	private String id;
	private List<String> items;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<String> getItems() {
		return items;
	}
	public void setItems(List<String> items) {
		this.items = items;
	}
	@Override
	public String toString() {
		return "WishList [id=" + id + ", items=" + items + "]";
	}
	
}

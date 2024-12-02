package com.valli.wishlist_service.model;


import java.util.List;


public class Products {
	private String id;
	private String name;
	private List<Image> images;
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
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
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
	public static class Image {
        private int type;
        private String data;
		public int getType() {
			return type;
		}
		public void setType(int type) {
			this.type = type;
		}
		public String getData() {
			return data;
		}
		public void setData(String data) {
			this.data = data;
		}
        
    }
}

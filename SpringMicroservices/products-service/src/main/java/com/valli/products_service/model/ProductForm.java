package com.valli.products_service.model;

import org.springframework.web.multipart.MultipartFile;

public class ProductForm {
    private Products products;
    private MultipartFile[] images;

    // Getters and setters
    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    public MultipartFile[] getImages() {
        return images;
    }

    public void setImages(MultipartFile[] images) {
        this.images = images;
    }
}

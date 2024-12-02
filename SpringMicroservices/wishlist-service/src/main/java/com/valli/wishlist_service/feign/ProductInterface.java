package com.valli.wishlist_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.valli.wishlist_service.model.Products;


@FeignClient("PRODUCTS-SERVICE")
public interface ProductInterface {
	@GetMapping("/products/{id}")
	public ResponseEntity<Products> getProduct(@PathVariable String id);
}

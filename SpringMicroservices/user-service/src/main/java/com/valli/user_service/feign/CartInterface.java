package com.valli.user_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.valli.user_service.model.Item;

@FeignClient("CART-SERVICE")
public interface CartInterface {
	
	@PostMapping("/cart/createCart")
	public ResponseEntity<String> createCart(@RequestBody List<Item> list);

}

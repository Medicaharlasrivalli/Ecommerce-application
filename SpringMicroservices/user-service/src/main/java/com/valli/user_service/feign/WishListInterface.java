package com.valli.user_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("WISHLIST-SERVICE")
public interface WishListInterface {
	@PostMapping("wishlist/createWishList")
	public ResponseEntity<String> createWishList(@RequestBody List<String> list);
}




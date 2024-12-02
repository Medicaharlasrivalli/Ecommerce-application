package com.valli.wishlist_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.valli.wishlist_service.service.WishListService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/wishlist")
public class WishListController {

	@Autowired
	WishListService wishListService;
	
	@PostMapping("/createWishList")
	public ResponseEntity<String> createWishList(@RequestBody List<String> list){
		System.out.println("User hit me--Cart");
		return wishListService.createWishList(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> getWishList(@PathVariable String id){
		return wishListService.getWishList(id);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<Object> addItemToWishList(@PathVariable String id,@RequestParam("productID") String productID){
		System.out.println(productID);
		return wishListService.addItemToWishList(productID,id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteItemWishList(@PathVariable String id,@RequestParam("productID") String productID){
		return wishListService.deleteItemWishList(productID,id);
	}
}

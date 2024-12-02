package com.valli.cart_service.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.valli.cart_service.model.Item;
import com.valli.cart_service.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:3000")
public class CartController {
	
	@Autowired
	CartService cartService;
	
	@PostMapping("/createCart")
	public ResponseEntity<String> createCart(@RequestBody List<Item> list){
		return cartService.createCart(list);
	}
	
	@PostMapping("/addToCart/{id}")
	public ResponseEntity<Object> addToCart(@PathVariable String id,@RequestBody Item data){
		System.out.println(data);
		return cartService.addToCart(id,data);
	}
	
	@GetMapping("/getCart/{id}")
	public ResponseEntity<Object> getCart(@PathVariable String id){
		return cartService.getCart(id);
	}
	
	@PostMapping("/updateQuantity/{cartID}")
	public ResponseEntity<Object> updateQuantity(@PathVariable String cartID,@RequestBody Map<String, String> Request){
		String id=Request.get("id");
		String symbol=Request.get("symbol");
		System.out.println(cartID+" "+id+" "+symbol);
		return cartService.updateQuantity(cartID,id,symbol);
	}
	
	@DeleteMapping("/deleteCart/{cartID}")
	public ResponseEntity<Object> deleteCartItem(@PathVariable String cartID,@RequestParam String id){
		return cartService.deleteCart(cartID,id);
	}
	
	@PostMapping("/placeOrder/{cartID}")
	public ResponseEntity<Object> placeOrder(@PathVariable("cartID") String id,@RequestBody Map<String, String> orderData){
		String ordersID=orderData.get("ordersID");
		String address=orderData.get("address");
		return cartService.placeOrder(id,ordersID,address);
	}
	
//	@GetMapping("/getCart/{id}")
//	public ResponseEntity<Object> getCartItems(@PathVariable String id){
//		return cartService.getItemsFromCart(id);
//	}
	
}

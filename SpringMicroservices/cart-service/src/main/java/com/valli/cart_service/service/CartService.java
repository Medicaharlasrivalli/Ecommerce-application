package com.valli.cart_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.valli.cart_service.feign.OrdersInterface;
import com.valli.cart_service.model.Cart;
import com.valli.cart_service.model.Item;
import com.valli.cart_service.model.Order;
import com.valli.cart_service.repository.CartRepository;

@Service
public class CartService {
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	OrdersInterface ordersInterface;
	

	public ResponseEntity<String> createCart(List<Item> list) {
		// TODO Auto-generated method stub
		try {
		Cart cart=new Cart();
		cart.setItems(list);
		Cart cartSaved=cartRepository.save(cart);
		return new ResponseEntity<>(cartSaved.getId(),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}	
		return new ResponseEntity<>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> addToCart(String id,Item data) {
		System.out.println(data);
		try {
			int flag=0;
			Optional<Cart> cart=cartRepository.findById(id);
			List<Item> items=cart.get().getItems();
			for (Item item : items) { 
				if(item.getId().equals(data.getId())){
					item.setQuantity(data.getQuantity()+item.getQuantity());
					flag=1;
				}
			}
			if(flag==0)
				items.add(data);
			cart.get().setItems(items);
			Cart cart2=cartRepository.save(cart.get());
			return new ResponseEntity<Object>(cart2,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> getCart(String id) {
		try {
			Optional<Cart> cart=cartRepository.findById(id);
			List<Item> items=cart.get().getItems();
			return new ResponseEntity<Object>(cart,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> updateQuantity(String cartID, String id, String symbol) {
		try {
			Optional<Cart> cart=cartRepository.findById(cartID);
			List<Item> items=cart.get().getItems();
			List<Item> itemsToRemove = new ArrayList<>();
			for(Item item:items) {
				if(item.getId().equals(id)) {
					if(symbol.equals("+"))
						item.setQuantity(item.getQuantity()+1);
					else {
						if(item.getQuantity()==1)
							itemsToRemove.add(item);
						else {
							item.setQuantity(item.getQuantity()-1);
						}
					}
				}
			}
			items.removeAll(itemsToRemove);
			cart.get().setItems(items);
			Cart cart2=cartRepository.save(cart.get());
			return new ResponseEntity<Object>(cart2,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> deleteCart(String cartID, String id) {
		try {
			Optional<Cart> cart=cartRepository.findById(cartID);
			List<Item> items=cart.get().getItems();
			List<Item> itemsToRemove = new ArrayList<>();
			for(Item item:items) {
				if(item.getId().equals(id)) {
					itemsToRemove.add(item);
				}
			}
			items.removeAll(itemsToRemove);
			cart.get().setItems(items);
			Cart cart2=cartRepository.save(cart.get());
			return new ResponseEntity<Object>(cart2,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> placeOrder(String id, String ordersID, String address) {
		try {
			Cart cart=cartRepository.findById(id).get();
			Order order=new Order();
			order.setItem(cart.getItems());
			order.setAddress(address);
			cart.setItems(List.of());
			cartRepository.save(cart);
			return ordersInterface.addOrder(ordersID, order);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("Fail",HttpStatus.BAD_REQUEST);
	}

}

package com.valli.wishlist_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.valli.wishlist_service.feign.ProductInterface;
import com.valli.wishlist_service.model.Products;
import com.valli.wishlist_service.model.WishList;
import com.valli.wishlist_service.respository.WishListRepository;

@Service
public class WishListService {

	@Autowired
	WishListRepository wishListRepository;
	
	@Autowired
	ProductInterface productInterface;
	
	public ResponseEntity<String> createWishList(List<String> list) {
		// TODO Auto-generated method stub
		try {
			WishList wishList=new WishList();
			wishList.setItems(list);
			WishList wishListSaved=wishListRepository.save(wishList);
			return new ResponseEntity<String>(wishListSaved.getId(),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);
	}


	public ResponseEntity<Object> getWishList(String id) {
		try {
			Optional<WishList> wishList=wishListRepository.findById(id);
			if(wishList!=null) {
			System.out.println(wishList.get());
			List<String> products=wishList.get().getItems();
			List<Products> items=new ArrayList<>();
			for(String product:products) {
				Products products1=productInterface.getProduct(product).getBody();
				items.add(products1);
			}
			return new ResponseEntity<Object>(items,HttpStatus.OK);
			}
			else {
				return new ResponseEntity<Object>(List.of(),HttpStatus.OK);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}


	public ResponseEntity<Object> addItemToWishList(String productID,String id) {
		try {
			System.out.println(productID+" "+id);
			Optional<WishList> wishList=wishListRepository.findById(id);
			if(wishList!=null) {
			List<String> items=wishList.get().getItems();
			if(!items.contains(productID)) {
				items.add(productID);
			}
			wishList.get().setItems(items);
			WishList wishlist2=wishListRepository.save(wishList.get());
			List<Products> products=new ArrayList<>();
			for(String item:wishlist2.getItems()) {
				Products products1=productInterface.getProduct(item).getBody();
//				System.out.println(products1);
				products.add(products1);
			}
			return new ResponseEntity<Object>(products,HttpStatus.OK);
			}
			else {
				return new ResponseEntity<Object>(List.of(),HttpStatus.OK);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}


	public ResponseEntity<Object> deleteItemWishList(String productID, String id) {
		try {
			Optional<WishList> wishList=wishListRepository.findById(id);
			List<String> items=wishList.get().getItems();
			items.remove(productID);
			wishList.get().setItems(items);
			WishList wishList2=wishListRepository.save(wishList.get());
			List<Products> products=new ArrayList<>();
			for(String item:wishList2.getItems()) {
				Products products1=productInterface.getProduct(item).getBody();
				products.add(products1);
			}
			return new ResponseEntity<Object>(products,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

}

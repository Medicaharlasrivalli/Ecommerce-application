package com.valli.products_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.valli.products_service.model.Products;
import com.valli.products_service.repository.ProductRepository;

import jakarta.ws.rs.core.NewCookie;

@Service
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;

	public ResponseEntity<Object> addProduct(Products products, MultipartFile[] images) {
		try {
			List<Binary> imgs = new ArrayList<>();
			System.out.print(imgs+" these are images");
			for(MultipartFile file:images) {
				 imgs.add(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
			}
			products.setImages(imgs);
			Products productSaved=productRepository.save(products);
			return new ResponseEntity<Object>(productSaved,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Products> getProduct(String id) {
		try {
			Optional<Products> product=productRepository.findById(id);
			System.out.println(product.get());
			return new ResponseEntity<>(product.get(),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new Products(),HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> updateProduct(String id, Products products, MultipartFile[] images) {
		try {
			List<Binary> imgs = new ArrayList<>();
			for(MultipartFile file:images) {
				 imgs.add(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
			}
			products.setImages(imgs);
			Products productSaved=productRepository.save(products);
			return new ResponseEntity<Object>(productSaved,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}


	public ResponseEntity<Object> deleteProduct(String id) {
		try {
			productRepository.deleteById(id);
			return new ResponseEntity<Object>("success",HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<List<Products>> getAllProducts() {
		List<Products> products=productRepository.findAll();
		return new ResponseEntity<List<Products>>(products,HttpStatus.OK);
	}

	public ResponseEntity<Object> searchProdcut(String keyword) {
		try {
			System.out.println(keyword);
			String keyString=keyword.toLowerCase();
			List<Products> products=List.of();
			if(keyString.equals("men"))
				products=productRepository.findByMen(keyString,"women");
			else if (keyString.equals("women")) 
				products=productRepository.findByKeyword(keyString);
			else if	(keyString.equals("kids"))
				products=productRepository.findByKids(keyString,"girl","boy");
			else {
				products=productRepository.findByKeyword(keyString);
			}
			
			return new ResponseEntity<Object>(products,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("fail",HttpStatus.BAD_REQUEST);
	}
	

}

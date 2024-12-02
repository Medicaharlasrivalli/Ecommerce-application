package com.valli.products_service.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.valli.products_service.model.Products;
import com.valli.products_service.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin("http://localhost:3000/")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@PostMapping("/addProduct")
	public ResponseEntity<Object> addProduct(@RequestParam String name,@RequestParam String description,@RequestParam Float price,@RequestParam MultipartFile[] images){
		Products product=new Products();
		product.setName(name);
		product.setDescription(description);
		product.setPrice(price);
		return productService.addProduct(product,images);
	}
	
	@GetMapping("")
	public ResponseEntity<List<Products>> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Products> getProduct(@PathVariable String id){
		return productService.getProduct(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateProduct(@PathVariable String id,@RequestParam String name,@RequestParam String description,@RequestParam Float price,@RequestParam MultipartFile[] images){
		Products product=new Products();
		product.setName(name);
		product.setDescription(description);
		product.setPrice(price);
		product.setId(id);
		return productService.updateProduct(id,product,images);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteProduct(@PathVariable String id){
		return productService.deleteProduct(id);
	}
	
	@GetMapping("/search")
	public ResponseEntity<Object> searchProduct(@RequestParam String keyword){
		return productService.searchProdcut(keyword);
	}
}

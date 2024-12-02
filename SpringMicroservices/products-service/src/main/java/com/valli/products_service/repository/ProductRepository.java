package com.valli.products_service.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.valli.products_service.model.Products;

public interface ProductRepository extends MongoRepository<Products,String> {
	@Query("{'name':{'$regex':  ?0,'$options': 'i'}}")
	List<Products> findByKeyword(String word);
	
	@Query("{'$and':[{'name': {'$regex': ?0, '$options': 'i'}}, {'name': {'$not': {'$regex': ?1, '$options': 'i'}}}]}")
	List<Products> findByMen(String word1, String word2);
	
	@Query("{ '$or': [ { 'name': { '$regex': ?0, '$options': 'i' } }, { 'name': { '$regex': ?1, '$options': 'i' } }, { 'name': { '$regex': ?2, '$options': 'i' } } ] }")
    List<Products> findByKids(String word1, String word2, String word3);
}

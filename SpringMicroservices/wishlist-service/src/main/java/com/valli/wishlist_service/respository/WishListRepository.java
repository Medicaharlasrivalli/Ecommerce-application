package com.valli.wishlist_service.respository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.valli.wishlist_service.model.WishList;

public interface WishListRepository extends MongoRepository<WishList,String> {

}

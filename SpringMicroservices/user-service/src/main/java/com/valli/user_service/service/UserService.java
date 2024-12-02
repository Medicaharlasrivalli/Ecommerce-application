package com.valli.user_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.valli.user_service.Mail.EmailService;
import com.valli.user_service.Mail.OTPGenerator;
import com.valli.user_service.feign.CartInterface;
import com.valli.user_service.feign.OrdersInterface;
import com.valli.user_service.feign.WishListInterface;
import com.valli.user_service.model.LoginResult;
import com.valli.user_service.model.User;
import com.valli.user_service.repo.UserRepository;
import com.valli.user_service.security.JWTService;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CartInterface cartInterface;
	
	@Autowired
	OrdersInterface ordersInterface;
	
	@Autowired
	OTPGenerator otpGenerator;
	
	@Autowired
	WishListInterface wishListInterface;

	@Autowired
	EmailService emailService;
	
	@Autowired
	JWTService jwtService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);
	
	public ResponseEntity<Object> userRegister(User user) {
		try {
			System.out.println(user);
			List<User> user1=userRepository.findByEmail(user.getEmail());
			if(user1.size()==0) {
				String cartID=cartInterface.createCart(List.of()).getBody();
				String wishListID=wishListInterface.createWishList(List.of()).getBody();
				String ordersID=ordersInterface.createOrders(List.of()).getBody();
				user.setCartID(cartID);
				user.setWishListID(wishListID);
				user.setOrdersID(ordersID);
				user.setPassword(encoder.encode(user.getPassword()));
				userRepository.save(user);
				return new ResponseEntity<>(user,HttpStatus.OK);
			}
			else
				return new ResponseEntity<>("already registered",HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> userLogin(String email, String password) {
		try {
			Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			if(authentication.isAuthenticated()) {
				String tokenString= jwtService.generateToken(email);
				User user=userRepository.findByEmail(email).get(0);
				LoginResult result=new LoginResult();
				result.setUser(user);
				result.setToken(tokenString);
				return new ResponseEntity<Object>(result,HttpStatus.OK);
			}
			}catch (Exception e) {
				e.printStackTrace();
			}
		return new ResponseEntity<>("Failed",HttpStatus.OK);
	}

	public ResponseEntity<String> verifyUser(User user) {
		try {
			System.out.println(user.getEmail());
			List<User> user1=userRepository.findByEmail(user.getEmail());
			System.out.println(user1);
			if(user1.size()==0) {
			String optString=OTPGenerator.generateOTP();
			emailService.sendOtpEmail(user.getEmail(), optString, user.getFirstName());
			return new ResponseEntity<String>(optString,HttpStatus.OK);
			}
			else {
				return new ResponseEntity<String>("User already registered",HttpStatus.OK);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>("fail",HttpStatus.OK);
	}

	public boolean validateToken(String token) {
		return jwtService.validateToken(token);
	}

	public ResponseEntity<User> getUserByEmail(String email) {
		try {
			System.out.println(email);
			User user=userRepository.findByEmail(email).get(0);
			System.out.println(user);
			return new ResponseEntity<User>(user,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		User user1=new User();
		return new ResponseEntity<User>(user1,HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<String> updatePassword(String user_id, String password) {
		try {
			User user=userRepository.findById(user_id).get();
			user.setPassword(encoder.encode(password));
			userRepository.save(user);
			return new ResponseEntity<String>("success",HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>("Fail",HttpStatus.BAD_REQUEST);
	}

}

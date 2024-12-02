package com.valli.user_service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.valli.user_service.model.User;
import com.valli.user_service.repo.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user=userRepository.findByEmail(username).get(0);
		System.out.println(user.getEmail());
		if(user==null) {
			throw new UsernameNotFoundException("user not found");
		}
		return new UserPrincipal(user);
	}
	
}

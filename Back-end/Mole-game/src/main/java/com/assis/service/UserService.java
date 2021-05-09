package com.assis.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.assis.domain.User;
import com.assis.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;
	
	public List<User> allUsers() {
		return repository.findAll();
	}
	
	public User newUser(@RequestBody User user) {
		return repository.save(user);
	}
	
}

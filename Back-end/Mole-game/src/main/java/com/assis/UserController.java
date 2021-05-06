package com.assis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	UserRepository repository;
	
	@GetMapping("/users")
	public List<User> allUsers() {
		return repository.findAll();
	}
	
	@PostMapping
	public User newUser(@RequestBody User user) {
		return repository.save(user);
	}
	
	
}

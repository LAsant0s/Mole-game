package com.assis.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assis.domain.User;
import com.assis.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService service;
	
	@GetMapping
	public List<User> allUsers() {
		return service.allUsers();
	}
	
	@PostMapping("/newUser")
	public User newUser(@RequestBody User user) {
		return service.newUser(user);
	}
	
	
}

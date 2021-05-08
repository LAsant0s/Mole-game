package com.assis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assis.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}

package com.assis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.assis.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}

package com.assis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.assis.domain.Rank;

@Repository
public interface RankRepository extends JpaRepository<Rank, Integer> {

	@Query(value = "select * from rank r order by r.score desc limit 5", nativeQuery = true)
	List<Rank> findAllAndSort();
	
}

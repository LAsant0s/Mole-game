package com.assis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.assis.domain.Rank;

@Repository
public interface RankRepository extends JpaRepository<Rank, Integer> {

	@Query(value = "select * from rank r where level = ? order by r.score desc limit 5", nativeQuery = true)
	List<Rank> findAllAndSort(String level);
	
	//retornar os primeiros cinco maiores rankings do jogo desenvolvido na atividade 5.
	List<Rank> findTop5ByOrderByScoreDesc();

}

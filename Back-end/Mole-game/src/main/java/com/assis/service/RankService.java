package com.assis.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.assis.domain.Rank;
import com.assis.repository.RankRepository;

import exceptions.LowerScoreException;

@Service
public class RankService {

	@Autowired
	RankRepository repository;
	
	public Rank saveOrUpdateRank(@RequestBody Rank newRank) {
		Rank rank = findRankByUserId(newRank.getUser().getId(), newRank.getLevel());

		if(rank == null) {
			return repository.save(newRank);
		}
		
		if(newRank.getScore() <= rank.getScore()) {
			throw new LowerScoreException("Score antigo: " + rank.getScore());
		}
		
		rank.setScore(newRank.getScore());
		
		return repository.save(rank);
	}
	
	public Rank findRankByUserId (Integer id, String level) {
		List<Rank> ranks = repository.findAll();
		
		for(Rank rank : ranks) {
			if(rank.getUser().getId() == id && rank.getLevel().equalsIgnoreCase(level)) {
				return rank;
			}
		}

		return null;
	}
	
	public List<Rank> findAllAndSort(String level) {
		return repository.findAllAndSort(level);
	}
	
	
}

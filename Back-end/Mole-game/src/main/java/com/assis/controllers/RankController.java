package com.assis.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assis.domain.Rank;
import com.assis.service.RankService;

@RestController
@RequestMapping("/rank")
public class RankController {
	
	@Autowired
	private RankService service; 
	
	@GetMapping("/l={level}")
	public List<Rank> findAllAndSort(@PathVariable String level) {
		return service.findAllAndSort(level);
	}
	
	@PostMapping("/saveRank")
	public Rank SaveOrUpdateRank(@RequestBody Rank rank) {
		return service.saveOrUpdateRank(rank);
	}
	
	@GetMapping("/topRanks")
	public List<Rank> findTop5ByOrderByScoreDesc() {
		return service.findTop5ByOrderByScoreDesc();
	}
	
}

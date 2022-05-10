package com.ml.service;

import com.ml.model.Ship;
import com.ml.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Service
public class ShipService {
	@Autowired
	private ShipRepository shipRepository;

	//추가
	@Transactional
	public void insert(Ship ship) {
		shipRepository.save(ship);
	}
	//전체보기
	public List<Ship> list(){
		return shipRepository.findAll();
	}
	//전체보기(페이징)
	public Page<Ship> findAll(Pageable pageable ){
		return shipRepository.findAll(pageable);
	}
	//개수
	public Long count() {
		return shipRepository.count();
	}
	//상세보기
	@Transactional
	public Ship findById(Long num) {
		Ship ship = shipRepository.findById(num).get();
//		ship.setHitcount(ship.getHitcount()+1);
		return ship;
	}
	//수정하기 ==>더티체킹
//	@Transactional
//	public void update(Ship ship) {
//		Ship b = shipRepository.findById(ship.getNum()).get();
//		b.setContent(ship.getContent());
//		b.setTitle(ship.getTitle());
//	}
	//삭제
	@Transactional
	public void delete(Long num) {
		//shipRepository.deleteById(num); //실행됨
		shipRepository.deleteByNum(num);

	}
}

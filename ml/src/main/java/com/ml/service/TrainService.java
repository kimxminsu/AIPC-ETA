package com.ml.service;

import com.ml.model.Train;
import com.ml.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Service
public class TrainService {
	@Autowired
	private TrainRepository trainRepository;

	//추가
	@Transactional
	public void insert(Train train) {
		trainRepository.save(train);
	}
	//전체보기
	public List<Train> list(){
		return trainRepository.findAll();
	}
	//전체보기(페이징)
	public Page<Train> findAll(Pageable pageable ){
		return trainRepository.findAll(pageable);
	}
	//개수
	public Long count() {
		return trainRepository.count();
	}
	//상세보기
	@Transactional
	public Train findById(Long num) {
		Train train = trainRepository.findById(num).get();
//		train.setHitcount(train.getHitcount()+1);
		return train;
	}
	//수정하기 ==>더티체킹
//	@Transactional
//	public void update(Train train) {
//		Train b = trainRepository.findById(train.getNum()).get();
//		b.setContent(train.getContent());
//		b.setTitle(train.getTitle());
//	}
	//삭제
	@Transactional
	public void delete(Long num) {
		//trainRepository.deleteById(num); //실행됨
		trainRepository.deleteByNum(num);

	}
}

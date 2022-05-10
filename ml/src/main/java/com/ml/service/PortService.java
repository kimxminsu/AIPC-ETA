package com.ml.service;

import com.ml.model.Port;
import com.ml.repository.PortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Service
public class PortService {
	@Autowired
	private PortRepository portRepository;

	//추가
	@Transactional
	public void insert(Port port) {
		portRepository.save(port);
	}
	//전체보기
	public List<Port> list(){
		return portRepository.findAll();
	}
	//전체보기(페이징)
	public Page<Port> findAll(Pageable pageable ){
		return portRepository.findAll(pageable);
	}
	//개수
	public Long count() {
		return portRepository.count();
	}
	//상세보기
	@Transactional
	public Port findById(Long num) {
		Port port = portRepository.findById(num).get();
//		port.setHitcount(port.getHitcount()+1);
		return port;
	}
	//수정하기 ==>더티체킹
//	@Transactional
//	public void update(Port port) {
//		Port b = portRepository.findById(port.getNum()).get();
//		b.setContent(port.getContent());
//		b.setTitle(port.getTitle());
//	}
	//삭제
	@Transactional
	public void delete(Long num) {
		//portRepository.deleteById(num); //실행됨
		portRepository.deleteByNum(num);

	}
}

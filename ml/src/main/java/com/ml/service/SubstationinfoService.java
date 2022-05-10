package com.ml.service;

import com.ml.model.Board;
import com.ml.model.SubstationInfo;
import com.ml.repository.BoardRepository;
import com.ml.repository.SubstationinfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Service
public class SubstationinfoService {
	@Autowired
	private SubstationinfoRepository substationinfoRepository;
	
	//추가
	@Transactional
	public void insert(SubstationInfo substationinfo) {
		substationinfoRepository.save(substationinfo);
	}
//	//전체보기
//	public List<Board> list(){
//		return boardRepository.findAll();
//	}
//	//전체보기(페이징)
//	public Page<Board> findAll(Pageable pageable ){
//		return boardRepository.findAll(pageable);
//	}
//	//개수
//	public Long count() {
//		return boardRepository.count();
//	}
//	//상세보기
//	@Transactional
//	public Board findById(Long num) {
//		Board board = boardRepository.findById(num).get();
////		board.setHitcount(board.getHitcount()+1);
//		return board;
//	}
//	//수정하기 ==>더티체킹
////	@Transactional
////	public void update(Board board) {
////		Board b = boardRepository.findById(board.getNum()).get();
////		b.setContent(board.getContent());
////		b.setTitle(board.getTitle());
////	}
//    //삭제
//	@Transactional
//	public void delete(Long num) {
//		//boardRepository.deleteById(num); //실행됨
//		boardRepository.deleteByNum(num);
//
//	}
}

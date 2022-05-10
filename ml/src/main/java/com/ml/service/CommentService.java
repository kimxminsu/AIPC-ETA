//package com.ml.service;
//
//import com.ml.model.Board;
//import com.ml.model.Comment;
//import com.ml.repository.BoardRepository;
//import com.ml.repository.CommentRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@Service
//public class CommentService {
//	private final CommentRepository commentRepository;
//	private final BoardRepository boardRepository;
//	//댓글쓰기
//	@Transactional
//	public void insert(Comment comment) {
//		//board  의  replycnt 1증가
//		//Optional<Board> b=boardRepository.findById(comment.getBoard().getNum());
//	    //b.get().setReplycnt(b.get().getReplycnt()+1);
//
//		Board b=boardRepository.findById(comment.getBoard().getNum()).get();
//		b.setReplycnt(b.getReplycnt()+1);
//
//		//댓글추가
//		//commentRepository.save(comment);
//
//		//JPQL
//		commentRepository.commentInsert(
//				comment.getContent(),
//				comment.getBoard().getNum(),
//				comment.getUser().getId()
//			  );
//	}
//	//댓글리스트
//	public List<Comment> list(Long bnum){
//		return commentRepository.findByBnum(bnum);
//	}
//
//	//댓글삭제
//	@Transactional
//	public void delete(Long num) {
//		commentRepository.deleteById(num);
//	}
//
//
//}

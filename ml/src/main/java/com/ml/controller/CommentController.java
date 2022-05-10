//package com.ml.controller;
//
//import com.ml.config.auth.PrincipalDetails;
//import com.ml.model.Board;
//import com.ml.model.Comment;
//import com.ml.service.CommentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RequestMapping("/reply/*")
//@RestController
//public class CommentController {
//	@Autowired
//	private CommentService commentService;
//
//	@PostMapping("insert/{num}")
//	//@ResponseBody
//	public ResponseEntity<String> commentInsert(@PathVariable Long num,
//			@RequestBody Comment comment,
//			@AuthenticationPrincipal PrincipalDetails principal) {
//		Board b = new Board();
//		b.setNum(num);
//		comment.setBoard(b);//  board
//
//		System.out.println("principal.getUser() : " + principal.getUser());
//		comment.setUser(principal.getUser());  //user
//
//		commentService.insert(comment);
//		return new ResponseEntity<String>("success", HttpStatus.OK);
//	}
//		//댓글리스트
//	@GetMapping("list/{num}")
//	public List<Comment> list(@PathVariable Long num){
//		List<Comment> clist = commentService.list(num);
//		return clist;
//	}
//
//	//댓글삭제
//	@DeleteMapping("delete/{num}")
//	public Long delete(@PathVariable Long num) {
//		commentService.delete(num);
//		return num;
//	}
//
//
//}

package com.ml.controller;

//import com.ml.config.auth.PrincipalDetails;
import com.ml.model.Board;
import com.ml.service.BoardService;
import com.ml.web.Test;
import com.ml.web.UpdateBizParm;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/board/*")
public class BoardController {
    @Autowired
    private BoardService boardService;

//    @GetMapping("insert")
////    @PreAuthorize("isAuthenticated()")
//    public String insert() {
//        return "/board/insert";
//    }

//    @PostMapping("insert")
//    public String insert(Board board, @AuthenticationPrincipal PrincipalDetails principal) {
//        boardService.insert(board, principal.getUser());
//        return "redirect:/board/list";
//    }

    //입력
//    @PostMapping("insert")
//    public String insert(Board board) {
//        boardService.insert(board);
//        return "redirect:/board/list";
//    }

    //생성(create)
    @PostMapping("insert")
    @ResponseBody
//    public String insert(UpdateBizParm<Board> parm) throws Exception {
    public UpdateBizParm<Board> insert(@RequestBody Test<Board> parm) throws Exception {
        Board board = parm.getData().getItem();
        boardService.insert(board);
        System.out.println("board:"+board.getNum());
        System.out.println("board:"+board);
//        System.out.println("board:"+board.getId());
        return parm.getData();
    }

    //조회(read)
    @GetMapping("insert")
    @ResponseBody
    public List<Board> list() throws Exception {
        List<Board> list = boardService.list();
        System.out.println("list:"+list);

        return list;
    }



    //전체보기(페이징X)
//	@GetMapping("list")
//	public String list(Model model) {
//		model.addAttribute("lists", boardService.list());
//		model.addAttribute("count", boardService.count());
//		return "/board/list";
//
//	}

//    //전체보기(페이징)
//    @GetMapping("list")
//    public String list(Model model, @PageableDefault(size = 5, sort = "num", direction = Sort.Direction.DESC) Pageable pageable) {
//        Page<Board> lists = boardService.findAll(pageable);
//        model.addAttribute("lists", lists);
//        model.addAttribute("count", boardService.count());
//        model.addAttribute("rowNo", boardService.count() - (lists.getNumber() * pageable.getPageSize()));
//        return "/board/list";
//    }
//
//    //조회
//    @GetMapping("view/{num}")
//    public String view(@PathVariable Long num, Model model) {
//        model.addAttribute("board", boardService.findById(num));
//        return "/board/view";
//    }

    //수정폼
//    @GetMapping("update/{num}")
//    public String update(@PathVariable Long num, Model model) {
//        model.addAttribute("board", boardService.findById(num));
//        return "/board/update";
//    }

    //수정
//    @PutMapping("update")
//    @ResponseBody
//    public String update(@RequestBody Board board) {
//        boardService.update(board);
//        return "success";
//    }

    //삭제
    @DeleteMapping("insert/{id}")
    @ResponseBody
    public void delete(@RequestBody Test<Board> parm, @PathVariable String id) {
        boardService.delete(parm.getData().getItems().get(0).getNum());
//        boardService.delete(parm.getData().getItems().get(0).getId());
        System.out.println("parm.num:"+parm.getData().getItems().get(0).getNum());
        System.out.println("parm.id:"+parm.getData().getItems().get(0).getId());
        return;
    }


}

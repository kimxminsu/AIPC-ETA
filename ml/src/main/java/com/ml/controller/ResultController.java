package com.ml.controller;

//import com.ml.config.auth.PrincipalDetails;

import com.ml.model.Result;
import com.ml.service.ResultService;
import com.ml.web.Test;
import com.ml.web.UpdateBizParm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/result")
public class ResultController {
  @Autowired
  private ResultService resultService;


//    @GetMapping("insert")
////    @PreAuthorize("isAuthenticated()")
//    public String insert() {
//        return "/result/insert";
//    }

//    @PostMapping("insert")
//    public String insert(Result result, @AuthenticationPrincipal PrincipalDetails principal) {
//        resultService.insert(result, principal.getUser());
//        return "redirect:/result/list";
//    }

  //입력
//    @PostMapping("insert")
//    public String insert(Result result) {
//        resultService.insert(result);
//        return "redirect:/result/list";
//    }

  //생성(create)
  @PostMapping("/insert")
  @ResponseBody
//    public String insert(UpdateBizParm<Result> parm) throws Exception {
  public UpdateBizParm<Result> insert(@RequestBody Test<Result> parm) throws Exception {
    Result result = parm.getData().getItem();
    resultService.insert(result);
    System.out.println("result:"+result.getNum());
    System.out.println("result:"+result);
//        System.out.println("result:"+result.getId());
    return parm.getData();
  }

  //조회(read)
  @GetMapping("/insert")
  @ResponseBody
  public List<Result> list(@ModelAttribute Result parm) throws Exception {
    Result result = parm;
//    List<Result> list = resultService.findByoriginport(parm.getOriginPort());
//    List<Result> list = resultService.findAllByoriginport(parm.getOriginPort());

    List<Result> list = resultService.findAllBythreedata(parm.getOriginPort(), parm.getDestinationPort(), parm.getShiptype());
    System.out.println(parm.getOriginPort());
//    System.out.println("list:"+list.get(0));
    return list;
  }

  //조회(read)
//  @GetMapping("/insert")
//  public List<Result> list() throws Exception {
////    model.addAttribute("result", resultService.findById(parm.vsl);
//    List<Result> list = resultService.list();
////    System.out.println("list:"+list.get(0));
//
//    return list;
//  }



  //전체보기(페이징X)
//	@GetMapping("list")
//	public String list(Model model) {
//		model.addAttribute("lists", resultService.list());
//		model.addAttribute("count", resultService.count());
//		return "/result/list";
//
//	}




//    //전체보기(페이징)
//    @GetMapping("list")
//    public String list(Model model, @PageableDefault(size = 5, sort = "num", direction = Sort.Direction.DESC) Pageable pageable) {
//        Page<Result> lists = resultService.findAll(pageable);
//        model.addAttribute("lists", lists);
//        model.addAttribute("count", resultService.count());
//        model.addAttribute("rowNo", resultService.count() - (lists.getNumber() * pageable.getPageSize()));
//        return "/result/list";
//    }
//
//    //조회
//    @GetMapping("view/{num}")
//    public String view(@PathVariable Long num, Model model) {
//        model.addAttribute("result", resultService.findById(num));
//        return "/result/view";
//    }

  //수정폼
//    @GetMapping("update/{num}")
//    public String update(@PathVariable Long num, Model model) {
//        model.addAttribute("result", resultService.findById(num));
//        return "/result/update";
//    }

  //수정
//    @PutMapping("update")
//    @ResponseBody
//    public String update(@RequestBody Result result) {
//        resultService.update(result);
//        return "success";
//    }

  //삭제
  @DeleteMapping("insert/{id}")
  @ResponseBody
  public void delete(@RequestBody Test<Result> parm, @PathVariable String id) {
//    resultService.delete(parm.getData().getItems().get(0).getNum());
//        resultService.delete(parm.getData().getItems().get(0).getId());
    System.out.println("parm.num:"+parm.getData().getItems().get(0).getNum());
//        System.out.println("parm.id:"+parm.getData().getItems().get(0).getId());
    return;
  }


}

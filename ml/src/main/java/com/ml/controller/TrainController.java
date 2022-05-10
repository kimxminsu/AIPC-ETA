package com.ml.controller;

//import com.ml.config.auth.PrincipalDetails;

//import com.ml.model.Train;
import com.ml.model.Train;
import com.ml.service.TrainService;
import com.ml.web.Test;
import com.ml.web.UpdateBizParm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/train/*")
public class TrainController {
    @Autowired
    private TrainService trainService;


    //생성(create)
    @PostMapping("insert")
    @ResponseBody
//    public String insert(UpdateBizParm<Train> parm) throws Exception {
    public UpdateBizParm<Train> insert(@RequestBody Test<Train> parm) throws Exception {
        Train train = parm.getData().getItem();
        trainService.insert(train);
        System.out.println("train:"+train.getNum());
//        System.out.println("train:"+train.getId());
        return parm.getData();
    }

    //조회(read)
    @GetMapping("insert")
    @ResponseBody
    public List<Train> list() throws Exception {
        List<Train> list = trainService.list();
        System.out.println("list:"+list);

        return list;
    }


    //삭제
    @DeleteMapping("insert/{id}")
    @ResponseBody
    public void delete(@RequestBody Test<Train> parm, @PathVariable String id) {
        trainService.delete(parm.getData().getItems().get(0).getNum());
//        trainService.delete(parm.getData().getItems().get(0).getId());
        System.out.println("parm.num:"+parm.getData().getItems().get(0).getNum());
//        System.out.println("parm.id:"+parm.getData().getItems().get(0).getId());
        return;
    }


}

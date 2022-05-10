package com.ml.controller;

//import com.ml.config.auth.PrincipalDetails;

//import com.ml.model.Ship;
import com.ml.model.Ship;
import com.ml.service.ShipService;
import com.ml.web.Test;
import com.ml.web.UpdateBizParm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/ship/*")
public class ShipController {
    @Autowired
    private ShipService shipService;


    //생성(create)
    @PostMapping("insert")
    @ResponseBody
//    public String insert(UpdateBizParm<Ship> parm) throws Exception {
    public UpdateBizParm<Ship> insert(@RequestBody Test<Ship> parm) throws Exception {
        Ship ship = parm.getData().getItem();
        shipService.insert(ship);
        System.out.println("ship:"+ship.getNum());
//        System.out.println("ship:"+ship.getId());
        return parm.getData();
    }

    //조회(read)
    @GetMapping("insert")
    @ResponseBody
    public List<Ship> list() throws Exception {
        List<Ship> list = shipService.list();
        System.out.println("list:"+list);

        return list;
    }


    //삭제
    @DeleteMapping("insert/{id}")
    @ResponseBody
    public void delete(@RequestBody Test<Ship> parm, @PathVariable String id) {
        shipService.delete(parm.getData().getItems().get(0).getNum());
//        shipService.delete(parm.getData().getItems().get(0).getId());
        System.out.println("parm.num:"+parm.getData().getItems().get(0).getNum());
//        System.out.println("parm.id:"+parm.getData().getItems().get(0).getId());
        return;
    }


}

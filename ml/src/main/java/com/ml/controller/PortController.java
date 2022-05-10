package com.ml.controller;

//import com.ml.config.auth.PrincipalDetails;

//import com.ml.model.Port;
import com.ml.model.Port;
import com.ml.service.PortService;
import com.ml.web.Test;
import com.ml.web.UpdateBizParm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/port/*")
public class PortController {
    @Autowired
    private PortService portService;


    //생성(create)
    @PostMapping("insert")
    @ResponseBody
//    public String insert(UpdateBizParm<Port> parm) throws Exception {
    public UpdateBizParm<Port> insert(@RequestBody Test<Port> parm) throws Exception {
        Port port = parm.getData().getItem();
        portService.insert(port);
        System.out.println("port:"+port.getNum());
//        System.out.println("port:"+port.getId());
        return parm.getData();
    }

    //조회(read)
    @GetMapping("insert")
    @ResponseBody
    public List<Port> list() throws Exception {
        List<Port> list = portService.list();
        System.out.println("list:"+list);

        return list;
    }


    //삭제
    @DeleteMapping("insert/{id}")
    @ResponseBody
    public void delete(@RequestBody Test<Port> parm, @PathVariable String id) {
        portService.delete(parm.getData().getItems().get(0).getNum());
//        portService.delete(parm.getData().getItems().get(0).getId());
        System.out.println("parm.num:"+parm.getData().getItems().get(0).getNum());
//        System.out.println("parm.id:"+parm.getData().getItems().get(0).getId());
        return;
    }


}

package com.ml.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ml.model.Flask;
import com.ml.model.SubstationInfo;
import com.ml.repository.SubstationinfoRepository;
import com.ml.service.BoardService;
import com.ml.service.FlaskService;
//import jdk.nashorn.internal.parser.JSONParser;
import com.ml.service.SubstationinfoService;
import org.json.simple.parser.JSONParser;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

//[cmd] cd C:\Users\MS.Kim\flask\myproject
//[cmd] conda activate py36
//[cmd (py36)] set FLASK_APP=app.py
//[cmd (py36)] flask run
//[chrome] http://127.0.0.1:5000/
//[cmd] conda deactivate

@RestController
public class FlaskController {
    @Autowired
    private FlaskService flaskService;

    @Autowired
    private SubstationinfoService substationinfoService;

    @RequestMapping(value = "/fromflask", method = RequestMethod.GET)
    public String flasktest() {

//        ModelAndView mav = new ModelAndView();

        String url = "http://127.0.0.1:5000/predict";
        String sb = "";
        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
            String line = null;
            while ((line = br.readLine()) != null) {

                sb = sb + line + "\n";
            }
            if (sb.toString().contains("ok")) {
                System.out.println("test");
            }
            br.close();
            System.out.println("sb: " + sb);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
//        mav.addObject("test1", sb.toString()); // "test1"는 jsp파일에서 받을때 이름,
//        //sb.toString은 value값(여기에선 test)
//        mav.addObject("fail", false);
//        mav.setViewName("test");   // jsp파일 이름

//
//        JSONParser jsonParser = new JSONParser();
//        JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
//        JSONObject CardSubwayStatsNew = (JSONObject)jsonObject.get("CardSubwayStatsNew");
//        Long totalCount=(Long)CardSubwayStatsNew.get("list_total_count");
//
//        JSONObject subResult = (JSONObject)CardSubwayStatsNew.get("RESULT");
//        JSONArray infoArr = (JSONArray) CardSubwayStatsNew.get("row");
//
//        for(int i=0;i<infoArr.size();i++){
//            JSONObject tmp = (JSONObject)infoArr.get(i);
//            SubstationInfo infoObj=new SubstationInfo(i+(long)1, (String)tmp.get("USE_DT"),(String)tmp.get("LINE_NUM"),(String)tmp.get("SUB_STA_NM"),
//                (double)tmp.get("RIDE_PASGR_NUM"), (double)tmp.get("ALIGHT_PASGR_NUM"),(String)tmp.get("WORK_DT"));
//        }

//        flaskService.insert(sb);
        return sb;
    }

    @RequestMapping(value = "/api", method = RequestMethod.GET)
//    @PostMapping("/api")
    public String load_save(){
        String result = "";

        try {
            URL url = new URL("http://127.0.0.1:5000/predict");
            BufferedReader bf;
            bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();
//            JsonPar
            JSONParser jsonParser = new JSONParser();
            JSONArray infoArr = new JSONArray();
            infoArr = (JSONArray)jsonParser.parse(result);
//            infoArr.add(jsonObject);
            JSONObject tmp = new JSONObject();
            for(int i=0;i<100;i++) {
                tmp = (JSONObject)infoArr.get(i);
                SubstationInfo infoObj = new SubstationInfo(i, tmp.get("0").toString(), tmp.get("1").toString(),
                    tmp.get("2").toString(), tmp.get("3").toString(), tmp.get("4").toString(), tmp.get("5").toString());
                substationinfoService.insert(infoObj);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }
        return "redirect:/findname";
    }



}

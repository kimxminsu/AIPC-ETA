package com.ml.controller;

//import com.ml.model.User;
//import com.ml.repository.UserRepository;
//import com.ml.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
//	@Autowired
//	private UserService uservice;
//	@Autowired
//	private UserRepository userRepository;

	@GetMapping("/")
	public String home() {
		System.out.println("home");
		return "home";
	}



//	//회원가입폼
//	@GetMapping("register")
//	public String register() {
//		return "/user/join";
//	}
//
//	//로그인폼
//	@GetMapping("login")
//	public String login() {
//		return "/user/login";
//	}
//	//회원가입
//	@PostMapping("register")
//	@ResponseBody
//	public String register(@RequestBody User user) {
//		if(userRepository.findByUsername(user.getUsername())!=null) {
//			return "fail";
//		}
//		uservice.register(user);
//		return "success";
//	}
	
	
	
	
}

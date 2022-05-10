//package com.ml.service;
//
//import com.ml.model.User;
//import com.ml.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class UserService {
//	@Autowired
//	private UserRepository userRepository;
//	@Autowired
//	private BCryptPasswordEncoder encoder;
//
//	//회원가입
//	@Transactional
//	public void register(User user) {
//		//비번 암호화
//		String rawPassword = user.getPassword();
//		String encPassword = encoder.encode(rawPassword);
//
//		user.setPassword(encPassword);
//		user.setRole("ROLE_USER");
//		userRepository.save(user);
//	}
//
//}

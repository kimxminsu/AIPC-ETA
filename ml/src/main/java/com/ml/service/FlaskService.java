package com.ml.service;

import com.ml.model.Flask;
//import com.ml.model.User;
import com.ml.repository.FlaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional(readOnly = true)
@Service
public class FlaskService {
  @Autowired
  private FlaskRepository flaskRepository;

  //추가
  @Transactional
  public void insert(Flask flask) {
    flaskRepository.save(flask);
  }
  //전체보기
  public List<Flask> list(){
    return flaskRepository.findAll();
  }
  //전체보기(페이징)
  public Page<Flask> findAll(Pageable pageable ){
    return flaskRepository.findAll(pageable);
  }

//  public List<Flask> findAll() {
//    String sql = "select `id`, `room_id`, `user_id`, `check_in`, `check_out`, `number_of_people`, `total_price` from booking";
//    return jdbcTemplate.query(sql, bookingRowMapper());
//  }
//
//  private RowMapper<Flask> bookingRowMapper() {
//    return (resultSet, rowNum) -> {
//      Flask flask = new Flask(resultSet.getLong("id"), resultSet.getLong("room_id"), resultSet.getLong("user_id"),
//          resultSet.getDate("check_in").toLocalDate(), resultSet.getDate("check_out").toLocalDate(), resultSet.getInt("number_of_people"),
//          resultSet.getInt("total_price"));
//      return flask;
//    };
//  }
  //개수
  public Long count() {
    return flaskRepository.count();
  }
  //상세보기
  @Transactional
  public Flask findById(Long num) {
    Flask flask = flaskRepository.findById(num).get();
//		flask.setHitcount(flask.getHitcount()+1);
    return flask;
  }
  //수정하기 ==>더티체킹
//	@Transactional
//	public void update(Flask flask) {
//		Flask b = flaskRepository.findById(flask.getNum()).get();
//		b.setContent(flask.getContent());
//		b.setTitle(flask.getTitle());
//	}
  //삭제
//  @Transactional
//  public void delete(Long num) {
//    //flaskRepository.deleteById(num); //실행됨
//    flaskRepository.deleteByNum(num);
//
//  }
}

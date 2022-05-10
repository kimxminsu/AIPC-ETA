package com.ml.service;

import com.ml.model.Result;
import com.ml.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Service
public class ResultService {
  @Autowired
  private ResultRepository resultRepository;

  //추가
  @Transactional
  public void insert(Result result) {
    resultRepository.save(result);
  }
  //전체보기
  public List<Result> list(){
    return resultRepository.findAll();
  }
  //전체보기(페이징)
  public Page<Result> findAll(Pageable pageable ){
    return resultRepository.findAll(pageable);
  }
  //개수
  public Long count() {
    return resultRepository.count();
  }
  //상세보기
  @Transactional
  public Result findById(Long num) {
    Result result = resultRepository.findById(num).get();
//		result.setHitcount(result.getHitcount()+1);
    return result;
  }
  //수정하기 ==>더티체킹
//	@Transactional
//	public void update(Result result) {
//		Result b = resultRepository.findById(result.getNum()).get();
//		b.setContent(result.getContent());
//		b.setTitle(result.getTitle());
//	}
  //삭제
  @Transactional
  public void delete(Long num) {
    //resultRepository.deleteById(num); //실행됨
    resultRepository.deleteByNum(num);

  }

  public List<Result> findByoriginport(String originPort) {
    return resultRepository.findByoriginport(originPort);
  }
  public List<Result> findAllByoriginport(String originPort) {
    return resultRepository.findAllByOriginPort(originPort);
  }

  public List<Result> findAllBythreedata(String originPort, String destinationPort, String shiptype) {
    return resultRepository.findAllByOriginPortAndDestinationPortAndShiptype(originPort, destinationPort, shiptype);
  }
}

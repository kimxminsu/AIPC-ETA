package com.ml.repository;

import com.ml.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long>{
	public void deleteByNum(Long num);

	@Query(value="select sc.* from result sc where origin_port=?1",nativeQuery = true)
	public List<Result> findByoriginport(String originPort);

	public List<Result> findAllByOriginPort(String originPort);

	public List<Result> findAllByOriginPortAndDestinationPortAndShiptype(String orginPort, String destinationPort, String shipytype);
}

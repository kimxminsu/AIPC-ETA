package com.ml.repository;

import com.ml.model.Ship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipRepository extends JpaRepository<Ship, Long>{
	public void deleteByNum(Long num);

}

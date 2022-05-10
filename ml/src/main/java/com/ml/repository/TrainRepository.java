package com.ml.repository;

import com.ml.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainRepository extends JpaRepository<Train, Long>{
	public void deleteByNum(Long num);

}

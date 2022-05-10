package com.ml.repository;

import com.ml.model.Port;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortRepository extends JpaRepository<Port, Long>{
	public void deleteByNum(Long num);

}

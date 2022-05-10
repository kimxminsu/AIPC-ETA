package com.ml.repository;

import com.ml.model.Board;
import com.ml.model.SubstationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubstationinfoRepository extends JpaRepository<SubstationInfo, Long>{
//	public void deleteByNum(Long num);

//	@Modifying
//	@Query(value = "insert into tbl_comment3(content, regdate, bnum,user_id) values(?1 , now(), ?2,?3)", nativeQuery = true)
//	public void commentInsert(String content, Long bnum, Long user_id);
//
//	//Board.java  에서 user 가 @ManyToOne(fetch = FetchType.Eager)
//	//@Query("select sc  from tbl_comment3 sc where  bnum = ?1")
//
//	//LAZY 를 사용하면
//	@Query("select sc from board sc join fetch sc.board where num=?1")
//	public List<Board> findByBnum(Long bnum);

}

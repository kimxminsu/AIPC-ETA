//package com.ml.model;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import lombok.Getter;
//import lombok.Setter;
//import org.hibernate.annotations.CreationTimestamp;
//
//import javax.persistence.*;
//import java.util.Date;
//
//@Getter  @Setter
//@Entity(name="tbl_comment3")
//public class Comment {
//	@Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long cnum;
//	private String content;
//	@CreationTimestamp
//	@Temporal(TemporalType.TIMESTAMP)
//    @JsonFormat(pattern ="yyyy-MM-dd")
//	private Date regdate;
//
//	@ManyToOne
//	@JoinColumn(name = "bnum")
//	private Board board;
//
//	@ManyToOne
//	@JoinColumn(name ="user_id")
//	private User user;
//
//}

package com.ml.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ml.web.BaseDataItem;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity(name="board")
public class Board extends BaseDataItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long num;
	private String id;
	private String name;
	private String age;
	private String email;
	private String phone;

}

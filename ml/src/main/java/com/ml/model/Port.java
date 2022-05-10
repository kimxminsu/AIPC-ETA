package com.ml.model;

import com.ml.web.BaseDataItem;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name="port")
public class Port extends BaseDataItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long num;
//  private String id;
  private String code;
  private String name;

}
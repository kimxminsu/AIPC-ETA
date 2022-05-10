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
@Entity(name="result")
public class Result extends BaseDataItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long num;
//  private String vsl;
//  private String id;
//  private String accum_time;
//  private String accum_dist;
  private String accumTime;
  private String accumDist;
  private String efficiency;
  private String geohash;
  private String shiptype;
  private String dimA;
  private String dimB;
  private String draught;
  private String destinationPort;
//  private String origin_port;
  private String originPort;

}
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
@Entity(name="train")
public class Train extends BaseDataItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long num;
  private String imo;
  private String timestampPosition;
  private String positionDate;
  private String shipType;
  private String draught;
  private String destinationPort;
  private String lat;
  private String lon;
  private String heading;
  private String course;
  private String geometry;
  private String arrivalPort;
  private String arrivalDate;
  private String departurePort;
  private String departureDate;

}
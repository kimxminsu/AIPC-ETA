package com.ml.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class SubstationInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String USE_DT;
  private String LINE_NUM;
  private String SUB_STA_NM;
  private String RIDE_PASGR_NUM;
  private String ALIGHT_PASGR_NUM;
  private String WORK_DT;

  public SubstationInfo() {}


  public SubstationInfo(int id, String USE_DT, String LINE_NUM,
                        String SUB_STA_NM, String RIDE_PASGR_NUM, String ALIGHT_PASGR_NUM,
                        String WORK_DT) {
    this.id = id;
    this.USE_DT = USE_DT;
    this.LINE_NUM = LINE_NUM;
    this.SUB_STA_NM = SUB_STA_NM;
    this.RIDE_PASGR_NUM = RIDE_PASGR_NUM;
    this.ALIGHT_PASGR_NUM = ALIGHT_PASGR_NUM;
    this.WORK_DT = WORK_DT;

  }
}
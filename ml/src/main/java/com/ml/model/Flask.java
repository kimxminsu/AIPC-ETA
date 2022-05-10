//package com.ml.model;
//
//import com.ml.web.BaseDataItem;
//import lombok.Getter;
//import lombok.Setter;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//
//@Getter
//@Setter
//@Entity(name="flask")
//public class Flask extends BaseDataItem {
//  @Id
//  private String id;
//
//}

package com.ml.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="flask")
@Data
public class Flask {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String USE_DT;
  private String LINE_NUM;
  private String SUB_STA_NM;
  private double RIDE_PASGR_NUM;
  private double ALIGHT_PASGR_NUM;
  private String WORK_DT;

  public Flask() {}


  public Flask(Long id, String USE_DT, String LINE_NUM,
                        String SUB_STA_NM, double RIDE_PASGR_NUM, double ALIGHT_PASGR_NUM,
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
var CodeConstants = {};

/********************************************/
/*         VesselSelectionComponent         */
/********************************************/
CodeConstants.VesselDepartureTypes ={
    BOTH:'BOTH',
    CALLING:'CALLING',
    BEFORE:'BEFORE',
    AFTER:'AFTER',
    ASSIGN:'ASSIGN',
    ALL:'ALL'
}

CodeConstants.VesselScheduleTypes ={
    BARGE:'BARGE',
    CALLING:'CALLING',
    ALL:'ALL',
    CALLING_STORAGE:'CALLING_STORAGE',
    STORAGE:'STORAGE',
    CALLING_BARGE:'CALLING_BARGE',
    
    BEFORE:'BEFORE',			/*Not Supporeted*/
    AFTER:'AFTER',			/*Not Supporeted*/
    BOTH:'BOTH',			/*Not Supporeted*/
    BEFORE_ALL:'BEFORE_ALL',		/*Not Supporeted*/
    AFTER_ALL:'AFTER_ALL',		/*Not Supporeted*/
    BOTH_ALL:'BOTH_ALL',		/*Not Supporeted*/
    BEFORE_STORAGE:'BEFORE_STORAGE',	/*Not Supporeted*/
    AFTER_STORAGE:'AFTER_STORAGE',	/*Not Supporeted*/
    BOTH_STORAGE:'BOTH_STORAGE',	/*Not Supporeted*/
    BEFORE_ASSGIN:'BEFORE_ASSGIN'	/*Not Supporeted*/
}

CodeConstants.CntrState = {
  RESERVED: "R",
  BOOKING: "B",
  STACKING: "Y",
  IN_PROGRESS_INCOMING: "O",
  IN_PROGRESS_OUTGOING: "G",
  UNDER_SHIFTING: "Z",
  DELIVERED:"D"
}
CodeConstants.YesNo = {
  YES: "Y",
  NO: "N"
}
CodeConstants.YpBizConstant = {
  ALL_MARK: "*",
  ALL_VVD: "*-*-*",
  ALL_CODE: "ALL",
  ALL_SQUARE: "[ALL]"
}
CodeConstants.CTBizConstant = {
  YesNo: {
    YES: "Y",
    NO: "N"
  },
  CntrLength: {
    L10: "1",
    L20: "2",
    L40: "4",
    L30: "3",
    L45: "L",
    L48: "M",
    L53: "P"
  },
  BlockType: {
    SC: "S",
    RS: "R",
    FL: "F",
    TC: "T"
  }
}
/**
 * PopupService Constants
 */
var PopupServiceConstants = function(){}

PopupServiceConstants.COUNTRY_CODE = 'Country Code';
PopupServiceConstants.PARTNER_OPERATOR = 'Shipping Co.';
PopupServiceConstants.PARTNER_FORWARDER = 'Forwarder';
PopupServiceConstants.PARTNER_GOVERNMENT = 'Police';
PopupServiceConstants.PARTNER_TRUCKINGCO = 'Trucker';
PopupServiceConstants.PARTNER_SHIP_AGENT = 'Ship Agent';
PopupServiceConstants.SERVICE_LANES = 'Service Lanes';
PopupServiceConstants.VESSEL_OPERATION_SUMMARY_IN_LANE = 'Vessel Operation Summary In Lane';
PopupServiceConstants.VESSEL_OPERATION_SUMMARY_OUT_LANE = 'Vessel Operation Summary Out Lane';
PopupServiceConstants.SHIPPER_CONSIGNEE = 'Shipper/Consignee';
PopupServiceConstants.VESSEL_CODES = 'Vessel Codes';
PopupServiceConstants.PORT_ITEMS = 'Port Items';
PopupServiceConstants.VESSEL_OPERATION_SUMMARY_POD = 'Vessel Operation Summary POD';
PopupServiceConstants.VESSEL_OPERATION_SUMMARY_POL = 'Vessel Operation Summary POL';
PopupServiceConstants.PORT_POR = 'Port POR';
PopupServiceConstants.PORT_POD = 'Port POD';
PopupServiceConstants.PORT_FDEST = 'Port FDEST';
PopupServiceConstants.PORT_FPOD = 'Port FPOD';
PopupServiceConstants.STORAGE_CODE = 'STORAGE CODE';
PopupServiceConstants.CODEMASTER_DELV_IMPORT = 'DELVI';
PopupServiceConstants.CODEMASTER_DELV_EXPORT = 'DELVX';
PopupServiceConstants.CODEMASTER_DELV_YARD = 'DELVY';
PopupServiceConstants.CODEMASTER_TRANS = 'TRAN';
PopupServiceConstants.CODEMASTER_DAMAGE_CONDITION = 'DMGC';
PopupServiceConstants.CODEMASTER_CNTR_CONDITION = 'CND';
PopupServiceConstants.GENERAL_HANDLING_INST = 'HND';
PopupServiceConstants.GENERAL_ABSOLUTE_CONST = 'ABS';
PopupServiceConstants.GENERAL_INSPECTIONTYPE_CONST = 'ISP';
PopupServiceConstants.GENERAL_COMMODITY = 'CMT';
PopupServiceConstants.GENERAL_BREAKBULK_WORKING_TYPE = 'BBO';
PopupServiceConstants.GENERAL_WASH_CLEANING_TYPE = 'CLN';
PopupServiceConstants.GENERAL_PACKAGE = 'PKG';
PopupServiceConstants.ISO_SZTP2 = 'SZTP2';
		
//Added By Mingu.Kim 2013.02.08
PopupServiceConstants.YARDHANDLING_INSTRUCTION = 'YardHandling Instruction';
PopupServiceConstants.LCL_FCL = 'LCL FCL';
PopupServiceConstants.RETURN_TO_TERMINAL_REASON = 'Return To Terminal Reason';
PopupServiceConstants.CONTAINER_LENTH = 'Container Length';
PopupServiceConstants.FULL_EMPTY = 'Full Empty';
PopupServiceConstants.IN_OUT = 'In Out';
PopupServiceConstants.YES_NO = 'Yes No';
PopupServiceConstants.SHIPPING_AGENT = 'Shipping Agent';
PopupServiceConstants.TRUCKER = 'Trucker';
		/////////////////////////////////////////////
		
		//Added By Mingu.Kim 2013.02.27
PopupServiceConstants.TRANSPORTATION = 'Transporatation';
PopupServiceConstants.ALLINACE_CODE = 'Alliance Code';
PopupServiceConstants.GRP_WITH_AUTH = 'GroupIDs With Auth';
PopupServiceConstants.GRP_WITHOUT_AUTH = 'GroupIDs Without Auth';
PopupServiceConstants.STAT_CLASS_CODE = 'Statistics Class Code';
PopupServiceConstants.CARGO_TYPE = 'CGTP';
PopupServiceConstants.STOP_REASON = 'StopReason';
PopupServiceConstants.STAT_PROCNAME = 'Procedure Name';
		
		//Added By Mingu.Kim 2013.03.20
PopupServiceConstants.STAT_YARD_WORKING_TYPE = 'YardWorking Type';
		//Added By Mingu.Kim 2013.03.22
PopupServiceConstants.STAT_OCCUPANCY_CLASS = 'Occupancy Class';
		//Added By Mingu.Kim 2016.02.04
PopupServiceConstants.EQU_NO = 'Equ No';
		//Added By Mingu.Kim 2016.02.04
PopupServiceConstants.TRAIN_CODE = 'Train';
		///////////////////////////////////////////////////////////
		// Equipment Productivity
		////////////////////////////////////////////////////////////
PopupServiceConstants.STAT_EQUIPMENT_TYPE = 'equipmentType';
PopupServiceConstants.STAT_EQUIPMENT_NO = 'equipmentNo';
PopupServiceConstants.STAT_EQUIPMENT_NO_GC = 'GC';
PopupServiceConstants.EQU_YT_CODE = 'YT';
		///////////////////////////////////////////////////////////
		// Special Service Request
		////////////////////////////////////////////////////////////
PopupServiceConstants.SPECIAL_SERVICE_REQUEST_CODE = 'SpecialServiceRequest Code';
PopupServiceConstants.PAYER_TYPE = 'Payer type';
PopupServiceConstants.TERMIANL_HOLD_CODE = 'Terminal Hold Code';
PopupServiceConstants.BLOCK = 'Block';
PopupServiceConstants.AREA = 'Area';
PopupServiceConstants.EQUIPMENT_DRIVER = 'EQUIPMENT DRIVER';
PopupServiceConstants.MOVEMENT_TYPE = 'MOVEMENT TYPE';
		
		// Yard Define
PopupServiceConstants.CODEMASTER_GATE_TYPE             = 'GTTP';
PopupServiceConstants.CODEMASTER_GATE_IO_TYPE          = 'GTIO';
PopupServiceConstants.CODEMASTER_CABIN_POSITION 		 = 'CAPS';
PopupServiceConstants.CODEMASTER_CHASSIS_TYPE 		 = 'CSTP';
PopupServiceConstants.CODEMASTER_FACILITY_USAGE_TYPE	 = 'FCUS';
PopupServiceConstants.CODEMASTER_TRUCK_TYPE	         = 'TKTP';
PopupServiceConstants.CODEMASTER_BLOCK_USAGE_TYPE      = 'BKUS';
PopupServiceConstants.DEDICATED_BERTH = 'Dedicated Berth';
PopupServiceConstants.EMPTY_VANPOOL_TYPE = 'Empty VanPool Type';
PopupServiceConstants.PAYMENT_TYPE = 'Payment Type';
PopupServiceConstants.SERVICE_LANE_PORT_CODE = 'Service Lane Port Code';
PopupServiceConstants.VESSEL_TYPE1 = 'VTP1';
PopupServiceConstants.VESSEL_TYPE2 = 'VTP2';
PopupServiceConstants.VESSEL_TYPE3 = 'VTP3';
PopupServiceConstants.VESSEL_CONDITION = 'Vessel Condition';
PopupServiceConstants.ALONG_SIDE = 'AlongSide';
PopupServiceConstants.RPM_TYPE = 'RPM Type';
PopupServiceConstants.HATCH_COVER_TYPE = 'Hatch Cover Type';
PopupServiceConstants.STOWAGE_MATERIAL_TYPE = 'Stowage Material Type';
PopupServiceConstants.DG_PACKING_GROUP = 'DG Packing Group';
PopupServiceConstants.CODEMASTER_MARINE_POLLUTANT = 'DG Marine Pollutant';
PopupServiceConstants.CODEMASTER_WEIGHT_GROUP = 'WGTP';
PopupServiceConstants.CODEMASTER_DEFECTIVE_CODE = 'DFCD';
PopupServiceConstants.CODEMASTER_CLEAN_CODE = 'CNCD';
PopupServiceConstants.CODEMASTER_POWER_CODE = 'POWR';
PopupServiceConstants.CODEMASTER_CFS_TYPE = 'STTP';
PopupServiceConstants.CODEMASTER_BUNDLE_PACK_UNPACK = 'BNPT';
PopupServiceConstants.CODEMASTER_RECOMMEND_POSITION = 'REPO';
PopupServiceConstants.GNRL_YSLOT_NOT_IN_USE_REASON     = 'NUR';
PopupServiceConstants.GATE_IN_NO = 'Gate In No';
PopupServiceConstants.GATE_OUT_NO = 'Gate Out No';
PopupServiceConstants.GENERAL_DAMAGE_CODE = 'CDT';
PopupServiceConstants.GENERAL_DAMAGE_DETAIL = 'CDP';
PopupServiceConstants.GENERAL_DAMAGE_FOUND = 'DIT';
PopupServiceConstants.GENERAL_DAMAGE_MEASUREMENT = 'CDM';
PopupServiceConstants.GENERAL_CLEAN_TYPE = 'CCT';
PopupServiceConstants.CODEMASTER_REMARSHALLING_GROUP = 'HKGP';
PopupServiceConstants.GENERAL_REMARSHALLING_REASON = 'BRS';
PopupServiceConstants.CODEMASTER_BAY_ROW_PRTY = 'BRPT';
PopupServiceConstants.CODEMASTER_DS_METHOD = 'RLMH';
PopupServiceConstants.YP_GROUPING_PATTERN = 'Grouping Pattern';
PopupServiceConstants.YP_POSITIONING_RULE = 'Positioning Rule';
PopupServiceConstants.YARD_JOB_CODE = 'Yard Job Code';		
PopupServiceConstants.CONTAINER_LENGTH = 'Container Length';
PopupServiceConstants.CONTAINER_HEIGHT_WIDTH = 'Container Height Width';
PopupServiceConstants.CONTAINER_TYPE = 'Container Type';
PopupServiceConstants.IMDG = 'IMDG';
PopupServiceConstants.UNNO = 'UNNO';
PopupServiceConstants.BITT = 'BITT';

//Tonny.Kim.2020.03.26
//Trade Partner
PopupServiceConstants.TML_ID = 'TML_ID';

//Syntax
PopupServiceConstants.MSG_IDVER = 'MSG_IDVER';

//Convert Code
PopupServiceConstants.TP = 'TP';

//Error Code
PopupServiceConstants.MSG_ID = 'MSG_ID';

//InterchangeAgreement
PopupServiceConstants.MSG_VER = 'MSG_VER';

//MessageMonitoring
PopupServiceConstants.TML = 'TML';
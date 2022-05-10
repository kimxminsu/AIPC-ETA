/**
 * Code Constants
 * 조건문에 사용되는 코드 상수
 * 공통 정보는 iotos-common/resources/constants/CodeConstants 에서 관리
 */
var CodeConstantsOM = function(){};

CodeConstantsOM.commonCode = {
   isoType6346 : '6346',
   isoType2716 : '2716',
   Operator : 'OPR',
   size : 'size',
   type : 'type',
   CURRENT_COUNTRY_CODE : 'KR',
   CURRENT_PORT_CODE : 'PUS', //21.08.23 SJ.Choi 터미널명 변경
   UNLO : 'UNLo',
   ADDMOVINS_MOVINS : 'AddMovinsMovins',
   ONLY_ADDMOVINS : 'OnlyAddMovins',
   ONLY_MOVINS : 'OnlyMovins',
   MATCHED : 'Matched',
   UNMATCHED : 'Unmatched',
   WEIGHT_TOLERANCE : 'WeightTolerance',
   VERIFIED : 'Verified',
   UNVERIFIED : 'Unverified',
   CANCEL : 'Cancel',
   RETURN : 'Return',
   RETURN_CANCEL : 'Return/Cancel',
   WGT_VGM : 'WgtVgm',
   DUMMY_CALL_YEAR_SEQ : '0000',
   DUMMY_VESSEL_TYPE : 'TMPV',
   RESERVED : 'Reserved',
   IN_YARD : 'Inyard',
   DELIVERED : 'Delivered',
   INVENTORY : 'Inventory',
   DG_INFORMATION : 'DgInformation',
   EXPORT_RESERVED : 'ExportReserved',
   ASSIGN : 'Assign',
   ROLLBACK : 'Rollback',
   EXPORT_CHANGE : 'ExportChange',
   IMPORT_EXPORT : 'ImportExport',
   REEXPORT: 'Reexport',
   IMPORT_STORAGE : 'ImportStorage',
   IX_STORAGE_TO_EMPTY_STORAGE : 'IxStorageToEmptyStorage',
   STORAGE_TO_IMPORT_STORAGE : 'StorageToImportStorage',
   IX_STORAGE_TO_EXPORT : 'IxStorageToExport',  
   STORAGE_EXPORT : 'StorageExport',
   STORAGE_CHANGE : 'StorageChange',
   EXPORT_STORAGE : 'ExportStorage',
   EXPORT_TO_IX_STORAGE : 'ExportToIxStorage',
   IMPORT_STORAGE_TO_STORAGE : 'ImportStorageToStorage',
   ALL : 'ALL'
},

CodeConstantsOM.vesselScheduleType = {
   CALLING : 'CALLING',
   CALLING_STORAGE : 'CALLING_STORAGE',
   STORAGE : 'STORAGE',
   CALLING_BARGE : 'CALLING_BARGE',
   ALL : 'ALL'
},

CodeConstantsOM.vesselDepartureType = {
   BOTH : 'BOTH',
   CALLING : 'CALLING',
	BEFORE : 'BEFORE',
	AFTER : 'AFTER',
	ASSIGN : 'ASSIGN',
	ALL : 'ALL'
},

CodeConstantsOM.loadingConfirm = {
   VERIFIED : 'N',
   UNVERIFIED : 'U',
   CANCEL : 'C',
   RETURN : 'R'
}

CodeConstantsOM.containerState = {
   RESERVED : 'R',
   BOOKED : 'B',
   STACKED : 'Y',
   OUTGOING : 'G',
   INCOMING : 'O',
   UNDER_SHIFTING : 'Z',
   DELIVERED : 'D'
}

CodeConstantsOM.retrieveFromOthers = {
   EXPORT : 'Export',
   IMPORT : 'Import',
   STORAGE : 'Storage'
}

CodeConstantsOM.compareMode = {
   COPRAR_LOADINGLIST : 'CoprarLoading',
   ONLY_LOADINGLIST : 'OnlyLoading',
   ADDBAPLIE_BAPLIE : 'Both',
   ONLY_ADDBAPLIE : 'AddBaplie',
   ONLY_BAPLIE : 'Baplie',
   COPRAR_BAPLIE : 'CoprarBaplie',
   ONLY_COPRAR : 'OnlyCoprar',
   ONLY_BAPLIE2 : 'OnlyBaplie',
   MANIFEST_BAPLIE : 'Both',
   ONLY_MANIFEST : 'Manifest'
}

CodeConstantsOM.ixcd = {
   IMPORT : "I",
   IMPORT_STORAGE : "D",
   EXPORT : "X",
   EXPORT_STORAGE : "R",
   STORAGE : "V"
}

CodeConstantsOM.transportType = {
   VESSEL : "V",
   RAIL : "R",
   TRUCK : "T",
   CFS : "C",
   MODE_CHANGE : "M",
   BARGE : "B",
   SHUTTLE : "S",
   RE_EXPORT : "X",
   INTER_TERMINAL : "I",
   BUNDLE : "P",
   CONSOLIDATE : "N"
}

CodeConstantsOM.workGroupType = {
   INTER_TERMINAL_IN : "TI",
   INTER_TERMINAL_OUT : "TO",
   RAILL_PREARRANGE_IN : "RI",
   RAILL_PREARRANGE_OUT : "RO"
}

CodeConstantsOM.quayJobType = {
   LOADING : "GL",
   DISCHARGING : "GD",
   TWO_TIME_SHIFTING_LOADING : "SL",
   TWO_TIME_SHIFTING_DISCHARGING : "SD",
   ONE_TIME_SHIFTING : "SS"
}

CodeConstantsOM.configurationVariable = {
   GWCT_isProvideCustoms : false
}

CodeConstantsOM.tableName = {
   RESERVE_TABLE_NAME : "TB_RESERVE",
   INVENTORY_TABLE_NAME : "TB_INVENTORY",
   MASTER_TABLE_NAME : "TB_MASTER",
   THRU_TABLE_NAME : "TB_THRU",
   BARGEJOB_TABLE_NAME : "TB_BARGE_JOB",
   RAILJOB_TABLE_NAME : "TB_RAIL_JOB",         
   BAPLIE_TABLE_NAME : "TB_BAPLIE",
   BAPLIE_DT_DTL_TABLE_NAME : "TB_BAPLIE_DG_DTL",
   OVERSIZE_TABLE_NAME : "TB_OVERSIZE",
   CODECO_TABLE_NAME : "TB_CODECO",
   COPRAR_TABLE_NAME : "TB_COPRAR",
   COPRAR_RAIL_TABLE_NAME : "TB_COPRAR_RAIL",
   BOOKING_TABLE_NAME : "TB_BOOKING",
   DBLBERTH_TABLE_NAME : "TB_DBLBERTH",
   HOLD_STATE_TABLE_NAME : "TB_HOLD_STATE",
   POSITIONING_TABLE_NAME : "TB_POSITIONING",
   SHIPPLAN_TABLE_NAME : "TB_SHIPPLAN",
   GATE_TRAN_TABLE_NAME : "TB_GATE_TRAN",
   GATETRAN_BACKUP_TABLE_NAME : "TB_GATETRAN_BACKUP",
   MOVINS_TABLE_NAME : "TB_MOVINS",
   MANIFEST_TABLE_NAME : "TB_MANIFEST",
   DG_TABLE_NAME : "TB_DG",
   INSPECT_DTL_TABLE_NAME : "TB_INSPECT_DTL",
   GC_ODR_TABLE_NAME : "TB_GC_ODR",
   GCODR_BACKUP_TABLE_NAME : "TB_GCODR_BACKUP",
   BB_TABLE_NAME : "TB_BB",
   BB_CNTR_TABLE_NAME : "TB_BB_CNTR",
   BB_OPR_TABLE_NAME : "TB_BB_OPR",
   YARD_JOB_TABLE_NAME : "TB_YARD_JOB",
   INTERFACE_VRN_TABLE_NAME : "IF_VRN"
}

CodeConstantsOM.delivery = {
   DIRECT_DELIVERY : "D",
   TRANSSHIPMENT : "S",
   HOTCONNECTION : "Q",
   TS_TO_OTHER_TERMINAL : "P",
   TS_FROM_OTHER_TERMINAL : "Z",
   SHIFTING : "T",
   DIRECT_LOADING_TS_FROM_OTHER_TERMINAL : "X",
   RE_EXPORT : "E",
   NORMAL : "N",
   TO_BE_TS_TO_SAME_VESSEL : "V"
}

CodeConstantsOM.reserveType = {
   DISCHARGING : "D",
   LOADING : "B",
   LOADING_GATE : "X",
   RAIL_DISCHARGING : "R",
   TS_LOADING : "S",
   RETURN_TO_TERMINAL : "T"
}

CodeConstantsOM.dummyVesselCode = {
   STORAGE : "STRG",
   EMPTY : "EMTY",
   TOBEASSIGNED : "TBA",
   MISSING : "MISS",
   DUMMY : "DUMY",
   FULL : "FULL",
   OTHER : "OTHR"
}

CodeConstantsOM.cntrState = {
   RESERVED : "R",
   BOOKING : "B",
   STACKING : "Y",
   IN_PROGRESS_INCOMING : "O",
   IN_PROGRESS_OUTGOING : "G",
   UNDER_SHIFTING : "Z",
   DELIVERED : "D"
}

CodeConstantsOM.mediumType = {
   EDI : "E",
   MANUAL : "M",
   INTERFACE : "I",
   API : "A",
   GATE : "G",
   WEB : "W"
}

CodeConstantsOM.vesselChangeMode = {
   EXPORT_VESSEL_CHANGE : "EXPORT_VESSEL_CHANGE",
   EXPORT_TO_STORAGE : "EXPORT_TO_STORAGE",
   IMPORT_TO_EXPORT : "IMPORT_TO_EXPORT",
   EXPORT_TO_IMPORT : "EXPORT_TO_IMPORT",
   IMPORT_TO_REEXPORT : "IMPORT_TO_REEXPORT",
   REEXPORT_TO_IMPORT : "REEXPORT_TO_IMPORT",
   STORAGE_VESSEL_CHANGE : "STORAGE_VESSEL_CHANGE",
   IMPORT_TO_STORAGE : "IMPORT_TO_STORAGE",
   STORAGE_TO_IMPORT : "STORAGE_TO_IMPORT",
   STORAGE_TO_EXPORT : "STORAGE_TO_EXPORT",
   IX_STORAGE_TO_EMPTY_STORAGE : "IX_STORAGE_TO_EMPTY_STORAGE",
   IX_STORAGE_TO_EXPORT : "IX_STORAGE_TO_EXPORT",
   EXPORT_TO_IX_STORAGE : "EXPORT_TO_IX_STORAGE",
   STORAGE_TO_IMPORT_STORAGE : "STORAGE_TO_IMPORT_STORAGE",
   IMPORT_STORAGE_TO_STORAGE : "IMPORT_STORAGE_TO_STORAGE"
}

CodeConstantsOM.cntrMode = {
   ALL : "ALL",
   RESERVE : "RESERVE",
   INVENTORY : "INVENTORY",
   MASTER : "MASTER"
}

CodeConstantsOM.holdMode = {
   ALL : "ALL",
   HOLDING : "HOLDING",
   RELEASED : "RELEASED",
   NONE : "NONE"
}

CodeConstantsOM.holdType = {
   ALL_HOLD : "A",
   CUSTOM_HOLD : "C",
   TERMINAL_HOLD : "T"
}

CodeConstantsOM.specialServiceRequestSearchMode = {
   ALL : "ALL",
   CNTRWISE : "CNTRWISE",
   NONCNTR : "NONCNTR"
}

CodeConstantsOM.departureType = {
   ALL : "All", 
   RESERVED : "BeforeArrival", 
   IN_YARD : "Inventory", 
   DELIVERED : "AfterDeparture", 
   THROUGH : "Through"
}

CodeConstantsOM.bundlePackType = {
   PACKED : "P", 
   UN_PACKED : "U", 
   DELETE : "D"
}

CodeConstantsOM.paymentType = {
   CASH : "M", 
   CREDIT : "C", 
   NONE : "N"
}

CodeConstantsOM.gridColumnConfig = {
   HIDDEN : "H"
}



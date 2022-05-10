/*
 * CodeConstants.js for SP
 * @Author: SL.Choi 
 * @Date: 2020-06-25 13:27:52
 * @Last Modified by: SL.Choi 
 * @Last Modified time: 2020-06-25 13:27:52
 */

 		// IX CD
CodeConstants.IX_IMPORT = 'I';
CodeConstants.IX_EXPORT  = 'X';
CodeConstants.IX_STORAGE = 'V';
CodeConstants.IX_EXPORT_STORAGE = 'R';
CodeConstants.IX_IMPORT_STORAGE = 'D';

		// RST TIME
CodeConstants.RST_NONE = 0;
CodeConstants.RST_ONETIME = 1;
CodeConstants.RST_TWOTIME = 2;
CodeConstants.RST_ROB = 3;

		// QJOB TYPE
CodeConstants.QJ_DISCHARGING = 'GD';
CodeConstants.QJ_LOADING = 'GL';
CodeConstants.QJ_TWO_TIME_SHIFTING_LOADING = 'SL';
CodeConstants.QJ_TWO_TIME_SHIFTING_DISCHARGING = 'SD';
CodeConstants.QJ_ONE_TIME_SHIFTING = 'SS';

CodeConstants.Color = {
	borderColor: 'c0c0c0', //silver
	borderDark: '808080', //gray
	tsLocalColor: 'a52a2a',
	tsPortColor: '008000',

	fixedStoppageBackColor: 'ffa07a',
	notFixedStoppageBackColor: 'ee82ee',

	slimCellGuideColor: '9acd32',

	portBackColor: 'ffffff',
	portForeColor: '000000',

	portBackColor1: 'c0c0c0',
	portForeColor1: '000000',

	// portBackColor[2]: FromArgb(0, 255, 255),
	// portForeColor[2]: '000000',

	// portBackColor[3]: FromArgb(255, 0, 0),
	// portForeColor[3]: White,

	// portBackColor[4]: FromArgb(0, 255, 0),
	// portForeColor[4]: '000000',

	// portBackColor[5]: FromArgb(0, 0, 255),
	// portForeColor[5]: '000000',

	// portBackColor[6]: FromArgb(255, 255, 0),
	// portForeColor[6]: '000000',

	// portBackColor[7]: 'ff00ff',
	// portForeColor[7]: 'ffffff',

};

//planDirection
CodeConstants.PlanDirection = {
    HORIZONTAL: "H",
	VERTICAL: "V"
};
//loading option
CodeConstants.LoadingPlanOptionType = {
    SHIP2YARD: "S",
	YARD2SHIP: "Y"
};
//cntrState
CodeConstants.CntrState = {
    RESERVED: "R",
	BOOKING: "B",
	STACKING: "Y",
	IN_PROGRESS_INCOMING: "O",
	IN_PROGRESS_OUTGOING: "G",
	UNDER_SHIFTING: "Z",
	DELIVERED: "D"
};

CodeConstants.CntrType = {
    GENERAL_DRAY: "G0",
	OPEN_SIDE: "G2",
	VENTILATION: "V0",
	DRY_BULK: "B0",
	NAMED_CARGO: "S0",
	REFRIGERATED: "R0",
	REFRIGERATED_HEATED: "H0",
	OPEN_TOP: "U0",
	PLATFORM: "P0",
	PLATFORM_FIXED: "P1",
	TANK: "T0",
	AIR_SURFACE: "A0"
};

CodeConstants.CargoType = {
    GENERAL: "GP",
	EMPTY: "MT",
	REEFER: "RF",
	DANGEROUS: "DG",
	EMPTY_DANGEROUS: "ED",
	DANGEROUS_REEFER: "DR",
	BUNDLE: "BN",
	BREAK_BULK: "BB",
	OVER_DIMENSION: "AK",
	FRAGILE: "FR"
};

CodeConstants.Delivery = {
    DIRECT_DELIVERY: "D",
	TRANSSHIPMENT: "S",
	HOTCONNECTION: "Q",
	TS_TO_OTHER_TERMINAL: "P",
	TS_FROM_OTHER_TERMINAL: "Z",
	SHIFTING: "T",
	DIRECT_LOADING_TS_FROM_OTHER_TERMINAL: "X",
	RE_EXPORT: "E",
	NORMAL: "N",
	TO_BE_TS_TO_SAME_VESSEL: "V"
};

CodeConstants.PlanType = {
    DISCHARGE: 1, //"ib", 자바 Constant에 맞춤
	LOAD: 2, //"ob",
	GENERAL: 3   
};

CodeConstants.AllocType = {
    ALLOC: "A",
	DEALLOC: "D",
};

CodeConstants.TransportType = {
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
};

CodeConstants.ModeDetailType = {
    IB: "0",
	OB: "1",
	RSTIB: "2",
	RSTOB: "3",
	ROB: "4",
	PRF: "5",
};

CodeConstants.IrregularType = {
    None : "None",
	// Ship Position
	WrongShipPosition : "WrongShipPosition",
	MissingShipPosition : "MissingShipPosition", 
	DuplicatedShipPosition : "DuplicatedShipPosition",
	DuplicatedShipPositionWithIB : "DuplicatedShipPositionWithIB",   //SP130611-30
	DuplicatedShipPositionWithOB : "DuplicatedShipPositionWithOB",   //SP130611-30
	NoMatchSizePosition : "NoMatchSizePosition",

	// Yard Position
	WrongYardPosition : "WrongYardPosition",
	MissingYardPosition : "MissingYardPosition",
	DuplicatedYardPosition : "DuplicatedYardPosition",

	DuplicatedCntrNO : "DuplicatedCntrNO",
	MissingPOD : "MissingPOD",
	MissingSztp2 : "MissingSztp2",

	PODNotMatch : "PODNotMatch",
	SizeNotMath : "SizeNotMath",

	MissingDelvOrShiftTime : "MissingDelvOrShiftTime",     //SP130603-70

	// Irregular Summary
	StackWgt : "StackWgt",
	RFReceptacle : "RFReceptacle",
	IMDGSegregation : "IMDGSegregation",
	VoidSpace : "VoidSpace",
	OverSlotted : "OverSlotted",
	HatchCoverClearance : "HatchCoverClearance",
	CellGuideClearance : "CellGuideClearance",
	IncorrectCntrNo : "IncorrectCntrNo",
	RestowingHatchCover : "RestowingHatchCover",
	RestowingPortRotation : "RestowingPortRotation",
	HCLimitationInHold : "HCLimitationInHold"
};

CodeConstants.IrregularRemarkType = {
	NULL : "0",
	IB : "1",
	OB : "2",
	RSTIB : "3",
	RSTOB : "4",
	ROB : "5",
	PRF : "6",
	FIXED : "7",
	REPLAN : "8", //SP131226-20, 0045365
	DG_SEGREGATION : "9"
};

// CodeConstants.IOModeType = {
// 	IN : "1",
// 	OUT : "2",
// 	INOUT : "3",
// 	FUTURE : "4"
// };

CodeConstants.IOModeType = {
	IN : 1,
	OUT : 2,
	INOUT : 3,
	FUTURE : 4
};

CodeConstants.IOMode = {
	IN : "I",
	OUT : "O",
};

CodeConstants.HoldDeck = {
	NONE : "NONE",
	Hold : "Hold",
	Deck : "Deck"
};

CodeConstants.DeckHoldType = {
	DECK : 1,
	HOLD : 2,
	DECKHOLD : 3
}

CodeConstants.VesselJobType = {
	NONE : "NONE",
	LOADING : "LOADING",
	DISCHARGING : "DISCHARGING",
	ONE_BAY_SHIFTING : "ONE_BAY_SHIFTING",
	HATCH_COVER_OPERATION : "HATCH_COVER_OPERATION"
};

CodeConstants.InboundPlanMode = {
	NONE : "NONE",
	IB_Ship : "IB_Ship",
	IB_Yard : "IB_Yard",
	IB_QC : "IB_QC",
	IB_Time : "IB_Time",
	IB_ShipRe : "IB_ShipRe",
	IB_Shift : "IB_Shift",
	IB_ROB : "IB_ROB",
	IB_POD : "IB_POD",
	IB_Exchange : "IB_Exchange",
	IB_Move : "IB_Move",
	IB_SlotStoppage : "IB_SlotStoppage",
};

CodeConstants.OutboundPlanMode = {
	NONE : "NONE",
	OB_Ship : "OB_Ship",
	OB_PRF : "OB_PRF",
	OB_QC : "OB_QC",
	OB_ShipRe : "OB_ShipRe",
	OB_SetCNTR : "OB_SetCNTR",
	OB_Exchange : "OB_Exchange",
	OB_Move : "OB_Move",
	OB_PRFnShip : "OB_PRFnShip",
	OB_SlotStoppage : "OB_SlotStoppage",//added by sh.song 2014-08-12 : add function "Slot Stoppage"
	OB_SetNotMixableSlot : "OB_SetNotMixableSlot"
};

CodeConstants.ROBPlanMode = {
	NONE : "NONE",
	ROB_TO_RST2 : "ROB_TO_RST2", 
	RST2_TO_ROB : "RST2_TO_ROB",
	RST2_TO_RST1 : "RST2_TO_RST1", //선내 이적
	RST1_TO_RST2 : "RST1_TO_RST2", //선내 이적 되돌리기 RST1_TO_RST2
};

CodeConstants.Menu = {
	MENU_REMOVE_SEQ : "mnuRemoveSEQ",
    MENU_REMOVE_SELECTION : "mnuRemoveSelection",
    MENU_REMOVE_SEQ_PRF : "menuRemoveSEQnPRF",
    MENU_REMOVE_PRF : "mnuRemovePRF",
    MENU_REMOVE_QC : "mnuRemoveQC",
    MENU_REMOVE_RESEQ : "mnuRemoveReSEQ",
    MENU_REMOVE_SELSHIFT : "mnuRemoveSELShift",
    MENU_SET_PRF : "mnuSetPRF",
    MENU_SET_CNTR : "mnuSetCNTR",
    MENU_INSERT_SEQ : "mnuInsertSEQ",
    MENU_INSERT_SEQ_DIRECT : "mnuInsertSEQDirect",
    MENU_MOVE_CNTR : "mnuMoveCntr",
    MENU_MAKE_ROB : "mnuMakeROB",
    MENU_RETURN_RST : "mnuReturnRST",
    MENU_SELECT_RESEQ : "mnuSelectReSEQ",
    MENU_SELECT_SET_OB_POS : "mnuSelectSetOBPos",
    MENU_REMOVE_SEL : "mnuRemoveSEL",
    MENU_REMOVE_FIXED_GROUP : "mnuRemoveFixedGroup",
    MENU_REMOVE_FIXED_SLOT : "mnuRemoveFixedSlot",
    MENU_REMOVE_FIXED_CNTR : "mnuRemoveFixedCntr",
    MENU_REMOVE_NOT_MIXABLE_SLOT : "mnuRemoveNotMixableSlot"
}
/*
 * CodeConstants.js for SP
 * @Author: SL.Choi 
 * @Date: 2020-06-25 13:27:52
 * @Last Modified by: SL.Choi 
 * @Last Modified time: 2020-06-25 13:27:52
 */

 		// IX CD
CodeConstants.IX_IMPORT = 'I';
CodeConstants.IX_EXPORT  = 'X';
CodeConstants.IX_STORAGE = 'V';
CodeConstants.IX_EXPORT_STORAGE = 'R';
CodeConstants.IX_IMPORT_STORAGE = 'D';

		// RST TIME
CodeConstants.RST_NONE = 0;
CodeConstants.RST_ONETIME = 1;
CodeConstants.RST_TWOTIME = 2;
CodeConstants.RST_ROB = 3;

		// QJOB TYPE
CodeConstants.QJ_DISCHARGING = 'GD';
CodeConstants.QJ_LOADING = 'GL';
CodeConstants.QJ_TWO_TIME_SHIFTING_LOADING = 'SL';
CodeConstants.QJ_TWO_TIME_SHIFTING_DISCHARGING = 'SD';
CodeConstants.QJ_ONE_TIME_SHIFTING = 'SS';

//planDirection
CodeConstants.PlanDirection = {
    HORIZONTAL: "H",
	VERTICAL: "V"
};
//loading option
CodeConstants.LoadingPlanOptionType = {
    SHIP2YARD: "S",
	YARD2SHIP: "Y"
};
//cntrState
CodeConstants.CntrState = {
    RESERVED: "R",
	BOOKING: "B",
	STACKING: "Y",
	IN_PROGRESS_INCOMING: "O",
	IN_PROGRESS_OUTGOING: "G",
	UNDER_SHIFTING: "Z",
	DELIVERED: "D"
};

CodeConstants.CntrType = {
    GENERAL_DRAY: "G0",
	OPEN_SIDE: "G2",
	VENTILATION: "V0",
	DRY_BULK: "B0",
	NAMED_CARGO: "S0",
	REFRIGERATED: "R0",
	REFRIGERATED_HEATED: "H0",
	OPEN_TOP: "U0",
	PLATFORM: "P0",
	PLATFORM_FIXED: "P1",
	TANK: "T0",
	AIR_SURFACE: "A0"
};

CodeConstants.CargoType = {
    GENERAL: "GP",
	EMPTY: "MT",
	REEFER: "RF",
	DANGEROUS: "DG",
	EMPTY_DANGEROUS: "ED",
	DANGEROUS_REEFER: "DR",
	BUNDLE: "BN",
	BREAK_BULK: "BB",
	OVER_DIMENSION: "AK",
	FRAGILE: "FR"
};

CodeConstants.Delivery = {
    DIRECT_DELIVERY: "D",
	TRANSSHIPMENT: "S",
	HOTCONNECTION: "Q",
	TS_TO_OTHER_TERMINAL: "P",
	TS_FROM_OTHER_TERMINAL: "Z",
	SHIFTING: "T",
	DIRECT_LOADING_TS_FROM_OTHER_TERMINAL: "X",
	RE_EXPORT: "E",
	NORMAL: "N",
	TO_BE_TS_TO_SAME_VESSEL: "V"
};

CodeConstants.PlanType = {
    DISCHARGE: 1, //"ib", 자바 Constant에 맞춤
	LOAD: 2, //"ob",
	GENERAL: 3   
};

CodeConstants.AllocType = {
    ALLOC: "A",
	DEALLOC: "D",
};

CodeConstants.TransportType = {
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
};

CodeConstants.ModeDetailType = {
    IB: "0",
	OB: "1",
	RSTIB: "2",
	RSTOB: "3",
	ROB: "4",
	PRF: "5",
};

CodeConstants.IrregularType = {
    None : "None",
	// Ship Position
	WrongShipPosition : "WrongShipPosition",
	MissingShipPosition : "MissingShipPosition", 
	DuplicatedShipPosition : "DuplicatedShipPosition",
	DuplicatedShipPositionWithIB : "DuplicatedShipPositionWithIB",   //SP130611-30
	DuplicatedShipPositionWithOB : "DuplicatedShipPositionWithOB",   //SP130611-30
	NoMatchSizePosition : "NoMatchSizePosition",

	// Yard Position
	WrongYardPosition : "WrongYardPosition",
	MissingYardPosition : "MissingYardPosition",
	DuplicatedYardPosition : "DuplicatedYardPosition",

	DuplicatedCntrNO : "DuplicatedCntrNO",
	MissingPOD : "MissingPOD",
	MissingSztp2 : "MissingSztp2",

	PODNotMatch : "PODNotMatch",
	SizeNotMath : "SizeNotMath",

	MissingDelvOrShiftTime : "MissingDelvOrShiftTime",     //SP130603-70

	// Irregular Summary
	StackWgt : "StackWgt",
	RFReceptacle : "RFReceptacle",
	IMDGSegregation : "IMDGSegregation",
	VoidSpace : "VoidSpace",
	OverSlotted : "OverSlotted",
	HatchCoverClearance : "HatchCoverClearance",
	CellGuideClearance : "CellGuideClearance",
	IncorrectCntrNo : "IncorrectCntrNo",
	RestowingHatchCover : "RestowingHatchCover",
	RestowingPortRotation : "RestowingPortRotation",
	HCLimitationInHold : "HCLimitationInHold"
};

CodeConstants.IrregularRemarkType = {
	NULL : "0",
	IB : "1",
	OB : "2",
	RSTIB : "3",
	RSTOB : "4",
	ROB : "5",
	PRF : "6",
	FIXED : "7",
	REPLAN : "8", //SP131226-20, 0045365
	DG_SEGREGATION : "9"
};

// CodeConstants.IOModeType = {
// 	IN : "1",
// 	OUT : "2",
// 	INOUT : "3",
// 	FUTURE : "4"
// };

CodeConstants.IOModeType = {
	IN : 1,
	OUT : 2,
	INOUT : 3,
	FUTURE : 4
};

CodeConstants.IOMode = {
	IN : "I",
	OUT : "O",
};

CodeConstants.HoldDeck = {
	NONE : "NONE",
	Hold : "Hold",
	Deck : "Deck"
};

CodeConstants.DeckHoldType = {
	DECK : 1,
	HOLD : 2,
	DECKHOLD : 3
}

CodeConstants.VesselJobType = {
	NONE : "NONE",
	LOADING : "LOADING",
	DISCHARGING : "DISCHARGING",
	ONE_BAY_SHIFTING : "ONE_BAY_SHIFTING",
	HATCH_COVER_OPERATION : "HATCH_COVER_OPERATION"
};
/*
 * CodeConstants.js for SP
 * @Author: SL.Choi 
 * @Date: 2020-06-25 13:27:52
 * @Last Modified by: SL.Choi 
 * @Last Modified time: 2020-06-25 13:27:52
 */

 		// IX CD
CodeConstants.IX_IMPORT = 'I';
CodeConstants.IX_EXPORT  = 'X';
CodeConstants.IX_STORAGE = 'V';
CodeConstants.IX_EXPORT_STORAGE = 'R';
CodeConstants.IX_IMPORT_STORAGE = 'D';

		// RST TIME
CodeConstants.RST_NONE = 0;
CodeConstants.RST_ONETIME = 1;
CodeConstants.RST_TWOTIME = 2;
CodeConstants.RST_ROB = 3;

		// QJOB TYPE
CodeConstants.QJ_DISCHARGING = 'GD';
CodeConstants.QJ_LOADING = 'GL';
CodeConstants.QJ_TWO_TIME_SHIFTING_LOADING = 'SL';
CodeConstants.QJ_TWO_TIME_SHIFTING_DISCHARGING = 'SD';
CodeConstants.QJ_ONE_TIME_SHIFTING = 'SS';

//planDirection
CodeConstants.PlanDirection = {
    HORIZONTAL: "H",
	VERTICAL: "V"
};
//loading option
CodeConstants.LoadingPlanOptionType = {
    SHIP2YARD: "S",
	YARD2SHIP: "Y"
};
//cntrState
CodeConstants.CntrState = {
    RESERVED: "R",
	BOOKING: "B",
	STACKING: "Y",
	IN_PROGRESS_INCOMING: "O",
	IN_PROGRESS_OUTGOING: "G",
	UNDER_SHIFTING: "Z",
	DELIVERED: "D"
};

CodeConstants.CntrType = {
    GENERAL_DRAY: "G0",
	OPEN_SIDE: "G2",
	VENTILATION: "V0",
	DRY_BULK: "B0",
	NAMED_CARGO: "S0",
	REFRIGERATED: "R0",
	REFRIGERATED_HEATED: "H0",
	OPEN_TOP: "U0",
	PLATFORM: "P0",
	PLATFORM_FIXED: "P1",
	TANK: "T0",
	AIR_SURFACE: "A0"
};

CodeConstants.CargoType = {
    GENERAL: "GP",
	EMPTY: "MT",
	REEFER: "RF",
	DANGEROUS: "DG",
	EMPTY_DANGEROUS: "ED",
	DANGEROUS_REEFER: "DR",
	BUNDLE: "BN",
	BREAK_BULK: "BB",
	OVER_DIMENSION: "AK",
	FRAGILE: "FR"
};

CodeConstants.Delivery = {
    DIRECT_DELIVERY: "D",
	TRANSSHIPMENT: "S",
	HOTCONNECTION: "Q",
	TS_TO_OTHER_TERMINAL: "P",
	TS_FROM_OTHER_TERMINAL: "Z",
	SHIFTING: "T",
	DIRECT_LOADING_TS_FROM_OTHER_TERMINAL: "X",
	RE_EXPORT: "E",
	NORMAL: "N",
	TO_BE_TS_TO_SAME_VESSEL: "V"
};

CodeConstants.PlanType = {
    DISCHARGE: 1, //"ib", 자바 Constant에 맞춤
	LOAD: 2, //"ob",
	GENERAL: 3   
};

CodeConstants.AllocType = {
    ALLOC: "A",
	DEALLOC: "D",
};

CodeConstants.TransportType = {
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
};

CodeConstants.ModeDetailType = {
    IB: "0",
	OB: "1",
	RSTIB: "2",
	RSTOB: "3",
	ROB: "4",
	PRF: "5",
};

CodeConstants.IrregularType = {
    None : "None",
	// Ship Position
	WrongShipPosition : "WrongShipPosition",
	MissingShipPosition : "MissingShipPosition", 
	DuplicatedShipPosition : "DuplicatedShipPosition",
	DuplicatedShipPositionWithIB : "DuplicatedShipPositionWithIB",   //SP130611-30
	DuplicatedShipPositionWithOB : "DuplicatedShipPositionWithOB",   //SP130611-30
	NoMatchSizePosition : "NoMatchSizePosition",

	// Yard Position
	WrongYardPosition : "WrongYardPosition",
	MissingYardPosition : "MissingYardPosition",
	DuplicatedYardPosition : "DuplicatedYardPosition",

	DuplicatedCntrNO : "DuplicatedCntrNO",
	MissingPOD : "MissingPOD",
	MissingSztp2 : "MissingSztp2",

	PODNotMatch : "PODNotMatch",
	SizeNotMath : "SizeNotMath",

	MissingDelvOrShiftTime : "MissingDelvOrShiftTime",     //SP130603-70

	// Irregular Summary
	StackWgt : "StackWgt",
	RFReceptacle : "RFReceptacle",
	IMDGSegregation : "IMDGSegregation",
	VoidSpace : "VoidSpace",
	OverSlotted : "OverSlotted",
	HatchCoverClearance : "HatchCoverClearance",
	CellGuideClearance : "CellGuideClearance",
	IncorrectCntrNo : "IncorrectCntrNo",
	RestowingHatchCover : "RestowingHatchCover",
	RestowingPortRotation : "RestowingPortRotation",
	HCLimitationInHold : "HCLimitationInHold"
};

CodeConstants.IrregularRemarkType = {
	NULL : "0",
	IB : "1",
	OB : "2",
	RSTIB : "3",
	RSTOB : "4",
	ROB : "5",
	PRF : "6",
	FIXED : "7",
	REPLAN : "8", //SP131226-20, 0045365
	DG_SEGREGATION : "9"
};

// CodeConstants.IOModeType = {
// 	IN : "1",
// 	OUT : "2",
// 	INOUT : "3",
// 	FUTURE : "4"
// };

CodeConstants.IOModeType = {
	IN : 1,
	OUT : 2,
	INOUT : 3,
	FUTURE : 4
};

CodeConstants.IOMode = {
	IN : "I",
	OUT : "O",
};

CodeConstants.HoldDeck = {
	NONE : "NONE",
	Hold : "Hold",
	Deck : "Deck"
};

CodeConstants.DeckHoldType = {
	DECK : 1,
	HOLD : 2,
	DECKHOLD : 3
}

CodeConstants.VesselJobType = {
	NONE : "NONE",
	LOADING : "LOADING",
	DISCHARGING : "DISCHARGING",
	ONE_BAY_SHIFTING : "ONE_BAY_SHIFTING",
	HATCH_COVER_OPERATION : "HATCH_COVER_OPERATION"
};
Ext.define('Iotos.model.yarddefine.YardDefineParm', { 
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	
	/****************************
	 * 수정 일자 : 2020.08.21
	 * 작 성 자  : 김용진
	 *  Yard Define Parm
	 * **********************************/
	
    fields: [
	{ name : 'area'				, type : 'string'},
	{ name : 'bitt'				, type : 'string'},
	{ name : 'berth'			, type : 'string'},
	{ name : 'facility'			, type : 'string'},
	{ name : 'terminalCd'		, type : 'string'},
	{ name : 'yardId'			, type : 'string'},
	{ name : 'block'			, type : 'string'},
	{ name : 'equipmentNo'		, type : 'string'},
	{ name : 'equipmentType1'	, type : 'string'},
	{ name : 'truckType'		, type : 'string'},
	{ name : 'ioType'			, type : 'string'},
	{ name : 'zoneId'			, type : 'string'},
	{ name : 'zoneDataType'		, type : 'string'},
	{ name : 'terminalLayoutId'	, type : 'string'},
	{ name : 'zoneCd'			, type : 'string'},
	{ name : 'icChk'			, type : 'string'},
	{ name : 'buffer'			, type : 'string'},
	{ name : 'yardType'			, type : 'string'},
	{ name : 'mappType'			, type : 'string'},
	{ name : 'mappCode'			, type : 'string'},
	{ name : 'Bay'				, type : 'string'},
	{ name : 'maxBay'			, type : 'int'},
	{ name : 'maxRow'			, type : 'int'},
	{ name : 'maxTier'			, type : 'int'},
	{ name : 'patternName'		, type : 'string'},
	{ name : 'railTrackId'		, type : 'string'},
	{ name : 'railTrackName'	, type : 'string'},
	{ name : 'berthLaneName'	, type : 'string'},
	{ name : 'fender'			, type : 'string'},
	{ name : 'useChassisType'	, type : 'string'},
	{ name : 'includeUnused'	, type : 'boolean'},
	{ name : 'blockList'	, type : 'auto'}
]
});
Ext.define('Iotos.model.yarddefine.Equipment', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Equipment
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'equType', type: 'string'},
		{ name: 'equType2', type: 'string'},
		{ name: 'ioType', type: 'string'},
		{ name: 'yardId', type: 'string'},
		{ name: 'maxWgt', type: 'auto'},
		{ name: 'inGate', type: 'string'},
		{ name: 'outGate', type: 'string'},
		{ name: 'passTier', type: 'auto'},
		{ name: 'wph', type: 'auto'},
		{ name: 'eqNoIf', type: 'string'},
		{ name: 'remark', type: 'string'},
		{ name: 'block', type: 'string'},
		{ name: 'bayIndex', type: 'string'},
		{ name: 'rowIndex', type: 'string'},
		{ name: 'cabinpos', type: 'string'},
		{ name: 'twinlift', type: 'auto'},
		{ name: 'tandem', type: 'string'},
		{ name: 'gateGrid', type: 'string'},
		{ name: 'autoCheck', type: 'auto'},
		{ name: 'speed', type: 'auto'},
		{ name: 'twinWgtTolerance', type: 'auto'},
		{ name: 'status', type: 'string'},
		{ name: 'vesselCode', type: 'string'},
		{ name: 'callYear', type: 'string'},
		{ name: 'callSequence', type: 'string'},
		{ name: 'poolName', type: 'string'},
		{ name: 'tagNo', type: 'string'},
		{ name: 'isExistingGateList', type: 'auto'},
		{ name: 'clearanceBays', type: 'auto'},
		{ name: 'gantrySpeed', type: 'auto'},
		{ name: 'trolleySpeed', type: 'auto'},
		{ name: 'hoistSpeed', type: 'auto'},
		{ name: 'ladenGantrySpeed', type: 'auto'},
		{ name: 'ladenTrolleySpeed', type: 'auto'},
		{ name: 'ladenHoistSpeed', type: 'auto'},
		{ name: 'chassisType', type: 'string'},
		{ name: 'sapCd', type: 'string'},
		{ name: 'x', type: 'auto'},
		{ name: 'y', type: 'auto'},
		{ name: 'truckType', type: 'string'}
		]
});
Ext.define('Iotos.model.yarddefine.TerminalCapacity', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Terminal Capacity
	 * **********************************/

	fields: [
		{ name: 'tmnlCD', type: 'string'},
		{ name: 'workImportFull', type: 'float'},
		{ name: 'workExportFull', type: 'float'},
		{ name: 'workFull', type: 'float'},
		{ name: 'totalImportFull', type: 'float'},
		{ name: 'totalExportFull', type: 'float'},
		{ name: 'totalFull', type: 'float'},
		{ name: 'workVPEmpty', type: 'float'},
		{ name: 'workECYEmpty', type: 'float'},
		{ name: 'workEmpty', type: 'float'},
		{ name: 'totalVPEmpty', type: 'float'},
		{ name: 'totalECYEmpty', type: 'float'},
		{ name: 'totalEmpty', type: 'float'},
		{ name: 'totalStockFull', type: 'float'},
		{ name: 'stockImportFull', type: 'float'},
		{ name: 'stockExportFull', type: 'float'},
		{ name: 'stockReeferFull', type: 'float'},
		{ name: 'stockStuffFull', type: 'float'},
		{ name: 'stockUnstuffFull', type: 'float'},
		{ name: 'stockInspectFull', type: 'float'},
		{ name: 'totalStockEmpty', type: 'float'},
		{ name: 'stockCleanEmpty', type: 'float'},
		{ name: 'stockWaitCleanEmpty', type: 'float'},
		{ name: 'stockRepairEmpty', type: 'float'},
		{ name: 'stockWaitRepairEmpty', type: 'float'},
		{ name: 'stockPTIEmpty', type: 'float'},
		{ name: 'stockAvailableEmpty', type: 'float'},
		{ name: 'workPlugFull', type: 'float'},
		{ name: 'workPlugEmpty', type: 'float'},
		{ name: 'remark', type: 'string'}
		]
});
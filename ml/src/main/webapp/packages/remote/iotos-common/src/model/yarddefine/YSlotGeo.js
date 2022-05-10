Ext.define('Iotos.model.yarddefine.YSlotGeo', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * YSlot Geo
	 * **********************************/

	fields: [
		{ name: 'block', type: 'string'},
		{ name: 'bay', type: 'auto'},
		{ name: 'row', type: 'auto'},
		{ name: 'x', type: 'auto'},
		{ name: 'y', type: 'auto'},
		{ name: 'x2', type: 'auto'},
		{ name: 'y2', type: 'auto'},
		{ name: 'bayName', type: 'string'},
		{ name: 'rowName', type: 'string'}
		]
});
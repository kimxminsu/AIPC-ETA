Ext.define('Iotos.model.yarddefine.Facility', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Facility
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'facUse', type: 'string'},
		{ name: 'x', type: 'auto'},
		{ name: 'y', type: 'auto'},
		{ name: 'w', type: 'auto'},
		{ name: 'l', type: 'auto'},
		{ name: 'deg', type: 'auto'},
		{ name: 'yardId', type: 'string'},
		{ name: 'foreColor', type: 'string'},
		{ name: 'backColor', type: 'string'}
		]
});
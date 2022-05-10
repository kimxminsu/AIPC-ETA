Ext.define('Iotos.model.yarddefine.BerthLane', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * BerthLane
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'laneName', type: 'string'},
		{ name: 'laneIndex', type: 'auto'}
		]
});
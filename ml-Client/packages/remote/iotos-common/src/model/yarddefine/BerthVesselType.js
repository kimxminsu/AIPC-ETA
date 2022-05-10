Ext.define('Iotos.model.yarddefine.BerthVesselType', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * BerthVesselType
	 * **********************************/
	
	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'vslType1', type: 'string'},
		{ name: 'index', type: 'auto'}
		]

});
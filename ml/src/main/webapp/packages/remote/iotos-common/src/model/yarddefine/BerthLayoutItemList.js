Ext.define('Iotos.model.yarddefine.BerthLayoutItemList', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * BerthLayoutItemList
	 * **********************************/
	
	fields: [
		{ name: 'berthList', type: 'auto'},
		{ name: 'bittList', type: 'auto'},
		{ name: 'fenderList', type: 'auto'},
		{ name: 'berthHashMap', type: 'auto'},
		{ name: 'bittHashMap', type: 'auto'},
		{ name: 'fenderHashMap', type: 'auto'}
		]
});
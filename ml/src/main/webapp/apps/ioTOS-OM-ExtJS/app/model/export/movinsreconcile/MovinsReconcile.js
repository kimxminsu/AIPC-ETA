Ext.define('IoTosOmExt.model.export.movinsreconcile.MovinsReconcile', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name:'addMovinsItem',
		mapping : 'movinsList'
	},{
		name:'movinsItem',
		mapping : 'movinsList'
	},{
		name:'applyCheck'
	},{
		name:'vslCd'
	},{
		name:'callYear'
	},{
		name:'callSeq'
	},{
		name:'userVoy'
	},{
		name:'matched'
	},{
		name:'compareMode'
	},{
		name:'sortNo'
	},{
		name:'rowLock'
	},{
		name:'weightTolerance'
	},{
		name : 'applyCheck'
	},{
		name : 'matched'
	}],

	associations : [{
		type : 'hasMany',
		name : 'movinsList',
		model : 'IoTosOmExt.model.export.movinslist.MovinsList'
	}]
});
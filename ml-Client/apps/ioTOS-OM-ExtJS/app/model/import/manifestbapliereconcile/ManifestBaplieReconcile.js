Ext.define('IoTosOmExt.model.import.manifestbapliereconcile.ManifestBaplieReconcile', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name:'baplieItem',
		mapping: 'stowageBayPlan'
	},{
		name:'manifestItem',
		mapping : 'manifestCntr'
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
		name:'status'
	},{
		name:'matched'
	},{
		name:'compareMode'
	},{
		name:'sortNo'
	},{
		name:'staffCd'
	},{
		name:'rowLock'
	},{
		name:'keyFieldName'
	},{
		name:'weightTolerance'
	}],

	associations : [{
		type : 'hasMany',
		name : 'stowageBayPlan',
		model : 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan'
	},{
		type : 'hasMany',
		name : 'manifestCntr',
		model : 'IoTosOmExt.model.import.manifestlist.ManifestCntr'
	}]
});
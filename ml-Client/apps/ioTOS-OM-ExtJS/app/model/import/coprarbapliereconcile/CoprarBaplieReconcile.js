Ext.define('IoTosOmExt.model.import.coprarbapliereconcile.CoprarBaplieReconcile', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
	fields: [{
		name:'baplieItem',
		mapping:'stowageBayPlan'
	},{
		name:'addBaplieItem',
		mapping:'stowageBayPlan'
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
		name:'weightTolerance'
	},{
		name:'iBaplieChk'
	}],

	associations : [{
		type : 'hasMany',
		name : 'stowageBayPlan',
		model : 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan'
	}]
});
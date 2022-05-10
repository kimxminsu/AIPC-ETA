Ext.define('IoTosOmExt.model.admin.SearchCommonUser', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'userID',
			type:'string'
		},
		{
			name:'userName',
			type:'string'
		},
		{
			name:'userLevel',
			type:'string'
		},
		{
			name:'partnerType',
			type:'string'
		},
		{
			name:'partnerCode',
			type:'string'
		},
		{
			name:'partnerItems',
			mapping: 'partnersMap'
		},
		{
			name:'groupID',
			type:'string'
		},
	],

	associations: [
		{
			type: 'hasMany',
			name: 'partnersMap',
			model: 'IoTosOmExt.model.admin.PartnerSelection'
		}
	]
});
Ext.define('ESVC.model.common.SearchCondition', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'pgmCode',
		type:'string'
	},
	{
		name:'id',
		type:'string'
	},
	{
		name:'view',
		type:'string'
	},
	{
		name:'searchConditionsString',
		type:'string'
	}
	]
});
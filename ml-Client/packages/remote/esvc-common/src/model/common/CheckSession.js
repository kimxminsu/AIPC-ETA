Ext.define('ESVC.model.common.CheckSession', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'type',
		type:'string'
	},
	{
		name:'status',
		type:'string'
	},
	{
		name:'partnerType',
		type:'string'
	},
	{
		name:'partnerCode',
		type:'string'
	}
	]
});
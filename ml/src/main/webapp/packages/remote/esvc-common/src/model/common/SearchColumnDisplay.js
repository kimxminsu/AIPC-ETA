Ext.define('ESVC.model.common.SearchColumnDisplay', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'code',
		type:'string'
	},
	{
		name:'menu',
		type:'string'
	},
	{
		name:'seq',
		type:'int'
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'defaultCheck',
		type:'string'
	}
	]
});
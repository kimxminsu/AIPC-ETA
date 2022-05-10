Ext.define('ESVC.model.common.FileUpload', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'workingStatus',
		type:'string'
	},
	{
		name:'masterID',
		type:'string'
	},
	{
		name:'catgCd',
		type:'string'
	},
	{
		name:'fileName',
		type:'string'
	},
	{
		name:'fileSize',
		type:'string'
	},
	{
		name:'ufileName',
		type:'string'
	},
	{
		name:'fileStream',
		type:'auto'
	},
	{
		name: 'items',
		mapping: 'detailMap'
	}
	]
});
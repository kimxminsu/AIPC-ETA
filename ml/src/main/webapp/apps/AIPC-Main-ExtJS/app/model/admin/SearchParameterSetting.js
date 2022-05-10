Ext.define('Aipc.Main.model.admin.SearchParameterSetting', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'pgmCode',
			type:'string'
		},
		{
			name:'usingSession',
			type:'string'
		},
		{
			name:'code',
			type:'string'
		}
	]
});
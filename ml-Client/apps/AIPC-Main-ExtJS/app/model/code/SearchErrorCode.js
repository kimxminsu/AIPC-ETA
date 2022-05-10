Ext.define('Aipc.Main.model.code.SearchErrorCode',{
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'errCode',
			type:'string'
		},
		{
			name:'errName',
			type:'string'
		},
		{
			name:'msgId',
			type:'string'
		}
	]	
});
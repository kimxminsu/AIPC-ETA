Ext.define('ESVC.model.common.codes.SystemCode', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'lcd',
		type: 'string'
	}, {
		name: 'lcdNm',
		type: 'string'
	}, {
		name: 'lcdDesc',
		type: 'string'
	}, {
		name: 'useYn',
		type: 'string'
	},{
		name: 'version',
		type: 'string'
	}
//	{
//		name: 'upDateConverted',
//		type: 'date',
//		convert: function(value, record){
//			var jsonDate  = record.get('upDate');
//			
//			console.log(jsonDate);
//			console.log(new Date(jsonDate).getTime());
//			
//			return  Ext.Date.format(new Date(jsonDate), 'Y-m-d H:i:s');
//		}
//	}
	]

});
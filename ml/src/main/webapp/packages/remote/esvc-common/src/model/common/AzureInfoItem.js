Ext.define('ESVC.model.common.AzureInfoItem', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',

	fields : [{
		name : 'cliendID',
		type : 'string'
	}, {
		name : 'tenant',
		type : 'string'
	}]
});
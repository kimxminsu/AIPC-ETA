Ext.define('IoTosOmExt.model.exception.Message', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'status',
		type: 'string'
	}, {
		name: 'statusText',
		type: 'string'
	}, {
		name: 'message',
		type: 'string'
	}, {
		name: 'exceptionMessage',
		type: 'string'
	}, {
		name: 'stackTrace',
		type: 'string'
	}]
});
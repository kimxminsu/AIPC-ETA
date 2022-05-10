Ext.define('IoTosOmExt.model.message.Message',{
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	
	fields: [{
		name: 'messageId',
		type: 'string'
	},{
		name: 'messageUuId',
		type: 'string'
	},{
		name: 'messageSequence',
		type: 'int'
	},{
		name: 'email',
		type: 'string'
	},{
		name: 'definitionId',
		type: 'string'
	},{
		name: 'definitionDesc',
		type: 'string'
	},{
		name: 'receiver',
		type: 'string'
	},{
		name: 'read',
		type: 'int'
	},{
		name: 'businessKey',
		type: 'string'
	},{
		name: 'actionCode',
		type: 'string'
	},{
		name: 'data',
		type: 'string'
	},{
		name: 'title',
		type: 'string'
	},{
		name: 'content',
		type: 'string'
	},{
		name: 'lastPollTime',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'status',
		type: 'string'
	},{
		name: 'errorDescription',
		type: 'string'
	}]
});






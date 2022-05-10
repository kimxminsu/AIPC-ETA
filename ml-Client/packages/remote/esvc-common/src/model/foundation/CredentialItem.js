Ext.define('ESVC.model.foundation.CredentialItem', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',

	fields : [{
		name : 'pgmCode',
		type : 'string'
	}, {
		name : 'id',
		type : 'string'
	}, {
		name : 'pw',
		type : 'string'
	}]
});
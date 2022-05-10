Ext.define('ESVC.model.foundation.dataitem.DataItem', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'string'
	},{
		name: 'collection',
		type: 'auto'
	},{
		name: 'version',
		type: 'string'
	},{
		name: 'userId',
		type: 'string'
	},{
		name: 'userName',
		type: 'string'
	},{
		name: 'roleId',
		type: 'string'
	},{
		name: 'userType',
		type: 'string'
	},{
		name: 'registeredUserId',
		type: 'string'
	},{
		name: 'registeredUserName',
		type: 'string'
	},{
		name: 'registeredTime',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'modifiedUserId',
		type: 'string'
	},{
		name: 'modifiedUserName',
		type: 'string'
	},{
		name: 'modifiedTime',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'workingStatus',
		type: 'string'
	}],
	proxy: {
		type: 'rest',
		url: '',
		writer: {
			type: "json",
			writeAllFields: true,
			allDataOptions: {
				persist: true,
				associated: true,
			},
			partialDataOptions: {
				changes: true,
				critical: true,
				associated: true,
			},
		},
	},
    constructor: function () {
        this.callParent(arguments);
        this.join(this);
    },
    afterEdit: function(modelInstance, modifiedFieldNames) {
    	if(modelInstance.dataChange){
    		modelInstance.dataChange(modelInstance, modifiedFieldNames, modelInstance.controller);
    	} else {
    		if(modelInstance.controller && modelInstance.controller.onDataChangeSearchParam){
    			modelInstance.controller.onDataChangeSearchParam(modelInstance, modifiedFieldNames, modelInstance.controller);
    		}
    	}
    }
});
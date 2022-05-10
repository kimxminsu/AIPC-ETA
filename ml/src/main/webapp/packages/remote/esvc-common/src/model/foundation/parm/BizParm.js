Ext.define('ESVC.model.foundation.parm.BizParm', {
	extend: 'Ext.data.Model',
	fields: [
		{
			name:'table',
			type:'string'
		}
	],
	
	hasOne: [
        {
        	name: 'bizParmMetaInfo',
	        model: 'ESVC.model.foundation.parm.BizParmMetaInfo',
	        associationKey: 'bizParmMetaInfo',
	        getterName: 'getBizParmMetaInfo',
	        associatedName: 'bizParmMetaInfo'
        }
    ],
    
	proxy: {
		type: 'rest',
		url: ''
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
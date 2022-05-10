Ext.define('TSB.data.proxy.Rest', {
	override: 'Ext.data.proxy.Rest',
	
	config: {
		timeout : '90000',
		actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'DELETE'
        }
	},
	
    constructor: function(config) {
		var me = this;
		me.callParent(arguments);        
    }	
});
Ext.define('TSB.data.reader.Reader', {
	override: 'Ext.data.reader.Reader',
	
	config: {
		type : 'json'
	},
	
    constructor: function(config) {
		var me = this;
		
		me.initConfig(config);
		me.callParent(arguments);        
    }	
});


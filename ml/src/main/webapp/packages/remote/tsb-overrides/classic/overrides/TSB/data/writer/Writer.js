Ext.define('TSB.data.writer.Writer', {
	override: 'Ext.data.writer.Writer',

	config: {
		type : 'json'
	},
	
    constructor: function(config) {
    	var me = this;
        
    	me.initConfig(config);
        me.callParent(arguments);        
    }	
});
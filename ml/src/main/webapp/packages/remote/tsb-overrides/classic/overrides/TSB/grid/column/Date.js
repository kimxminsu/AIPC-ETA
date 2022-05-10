Ext.define('TSB.grid.column.Date', {
	override: 'Ext.grid.column.Date',
	
	constructor: function() {
	    var me = this;
	    
	    me.format= Ext.util.Cookies.get('appdefaultdateformat');
	    me.callParent(arguments);
	}	
		
});
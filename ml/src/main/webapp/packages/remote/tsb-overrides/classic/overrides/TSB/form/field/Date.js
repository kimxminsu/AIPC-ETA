Ext.define('TSB.form.field.Date', {
	override: 'Ext.form.field.Date',
	 
	listeners: {
	        render: function(){
	        	this.validate();
	        }
	    },
	
    constructor: function() {
        var me = this;
        
        me.startDay = Ext.util.Cookies.get('appstartday');
        me.format= Ext.util.Cookies.get('appdefaultdateformat');
        
        me.callParent(arguments);
    }

		
});
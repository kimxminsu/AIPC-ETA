Ext.define('TSB.form.field.Base', {
    override: 'Ext.form.field.Base',
    
    constructor: function() {
        var me = this;
        me.callParent(arguments);
    },
    
    setValue: function(value) {
    	if(this.xtype !== "datefield" && this.xtype !== "numberfield" && this.xtype !== "datetimefield" && this.xtype !== "monthfield"){ // or only textfield
    		value = Ext.util.Format.htmlDecode(value); 
    	}
    	
    	return this.callParent([value]);
    },

    getValue: function(value) {
        if(this.xtype !== "datefield" && this.xtype !== "numberfield" && this.xtype !== "datetimefield" && this.xtype !== "monthfield"){ // or only textfield
            value =  Ext.htmlEncode(this.callParent([value]));
            return value;
        } else {
            return this.callParent([value]);
        }
    }        
});
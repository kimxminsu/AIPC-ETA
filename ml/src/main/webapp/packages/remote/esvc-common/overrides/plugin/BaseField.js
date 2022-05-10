Ext.define('ESVC.plugin.BaseField',{
	override: 'Ext.form.field.Base',

	setReadOnly: function(readOnly){
		var me = this;
		
		if(readOnly == false){				
			me.setFieldStyle('background-color: #f0f8ff;');
		}
		else{		
			me.setFieldStyle('background-color: #ffffff;');
		}
	},
	
	setAllowBlank: function(allowBlank){
		var me = this;
		
		me.allowBlank = allowBlank;
		
		if(allowBlank == false){
			if(me.labelEl){			
				me.labelEl.setStyle({"font-weight": "bold"});
			}
		}else{
			if(me.labelEl){
				me.labelEl.setStyle({"font-weight": "normal"});							
			}
		}
		
	}
})

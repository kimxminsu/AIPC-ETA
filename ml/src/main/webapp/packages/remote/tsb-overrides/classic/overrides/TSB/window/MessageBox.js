Ext.define('TSB.window.MessageBox', {
	override: 'Ext.window.MessageBox',
	
	btnCallback: function(btn, event){

		this.callParent([btn, event]);

		//This is added in overriding to prevent button menu stuck
		if(this.zIndexManager.topMost)
			this.zIndexManager.front = this.zIndexManager.topMost;

	}
		
});
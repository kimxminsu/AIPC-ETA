Ext.define('TSB.window.Window', {
	override: 'Ext.window.Window',
	
	doClose: function() {
        var me = this;
        
        // Being called as callback after going through the hide call below 
        if (me.hidden) {
            me.fireEvent('close', me);
            
            // This method can be called from hide() which in turn can be called 
            // from destroy() 
            if (me.closeAction === 'destroy' && !me.destroying && !me.destroyed) {
                me.destroy();
            }
        } else {
            // close after hiding 
            me.hide(me.animateTarget, me.doClose, me);
        }
        
        //This is added in overriding to prevent button menu stuck
        if(me.zIndexManager && me.zIndexManager.topMost) {
        	me.zIndexManager.front = me.zIndexManager.topMost;
        }
        
    }
    
});
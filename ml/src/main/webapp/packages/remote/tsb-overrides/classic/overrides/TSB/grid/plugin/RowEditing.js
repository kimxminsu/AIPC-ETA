Ext.define('TSB.grid.plugin.RowEditing', {
    override: 'Ext.grid.plugin.RowEditing',
    
    clicksToEdit: 2,
    clicksToMoveEditor: 1,
    autoCancel: true,
    
    onEnterKey: function(e) {
        var me = this,
            targetComponent;
 
        // KeyMap entry for EnterKey added after the entry that sets actionable mode, so this will get called 
        // after that handler. We must ignore ENTER key in actionable mode. 
        if (!me.grid.ownerGrid.actionableMode && me.editing) {
            targetComponent = Ext.getCmp(e.getTarget().getAttribute('componentId'));
 
            // ENTER when a picker is expanded does not complete the edit 
            //Overriding this.getEditor().getForm().isValid() is added to prevent enter without form validation
            if(this.getEditor().getForm().isValid()) {
            	if (!(targetComponent && targetComponent.isPickerField && targetComponent.isExpanded)) {
            		me.completeEdit();
            	}
            }
        }
    },
});
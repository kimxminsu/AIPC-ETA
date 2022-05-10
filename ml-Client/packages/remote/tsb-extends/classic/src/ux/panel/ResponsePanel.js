Ext.define('TSB.ux.panel.ResponsePanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.tsb-responsepanel',
	
	reference: 'refTsbResponsePanel',
	referenceHolder: true,
	
    minHeight: 100,
    hideCollapseTool: true,
    collapsible: true,
    collapsed: false,
    titleCollapse: true,
    titleAlign:'left',
//    border: 1, 
    height: 300,
    layout: 'fit',
    items: [{
    	xtype: 'form',
    	layout: 'fit',
    	items: [{
    		xtype: 'textarea',
    		reference: 'refRemark',
    		emptyText: 'Comments...',
    		hideLabel: true,
    		allowBlank: false,
    		flex: 1
    	}],
    	bbar: ['->',{
    		xtype: 'button',
    		reference: 'refWorkflowButton',
    		border: false,
    		formBind: true,
    		handler: 'onResponsePanelButtonClick'
    	}, {
    		xtype: 'button',
    		reference: 'refCancelButton',
    		text: 'Close',
    		border: false,
    		value: 'cancel',
    		handler: 'onResponsePanelButtonClick'
    	}]
    }]
});
Ext.define('ESVC.view.popup.VesselSelectPopup', {
    extend: 'Ext.Panel',
    alias: 'widget.vesselselectpopup',    
    requires: [
        'ESVC.view.popup.VesselSelectPopupController',
        'ESVC.view.popup.VesselSelectPopupModel'
    ],

    controller: 'vesselselectpopup',
    viewModel: {
        type: 'vesselselectpopup'
    },

    listeners:{
		afterrender: 'onLoad'
	},

    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'vesselselect',
                reference: 'ctlVesselselect',
                margin: '0 5 0 5',
                collapsible: false
            },
            {
                xtype: 'container',
                margin: '0 5 5 5',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                items: [{
                    xtype: 'tbfill',
                },
                {
                    xtype: 'button',
                    reference: 'ctlOk',
                    text: ViewUtil.getLabel('ok'),
                    width: 100,
                    margin: '0 5 0 0',
                    listeners : {
                        click : 'onOk'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'ctlCancel',
                    text: ViewUtil.getLabel('cancel'),
                    width: 100,
                    listeners : {
                        click : 'onCancel'
                    }
                }]
            }]
        });
        
        me.callParent();
    }
});
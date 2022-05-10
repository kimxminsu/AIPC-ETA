Ext.define('Iotos.view.color.SetColor', {
    extend: 'Ext.Container',
    alias: 'widget.setcolor',
    requires: [
        'Iotos.view.color.SetColorController',
        'Iotos.view.color.SetColorModel',
    ],

    controller: 'setcolor',
	viewModel: {
		type: 'setcolor'
    },
    margin: '10 0',
    
    foreColorBind: undefined,
    backColorBind: undefined,
	listeners: {
		afterrender: 'onLoad'
    },
    buttonMode:false,
    initComponent: function(){
        var me = this;
        Ext.apply(me, {
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                margin: '0 0 0 0',
            },

            margin: me.margin,
            padding: me.padding,
            width: me.width,
        });
        if(me.buttonMode){
            Ext.apply(me, {
                items: [
                    {
                        xtype:'textfield',
                        itemId:'ctlColorLabelId',
                        readOnly:true,
                        value: '    A    ',
                        flex:0.3,
                        fieldCls:'text-align: center'
                    },
                    {
                        xtype:'button',
                        text:'Font',
                        iconCls:'x-fa fa-font',
                        flex:0.2,
                        listeners:{
                            click:function(){
                                var picker = me.down('#ctlForeColorId');
                                picker.onTriggerClick(picker, picker.getPickerTrigger());
                            },
                            resize:function(button, width, height, oldWidth, oldHeight, eOpts){
                                console.log('width: ' + width);
                                if(width < 75){
                                    button.setText('');
                                }
                                else{
                                    button.setText('Font');
                                }
                            }
                        }
                    },
                    {
                        xtype:'tsb-colorfield',
                        itemId:'ctlForeColorId',
                        bind: me.foreColorBind,
                        // hidden: true,
                        // hideMode: 'visibility',
                        width:0,
                        listeners: {
                            change: 'onForeColorChange'
                        }
                    },
                    {
                        xtype:'button',
                        text:'Fill',
                        iconCls:'x-fa fa-paint-brush',
                        flex:0.2,
                        listeners:{
                            click:function(){
                                var picker = me.down('#ctlBackColorId');
                                picker.onTriggerClick(picker, picker.getPickerTrigger());
                            },
                            resize: function(button, width, height, oldWidth, oldHeight, eOpts){
                                console.log('width: ' + width);
                                if(width < 75){
                                    button.setText('');
                                }
                                else{
                                    button.setText('Fill');
                                }
                            }
                        }
                    },
                    {
                        xtype:'tsb-colorfield',
                        itemId:'ctlBackColorId',
                        bind: me.backColorBind,
                        // hidden: true,
                        // hideMode: 'visibility',
                        width:0,
                        listeners: {
                            change: 'onBackColorChange'
                        }
                    }
                ]
            });
        }
        else{
            Ext.apply(me, {
                items: [
                    {
                        xtype:'textfield',
                        itemId:'ctlColorLabelId',
                        readOnly:true,
                        value: '    A    ',
                        flex:0.2,
                        fieldCls:'text-align: center'
                    },
                    {
                        xtype:'tsb-colorfield',
                        itemId:'ctlForeColorId',
                        bind: me.foreColorBind,
                        flex:0.4,
                        listeners: {
                            change: 'onForeColorChange'
                        }
                    },
                    {
                        xtype:'tsb-colorfield',
                        itemId:'ctlBackColorId',
                        bind: me.backColorBind,
                        flex:0.4,
                        listeners: {
                            change: 'onBackColorChange'
                        }
                    }
                ]
            });
        }


        me.getForeColor = function (){
            var foreColor = me.down('#ctlForeColorId').value;
            console.log(foreColor);
            return foreColor;
        };
        me.getBackColor = function (){
            var backColor = me.down('#ctlBackColorId').value;
            console.log(backColor);
            return backColor;
        }
        me.callParent();
    }
});
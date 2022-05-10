Ext.define('ESVC.view.usercontrol.TDatePeriod', {
    extend: 'Ext.Container',
    alias: 'widget.tdateperiod',
    requires: [
        'ESVC.view.usercontrol.TDatePeriodController',
        'ESVC.view.usercontrol.TDatePeriodModel',
    ],

    controller: 'tdateperiod',
	viewModel: {
		type: 'tdateperiod'
	},
	
	listeners: {
		afterrender: 'onLoad'
    },
    
    /**
	 * PROPERTY START
	 * =========================================================================================================================
	 */

    /**
	 * PROPERTY START
	 * =========================================================================================================================
	 */
    format: '',

    controlDisabled: false,
    margin: '0 0 0 0',
    padding: '0 0 0 0',
    
    label: '',
    labelWidth: 50,

    dateWidh: 125,
    fromDateBind: undefined,
    toDateBind: undefined,
	/**
	 * PROPERTY END
	 * =========================================================================================================================
	 */

     /**
	 * EVENT START
	 * =========================================================================================================================
	 */
    afterChange: function (control) {},
    /**
	 * EVENT END
	 * =========================================================================================================================
	 */

    /**
	 * METHOD START
	 * =========================================================================================================================
	 */
    getDateCondition:function() {
        var me = this;

        return me.getController().getDateCondition();
    },

    getControlDisabled: function () {
        return me.controlDisabled;
    },

    setControlDisabled: function(value) {
        var me = this;
        var ctlFromDate = me.lookupReference('ctlFromDate');
        var ctlToDate = me.lookupReference('ctlToDate');

        me.controlDisabled = value;

        ctlFromDate.setDisabled(me.controlDisabled);
        ctlToDate.setDisabled(me.controlDisabled);
    },
    /**
	 * METHOD END
	 * =========================================================================================================================
	 */
    
    initComponent: function() {
        var me = this;
        
        var getFormat = function() {
            if (StringUtil.isNullorEmpty(me.format) === true) {
                return ESVC.config.Locale.getShortDate();
            }
            else {
                return me.format;
            }
        }

        var getLabel = function() {
            if (StringUtil.isNullorEmpty(me.label) === false) {
                return me.label + ':';
            }
            else {
                return '';
            }
        }

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

            items: [{
                //Label
                xtype: 'label',
                reference: 'ctlLabel',
                style: 'text-align:right',

                text: getLabel(),
                width: me.labelWidth
            },
            {
                //From Date
                xtype: 'datefield',
                reference: 'ctlFromDate',
                format: getFormat(),
                width: me.dateWidh,
                disabled: me.controlDisabled,
                bind: me.fromDateBind,
                listeners: {
                    change: 'onDateChange'
                }
            },
            {
                //To Date
                xtype: 'datefield',
                reference: 'ctlToDate',
                margin: '0 0 0 2',
                format: getFormat(),
                width: me.dateWidh,
                disabled: me.controlDisabled,
                bind: me.toDateBind,
                listeners: {
                    change: 'onDateChange'
                }
            }],

            listeners: {
                afterChangeEvent: me.afterChange
            }
        });

        me.callParent();
    }
});
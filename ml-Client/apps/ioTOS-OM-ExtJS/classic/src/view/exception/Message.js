Ext.define('IoTosOmExt.view.exception.Message', {
	extend: 'Ext.window.Window',
	xtype: 'app-message',

	requires: [
	   'Ext.form.Panel'
    ],
    config: {
    	exceptionMessage: '',
    	message: '',
    	stackTrace: '',
    	statusText: '',
    	status: ''
    },
  
    lblDetails: {type: 'bundle', key: 'details'},
	btnOk: {type: 'bundle', key: 'ok'},
	
	constructor: function(config) {
		this.callParent(arguments);
	},
	
	initComponent: function() {
		var me = this;
   
		var lblTitle = me.status + ' : ' + me.statusText;						//title of Exception
		var message = '<b>' + me.message + '</b><br>' + me.exceptionMessage;	//message of Exception
		var stackTrace = me.stackTrace;											//stactTrace or Detail of Exception
		
		Ext.apply(this, {
			title: lblTitle,
			width: 650,
			maxHeight: 400,
			bodyPadding: 10,
			closable: true,
			autoShow: true,
			buttonAlign: 'center',
			resizable: false,
			autoScroll: true,
			modal: true,
			items: {
				xtype: 'form',
				reference: 'form',
				items: [{
					layout: 'hbox',
					items: [{
						xtype: 'image',
				        width: 55,
				        height: 55,
				        src: './resources/images/error.png',
						padding: '0 10 10 0'
					},{
						xtype: 'component',
						height: 55,
						autoScroll: true,
						html: message,
						padding: '0 0 10 0'
					}]
				//commented not to show stack trace
//				},{
//			        xtype: 'fieldset',
//			        title: me.lblDetails,
//			        maxHeight: 250,
//			        autoScroll: true,
//			        collapsible: true,
//			        collapsed: true,
//			        padding: '0 0 0 10',
//			        html: stackTrace
			    }]
				
			},
			buttons: [{
		        text   : this.btnOk,
		        handler: function() {
					this.up('.window').close();
				}
		    }]
		});

		this.callParent();
	}
});
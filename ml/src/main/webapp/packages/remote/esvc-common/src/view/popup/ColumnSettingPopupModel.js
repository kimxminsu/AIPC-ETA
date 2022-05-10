Ext.define('ESVC.view.popup.ColumnSettingPopupModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.columnsettingpopup',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	formulas:{
		defaultCheckChecked:{
  			bind:{
  				bindTo:'{theDetail.defaultCheck}'
  			},
  			get:function(value){
  				var me = this;

  				if(value === 'Y'){
  					return true;
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('defaultCheck', stringValue);
  			}
  		}
	},

	stores: {
		columnSettingCombo : {
			storeId: 'columnSettingShowColumnStore',
			proxy: {
				type: 'rest',
				url: ESVC.config.Locale.getRestApiDestUrl() + '/v1/columnsetting/searchItems'
			}
		},
		
		columnSettingShowColumn : {},
		columnSettingHiddenColumn : {},
		columnSettingColumnId : {}
	}
});
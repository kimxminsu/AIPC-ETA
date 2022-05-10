Ext.define('Iotos.view.popup.CommonCodePopupController', {
	override: 'ESVC.view.popup.CommonCodePopupController',

	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
      var params = me.getView().recvData;
		
    	return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});
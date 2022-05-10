Ext.define('Aipc.Main.view.main.FindPasswordController', {
	extend: 'ESVC.view.foundation.BaseViewController',

	requires: [
		'ESVC.model.common.CheckCommonUser'
	],

	alias: 'controller.findpassword',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME : 'findPasswordConfig',
	DEFAULT_MODEL : 'ESVC.model.common.CheckCommonUser',	// DETAIL MODEL
	nowPage : 0,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onFindPasswordLoad : function(){
		var me = this;
		var recvData = me.getView().recvData;
		var findPwdItem = Ext.create(me.DEFAULT_MODEL);
		var window = me.getView().up('window');
		var title = TSB.locale.i18n.Bundle.instance.getMsg('recoverypasswordview');
		var refs = me.getReferences();
		page = 0;
		
		window.setIconCls('x-fa fa-key');
		window.setTitle(title);
		
		findPwdItem.phantom = false;
		
		findPwdItem.set('id', null);
		
		me.getViewModel().setData({thePassword:findPwdItem});
		refs.ctlStep2.setVisible(false);
		refs.ctlStep3.setVisible(false);
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	moveStep: function (num) {
		var me = this;
		var refs = me.getReferences();
		var window = this.getView().up('window');
		page += num;
		if(page == 0){
			refs.ctlChangePageBackButton.setDisabled(true);
			refs.ctlStep1.setVisible(true);
			refs.ctlStep2.setVisible(false);
		}else if(page == 1){			
			refs.ctlChangePageBackButton.setDisabled(false);
			refs.ctlStep1.setVisible(false);
			refs.ctlStep2.setVisible(true);
		}else if(page == 2){	
			me.onSave();
		}else{
	       	window.close();	
		}
	},
	
	// Build DataItem
	buildDataItem : function(dataItem){
		var me = this;
		var returnItem = dataItem.copy();
		
		dataItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		return returnItem;
	},
	
	onSave: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var window = me.getView().up('window');
		var findPwdItem = me.getViewModel().get('thePassword');
		var infoForm = me.view.getForm();
		var recvData = me.getView().recvData;
		
		if(infoForm.isValid()){
			if(findPwdItem.dirty){
				var proxy = findPwdItem.getProxy();
				proxy.url = store.getProxy().url;
				var dataItem = me.buildDataItem(findPwdItem);
				
				dataItem.save({
					success: function(record, operation){
						refs.ctlChangePageBackButton.setDisabled(true);
						refs.ctlChangePageNextButton.setText("Finish");
						refs.ctlCloseButton.setDisabled(true);
						refs.ctlStep2.setVisible(false);
						refs.ctlStep3.setVisible(true);						
					},
					failure : function(){
						page--;
					}
				})
			}else{
				page--;
			}
		}else{
			MessageUtil.mandatoryFieldInValid();
			page--;
		}
	
			
	},

	
	// Search Condition
	getSearchCondition : function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var searchParm = me.getViewModel().get('thePassword');
		var params = me.createParam(searchParm);
		return params;
	},
	
	
	
	onClose: function(){
		var me = this;
		var window = this.getView().up('window');
    	
       	window.close();
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});
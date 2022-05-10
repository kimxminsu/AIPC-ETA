Ext.define('ESVC.view.foundation.usercontrol.BaseUserController', {
	extend: 'ESVC.view.foundation.BaseViewController',
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	/**
	 * 컨트롤러를 가지고 있는 부모를 찾는다.
	 * 디테일 화면은 선택되지 않는다.
	 * @param {*} view 
	 * @returns 부모 화면
	 */
	getParent:function(view){
		var me = this;
		
		if(view.up("panel").getController()){
			return view.up("panel"); 
		} else {
			return me.getParent(view.up("panel"));
		}
	},

	/**
	 * xtype이 'app-'으로 시작하는 부모를 찾는다.
	 * 디테일 화면도 선택된다.
	 * @param {*} view 
	 * @returns 부모 화면
	 */
	getParentByAlias:function(view){
		var me = this;
		if(view.up('panel').xtype.includes('app-')){
			return view.up("panel"); 
		} else {
			return me.getParent(view.up("panel"));
		}
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});
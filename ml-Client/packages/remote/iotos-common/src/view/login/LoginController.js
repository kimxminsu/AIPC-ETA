Ext.define('Iotos.view.login.LoginController', {
    extend: 'ESVC.view.foundation.BaseViewController',
    alias: 'controller.login',

    onload: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('Iotos.model.login.LoginParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());
        me.onLoadRsa();
    },
    
    onLoadRsa:function(){
        var me = this;
        var params = me.getSearchCondition();
		if (params == null) {
			return;
        }
        me.getStore("rsaStore").load({
			params: params,
            callback : function(rec, opt, success){
                iWeb.PUBLIC_KEY_MODULUS = rec[0].data.publicKeyModulus;
                iWeb.PUBLIC_KEY_EXPONENT = rec[0].data.publicKeyExponent;
            }
        })
    },

    /* 로그인 처리 */
    onLoginClick: function() {
        var me = this;
        var refs = me.getReferences();
        var u_id = me.lookupReference('refLoginId');
        var u_pwd = me.lookupReference('refLoginPwd');
        // 사용자 인증 생성
        fn_getToken_(u_id.value, u_pwd.value, me);
        ESVC.config.Locale.setLanguage(refs.language.getValue());
    },

    /* 로그인 처리 결과 */
    loginResult: function(rtn, rtnMsg) {
        if(rtn) { // 성공
            // Remove Login Window
            this.getView().destroy();
        } else {
            var rMsg = "[Error]: Check your ID/Password";
            if(rtnMsg !== undefined) rMsg = rtnMsg;
            fn_viewLogin_(rMsg);
        }
    },

    // Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		return params;
	},

});


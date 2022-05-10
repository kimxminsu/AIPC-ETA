Ext.define("Iotos.view.login.LoginModel", {
    extend: "Ext.app.ViewModel",
    alias: 'viewmodel.login',

    requires:[
		'Ext.data.proxy.Rest'
    ],
    
    stores: {
        rsaStore: {
            model: 'Iotos.model.login.Login',
            pageSize: 20,
            autoLoad: false,
            proxy: {
				type: 'rest',
                url: CONSTANTS.SERVER_DNS + "/rsa/getKey"
            }
        }
    }
});
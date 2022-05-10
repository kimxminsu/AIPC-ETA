// orig
Ext.define("Aipc.Main.view.code.ErrorCodeModel", {
	extend: "Ext.app.ViewModel",
	alias: "viewmodel.code",
	requires: ["Ext.data.proxy.Rest", "Aipc.Main.model.code.User"],
	stores: {
		user: {
			model: "Aipc.Main.model.code.User",
			autoLoad: true,
			storeId: "userStore",
			proxy: {
				type: "rest",

				// type : 'ajax',
				// actionMethods : {
				//   read : 'POST'
				// },
				url: "http://localhost:1234/port/insert",
			},
		},
	},
});
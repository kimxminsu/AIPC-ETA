// orig
Ext.define("Aipc.Main.view.sample.SampleModel", {
	extend: "Ext.app.ViewModel",
	alias: "viewmodel.sample",
	requires: ["Ext.data.proxy.Rest", "Aipc.Main.model.sample.User"],
	stores: {
		user: {
			model: "Aipc.Main.model.sample.User",
			autoLoad: false,
			storeId: "userStore",
			proxy: {
				type: "rest",
				// type : 'ajax',
				// actionMethods : {
				//   read : 'POST'
				// },
				url: "http://localhost:1234/ship/insert",
				showProgressBar: true
			},
		},
	},
});
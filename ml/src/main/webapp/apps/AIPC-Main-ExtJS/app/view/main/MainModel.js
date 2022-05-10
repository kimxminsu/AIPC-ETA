/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Aipc.Main.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.main',

	requires: [
       'Ext.data.proxy.Rest',
	],
	
	data: {
		loadedServiceLaneCode: null,
		loadedPortCode: null,
		loadedTerminalCode: null,
		loadedVesselCode: null,
		loadedVesselName: null,
		loadedImoNo: null,
		loadedVoyageNo: null,
		loadedTag: null,
		loadedOrigin: null,
		loadedSnapshotDesc: null,
		
		profileImageUrl: 'resources/images/Profile.png',
		profileName: '',
		profileEmail: '',
		tabCount: 0,
		favouriteMenu:null
	},
	
	formulas: {
		isDevelopmentMode: function (get) {
			if(CONSTANTS.CUSTOMER === "DEV") {
				return true;
			}
			return false;
        }
    },

	stores: {
		cacheServiceInfo:{
			model: 'ESVC.model.common.LocalCacheInfo',
			storeId: 'cacheServiceInfoStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/LocalCacheInfo.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		gridColumn:{
			storeId: 'gridColumnStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/'+CONSTANTS.MODULE+'GridColumn.json',
			    messageEnable: false,
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		
		favouriteMenu:{
			model: 'Aipc.Main.model.authority.AuthMenuItem',
			//storeId: 'favouriteMenuStore',
			autoLoad: false,
			proxy: {
//				type: 'rest',
//				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/menu/favourites',
//				extraParams:{
//					systemCode: CONSTANTS.SYSTEM_CODE
//				}
			    type: 'ajax',
			    url: 'resources/temp/favouriteMenu.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		
		menuSearchList : {},
		
		menuList: {},
		
		// KHH.SAMPLEMENU.2018.11.14
		sampleMenuList: {
			model: 'Aipc.Main.model.authority.AuthMenuItem',
			storeId: 'menuListStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/temp/sample_menu.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		roleMenuList: {
			model: 'Aipc.Main.model.authority.RoleMenu',
			storeId: 'roleMenuListStore',
			proxy: {
//				type: 'rest',
//				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/roles/personalizedmenu'
				
			    type: 'ajax',
			    url: 'resources/temp/roleMenu.json',
			    reader: {
		           type: 'json',
		           rootProperty: 'data'
			    }
			}
		},
		
		profileStore: {
			model: 'Aipc.Main.model.authority.User',
			storeId: 'profileStore',
			proxy: {
				type: 'rest',
				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/basic/profile'
			}
		},
		
		changePwd: {
			model: 'Aipc.Main.model.authority.User',
			storeId: 'changePwdStore',
			proxy: {
				type: 'rest',
				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/identities/users/activeuser'
			}
		},
		
		emailChecking: {
			model: 'Aipc.Main.model.authority.User',
			storeId: 'emailChecking',
			proxy: {
				type: 'rest',
				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/identities/users/checkemail'
			}
		},
		
		userList: {
			model: 'Aipc.Main.model.authority.User',
			storeId: 'userListStore',
			proxy: {
				type: 'rest',
				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/identities/users'
			}
		},
		
		//TODO: Test
        authMenuStore: {
            model: 'Aipc.Main.model.admin.accessright.ComponentAuthority',
            storeId: 'authMenuStore',
            fields: [
                {name: 'viewXtype'},
                {name: 'reference'}, 
                {name: 'enableChk'}
            ],
            data: [
                {viewXtype: 'app-vessellibrary', componentType: 'textfield', reference: 'refVesselCode', enableChk: true},
                {viewXtype: 'app-vessellibrary', componentType: 'textfield', reference: 'refVesselName', enableChk: true},
                {viewXtype: 'app-vessellibrary', componentType: 'textfield', reference: 'refCallSign',   enableChk: true},
                {viewXtype: 'app-vessellibrary', componentType: 'textfield', reference: 'refIMONo',      enableChk: true},
                {viewXtype: 'app-vessellibrary', componentType: 'grid',      reference: 'refVesselGrid', enableChk: true,  editable: false, removeListeners: 'celldblclick'}
            ]
        },
        
        // 2019.08.12.Tonny.Kim
        userInfoPartnerTypeCombo: {
        	model : 'Aipc.Main.model.admin.PartnerSelection'
        }
	}
});
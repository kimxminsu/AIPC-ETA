Ext.define('IoTosOmExt.view.main.MainController', {
	/**
     * @memberOf TSB
     */
    extend: 'ESVC.view.foundation.BaseViewController',
    
    alias: 'controller.main',
    
    requires: [
    ],
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PARTNER_TYPE_COMBOBOX_STORE: 'userInfoPartnerTypeCombo',	// PARTNER TYPE COMBO STORE NAME
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
    headerName: {type: 'bundle', key: 'userInfo'},
//  FIRST_LOAD_VIEW_NAME : 'app-singlegrid',
//  FIRST_LOAD_VIEW_NAME : 'app-singlegridcell',
//  FIRST_LOAD_VIEW_NAME : 'app-masterdetailgrid',
//  FIRST_LOAD_VIEW_NAME : 'app-controlsample',
//  FIRST_LOAD_VIEW_NAME : 'app-detailpopupsample',
//  FIRST_LOAD_VIEW_NAME : 'app-detailpopupcomplexsample',
//  FIRST_LOAD_VIEW_NAME : 'app-popupsample',
//  FIRST_LOAD_VIEW_NAME : 'app-usercontrolpopupsample',
//  FIRST_LOAD_VIEW_NAME : 'app-designmultitabdetail',
//    FIRST_LOAD_VIEW_NAME : 'app-tradepartner',
//    FIRST_LOAD_VIEW_NAME : 'app-messagesearch',
//    FIRST_LOAD_VIEW_NAME : 'app-syntax',
//    FIRST_LOAD_VIEW_NAME : 'app-convertcode',
//    FIRST_LOAD_VIEW_NAME : 'app-errorcode',
//    FIRST_LOAD_VIEW_NAME : 'app-directory',
    
    listen: {
		component: {
			'*': {
			}
		},
		
		controller: {
			'*': {
				createTab: 'createTab',
				closeTab: 'closeTab',
				menuClick: 'onMenuClick',
				closeAllTab: 'onCloseAllTab'
			}
		}
		
	},

    refs    : [
               { ref: 'appPanel', selector: 'panel[xtype^=app-]' }
    ],
	    
	lastView: null,
	
	onUrlTest: function() {
		var me = this;
		
		console.log('window.location.origin = ' + window.location.origin);
		console.log('window.location.pathname = ' + window.location.pathname);
		
		window.history.pushState({}, document.title, window.location.origin + window.location.pathname);
	},
	
	init: function() {
		var me = this;
		var refs = me.getReferences();
		
		// Tonny.Kim - SSO first view load
		if(IoTosOmExt.getApplication().firstLoadView){
			me.FIRST_LOAD_VIEW_NAME = IoTosOmExt.getApplication().firstLoadView;
		}
		
		//TODO: Decide Turn on/off in initial
		//Message Polling Start
//     	var provider = Ext.direct.Manager.getProvider('messagePollProvider');
//     	if (!provider.isConnected()) {
// 			provider.setConfig({
// 				baseParams: {
// 					userId: ESVC.config.Token.getUserId()
// 				}
// 			});
// //			provider.addListener('data', me.onPollingData, me);
// //			provider.connect();
// 		}
    	
    	//Commented due to Azure always has parameters
    	//To read URL parameter directly to apply business
//    	var url = document.URL.split("?");
//    	if(url.length > 1) {
//    		var params = Ext.Object.fromQueryString(url[url.length - 1]);
//    		me.fireEvent('directWorkspaceConfiguration', params);
//    	}
    	
    	/**
    	 * Customer Setting
    	 */
    	var imgLogo = new Image();
    	var logoWidth, logoHeight;
    	if(CONSTANTS.CUSTOMER === "DEV") {
    		imgLogo.src = 'resources/images/dashboard/customer-logo.png';
    		logoWidth = 126;
    		logoHeight = 32;
    	} else if(CONSTANTS.CUSTOMER === "GWCT") {
    		imgLogo.src = 'resources/images/dashboard/customer-logo.png';
    		logoWidth = 126;
    		logoHeight = 32;
    		
    	} else if(CONSTANTS.CUSTOMER === "TSB") {
    		imgLogo.src = 'resources/images/dashboard/tsb-logo.png';
    		logoWidth = 126;
    		logoHeight = 32;
    		
    	}
    	
//    	refs.refCustomerLogo.setSrc(imgLogo.src);
    	refs.refCustomerLogo.setWidth(logoWidth);
    	refs.refCustomerLogo.setHeight(logoHeight);
	},
	
	onLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var menuList = me.getStore('menuList');
		var menuSearchList = me.getStore('menuSearchList');
		var sampleMenuList = me.getStore('sampleMenuList');
		var userRoleMenu = me.getStore('roleMenuList');
		var favouriteMenuStore = me.getStore('favouriteMenu');
		var localCacheInfoStore = me.getStore('cacheServiceInfo');
		var gridColumnStore = me.getStore('gridColumn');
		
		GridUtil.gridColumeStore = gridColumnStore;
		ESVC.util.LocalCacheServiceUtil.setLocalCacheStore(localCacheInfoStore);
		
		this.onSetMenu(menuList);
		
		menuList.each(function(record, idx){
			if(record.data.menuTypeCode != 'FOLDER'){
				menuSearchList.add(record);
			}
		});

		gridColumnStore.load();
		localCacheInfoStore.load({
			callback:function(records,operation, success){
				favouriteMenuStore.load({
					params:{
						userId: ESVC.config.Token.getUserId(),
						systemCode: CONSTANTS.SYSTEM_CODE
					},
					callback:function(records,operation, success){
						userRoleMenu.load({
							params:{
								ptnrCd: ESVC.config.Token.getPtnrCode(),
								userId: ESVC.config.Token.getUserId(),
								systemCode: CONSTANTS.SYSTEM_CODE
							},
							callback:function(records,operation, success){
								// KHH.SAMPLEMENU.2018.11.14
								sampleMenuList.load({
									callback:function(records,operation, success){
										me.onMenuGeneration();
										if(me.FIRST_LOAD_VIEW_NAME){
											me.onLoadView(me.FIRST_LOAD_VIEW_NAME);
										}
										
										IoTosOmExt.getApplication().isBizServiceStart = true;
										IoTosOmExt.getApplication().forcedBlocking = false;
									}
								});
								// me.onProfileLoad();
							}
						});
					}
				});
			}
		});
	},
	
	// 2020.06.05.Tonny.Kim
	onMenuSearch : function (combo, record, eOpts ){
		var me = this;
		me.onLoadView(record.get('screenPathAddress'));
		combo.clearValue();
	},
	
	onMenuGeneration: function() {
		var me = this;
		var refs = me.getReferences();
		var menuList = me.getStore('menuList');
		var sampleMenuList = me.getStore('sampleMenuList'); // [KHH.SAMPLEMENU.2018.11.14]
		var userRoleMenu = me.getStore('roleMenuList');
		var favouriteMenuStore = me.getStore('favouriteMenu');

		// Prevent sample menus from being added to MyMenu [KHH.MyMenu.2020.06.04]
		var copyStore= new Ext.data.Store();
		copyStore.add(menuList.getRange());
		refs.refmenu.add({
			xtype: 'tsb-treemenu',
			reference: 'refTreeMenu',
        	store: copyStore,
        	sampleStore: sampleMenuList, // [KHH.SAMPLEMENU.2018.11.14]
        	favouriteMenuStore: favouriteMenuStore,
        	roleMenuStore: userRoleMenu,
        	viewScope : me
		})
		
		if(IoTosOmExt.getApplication().isSso === true &&
		   IoTosOmExt.getApplication().callType !== 'main'){
			refs.refmenu.setVisible(false);
			refs.refMainHeader.setVisible(false);
		}
	},
	
    onTabChange : function(tabPanel, newItem) {
    	var me = this;
    	var refs = me.getReferences();
    },

    showTab : function(id, subid) {
    	var tabPanel = this.lookupReference('ref-maintab');
        var child, childTabPanel;

        if (!id) {
            //no id was specified, use 0 index to resolve child
            id = 0;
        }

        child = Ext.getCmp(id);
        if(child)
        	childTabPanel = child.child('tabpanel');
        
        if(tabPanel){
        	tabPanel.setActiveTab(child);

	        if (childTabPanel) {
	            if (!subid) {
	                subid = 0;
	            }
	
	            childTabPanel.setActiveTab(subid);
	        }
        }
    },

    createTab: function(prefix, rec, cfg, isConfigChanged) {
    	var me = this;
    	var tabCount = me.getViewModel().get('tabCount'); 
        var tabs = me.lookupReference('ref-maintab');
        var id = prefix + '_' + rec.data.menuId;
        var tab = tabs.items.getByKey(id);

        if (!tab) {
            cfg.title = rec.data.menuScreenName;
            cfg.itemId = id;
            
            // KHH - 2019.05.14
            if(IoTosOmExt.getApplication().isSso &&
         	   IoTosOmExt.getApplication().callType !== 'main'){
            	cfg.closable = false;
            } else {
            	cfg.closable = true;
            }
            
            cfg.iconCls = rec.data.screenIconDefineCode;
            cfg.scrollable = true;
            cfg.record = rec;
            
            // KHH - 2019.01.12
            if(rec.recvData){
            	cfg.recvData = rec.recvData;
            }
            
            tab = tabs.add(cfg);
            
            me.getViewModel().set('tabCount', ++tabCount);
        } else {
        	if(isConfigChanged) {
        		// KHH - 2019.01.14
        		if(rec.recvData){
        			cfg.recvData = rec.recvData;
                }
        		
        		tab.setConfig(cfg);
        		tab.fireEvent('afterrender'); // KHH - 2019.01.14
        	}
        }

        tabs.setActiveTab(tab);
    },
    
    closeTab: function(id) {
    	var me = this;
    	var tabs = me.lookupReference('ref-maintab');
    	var tab = tabs.items.getByKey(id);
    	
    	if (tab) {
    		tab.destroy();
    	}
    },
    
	onProfileLoad: function(){
		var me = this;
		me.processChangePartnerType();
	},
	
	onCloseAllTab: function () {
		var me = this;
		var centertab = me.lookupReference('ref-maintab');
		var menuscreen = centertab.items.items;		
		var ln = menuscreen.length;
		
		if (menuscreen){
			for (i = ln - 1; i > -1; i--) {
				var screen = menuscreen[i];
				if ((screen.title.toString() != 'Workspace') && (screen.title.toString() != 'Dashboard') && (screen.title.toString() != 'Inbox')) {
					screen.close();
				}
			}
		}
		me.getViewModel().set('tabCount', 0);
	},
	
	onMenuClick: function (record, isConfigChanged) {
		var me = this;

		if(record == undefined) return;
		
        if(record.data.openType != '0') {
        	var serviceLaneCode = me.getViewModel().get("serviceLaneCode");
    		var vesselScheduleId = me.getViewModel().get("vesselScheduleId");
    		var portCode = me.getViewModel().get("portCode");
    		var vesselId = me.getViewModel().get("vesselId");
    		var vesselName = me.getViewModel().get("vesselName");
    		var imoNo = me.getViewModel().get("imoNo");
    		var voyageNo = me.getViewModel().get("voyageNo");
    		var ascId = me.getViewModel().get("ascId");
    		var tag = me.getViewModel().get("tag");
    		var origin = me.getViewModel().get("origin") || 'DRAFT';
    		
    		
        	//TODO: need to define process
        	if (record.data.bizCfgUse === "D" && !serviceLaneCode){
        		Ext.onReady(function(){
        			Ext.toast({
        				html: IoTosOmExt.getApplication().bundle.getMsg('needselectmasterinfo_shpsvc_html_msg'),
        				closable: false,
        				align: 'tr',
        				slideInDuration: 300,
        				minWidth: 400
        			});		
        		});
        		
        		return;
        	}
        	
        	if (record.data.menuScreenName) {
        		if(record.data.menuTypeCode != 'FOLDER'){
        			if(record.data.screenPathAddress.indexOf("http://")>=0){
        				var url = record.data.screenPathAddress;
        				ViewUtil.openWindow(url);
        			} else {
        				if(record.data.popupYn !== 'Y') { //Tab
            				me.createTab('menu', record, {
            					xtype: record.data.screenPathAddress,
            					cfgOrigin: origin,
            					cfgServiceLaneCode: serviceLaneCode,
            					cfgVesselScheduleId: vesselScheduleId,
            					cfgPortCode: portCode,
            					cfgVesselId: vesselId,
            					cfgVesselName: vesselName,
            					cfgImoNo: imoNo,
            					cfgVoyageNo: voyageNo,
            					cfgAscId: ascId,
            					cfgTag: tag
            				}, isConfigChanged);
            			} else if(record.data.popupYn === 'Y') { //Modal
            				Ext.widget(record.data.screenPathAddress, {
            					cfgOrigin: origin,
            					cfgServiceLaneCode: serviceLaneCode,
            					cfgVesselScheduleId: vesselScheduleId,
            					cfgPortCode: portCode,
            					cfgVesselId: vesselId,
            					cfgVesselName: vesselName,
            					cfgImoNo: imoNo,
            					cfgVoyageNo: voyageNo,
            					cfgAscId: ascId,
            					cfgTag: tag
            				});	
            			}
        			}
        		}
        	}
        }
    },
    
    onShowUserInfo: function() {
    	var me = this;
    	var profileStore = me.getStore('profileStore');
    	
    	var rec = {
			data: {
				menuId: 'UserInfo' + 'app-userinfo',
				menuScreenName: me.headerName, 
				screenIconDefineCode: 'x-fa fa-users', 
				screenPathAddress: 'app-userinfo'
			}
    	};
    	
    	me.createTab('menu', rec,{
    		xtype: rec.data.screenPathAddress
    	});
    	
    	me.onUserInfoLoad();
    	
    },
    
    onContainerSearch: function(f,e){
    	var me = this;
    	
		if(e.getKey() == e.ENTER){
			if(!StringUtil.isNullorEmpty(f.getValue())){
				var containerNo = f.getValue();
				var url = Ext.String.format('{0}cntr_no={1}', CONSTANTS.EXTERNAL_URL['CONTAINER_DETAIL'], containerNo);
				ViewUtil.openWindow(url);
				
//				var viewId = 'app-containerdetail';
//				var recvData = Ext.create('IoTosOmExt.model.tools.SearchContainer');
//				recvData.set('containerNo', containerNo);
//				me.onLoadView(viewId, recvData);
			}
		}
	},
    
	onFavoriteClick: function(btn) {
	
    	var me = this;
    	var refs = me.getReferences();
    	var tabs = me.lookupReference('ref-maintab');
        var activeTab = tabs.getActiveTab();
    	var rec = activeTab.record;
    	var menuStore = me.getStore('menuList');
    	var favouriteMenuStore = me.getStore('favouriteMenu');
    	var isFavorite = false, favIndex;
    	var treeMenu = refs.refTreeMenu;
    	var root = treeMenu.treeStore.getRoot();
    	
    	for (var i = 0; i < favouriteMenuStore.data.length; i++) {
			if (favouriteMenuStore.data.items[i].data.menuId === rec.data.menuId){
				isFavorite = true;
				favIndex = i;
				break;
			}
		}
    	
    	if(isFavorite) {
    		//Remove
    		favouriteMenuStore.removeAt(favIndex);
    		
    		var favouriteNode = root.findChild('menuId', 'Favourites');
    		//var parentNode = root.findChild('menuId', rec.data.uprMenuId);
    		var childNode = favouriteNode.findChild('menuId', rec.data.menuId);
    		
    		favouriteNode.removeChild(childNode);
    		
    	} else {
    		var menuRecord = Ext.create('IoTosOmExt.model.authority.AuthMenuItem', {
    			systemCode: rec.data.systemCode,
    			menuId: rec.data.menuId,
    			screenPathAddress: rec.data.screenPathAddress
    		}); 							
    		favouriteMenuStore.insert(favIndex,menuRecord);
    		var node = root.findChild('menuId', 'Favourites');
			
    		node.appendChild({
    			text: rec.data.menuScreenName,
    			iconCls: rec.data.screenIconDefineCode,
    			menuId: rec.data.menuId,
				parent: rec.data.menuId,
    			//rowCls: 'nav-tree-badge nav-tree-badge-new', //Can add Badge
    			viewType: rec.data.upperMenuId,
    			rec: rec,
    			leaf: true
    		});
    	}

    	//menuStore.fireEvent('load');
    	
    	favouriteMenuStore.sync({
		    success: function(batch) {
				Ext.toast({
				 	html: IoTosOmExt.getApplication().bundle.getMsg('successsave_msg',''),
				 	closable: false,
				 	align: 'tr',
				 	slideInDuration: 300,
				 	minWidth: 400
				});	
				
				if(isFavorite) {
					refs.refFavoriteMenu.setIconCls('x-fa fa-star-o');
	        	} else {
	        		refs.refFavoriteMenu.setIconCls('x-fa fa-star txt_yellow');
	        	}
		    },
		    failure: function(batch) {
				Ext.toast({
				 	html: IoTosOmExt.getApplication().bundle.getMsg('fail_msg',''),
				 	closable: false,
				 	align: 'tr',
				 	slideInDuration: 300,
				 	minWidth: 400
				});	
		    }
		});
    },
    
    // 2019.08.18.Tonny.Kim
    onChangePassword: function(){
		var me = this;
		var title = {type: 'bundle', key: 'changepasswordview'};
		var popupAlias = 'app-changepassword';
		
		me.openViewAliasDetailPopup(null, title, popupAlias);
	},
    
	onSavePassword: function(){
		var me = this;
		var refs = me.getReferences();
		var pwdStore = me.getStore('changePwd');
		var model = new IoTosOmExt.model.authority.User();
		var view = refs.refChangePassword;
		var form = view.down('form').getForm();
		model.data.password = form.getValues().txtPassword;
		model.data.userId = ESVC.config.Token.getUserId();
		model.data.activeCode = ESVC.config.Token.getActiveCode();
		pwdStore.insert(0, model);
		
		pwdStore.sync({
			success: function(){
				view.close();
				var success = IoTosOmExt.getApplication().bundle.getMsg('success_msg');
				var msg = IoTosOmExt.getApplication().bundle.getMsg('successsave_msg');
				Ext.Msg.alert(success, msg);
			}
		});
	},
	
	// Partner Type Change Event Handler
	changePartnerType : function(){
		var me = this;
		var refs = me.getReferences();
		var combo = refs.ctlUserInfoPartnerType;
		var partnerType = combo.getValue();
		var partnerCode = combo.getSelection().get('partnerCode');
		
		refs.ctlUserInfoPartnerCode.setValue(combo.getSelection().get('partnerCode'));
		 
		ESVC.config.Token.setPartnerType(partnerType);
		ESVC.config.Token.setPartnerCode(partnerCode);
		 
		//  me.processChangePartnerType();
	},
	
	// Process Change Partner Type
	processChangePartnerType : function(){
		var partnerType = ESVC.config.Token.getPartnerType();
		var partnerCode = ESVC.config.Token.getPartnerCode();
		
		var item = Ext.create('ESVC.model.common.CheckSession');
		 item.set('partnerType', partnerType);
		 item.set('partnerCode', partnerCode);
		 
		 var proxy = item.getProxy();
		proxy.url = IoTosOmExt.config.Locale.getRestApiDestUrl() + '/v1/session/changePartner';
		
		item.save({
           callback: function(record, operation, success) {
        	   if(success) {
        	   }
           }
		});
	},
	
    onUserInfoLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var partnerTypeStore = me.getStore(me.PARTNER_TYPE_COMBOBOX_STORE);
		
		refs.ctlUserInfoUserId.setValue(ESVC.config.Token.getUserId());
		refs.ctlUserInfoUserName.setValue(ESVC.config.Token.getUserName());
		refs.ctlUserInfoEmail.setValue(ESVC.config.Token.getEmail());
		
		if(ESVC.config.Token.getUserLevel()){
			var userLevel = me.getLocalCacheItemsForCodeName(CacheServiceConstants.USER_LEVEL, ESVC.config.Token.getUserLevel());
			refs.ctlUserInfoUserLevel.setValue(userLevel);
		}
		
		if(ESVC.config.Token.getUserType() === UserSessionServiceConstants.EXTERNAL){
			refs.ctlUserInfoPartnerCode.setVisible(true);
			refs.ctlUserInfoPartnerType.setVisible(true);
			partnerTypeStore.setData(ESVC.config.Token.getPartnerList());
			
			refs.ctlUserInfoPartnerType.setValue(ESVC.config.Token.getPartnerType());
			refs.ctlUserInfoPartnerCode.setValue(ESVC.config.Token.getPartnerCode());
		} else {
			refs.ctlUserInfoPartnerCode.setVisible(false);
			refs.ctlUserInfoPartnerType.setVisible(false);
		}
	},
	
	onSaveUserInfo: function(type){
		
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('profileStore');
		var form = me.getView().down('form').getForm();
		var view = me.getView();
		
		if(form.isValid()){
			var model = new IoTosOmExt.model.authority.User(form.getValues());
			store.insert(0, model);
        	store.sync({
    			success:function(){
    				// me.onProfileLoad();
    				Ext.toast({
					 	html: IoTosOmExt.getApplication().bundle.getMsg('successsave_msg',''),
					 	closable: false,
					 	align: 'tr',
					 	slideInDuration: 300,
					 	minWidth: 400
					});	
    				
    			}
    		});
		}
	},
	
	onCheckEmail : function() {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var form = me.getView().down('form').getForm();
		var email = form.getValues().email;
		if(email != ESVC.config.Token.getEmail()){
			var store = me.getStore('emailChecking');
			store.load({
				params : {
					email : email
				}, 
				callback: function(records, operation, success) {
					if (records.length != 0) {
						refs.ctlUserInfoEmail.markInvalid(IoTosOmExt.getApplication().bundle.getMsg('invalidEmail_msg'));
					}
				}
			});
		}
		
	},
	
	onInboxClick: function(btn){
		var me = this;
		
		me.createTab('menu', {
    		data: {
    			menuId: 'Inbox' + 'app-inbox',
    			menuScreenName: 'Inbox',
    			screenPathAddress: 'app-inbox',
				screenIconDefineCode: 'x-fa fa-envelope'
    		}
    	},{
			xtype: 'app-inbox'
		});
	},
	
	onMessagePollingClick: function(btn){
		var me = this;
    	var provider = Ext.direct.Manager.getProvider('messagePollProvider');
    	
    	if(btn.value === 'start') {
    		if (!provider.isConnected()) {
    			provider.setConfig({
    				baseParams: {
    					userId: ESVC.config.Token.getUserId()
    				}
    			});
    			provider.addListener('data', me.onPollingData, me);
    			provider.connect();
    		}
    	} else {
    		if (provider.isConnected()) {
    			provider.removeListener('data', me.onPollingData);
    			provider.disconnect();
    		}
    	}
	},
	
	onPollingData: function(provider, event) {
		var me = this;
		
		if (event && event.data) {
			if(event.data.data.length > 0) {
				Ext.toast({
					html: 'New message arrived from DG Operation',
					closable: true,
					align: 't',
					slideInDuration: 300,
					minWidth: 400
				});
				
				for(var i=0; i<event.data.data.length; i++) {
					var data = event.data.data[i];
					var rec = Ext.create('IoTosOmExt.model.message.Message', {
						messageId: data.messageId,
						userId: data.userId,
						userName: data.userName,
						email: data.email,
						definitionId: data.definitionId,
						definitionDesc: data.definitionDesc,
						read: data.read,
						businessKey: data.businessKey,
						title: data.title,
						content: data.content,
						lastPollTime: data.lastPollTime,
						registeredUserId: data.registeredUserId,
						registeredUserName: data.registeredUserName
					});
					
					IoTosOmExt.getApplication().mostMessage.insert(0, rec);
					
					if(data.definitionId === 'BIZ20') {
						Ext.MessageBox.show({
				            title: 'Invitation for sharing plan',
				            msg: 'You are invited for sharing plan from ' + data.registeredUserName + '\r\n' + 'Do you want accept?' + '\r\n' + data.content,
				            buttons: Ext.MessageBox.YESNO,
				            buttonText:{ 
				                yes: "Accept", 
				                no: "Later" 
				            },
				            scope: me,
				            fn: function(btn) {
				                if (btn === 'yes') {
				                	me.onVesselObserverLoad(rec);
				                }
				            }
				        });
					} 
				}
			}
		}
	},
	
	onVesselObserverLoad: function(record){
		var me = this;
        var tabs = me.lookupReference('ref-maintab');
        var id = 'menu' + '_' + 'app-vesselobserver';
        var tab = tabs.items.getByKey(id);
        
        if (tab) {
        	tab.close();
        }
        
        me.createTab('menu', {
    		data: {
    			menuId: 'VesselObserver' + 'app-vesselobserver',
    			menuScreenName: 'Vessel Observer',
    			screenPathAddress: 'app-vesselobserver',
				screenIconDefineCode: 'x-fa fa-ship'
    		}
    	},{
			xtype: 'app-vesselobserver',
			cfgAscId: record.data.businessKey,
			cfgMessageId: record.data.messageId
		});
	},
	
	//TODO: Test
	onExceptionTestClick: function(){
		var me = this;
		try {
			store.add({})
		} catch(err){
			alert(err.message);
		}
	},
	
	// Tab Create - KHH - 2019.01.14
	onLoadView : function(viewAlias, recvData){
		var me = this;
		var menuStore = me.getStore('menuList');
		var sampleMenuList = me.getStore('sampleMenuList');
		var idx = menuStore.findExact('screenPathAddress', viewAlias);
		var isConfigChanged = false;
		var viewObj;
		
		if(idx >= 0){
			viewObj = menuStore.getAt(idx);
		} else {
			idx = sampleMenuList.findExact('screenPathAddress', viewAlias);
			viewObj = sampleMenuList.getAt(idx);
		}
		
		if(Ext.isDefined(viewObj) && Ext.isDefined(recvData)){
			viewObj.recvData = recvData;
			isConfigChanged = true;
		}
		
		if(viewObj){
			me.onMenuClick(viewObj, isConfigChanged);
		}
	},
	onSetMenu : function(menuList){
		var accessMenuItems = ESVC.config.Token.getAccessAuthorityMapItem();
		for(var i=0; i<accessMenuItems.length;i++){
			if(!StringUtil.isNullorEmpty(accessMenuItems[i].menuCaption)){
				var menuItems = Ext.create('IoTosOmExt.model.authority.AuthMenuItem');
				if(accessMenuItems[i].menuCaption.indexOf("app-")>-1||
				   accessMenuItems[i].menuCaption.indexOf("http://")>-1||
				   accessMenuItems[i].menuCaption == accessMenuItems[i].formName){
					menuItems.data.menuId = (accessMenuItems[i].path=="NODE"?accessMenuItems[i].menuCaption:accessMenuItems[i].subMenu)//accessMenuItems[i].subMenu; 
					menuItems.data.upperMenuId = (accessMenuItems[i].path=="NODE"?"ROOT":accessMenuItems[i].topMenu);
					menuItems.data.menuOrder = (accessMenuItems[i].path=="NODE"?"0":"5");
					menuItems.data.screenPathAddress = accessMenuItems[i].menuCaption;
					if(accessMenuItems[i].icon != null) {
						menuItems.data.screenIconDefineCode = accessMenuItems[i].icon;
					}
//					menuItems.data.screenIconDefineCode =  "x-fa fa-star";
					if(accessMenuItems[i].menuCaption != accessMenuItems[i].formName)
					{
						menuItems.data.menuTypeCode = "SCREEN";
					}else
					{
						menuItems.data.menuTypeCode = "FOLDER";
					}
					menuItems.data.menuScreenName =  accessMenuItems[i].formCaption;
					menuItems.data.depth = accessMenuItems[i].depth+1;
					menuList.insert(i, menuItems);
				}
			}
		}	
	},
	// MyMenu 2020.06.04.Tonny.Kim
	onMyMenuClick : function(btn) {
    	var me = this;
    	var menuStore = me.getStore('menuList');
    	
    	var rec = {
			data: {
				menuId: 'MyMenu' + 'app-mymenu',
				menuScreenName: ViewUtil.getLabel('myMenu'), 
				screenIconDefineCode: 'x-fa fa-star-o', 
				screenPathAddress: 'app-mymenu'
			}
    	};
    	
    	rec.recvData = menuStore;
    		
    	me.createTab('menu', rec,{
    		xtype: rec.data.screenPathAddress
    	});
	}
});

Ext.define('IoTosOmExt.view.inquirydata.datachange.DataChangeController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.datachange',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDataChangeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'dataChangeStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.view.inquirydata.datachange.DataChangeModel',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('IoTosOmExt.model.inquirydata.datachange.SearchDataChange');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});	
		me.updateViewStyle(me.getView());
		me.onLoadStores();
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */		
	
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch : function(control) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

		if (params == null || params == false) {
			return;
		}
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
		if(control) {
			me.onLoadStores('Search');
		}
	},
	
	// Grid Excel/PDF Export
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.web.edi.bizparm.errorcode.SearchErrorCodeBizParm';
		searchBizParm.serviceID = 'EDI.errorcode.searchItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},

	// Grid Row Double
	onDataChangeGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},

	onColumnRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var codeStore;

		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrHeightWidth' : codeStore = me.getStore('cntrHeightWidthStore'); break;
			case 'transType' : codeStore = me.getStore('transTypeStore'); break;
			case 'transType2' : codeStore = me.getStore('transTypeStore'); break;
			case 'dispatchMode' : codeStore = me.getStore('dispatchModeInStore'); break;
			case 'dispatchMode2' : codeStore = me.getStore('dispatchModeOutStore'); break;
			case 'shiftTime' : codeStore = me.getStore('shiftingTimeStore'); break;
			case 'shiftType' : codeStore = me.getStore('shiftingTypeStore'); break;
			case 'shiftRsn' : codeStore = me.getStore('shiftingRsnStore'); break;
			case 'stuffChk' : codeStore = me.getStore('stuffTypeStore'); break;
			case 'overlandChk' : codeStore = me.getStore('overlandTypeStore'); break;
		}

		if(codeStore != null) {
			codeStore.data.items.forEach(function(record){
				if(record.data.code == value) {
					value = record.data.name;
				}
			});
		}
		return value;
	},

	onColumnRendererFromLocalCache : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var codeName = value;
		var key = null;
		
		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrType' : key = 'Weight Limit Type Code'; break;
			case 'cntrLength' : key = 'CNLH'; break;
			case 'ixCd' : key = 'IX CD'; break;
			case 'cntrState' : key = 'Container Status'; break;
			case 'rehandleCode' : key = 'Loading confirm'; break;
			case 'delv' : key = 'delivery type'; break;
			case 'transType' : key = 'trans type'; break;
			case 'transType2' : key = 'trans type'; break;
			case 'cargoType' : key = 'Cargo Type'; break;
			case 'dmgCond' : key = 'Filter Damage Condition'; break;
			case 'type2' : key = 'PackType'; break;
			case 'type3' : key = 'PackType'; break;
			case 'type4' : key = 'PackType'; break;
			case 'type5' : key = 'PackType'; break;
			case 'type6' : key = 'PackType'; break;
			case 'type7' : key = 'PackType'; break;
			case 'type8' : key = 'PackType'; break;
			case 'type9' : key = 'PackType'; break;
			case 'type10' : key = 'PackType'; break;
			case 'packType' : key = 'PackType'; break;
		}
		
		if(key != null) {
			codeName = LocalCacheServiceUtil.getLocalCacheItemsForCodeName(key,value);
			if(codeName == null) {
				codeName = value;
			}
		}
		return codeName;
	},

	onPsztpRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var sztp = record.data.sztp;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', sztp, 0, false, true, true);

		if(record != null) {
			value = record.data.sztpCode;
		}

		return value;
	},

	onPackUnpackChanged : function(obj, newValue, oldValue) {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var childContainerlItem = me.getViewModel().get('theChildContainerDetail');
		
		if(newValue == CodeConstantsOM.bundlePackType.UN_PACKED && detailItem.data.tableName != CodeConstantsOM.tableName.INVENTORY_TABLE_NAME) {
			MessageUtil.error('fail_msg', 'MSG_CTOM_00161', [childContainerlItem.data.cntrNo]);
			obj.setValue(null);
			return false;
		}
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var vvdData = refs.ctlVesselSelection.selectionData;
		var tableName = me.getTableName();
		var searchParm = me.getViewModel().get('theSearch',['cntrNoBindingText', 'classBindingText']);
		
		if(tableName == CodeConstantsOM.commonCode.ALL) {
			if(
				(
					vvdData == null
					|| OmCommonMethod.isNullOrEmpty(vvdData.vesselCode) == true
					|| OmCommonMethod.isNullOrEmpty(vvdData.callYear) == true
					|| OmCommonMethod.isNullOrEmpty(vvdData.callSeq) == true
				)
				&& OmCommonMethod.isNullOrEmpty(searchParm.data.cntrNoBindingText) == true
			){
				MessageUtil.error('fail_msg', 'MSG_CTOM_00826' , null);
				return false;
			}
		}

		var params = me.createParam(searchParm);
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
		}
		params['tableName'] = tableName;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	getTableName : function() {
		var me = this;
		var refs = me.getReferences();

		return refs.ctlTableNameRadioGroup.getValue().tableName;
	},

	onLoadStores : function(control) {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;
		
		var oprCodeStore = me.getStore('oprCodeStore');
		var billingOprCodeStore = me.getStore('billingOprCodeStore');
		var feCodeStore = me.getStore('feCodeStore');
		var storageCodeStore = me.getStore('storageCodeStore');
		var statusCodeStore = me.getStore('statusCodeStore');
		var blockCodeStore = me.getStore('blockCodeStore');
		var areaCodeStore = me.getStore('areaCodeStore');
		var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var transTypeStore = me.getStore('transTypeStore');
		var porCodeStore = me.getStore('porCodeStore');
		var polCodeStore = me.getStore('polCodeStore');
		var podCodeStore = me.getStore('podCodeStore');
		var vvdPortCodeStore = me.getStore('vvdPortCodeStore');
		var fPodCodeStore = me.getStore('fPodCodeStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
		var ySpecialTypeStore = me.getStore('ySpecialTypeStore');
		var handleInstrCodeStore = me.getStore('handleInstrCodeStore');
		var yHandleInstrCodeStore = me.getStore('yHandleInstrCodeStore');
		var absoluteConstStore = me.getStore('absoluteConstStore');
		var dispatchModeInStore = me.getStore('dispatchModeInStore');
		var dispatchModeOutStore = me.getStore('dispatchModeOutStore');
		var returnRsnStore = me.getStore('returnRsnStore');
		var customAppTypeStore = me.getStore('customAppTypeStore');
		var shiftingTimeStore = me.getStore('shiftingTimeStore');
		var shiftingTypeStore = me.getStore('shiftingTypeStore');
		var shiftingRsnStore = me.getStore('shiftingRsnStore');
		var damageConditionStore = me.getStore('damageConditionStore');
		var containerConditionStore = me.getStore('containerConditionStore');
		var trukerStore = me.getStore('trukerStore');
		var forwarderCodeStore = me.getStore('forwarderCodeStore');
		var stuffTypeStore = me.getStore('stuffTypeStore');
		var overlandTypeStore = me.getStore('overlandTypeStore');
		var laneCodeStore = me.getStore('laneCodeStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');
		var cntrHeightWidthStore = me.getStore('cntrHeightWidthStore');

		if(control == 'Search') {
         if(vvdData != null) {
         	oprCodeStore.load({
         		params : {
         			args : [vvdData.vesselCode, vvdData.callYear, vvdData.callSeq],
         			itemKey : PopupServiceConstants.ItemKey.VVD_OPR_ONLY
         		}
            });
            
            podCodeStore.removeAll();
         	vvdPortCodeStore.load({
					params : {
						args : [vvdData.vesselCode, vvdData.callYear, vvdData.callSeq],
						itemKey : PopupServiceConstants.ItemKey.VVD_PORT_ONLY
					},
					callback : function(vvdPortRecords) {
						podCodeStore.add(vvdPortRecords);
					}
				});
         }
         return;
		}
		billingOprCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR
			}
		});
		feCodeStore.load({
         params : {
				itemKey : PopupServiceConstants.MasterCode.FE
         }
		});
		storageCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.STORAGE_CODE
			}
		});
		statusCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.CNTR_STATE
			}
		});
		blockCodeStore.load();
		areaCodeStore.load();
		deliveryCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.DELIVERY
         }
		});
		transTypeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.TRANSPORT_TYPE
         }
		});
		porCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.POR
			}
		});
		polCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.PORT_CODE,
				args : [CodeConstantsOM.commonCode.UNLO]
			}
		});
		fPodCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.ItemKey.PORT_CODE,
            args : [CodeConstantsOM.commonCode.UNLO]
         }
      });
      fDestCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.GeneralCode.FDEST
         }
		});
		cargoTypeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.CARGO_TYPE
         }
		});
		ySpecialTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.YARD_HANDLING_SPECIAL_TYPE
			}
		});
		handleInstrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.HANDLE_INSTR
			}
		});
		yHandleInstrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.YARD_HANDLING_INSTR
			}
		});
		absoluteConstStore.load({
         params : {
            itemKey : PopupServiceConstants.GeneralCode.ABSTRACT_CONSTRAINTS
         }
		});
		dispatchModeInStore.load({
			params : {
            itemKey : PopupServiceConstants.MasterCode.DISPATCH_MODE_IN
         }
		});
		dispatchModeOutStore.load({
			params : {
            itemKey : PopupServiceConstants.MasterCode.DISPATCH_MODE_OUT
         }
		});
		returnRsnStore.load({
			params : {
            itemKey : PopupServiceConstants.GeneralCode.RETURN_TO_TERMINAL_REASON
         }
		});
		customAppTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.CUSTOM_APP_TYPE
			}
		});
		shiftingTimeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESTOW_TYPE
			}
		});
		shiftingTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESTOW_AREA
			}
		});
		shiftingRsnStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.SHIFTING_REASON
			}
		});
		damageConditionStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.DAMANAGE_CONDITION
			}
		});
		containerConditionStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.CONTAINER_CONDITION
			}
		});
		trukerStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.TRUCKER
			}
		});
		forwarderCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.FORWARDER
			}
		});
		stuffTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.STUFF_TYPE
			}
		});
		overlandTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.OVERLANE_TYPE
			}
		});
		laneCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.LANE_CODE
			}
		});
		sztpCodeStore.load();
		cntrHeightWidthStore.load({
			params: {
				itemKey : PopupServiceConstants.ItemKey.CNTR_HEIGHT_WIDTH
			}
		});
	},

	onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'packingGroupStore') {
			imdg = refs.ctlImdg.getValue();
			unno = refs.ctlUnno.getValue();
		}
		
		operation.setParams({
			itemKey : PopupServiceConstants.ItemKey.VALID_PACKING_GRP,
			args : [imdg, unno]
		});
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */

	// Detail Load
	onDetailLoad : function() {
		var me = this;
		var form = me.getDetailBizView().down('form');
		form.isValid(); // Mandatory to appear red for.
		me.setDetailInitialize();	
		me.updateViewStyle(me.getDetailBizView());
	},

	setDetailInitialize : function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData) {
			me.setUpdateModeControl();
			
		}else {
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
		}

		if(!recvData.phantom) {
			recvData.commit();
		}
		me.getViewModel().setData({theDetail:recvData});
	},

	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	// Build Data Item
	buildDataItem : function(detailItem){
		var me = this;

		detailItem.set('staffCd', me.getStaffCd());
		return detailItem;
	},

	// Detail Save
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');

		if(detailView){			
			if(me.onSaveMandatoryCheck()){
				if(detailItem.dirty){
					me.saveProcess();
				}
			}
		}
	},

	onSaveMandatoryCheck : function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var infoForm = detailView.down('form');

		if(infoForm.isValid() == false) {
			MessageUtil.mandatoryFieldInValid();
			return false;
		}

		if(detailItem.data.delv == CodeConstantsOM.delivery.SHIFTING
			&& OmCommonMethod.isNullOrEmpty(detailItem.data.shiftingTime) == true	
		) {
			MessageUtil.error('fail_msg', 'MSG_CTOM_00024', ViewUtil.getLabel('WRD_CTOM_ShiftTime'));
			return false;
		}

		return true;
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			

		if(detailItem == null){
			return;
		}
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', WorkingStatus.convertInt(isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE));
		updateParm.set('item', me.buildDataItem(detailItem).data);
		
		updateParm.save({
			success : function(record){
				if(isCreated){
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
				}
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.set('backUpItem', detailItem.copy(null).data);
				detailItem.commit();
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

	onSztpChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var sztp2;
		var privateSztp;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', newValue, 0, false, true, true);
		
		if(record != null){
			sztp2 = record.data.sztpGroupCode;
			privateSztp = record.data.sztpCode;
		}
		
		refs.ctlSztp2Detail.setValue(sztp2);
		refs.ctlPrivateSztpDetail.setValue(privateSztp);
	},

	onTempCChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if(newValue == null || newValue == "") {
         refs.ctlTempF.setValue(null);   
      }else {
         refs.ctlTempF.setValue(newValue * 9 / 5 + 32);
      }
	}

	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});
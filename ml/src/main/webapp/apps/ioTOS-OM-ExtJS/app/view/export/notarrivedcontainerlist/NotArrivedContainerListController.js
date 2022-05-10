Ext.define('IoTosOmExt.view.export.notarrivedcontainerlist.NotArrivedContainerListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.notarrivedcontainerlist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refNotArrivedContainerListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'notArrivedContainerListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.export.notarrivedcontainerlist.NotArrivedContainerList',
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
		var searchParm = Ext.create('IoTosOmExt.model.export.notarrivedcontainerlist.SearchNotArrivedContainerList');
		
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
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
      
		if (params == null) {
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
   },
   
	// Grid Excel/PDF Export
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.web.edi.bizparm.errorcode.SearchErrorCodeBizParm';
		searchBizParm.serviceID = 'EDI.errorcode.searchItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
   
   onColumnRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var codeStore;

		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrHeightWidth' : codeStore = me.getStore('cntrHeightWidthStore'); break;
			case 'cntrLength' : codeStore = me.getStore('cntrLengthStore'); break;
         case 'cntrType' : codeStore = me.getStore('cntrTypeStore'); break;
         case 'weightGroup' : codeStore = me.getStore('weightGroupCodeStore'); break;
         case 'rsrvType' : codeStore = me.getStore('reserveTypeStore'); break;
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
			case 'ixCd' : key = 'IX CD'; break;
			case 'cntrState' : key = 'Container Status'; break;
			case 'rehandleCode' : key = 'Loading confirm'; break;
			case 'delv' : key = 'delivery type'; break;
			case 'transType' : key = 'trans type'; break;
			case 'transType2' : key = 'trans type'; break;
			case 'cargoType' : key = 'Cargo Type'; break;
			case 'handleInstr' : key = 'YardHandling Instruction'; break;
			case 'yhandleInstr' : key = 'YardHandling Instruction'; break;
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
		
		if(record != null){
			value = record.data.sztpCode;
		}

		return value;
	},
   
   onChangeFilteringOption : function(obj, newValue, oldValue, eOpts) {
      var me = this;
      me.onSearch();
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
		var searchParm = me.getViewModel().get('theSearch');
		
		var params = me.createParam(searchParm);
		var vvdData = refs.ctlVesselSelection.selectionData;
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
		}
		
		var filteringOption = refs.ctlFilteringOptionRadioGroup;
		var optionValue = filteringOption.getValue().filteringOption;
      if(optionValue == CommonConstants.ALL) {
         params['isReserve'] = CommonConstants.YES;
         params['isInventory'] = CommonConstants.YES;
         params['isMaster'] = CommonConstants.YES;
      }else {
         params['isReserve'] = CommonConstants.NO;
         params['isInventory'] = CommonConstants.NO;
         params['isMaster'] = CommonConstants.NO;

         if(optionValue == CodeConstantsOM.commonCode.RESERVED) {
            params['isReserve'] = CommonConstants.YES;
         }else if(optionValue == CodeConstantsOM.commonCode.IN_YARD) {
            params['isInventory'] = CommonConstants.YES;
         }else if(optionValue == CodeConstantsOM.commonCode.DELIVERED) {
            params['isMaster'] = CommonConstants.YES;
         }
		}
		
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	onLoadStores : function() {
		var me = this;
		
		var sztpCodeStore = me.getStore('sztpCodeStore');
		var weightGroupCodeStore = me.getStore('weightGroupCodeStore');
		var cntrHeightWidthStore = me.getStore('cntrHeightWidthStore');
		var cntrLengthStore = me.getStore('cntrLengthStore');
		var cntrTypeStore = me.getStore('cntrTypeStore');
		var reserveTypeStore = me.getStore('reserveTypeStore');

		sztpCodeStore.load();

		cntrHeightWidthStore.load({
			params: {
				itemKey : PopupServiceConstants.ItemKey.CNTR_HEIGHT_WIDTH
			}
		});
		cntrLengthStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CNTR_LENGTH
			}
		});
		cntrTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CNTR_TYPE
			}
		});
		weightGroupCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.WEIGHT_GROUP_TYPE
			}
		});
		reserveTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESERVE_TYPE
			}
		});
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});
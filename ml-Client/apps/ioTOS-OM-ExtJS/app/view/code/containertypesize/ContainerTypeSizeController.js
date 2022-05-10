Ext.define('IoTosOmExt.view.code.containertypesize.ContainerTypeSizeController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.containertypesize',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refContainerTypeSizeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'containerTypeSizeStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.code.containertypesize.ContainerTypeSize',
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
      var searchParm = Ext.create('IoTosOmExt.model.code.containertypesize.SearchContainerTypeSize');
      
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

	// Grid Row Double
	onDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var searchOption = refs.ctlSearchOption;

		if (record == null || searchOption.getValue().isoType == CodeConstantsOM.commonCode.isoType6346)
			return;
		
		me.openDetailPopup(record);
	},
	
	// Add
	onGridAdd : function() {
		var me = this;
		var refs = me.getReferences();

		me.openDetailPopup(null);
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
      var searchOption = refs.ctlSearchOption;
      var operatorCombo = refs.ctlOperatorCodeCmb;

      if(searchOption.getValue().isoType == CodeConstantsOM.commonCode.Operator) {
         params['isoType'] = operatorCombo.getValue();
      }else {
         params['isoType'] = searchOption.getValue().isoType;
      }

		params['pageNo'] = pageNo;
      params['sizePerPage'] = sizePerPage;
      params['useChk'] = CommonConstants.YES;
		
		return params;
	},
	
	onLoadStores : function() {
		var me = this;
		var operatorCodeStore = me.getStore('operatorCodeStore');
      var containerSizeStore = me.getStore('containerSizeStore');
		var containerTypeStore = me.getStore('containerTypeStore');
		
		operatorCodeStore.load({
         params : {
				itemKey : PopupServiceConstants.ItemKey.OPR_CODE
         }
      });
      containerSizeStore.load();
      containerTypeStore.load();
	},

   onTypeSizeClick : function(btn) {
      var me = this;
      var refs = me.getReferences();
      var win;
      var winTitle;
      var storeNm;
      var winReference;
      var winType;

      if(btn.value == CodeConstantsOM.commonCode.type) {
         win = refs.ctlContainerTypeWin;
         winTitle = ViewUtil.getLabel('WRD_CTOM_Menu_ContainerTypeCode');
         storeNm = 'containerTypeStore';
         winReference = 'ctlContainerTypeWin';
         winType = btn.value;

      }else if(btn.value == CodeConstantsOM.commonCode.size) {
         win = refs.ctlContainerSizeWin;
         winTitle = ViewUtil.getLabel('WRD_CTOM_Menu_ContainerSizeCode');
         storeNm = 'containerSizeStore';
         winReference = 'ctlContainerSizeWin';
         winType = btn.value;
      }
      
      if(!win) {
         win = Ext.create('IoTosOmExt.view.code.containertypesize.ContainerTypeSizeWindow',{
            parentView : me.getView(),
            title : winTitle,
            storeNm : storeNm,
            reference : winReference,
            winType : winType
         });
         me.getView().add(win);
      }
      win.show();
      win.toFront();
   },

   onTypeSizeWinSave : function(btn) {
      var me = this;
      var containerSizeStore = me.getStore('containerSizeStore');
      var containerTypeStore = me.getStore('containerTypeStore');
      var winType = btn.up('window').winType;
      var store;
      var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
      
      if(winType == 'type') {
         store = containerTypeStore;

      }else if(winType == 'size') {
         store = containerSizeStore;
      }

      updateParm.getProxy().url = store.getProxy().url;
      updateParm.phantom = false;
	   updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
	   updateParm.set('items', new Array());
      
      var modifiedRecords = store.getModifiedRecords();
      
      modifiedRecords.forEach(function(item){
			me.buildDataItem(item);
			updateParm.get('items').push(item.data);
      });

	    updateParm.save({
			success : function(record){
            modifiedRecords.forEach(function(item){
               item.set('updateTime', record.get('updateTime'));
				   item.commit();
            });
				MessageUtil.saveSuccess(); // Success Message
			}
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
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		
		me.getViewModel().setData({theDetail:recvData});
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		if(recvData.data.useChk == "Y") {
			refs.ctlUseChk.setValue(true);
		}else {
			refs.ctlUseChk.setValue(false);
		}
		
	},
	
	// Build Data Item
	buildDataItem : function(detailItem){
		var me = this;
		var refs = me.getReferences();
		
		detailItem.set('staffCd', me.getStaffCd());
		
		return detailItem;
	},
	
	// Detail Save
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			var infoForm = detailView.down('form');
			
			if(infoForm.isValid()){
				if(detailItem.dirty){
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		var searchOption = refs.ctlSearchOption;
		var operatorCombo = refs.ctlOperatorCodeCmb;
		var isoType;

		if(detailItem == null){
			return;
		}
		
		var beforeChangedData = detailItem.modified;
		var afterChangedData = detailItem.getChanges();
		var typeSizeItemArray = new Array();

      if(searchOption.getValue().isoType == CodeConstantsOM.commonCode.Operator) {
         isoType = operatorCombo.getValue();
      }else {
         isoType = searchOption.getValue().isoType;
      }
		
		for(var beforeData in beforeChangedData) {
			var typeSizeItem = Ext.create(me.DEFAULT_MODEL);
			typeSizeItem.set('priCodeBackUp', beforeChangedData[beforeData]);
			if(detailItem.data.tunnel == 'Y') {
				typeSizeItem.set('isoCode', '*' + detailItem.data.sizeCode + beforeData.toUpperCase());
			}else {
				typeSizeItem.set('isoCode', detailItem.data.sizeCode + beforeData.toUpperCase());
			}
			typeSizeItem.set('isoType', isoType);
			var cntrTypeRecord = me.getStore('containerTypeStore').findRecord('code', beforeData);
			var gCode = cntrTypeRecord.data.gCode;
			var grCode = detailItem.data.sizeCode + gCode;
			typeSizeItem.set('grCode', grCode);

			for(var afterData in afterChangedData) {
				if(afterData == beforeData) {
					typeSizeItem.set('priCode', afterChangedData[afterData]);
				}
			}
			me.buildDataItem(typeSizeItem);
			typeSizeItemArray.push(typeSizeItem);	
		}

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < typeSizeItemArray.length; i++) {
			updateParm.get('items').push(typeSizeItemArray[i].data);
		}
		
		updateParm.save({
			success : function(record){	
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});
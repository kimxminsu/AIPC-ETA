Ext.define('IoTosOmExt.view.operation.specialservicerequest.SpecialServiceRequestController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.specialservicerequest',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refSpecialServiceReqeustGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'specialServiceRequestStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.operation.specialservicerequest.SpecialServiceRequest',
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
		var searchParm = Ext.create('IoTosOmExt.model.operation.specialservicerequest.SearchSpecialServiceRequest');
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
	onSpecialServiceRequestGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},

	onSsrCodeChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		if(obj.selection.data.codeGroup == 'N'){
			detailItem.set('nonCntr', true);
			detailItem.set('cntrNo', "*");
		}else {
			detailItem.set('nonCntr', false);
			detailItem.set('cntrNo', "");
			detailItem.set('vslCd', "");
			detailItem.set('callYear', "");
			detailItem.set('callSeq', "");
			detailItem.set('ptnrCode', "");
			detailItem.set('volume', null);
		}
		me.changeLayoutbyContainerWise(!detailItem.data.nonCntr);
	},	

	onRegistrationNoChanged : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var selectedItem = obj.selection;

		refs.ctlDetailPayerCode.suspendEvent('change');
		if(OmCommonMethod.isNullOrEmpty(selectedItem.data.value1) && OmCommonMethod.isNullOrEmpty(selectedItem.data.value2)) {
			refs.ctlDetailPayerType.setValue("");
			refs.ctlDetailPayerCode.setValue("");
		}else {
			refs.ctlDetailPayerType.setValue(selectedItem.data.value1);
			refs.ctlDetailPayerCode.setValue(selectedItem.data.value2);
		}
		refs.ctlDetailPayerCode.resumeEvent('change');

	},

	onPayerTypeChanged : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var payerCodeStore = me.getStore('payerCodeStore');

		obj.suspendEvent('change');
		refs.ctlDetailPayerCode.setValue(null);
		payerCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.PAYER,
				args : [newValue]
			}
		});
		obj.resumeEvent('change');
	},

	onPayerCodeChanged : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var selectedPayerType = refs.ctlDetailPayerType.getValue();
		var selectedPayerCode = newValue;
		var registratinoNoStore = me.getStore('registratinoNoStore');
		var registratinoNo = null;

		refs.ctlDetailRegistratinoNo.suspendEvent('change');
		for(var i = 0; i < registratinoNoStore.data.items.length; i++) {
			var record = registratinoNoStore.data.items[i];
			if(record.data.value1 == selectedPayerType && record.data.value2 == selectedPayerCode) {
				registratinoNo = record.data.code;
				break;
			}
		}
		refs.ctlDetailRegistratinoNo.setValue(registratinoNo);
		refs.ctlDetailRegistratinoNo.resumeEvent('change');
	},

	onCreateSsrClick : function() {
		var me = this;
		var ssrNoStore = me.getStore('ssrNoStore');
		var detailItem = me.getViewModel().get('theDetail');

		ssrNoStore.load({
			callback : function(records,operation,success) {
				if(success) {
					if(records.length > 0) {
						detailItem.set('ssrNo', records[0].data.ssrNo);
					}
				}
			}
		})
	},

	onSearchContainer : function() {
		var me = this;
		var refs = me.getReferences();
		var containerInfoStore = me.getStore('searchContainerInfoStore');
		var containerDetailItem = me.getViewModel().get('theContainerDetail');
		
		if(OmCommonMethod.isNullOrEmpty(containerDetailItem.data.cntrNo) == true) {
			return;
		}

		containerInfoStore.load({
			params : {
				cntrNo : containerDetailItem.data.cntrNo
			},
			callback : function(records, operation, success) {
				if(success) {
					me.setRetrievedContainerItem(records);
				}
			}
		})
	},

	onInSystemChanged : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var containerDetailItem = me.getViewModel().get('theContainerDetail');
		
		if(newValue == false) {
			me.clearContainerDetailInfo(containerDetailItem);
			refs.ctlDetailSearchContainer.setDisabled(true);
		}else {
			if(obj.disabled) {
				refs.ctlDetailSearchContainer.setDisabled(true);
			}else {
				refs.ctlDetailSearchContainer.setDisabled(false);
			}
		}
	},

	onContainerListGridDblClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		me.setContainerDetailInfo(record);
		refs.ctlContainerListWin.close();
	},

	onColumnRendererFromLocalCache : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var codeName = value;
		var key = null;
		
		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrState' : key = 'Container Status'; break;
			case 'rehandleCode' : key = 'Loading confirm'; break;
			case 'cntrLength' : key = 'CNLH'; break;
			case 'holdChk' : key = 'Hold Status'; break;
			case 'payerType' : key = 'Payer Type'; break;
			case 'paymentType' : key = 'PaymentType'; break;
			case 'cntrLength' : key = 'CNLH'; break;
			case 'ixCd' : key = 'IX CD'; break;
			case 'delv' : key = 'delivery type'; break;
			case 'cargoType' : key = 'Cargo Type'; break;
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
		params['searchMode'] = me.getSearchMode();
		params['requestDateFrom'] = Ext.Date.format(searchParm.data.requestDateFrom, 'Y-m-d H:i:s');
		params['requestDateTo'] = Ext.Date.format(searchParm.data.requestDateTo, 'Y-m-d H:i:s');
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	getSearchMode : function() {
		var me = this;
		var refs = me.getReferences();

		return refs.ctlSearchModeRadioGroup.getValue().searchMode;
	},

	onLoadStores : function() {
		var me = this;
		var refs = me.getReferences();
		var ssrCodeStore = me.getStore('ssrCodeStore');
		var oprCodeStore = me.getStore('oprCodeStore');
		var registratinoNoStore = me.getStore('registratinoNoStore');
		var payerTypeStore = me.getStore('payerTypeStore');
		var feCodeStore = me.getStore('feCodeStore');
		var modeCodeStore = me.getStore('modeCodeStore');
		var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
		var customAppTypeStore = me.getStore('customAppTypeStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');

		ssrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST
			}
		});
		oprCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR
			}
		});
		registratinoNoStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.REGISTRATION_NO_OF_PAYER
			}
		});
		payerTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.PAYER_TYPE
			}
		});
		feCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.FE
			}
		});
		modeCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.IX_CD
			}
		});
		deliveryCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.DELIVERY
			}
		});
		cargoTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CARGO_TYPE
			}
		});
		customAppTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.CUSTOM_APP_TYPE
			}
		});
		sztpCodeStore.load();
	},

	onGridAdd : function() {
		var me = this;
		me.openDetailPopup(null);
	},
	
	onGridSave : function() {
		var me = this;
		me.saveProcess();
	},
	
	onGridRemove : function(isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();

		if (selections == null)
			return;

		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(selections, isDetailClose);
			} else if (button === 'ok') {
				MessageUtil.error('fail_msg', MessageConstants.FAIL_DELETE_ITEMS , null);
			}
		});
	},

	deleteProcess : function(selections, isDetailClose) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());

		selections.forEach(function (item) {
			item.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.DELETE);
			updateParm.get('items').push(item.data);
		});

		updateParm.save({
			success : function(record, operation) {
				store.reload();
				MessageUtil.saveSuccess();
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					if (detailView) {
						detailView.forcedClose = true;
						detailView.close();
					}
				}
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

	setDetailInitialize : function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var specialServiceRequestDetailStore = me.getStore('specialServiceRequestDetailStore');
		specialServiceRequestDetailStore.removeAll();

		if(recvData) {
			me.setUpdateModeControl();
			if(recvData.data.nonCntr == false) {
				specialServiceRequestDetailStore.load({
					params : {
						ssrNo : recvData.data.ssrNo,
						// ssrId : recvData.data.ssrId,
					}
				});
				me.changeLayoutbyContainerWise(true);
			}else {
				me.changeLayoutbyContainerWise(false);
			}
			recvData.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.UPDATE);
		}else {
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
			me.changeLayoutbyContainerWise(true);
			recvData.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.INSERT);
		}
		recvData.set('remainSSRCode', true);

		// Update commit
		if(!recvData.phantom) {
			recvData.commit();
		}
		me.getViewModel().setData({theDetail:recvData});
	},

	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();

		refs.ctlDetailCreateSsrBtn.setDisabled(true);
		refs.ctlDetailSsrCode.setReadOnly(true);
		refs.ctlDetailPickupOrderNo.setReadOnly(true);
	},

	changeLayoutbyContainerWise : function(containerWise) {
		var me = this;
		var refs = me.getReferences();
		var specialServiceRequestDetailStore = me.getStore('specialServiceRequestDetailStore');

		refs.ctlDetailSsrFieldSet.setTitle(containerWise ? ViewUtil.getLabel('WRD_CTOM_ContainerwiseSSR') : ViewUtil.getLabel('WRD_CTOM_NonContainerwiseSSR'));
		refs.refSsrDetailGrid.setHidden(!containerWise);
		refs.ctlDetailAddBtn.setHidden(!containerWise);
		refs.ctlDetailRemoveBtn.setHidden(!containerWise);
		if(containerWise == true) {
			refs.ctlDetailVolume.setValue(null);
			me.getDetailBizView().setHeight(730);
		}else {
			refs.ctlDetailVolume.setValue(1);	
			me.getDetailBizView().setHeight(450);
			specialServiceRequestDetailStore.removeAll();
		}
		refs.ctlDetailPickupOrderNo.setHidden(!containerWise);
		refs.ctlDetailVesselSchedule.setDisabled(containerWise);
		refs.ctlDetailVesselScheduleSearchBtn.setDisabled(containerWise);
		refs.ctlDetailOpr.setDisabled(containerWise);
		refs.ctlDetailVolume.setDisabled(containerWise);
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
		var containerDetailView = me.lookupReference('app-ssrcontainerlistdetail');
		var containerDetailItem = me.getViewModel().get('theContainerDetail');
		var specialServiceRequestDetailStore = me.getStore('specialServiceRequestDetailStore');
	
		if(containerDetailView) {
			var containerDetailForm = containerDetailView.down('form');
			if(containerDetailForm.isValid()) {
				if(containerDetailItem.dirty) {
					me.onContainerSaveProcess();
				}
			}else {
				MessageUtil.mandatoryFieldInValid();
			}
		}else if(detailView){
			var infoForm = detailView.down('form');
			if(infoForm.isValid()) {
				if(detailItem.dirty) {
					me.saveProcess();
				}else if(
					specialServiceRequestDetailStore.getModifiedRecords().length > 0 
					|| specialServiceRequestDetailStore.getRemovedRecords().length > 0
				) {
					me.saveProcess();
				}
			}else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},

	onContainerSaveProcess : function() {
		var me = this;
		var store = me.getStore('specialServiceRequestDetailStore');
		var containerDetailView = me.lookupReference('app-ssrcontainerlistdetail');
		var containerItem = me.getViewModel().get('theContainerDetail');
		var isCreated = containerItem.phantom;
		
		if(isCreated) {
         store.add(containerItem);
		}
		containerDetailView.close();
		containerItem.dirty = true;
	},
	
	// Server Save Process
	saveProcess:function(saveLocation){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var specialServiceRequestDetailStore = me.getStore('specialServiceRequestDetailStore');

		if(detailItem == null){
			return;
		}
		
		if(OmCommonMethod.isNullOrEmpty(detailItem.data.vvd) == false) {
			me.setVesselScheduleInfo(detailItem);
		}
		
		detailItem.set('paymentType', refs.ctlPaymentTypeRadioGroup.getValue().paymentType);
		detailItem.set('cntrItems', new Array());
		
		specialServiceRequestDetailStore.getModifiedRecords().forEach(function(record) {
			me.buildDataItem(record);
			detailItem.get('cntrItems').push(record.data);
		});

		specialServiceRequestDetailStore.getRemovedRecords().forEach(function(record) {
			me.buildDataItem(record);
			detailItem.get('cntrItems').push(record.data);
		});
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('item', me.buildDataItem(detailItem).data);

		updateParm.save({
			success : function(record){
				if(isCreated){
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
					me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, true);
				}
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				specialServiceRequestDetailStore.commitChanges();
				store.reload();
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

	onDetailRemove : function() {
		var me = this;
		var containerDetailView = me.lookupReference('app-ssrcontainerlistdetail');

		if(containerDetailView) {
			me.onRemoveContainer(true);
			containerDetailView.close();
		}else {
			me.onGridRemove(true);
		}
	},

	onCheckBeforeSave : function() {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		if(detailItem.data.checkHoldChk) {
			if(refs.ctlHoldName.getValue()) {
				return true;
			}else {
				var msg1 = TSB.locale.i18n.Bundle.instance.getMsg("MSG_FTCO_00074");
				var msg2 = TSB.locale.i18n.Bundle.instance.getMsg("MSG_CTOM_00024", "Hold Code");
				MessageUtil.show(Ext.Msg.ERROR, 'fail_msg', msg1 + "<br>" + msg2);
				return false;
			}
		}else {
			return true;
		}
	},

	onSpecialServiceRequestDetailGridDblClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openViewAliasDetailPopup(record, 'Container Information', 'app-ssrcontainerlistdetail');
	},

	onContainerDetailLoad : function() {
		var me = this;
		var containerDetailView = me.lookupReference('app-ssrcontainerlistdetail');
		var form = containerDetailView.down('form');

		form.isValid(); // Mandatory to appear red for.
		me.setContainerDetailInitialize();
		me.updateViewStyle(containerDetailView);
		containerDetailView.forcedClose = true;
	},

	setContainerDetailInitialize : function() {
		var me = this;
		var containerDetailView = me.lookupReference('app-ssrcontainerlistdetail');
		var recvData = containerDetailView.items.get(0).recvData; 
		
		if(recvData){ // UPDATE
			me.setContainerUpdateModeControl();
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
			recvData.set('inSystem', true);
			recvData.set('volume', 1);
			containerDetailView.items.get(0).recvData = recvData;

		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theContainerDetail:recvData});
	},

	setContainerUpdateModeControl : function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlContainerDetailCntrNo.setReadOnly(true);
		refs.ctlDetailSearchContainer.setDisabled(true);
		refs.ctlDetailInSystem.setDisabled(true);
	},

	onSztpChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var sztp2;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', newValue, 0, false, true, true);
		
		if(record != null){
			sztp2 = record.data.sztpGroupCode;
		}
		refs.ctlContainerDetailSztp2.setValue(sztp2);
	},
	
	setRetrievedContainerItem : function(records) {
		var me = this;
		var refs = me.getReferences();
		var retrievedContainerItem = null;
		var containerListStore = me.getStore('containerListStore');
		
		if(records != null && records.length > 0) {
			if(records.length == 1) {
				retrievedContainerItem = records[0];
				me.setContainerDetailInfo(retrievedContainerItem);
			}else {
				containerListStore.setData(records);
				var win = refs.ctlContainerListWin;
				if(!win) {
					win = Ext.create('IoTosOmExt.view.common.containerlist.Containerlist',{
						title : ViewUtil.getLabel('WRD_CTOM_ContainerListView'),
						storeNm : 'containerListStore',
						reference : 'ctlContainerListWin'
					}); 
					me.getView().add(win);
				}
				win.show();
      		win.toFront();
			}
		}
	},

	setContainerDetailInfo : function(retrievedContainerItem) {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var containerDetailItem = me.getViewModel().get('theContainerDetail');

		if(retrievedContainerItem != null) {
			if(OmCommonMethod.isNullOrEmpty(detailItem.data.jobOdrNo2) == false) {
				if(retrievedContainerItem != null && detailItem.data.jobOdrNo2 != retrievedContainerItem.data.jobOdrNo2) {
					this.setContainerItem(null, containerDetailItem);
					containerDetailItem.set('cntrNo', "");
					containerDetailItem.set('inSystem', false);
					MessageUtil.warning("Warning", "MSG_CTOM_00321", [retrievedContainerItem.data.cntrNo, detailItem.data.jobOdrNo2]);
					return;

				}else {
					this.setContainerItem(retrievedContainerItem, containerDetailItem);
					containerDetailItem.set('inSystem', true);
				}
			}else {
				this.setContainerItem(retrievedContainerItem, containerDetailItem);
				containerDetailItem.set('inSystem', true);
			}
		}else {
			if(OmCommonMethod.isNullOrEmpty(detailItem.data.jobOdrNo2) == false) {
				me.setContainerItem(null, containerDetailItem);
				containerDetailItem.set('cntrNo', "");
				containerDetailItem.set('inSystem', false);
				MessageUtil.warning("Warning", "MSG_CTOM_00321", [detailItem.data.cntrNo, detailItem.data.jobOdrNo2]);
				return;

			}else {
				containerDetailItem.set('inSystem', false);
				containerDetailItem.set('cntrId', "");
				containerDetailItem.set('cntrUid', "");
			}
		}

		if(OmCommonMethod.isNullOrEmpty(containerDetailItem.data.cntrId) == true) {
			me.clearContainerDetailInfo(containerDetailItem);
		}
	},

	setContainerItem : function(source, destination) {
		if(destination == null) {
			return;
		}
		if(source != null) {
			destination.set('vslCd', source.get('vslCd'));
			destination.set('callYear', source.get('callYear'));
			destination.set('callSeq', source.get('callSeq'));
			destination.set('ptnrCode', source.get('ptnrCode'));
			destination.set('ixCd', source.get('ixCd'));
			destination.set('cntrId', source.get('cntrId'));
			destination.set('cntrUid', source.get('cntrUid'));
			destination.set('cargoType', source.get('cargoType'));
			destination.set('sztp', source.get('sztp'));
			destination.set('sztp2', source.get('sztp2'));
			destination.set('fe', source.get('fe'));
			destination.set('delv', source.get('delv'));
			destination.set('jobOdrNo2', source.get('jobOdrNo2'));
			destination.set('trnVoy', OmCommonMethod.isNullOrEmpty(source.get('trnVoy')) == true ? source.get('trnVoy') : source.get('trnVoy2'));
			destination.set('blNo', source.get('blNo'));
			destination.set('bookingNo', source.get('bookingNo'));
			destination.set('consignee', source.get('consignee'));
			destination.set('customAppType', source.get('customAppType'));
			destination.set('domesticChk', source.get('domesticChk'));
			destination.set('dummy5', source.get('dummy5'));
			destination.set('vvd', source.get('vvd'));
			destination.set('isDomesticChk', source.get('isDomesticChk'));
		}else {
			destination.set('vslCd', "");
			destination.set('callYear', "");
			destination.set('callSeq', "");
			destination.set('ptnrCode', "");
			destination.set('ixCd', "");
			destination.set('cntrId', "");
			destination.set('cntrUid', "");
			destination.set('cargoType', "");
			destination.set('sztp', "");
			destination.set('sztp2', "");
			destination.set('fe', "");
			destination.set('delv', "");
			destination.set('jobOdrNo2', "");
			destination.set('trnVoy', "");
			destination.set('blNo', "");
			destination.set('bookingNo', "");
			destination.set('consignee', "");
			destination.set('customAppType', "");
			destination.set('domesticChk', "");
			destination.set('dummy5', "");
			destination.set('vvd', "");
			destination.set('isDomesticChk', false);
		}
	},

	clearContainerDetailInfo : function(item) {
		if(item != null) {
			item.set('cntrId', "");
			item.set('vslCd', "");
			item.set('callYear', "");
			item.set('callSeq', "");
			item.set('ptnrCode', "");
			item.set('sztp', "");
			item.set('sztp2', "");
			item.set('pSztp', "");
			item.set('fe', "");
			item.set('ixCd', "");
			item.set('delv', "");
			item.set('cargoType', "");
			item.set('jobOdrNo2', "");
			item.set('trnVoy', "");
			item.set('blNo', "");
			item.set('bookingNo', "");
			item.set('consignee', "");
			item.set('customAppType', "");
			item.set('domesticChk', "");
			item.set('vvd', "");
			item.set('isDomesticChk', false);
		}
	},
	
	onSearchVesselSchedule : function() {
		var me = this;
      var refs = me.getReferences();
      var win = refs.ctlVesselScheduleWin;
      
      if(!win) {
         win = Ext.create('IoTosOmExt.view.common.vesselschedule.VesselScheduleWindow',{
				parentView : me.getView(),
				title : ViewUtil.getLabel('WRD_CTOM_VesselSchedule'),
				reference : 'ctlVesselScheduleWin',
				modal : true
         });
         me.getView().add(win);
      }
      win.show();
      win.toFront();
	},

	onVesslScheduleApply : function() {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelectionWin.selectionData;
		var detailItem = me.getViewModel().get('theDetail');

		if(vvdData != null) {
			detailItem.set('vvd', vvdData.vesselCode + '-' + vvdData.callYear + '-' + vvdData.callSeq);
		}else {
			detailItem.set('vvd', null);
		}
		refs.ctlVesselScheduleWin.close();
	},

	onAddContainer : function() {
		var me = this;
		me.openViewAliasDetailPopup(null, 'Container Information', 'app-ssrcontainerlistdetail');
	},

	onRemoveContainer : function() {
		var me = this;
      var refs = me.getReferences();
      var ssrDetailGrid = refs.refSsrDetailGrid;
		var specialServiceRequestDetailStore = me.getStore('specialServiceRequestDetailStore');
		var selectedRecords = ssrDetailGrid.getSelection();
		
		selectedRecords.forEach(function(record) {
			record.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		});

		specialServiceRequestDetailStore.remove(selectedRecords);
	},

	setVesselScheduleInfo : function(item) {
		var vesselScheduleArray = item.get('vvd').split('-');
		item.set('vslCd', vesselScheduleArray[0]);
		item.set('callYear', vesselScheduleArray[1]);
		item.set('callSeq', vesselScheduleArray[2]);
	}

	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});
Ext.define('IoTosOmExt.view.code.generalcode.GeneralCodeController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.generalcode',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGeneralCodeGrid',		// Main Grid Name 
	MAIN_GRID_EDITOR_NAME : 'generalCodeEditor',	// MAIN Grid Editor Name
	MAIN_STORE_NAME: 'generalCodeStore',				// Main Store Name
	// MASTER_STORE_NAME : 'errorCodeMaster',
	DEFAULT_MODEL : 'IoTosOmExt.model.code.generalcode.GeneralCode',
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
		var searchParm = Ext.create('IoTosOmExt.model.code.generalcode.SearchGeneralCode');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});
		me.getViewModel().set('isSystemCode', false);
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
	onSearch : function() {
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
   
   onGeneralCodeTypeChange : function(obj, record, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var systemCodeLabel = refs.ctlSystemCodeLabel;
		var grid = refs.refGeneralCodeGrid;
		
		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.CNTR_STATE:
			case PopupServiceConstants.GeneralCode.DAMAGE_IDENTIFICATION_TIMING:
				systemCodeLabel.setHidden(false);
				me.getViewModel().set('isSystemCode', true);
				break;
			default:
				systemCodeLabel.setHidden(true);
				me.getViewModel().set('isSystemCode', false);
				break;
		}

		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.IN_YARD_SHIFT_REASON:
			case PopupServiceConstants.GeneralCode.GATE_OUT_CANCEL_REASON:
			case PopupServiceConstants.GeneralCode.RETURN_CANCEL_REASON:
			case PopupServiceConstants.GeneralCode.RETURN_TO_TERMINAL_REASON:
			case PopupServiceConstants.GeneralCode.INSPECTION_TYPE:
			case PopupServiceConstants.GeneralCode.HANDLE_INSTR:
			case PopupServiceConstants.GeneralCode.VESSEL_SHIFTING_REASON:
			case PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_BillCheck'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			default:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_BillCheck'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				break;
		}

		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.STORAGE_CODE:
			case PopupServiceConstants.GeneralCode.CNTR_STATE:
			case PopupServiceConstants.GeneralCode.YARD_HANDLING_INSTR:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_ForeColor'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_BackColor'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			default:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_ForeColor'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_BackColor'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				break;
		}

		OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_CodeGroup'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
		OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_RevenueUnit'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
		OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_ContainerWise'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
		OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_CausedBy'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
		OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_BillingClass'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
		OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_RequestUnitType'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);

		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.TARIFF_UNIT:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_RevenueUnit'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			case PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_ContainerWise'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			case PopupServiceConstants.GeneralCode.TDR_STOP_CODE:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_CausedBy'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			case PopupServiceConstants.GeneralCode.CUSTOM_APP_TYPE:
				//CTDistributionInfo.GetSiteDistributionItem().DisplayBillingClassOnGeneralCode; -> gwct false
				var displayBillingClassOnGeneralCode = false;
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_BillingClass'),CodeConstantsOM.gridColumnConfig.HIDDEN,!displayBillingClassOnGeneralCode);
				break;
			case PopupServiceConstants.GeneralCode.SPECIAL_OPERATION_CODE:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_RequestUnitType'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			default:
				break;
		}

		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.INSPECTION_TYPE:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_InspectionBlockArea'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_Priority'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			case PopupServiceConstants.GeneralCode.HCD:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_InspectionBlockArea'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_Priority'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			default:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_InspectionBlockArea'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_Priority'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				break;
		}
		// CTDistributionInfo.GetSiteDistributionItem().DefaultSelectProvidedGnrlTypes; -> [CTBizConstant.GeneralCodeType.YARD_LOCK_REASON, CTBizConstant.GeneralCodeType.SHIFTING_REASON]
		var defaultSelectableTypes = [PopupServiceConstants.GeneralCode.YARD_LOCK_REASON, PopupServiceConstants.GeneralCode.SHIFTING_REASON];
		if(defaultSelectableTypes.length > 0) {
			var isVisible = Ext.Array.contains(defaultSelectableTypes, record.data.code);
			OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_DefaultSelect'),CodeConstantsOM.gridColumnConfig.HIDDEN,!isVisible);
		}

		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.CURRENCY_CODE:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_Symbol'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			default:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_Symbol'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				break;
		}

		// CTDistributionInfo.GetSiteDistributionItem().UseTerminalHoldCodeAuthorization -> gwct false
		// CTDistributionInfo.GetSiteDistributionItem().UseFillFpodRelatedbyFdest -> gwct false
		// CTDistributionInfo.GetSiteDistributionItem().UseCustomerTrfCodeOnGeneralCode -> gwct false
		// CTDistributionInfo.GetSiteDistributionItem().UseCodeUsageOnGeneralCode -> gwct false
		var useTerminalHoldCodeAuthorization = false;
		var useFillFpodRelatedbyFdest = false;
		var useCustomerTrfCodeOnGeneralCode = false;
		var useCodeUsageOnGeneralCode = false;

		if(useTerminalHoldCodeAuthorization == true) {
			switch (record.data.code) {
				case PopupServiceConstants.GeneralCode.HOLD_CODE:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_NeedAuth'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
					break;
				default:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_NeedAuth'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
					break;
			}
		}

		if(useFillFpodRelatedbyFdest == true) {
			switch (record.data.code) {
				case PopupServiceConstants.GeneralCode.FDEST:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_FPOD'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
					break;
				default:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_FPOD'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
					break;
			}
		}

		if(useCustomerTrfCodeOnGeneralCode == true) {
			switch (record.data.code) {
				case PopupServiceConstants.GeneralCode.TARIFF_UNIT:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_ErpUnit'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
					break;
				default:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_ErpUnit'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
					break;
			}
		}

		if(useCodeUsageOnGeneralCode == true) {
			switch (record.data.code) {
				case PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_UsedIn'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
					break;
				default:
					OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_UsedIn'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
					break;
			}
		}

		switch (record.data.code) {
			case PopupServiceConstants.GeneralCode.SPECIAL_OPERATION_CODE:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_SpecialJob'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_HoldCheck'),CodeConstantsOM.gridColumnConfig.HIDDEN,false);
				break;
			default:
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_SpecialJob'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				OmCommonMethod.setColumnConfig(grid,ViewUtil.getLabel('WRD_CTCM_HoldCheck'),CodeConstantsOM.gridColumnConfig.HIDDEN,true);
				break;
		}
      me.onSearch();
	},
	
	setColumnsHidden : function(columnName, flag) {
		var me = this;
		var refs = me.getReferences();
		var columns = refs.refGeneralCodeGrid.getColumns();

		if(OmCommonMethod.isNullOrEmpty(columnName) || OmCommonMethod.isNullOrEmpty(flag)) {
			return;
		}

		columns.forEach(function(column) {
			if(column.text == columnName) {
				column.setHidden(flag);
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
	onGeneralCodeGridDblclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},
	
	// Add
	onGridAdd : function() {
		var me = this;
		
		if(me.getViewModel().get('isSystemCode')) {
			MessageUtil.error('fail_msg', 'MSG_CTCM_00117' , null);
			return;
		}
		me.openDetailPopup(null);
	},
	
	// Remove
	onGridRemove : function(isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var deleteItems = new Array();
						
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
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	onLoadStores : function() {
		var me = this;
      var generalCodeTypeStore = me.getStore('generalCodeTypeStore');
		
		generalCodeTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.GENERAL_CODE_TYPE
			}
      });
	},

	// Delete
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
	    	delete item.files;
	      updateParm.get('items').push(item.data);
	    });

	    updateParm.save({
	        success : function(record, operation) {
	            selections.forEach(function (item) {
	                item.commit();
	                store.remove(item);
	            });
	            store.commitChanges();

	            MessageUtil.saveSuccess();
	            
	            if (isDetailClose) {
	                var detailView = me.getDetailBizView();
	                
	                if (detailView) {
	                    detailView.close();
	                }
	            }
	        }
	    });
	},
	
	// Search Condition
	getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		var params = me.createParam(searchParm, ['gnrlType']);
		
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
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
		me.setDetailComponent();
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
			recvData.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.UPDATE); 
		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('gnrlType', me.getViewModel().get('theSearch').data.gnrlType);
			recvData.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.INSERT);
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
		
		refs.ctlGeneralCode.setReadOnly(true);
		refs.ctlGeneralCodeDesc.setReadOnly(true);
	},

	setDetailComponent : function() {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var codeGroupStore = me.getStore('codeGroupStore');
		var fpodCodeStore = me.getStore('fpodCodeStore');
		var blockAreaStore = me.getStore('blockAreaStore');
		var usedInStore = me.getStore('usedInStore');

		blockAreaStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.AREA_BLOCK
			}
		});

		usedInStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CODE_USAGE
			}
		});
		
		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.IN_YARD_SHIFT_REASON:
			case PopupServiceConstants.GeneralCode.GATE_OUT_CANCEL_REASON:
			case PopupServiceConstants.GeneralCode.RETURN_CANCEL_REASON:
			case PopupServiceConstants.GeneralCode.RETURN_TO_TERMINAL_REASON:
			case PopupServiceConstants.GeneralCode.INSPECTION_TYPE:
			case PopupServiceConstants.GeneralCode.HANDLE_INSTR:
			case PopupServiceConstants.GeneralCode.VESSEL_SHIFTING_REASON:	
				refs.ctlBillChk.setHidden(false);
				break;
			default:
				refs.ctlBillChk.setHidden(true);
				break;
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.STORAGE_CODE:
			case PopupServiceConstants.GeneralCode.CNTR_STATE:
			case PopupServiceConstants.GeneralCode.YARD_HANDLING_INSTR:
				refs.ctlColorFields.setHidden(false);
				break;
			default:
				refs.ctlColorFields.setHidden(true);
				break;
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.TARIFF_UNIT:
				refs.ctlCodeGroup.setHidden(false);
				refs.ctlCodeGroup.setAllowBlank(false);
				refs.ctlCodeGroup.setFieldLabel(ViewUtil.getLabel('WRD_CTCM_RevenueUnit'));
				codeGroupStore.load({
					params : {
						itemKey : PopupServiceConstants.MasterCode.REVENUE_UNIT
					}
				});
				break;
			case PopupServiceConstants.GeneralCode.TDR_STOP_CODE:
				refs.ctlCodeGroup.setHidden(false);
				refs.ctlCodeGroup.setAllowBlank(false);
				refs.ctlCodeGroup.setFieldLabel(ViewUtil.getLabel('WRD_CTCM_CausedBy'));
				codeGroupStore.load({
					params : {
						itemKey : PopupServiceConstants.MasterCode.TERMINAL_DEPARTURE_REPORT_DELAY_CAUSED_BY
					}
				});
				break;
			case PopupServiceConstants.GeneralCode.CUSTOM_APP_TYPE:
				// CTDistributionInfo.GetSiteDistributionItem().DisplayBillingClassOnGeneralCode -> gwct false
				var displayBillingClassOnGeneralCode = false;
				if(displayBillingClassOnGeneralCode == true) {
					refs.ctlCodeGroup.setHidden(false);
					refs.ctlCodeGroup.setFieldLabel(ViewUtil.getLabel('WRD_CTCM_BillingClass'));
					codeGroupStore.load({
						params : {
							itemKey : PopupServiceConstants.MasterCode.BILLING_CLASS
						}
					});
				}else {
					refs.ctlCodeGroup.setHidden(true);	
				}
				break;
			case PopupServiceConstants.GeneralCode.SPECIAL_OPERATION_CODE:
				refs.ctlCodeGroup.setHidden(false);
				refs.ctlCodeGroup.setFieldLabel(ViewUtil.getLabel('WRD_CTCM_SpecialJob'));
				refs.ctlCodeGroup.setBind({
					'value':'{theDetail.codeUsage}'
				});
				codeGroupStore.load({
					params : {
						itemKey : PopupServiceConstants.MasterCode.SO_SPECIAL_JOB
					}
				});
				break;
			default:
				refs.ctlBillChk.setHidden(true);
				refs.ctlCodeGroup.setAllowBlank(true);
				break;
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.VAT_CODE:
			case PopupServiceConstants.GeneralCode.TAX_CODE:
				refs.ctlRate.setHidden(false);
				break;
			default:
				refs.ctlRate.setHidden(true);
				break;
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.INSPECTION_TYPE:
				refs.ctlBlockArea.setHidden(false);
				refs.ctlBlockArea.setAllowBlank(true);
				refs.ctlPriority.setHidden(false);
				break;
			case PopupServiceConstants.GeneralCode.HCD:
				refs.ctlBlockArea.setHidden(true);
				refs.ctlBlockArea.setAllowBlank(true);
				refs.ctlPriority.setHidden(false);
				break;
			default:
				refs.ctlBlockArea.setHidden(true);
				refs.ctlBlockArea.setAllowBlank(true);
				refs.ctlPriority.setHidden(true);
				break;
		}

		// CTDistributionInfo.GetSiteDistributionItem().DefaultSelectProvidedGnrlTypes; -> [CTBizConstant.GeneralCodeType.YARD_LOCK_REASON, CTBizConstant.GeneralCodeType.SHIFTING_REASON]
		var defaultSelectableTypes = [PopupServiceConstants.GeneralCode.YARD_LOCK_REASON, PopupServiceConstants.GeneralCode.SHIFTING_REASON];
		if(defaultSelectableTypes.length > 0) {
			var isVisible = Ext.Array.contains(defaultSelectableTypes, detailItem.data.gnrlType);
			refs.ctlDefaultSelectChk.setHidden(!isVisible);
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST:
				refs.ctlContainerWiseChk.setHidden(false);
				refs.ctlBillChk.setHidden(false);
				break;
			default:
				refs.ctlContainerWiseChk.setHidden(true);
				break;
		}

		// CTDistributionInfo.GetSiteDistributionItem().UseTerminalHoldCodeAuthorization -> gwct false
		// CTDistributionInfo.GetSiteDistributionItem().UseFillFpodRelatedbyFdest -> gwct false
		// CTDistributionInfo.GetSiteDistributionItem().UseCustomerTrfCodeOnGeneralCode -> gwct false
		// CTDistributionInfo.GetSiteDistributionItem().UseCodeUsageOnGeneralCode -> gwct false
		var useTerminalHoldCodeAuthorization = false;
		var useFillFpodRelatedbyFdest = false;
		var useCustomerTrfCodeOnGeneralCode = false;
		var useCodeUsageOnGeneralCode = false;

		if(useTerminalHoldCodeAuthorization == true) {
			switch (detailItem.data.gnrlType) {
				case PopupServiceConstants.GeneralCode.HOLD_CODE:
					refs.ctlNeedAuth.setHidden(false);
					break;
				default:
					refs.ctlNeedAuth.setHidden(true);
					break;
			}
		}

		if(useFillFpodRelatedbyFdest == true) {
			switch (detailItem.data.gnrlType) {
				case PopupServiceConstants.GeneralCode.FDEST:
					refs.ctlFpod.setHidden(false);
					fpodCodeStore.load({
						itemKey : PopupServiceConstants.ItemKey.PORT_CODE
					});
					break;
				default:
					refs.ctlFpod.setHidden(true);
					break;
			}
		}

		if(useCustomerTrfCodeOnGeneralCode == true) {
			switch (detailItem.data.gnrlType) {
				case PopupServiceConstants.GeneralCode.TARIFF_UNIT:
					refs.ctlErpUnit.setHidden(false);
					break;
				default:
					refs.ctlErpUnit.setHidden(true);
					break;
			}
		}

		if(useCodeUsageOnGeneralCode == true) {
			switch (detailItem.data.gnrlType) {
				case PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST:
					refs.ctlUsedIn.setHidden(false);
					break;
				default:
					refs.ctlUsedIn.setHidden(true);
					break;
			}
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.SPECIAL_OPERATION_CODE:
				refs.ctlRequestUnitType.setHidden(false);
				refs.ctlRequestUnitType.setAllowBlank(false);
				refs.ctlHoldChk.setHidden(false);

				codeGroupStore.load({
					itemKey : PopupServiceConstants.MasterCode.UNIT_TYPE
				});
				break;
			default:
				refs.ctlRequestUnitType.setHidden(true);
				refs.ctlHoldChk.setHidden(true);
				break;
		}

		var nMaxLen;
		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.REEFER_CHECK_STATUS:
			case PopupServiceConstants.GeneralCode.HCD:
			case PopupServiceConstants.GeneralCode.CONTAINER_CONDITION:
			case PopupServiceConstants.GeneralCode.CONTAINER_DAMAGE_MEASUREMENT:
			case PopupServiceConstants.GeneralCode.SHIFTING_REASON:
				nMaxLen = 1;
				break;
			case PopupServiceConstants.GeneralCode.BOND_AREA:
			case PopupServiceConstants.GeneralCode.STORAGE_CODE:
			case PopupServiceConstants.GeneralCode.YARD_HANDLING_SPECIAL_TYPE:
			case PopupServiceConstants.GeneralCode.QUAY_HANDLEING_SPECIAL_TYPE:
			case PopupServiceConstants.GeneralCode.QC_REPAIR_REASON:
			case PopupServiceConstants.GeneralCode.ABSTRACT_CONSTRAINTS:
			case PopupServiceConstants.GeneralCode.CARRIER_SEAL_NO_CHANGE_REASON:
			case PopupServiceConstants.GeneralCode.CUSTOMS_SEAL_NO_CHANGE_REASON:
			case PopupServiceConstants.GeneralCode.EXPORT_SEAL_NO_CHANGE_REASON:
				nMaxLen = 2;
				break;
			case PopupServiceConstants.GeneralCode.HANDLE_INSTR:
			case PopupServiceConstants.GeneralCode.YARD_HANDLING_INSTR:
			case PopupServiceConstants.GeneralCode.CURRENCY_CODE:
			case PopupServiceConstants.GeneralCode.IN_YARD_SHIFT_REASON:
			case PopupServiceConstants.GeneralCode.HOLD_CODE:
			case PopupServiceConstants.GeneralCode.TARIFF_UNIT:
			case PopupServiceConstants.GeneralCode.EMPTY_RETURN_FREEDAY:
			case PopupServiceConstants.GeneralCode.CUSTOM_APP_TYPE:
			case PopupServiceConstants.GeneralCode.SEAL_INTERFACE_ERROR_CODE:
				nMaxLen = 3;
				break;
			case PopupServiceConstants.GeneralCode.NOTUSERSN:
			case PopupServiceConstants.GeneralCode.INSPECTION_TYPE:
			case PopupServiceConstants.GeneralCode.BB_CARGO_WORKING_TYPE:
			case PopupServiceConstants.GeneralCode.CFS_WORKING_TYPE:
			case PopupServiceConstants.GeneralCode.RETURN_TO_TERMINAL_REASON:
			case PopupServiceConstants.GeneralCode.CUSTOMS_OFFICE:
			case PopupServiceConstants.GeneralCode.CUSTOMS_INSTRUCTION:
			case PopupServiceConstants.GeneralCode.CUSRES_STATUS_REASON_CODE:
				nMaxLen = 4;
				break;
			case PopupServiceConstants.GeneralCode.GATE_OUT_CANCEL_REASON:
			case PopupServiceConstants.GeneralCode.SPECIAL_SERVICE_REQUEST:
			case PopupServiceConstants.GeneralCode.PACKAGE:
			case PopupServiceConstants.GeneralCode.CONTAINER_DAMAGE_TYPE:
			case PopupServiceConstants.GeneralCode.HOLIDAY_TYPE:
			case PopupServiceConstants.GeneralCode.TDR_STOP_CODE:
			case PopupServiceConstants.GeneralCode.REEFER_MACHINE_STATUS:
			case PopupServiceConstants.GeneralCode.GATE_WAY:
				nMaxLen = 5;
				break;
			case PopupServiceConstants.GeneralCode.TRAIN_CODE:
				nMaxLen = 6;
				break;
			case PopupServiceConstants.GeneralCode.FDEST:
			case PopupServiceConstants.GeneralCode.POR:
				nMaxLen = 8;
				break;
			default:
				nMaxLen = 10;
				break;
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.CURRENCY_CODE:
				refs.ctlSymbol.setHidden(false);
				break;
			default:
				refs.ctlSymbol.setHidden(true);
				break;
		}

		switch (detailItem.data.gnrlType) {
			case PopupServiceConstants.GeneralCode.TRUCKAGE_PLACE:
				refs.ctlTerminalCenter.setHidden(false);
				break;
			default:
				refs.ctlTerminalCenter.setHidden(true);
				break;
		}
		refs.ctlGeneralCode.maxLength = nMaxLen;

		// CTDistributionInfo.GetSiteDistributionItem().AllowSpecialCharGeneralCode -> gwct false
		var allowSpecialCharGeneralCode = false;
		if(allowSpecialCharGeneralCode == false) {
			refs.ctlGeneralCode.maskRe = /[0-9A-Za-z]/;
		}else {
			refs.ctlGeneralCode.maskRe = null;
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
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailView = me.getDetailBizView();
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
					me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, true);
				}
				
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		me.onGridRemove(true);
	}
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});
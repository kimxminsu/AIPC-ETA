Ext.define('IoTosOmExt.view.code.partnercode.PartnerCodeController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.partnercode',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPartnerCodeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCodeStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.code.partnercode.PartnerCode',
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
		var searchParm = Ext.create('IoTosOmExt.model.code.partnercode.SearchPartnerCode');

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
	onPartnerCodeGridDblclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},
	
	// Add
	onGridAdd : function() {
		var me = this;
		var refs = me.getReferences();
		var partnerCodeTypeCmb = refs.ctlPartnerCodeTypeCmb;

		if(partnerCodeTypeCmb.getSelection() == null) {
			return;
		}

		me.openDetailPopup(null);
	},
	
	// Remove
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
		var partnerCodeTypeStore = me.getStore('partnerCodeTypeStore');
		var vanPoolTypeStore = me.getStore('vanPoolTypeStore');
		var paymentTypeStore = me.getStore('paymentTypeStore');

		partnerCodeTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.PARTNER_TYPE
			}
		});

		vanPoolTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.VAN_TYPE
			}
		});

		paymentTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.PAYMENT_TYPE
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

		var params = me.createParam(searchParm,['ptnrType']);

		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	onPartnerCodeTypeChange : function(cmb) {
		var me = this;
		me.onSearch(cmb);
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
		var partnerPersonStore = me.getStore('partnerPersonStore');
		var partnerCodeTypeCmb = refs.ctlPartnerCodeTypeCmb;
		var partnerAgencyStore = me.getStore('partnerAgencyStore');

		if(recvData){ // UPDATE
			me.setUpdateModeControl();
			partnerPersonStore.load({
				params : {
					ptnrType : recvData.data.ptnrType,
					ptnrCode : recvData.data.ptnrCode
				}
			});

			if(recvData.data.ptnrType == PopupServiceConstants.PartnerType.LINE_OPERATOR) {
				var partnerAgencyCode = '';
            partnerAgencyStore.load({
               params : {
                  ptnrType : recvData.data.ptnrType,
                  ptnrCode : recvData.data.ptnrCode
               },
               callback : function(records) {
                  for(var i = 0; i < records.length; i++) {
                     partnerAgencyCode += records[i].data.agencyCode;

                     if(i < records.length -1) {
                        partnerAgencyCode += ','
                     }
                  }
                  me.getViewModel().get('theDetail').set('agencyCode', partnerAgencyCode);
               }
            });
			}
			
		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('ptnrType', partnerCodeTypeCmb.getSelection().data.code);
			detailView.items.get(0).recvData = recvData;
			partnerPersonStore.removeAll();
			partnerPersonStore.commitChanges();
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
		
		refs.ctlPtnrCode.setReadOnly(true);
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
		var partnerPersonStore = me.getStore('partnerPersonStore');
		
		if(detailView){
			var infoForm = detailView.down('form');
			
			if(infoForm.isValid()){
				if(detailItem.dirty){
					me.saveProcess();
				}else if(partnerPersonStore.getModifiedRecords().length > 0 ||
							partnerPersonStore.getRemovedRecords().length > 0
				){
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
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		
		if(detailItem == null){
			return;
		}

		detailItem.set('personList', new Array());

		var partnerPersonStore = me.getStore('partnerPersonStore');

		partnerPersonStore.getModifiedRecords().forEach(function(record) {
			record.set('ptnrType', detailItem.get('ptnrType'));
			record.set('ptnrCode', detailItem.get('ptnrCode'));
			me.buildDataItem(record);
			detailItem.get('personList').push(record.data);
		});

		partnerPersonStore.getRemovedRecords().forEach(function(record) {
			me.buildDataItem(record);
			detailItem.get('personList').push(record.data);
		});
		
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
				partnerPersonStore.commitChanges();
				
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		me.onGridRemove(true);
	},

	onAddPerson : function() {
      var me = this;
      var refs = me.getReferences();
      var partnerPersonGrid = refs.refPartnerPersonGrid;
      var partnerPersonStore = me.getStore('partnerPersonStore');
      var editor = partnerPersonGrid.getPlugin('partnerPersonGridEditor');
      var record = Ext.create(me.DEFAULT_MODEL);
      
      editor.cancelEdit();
      partnerPersonGrid.filters.clearFilters();
      partnerPersonGrid.filters.disable();
      partnerPersonStore.clearFilter();

      var index = 0;
      if(partnerPersonGrid.getSelection() && partnerPersonGrid.getSelection().length > 0) {
         index = partnerPersonStore.indexOfId(partnerPersonGrid.getSelection()[0].get('id'));
      }
      
      partnerPersonStore.insert(index, record);
      partnerPersonGrid.getSelectionModel().select(record);

      partnerPersonGrid.getColumns().find(function(column){
         if(column.dataIndex == 'person') {
            column.getEditor().setDisabled(false);
         }
      });

      editor.startEdit(record);
	},
	
	onRemovePerson : function() {
      var me = this;
      var refs = me.getReferences();
      var partnerPersonGrid = refs.refPartnerPersonGrid;
      var partnerPersonStore = me.getStore('partnerPersonStore');
      var selections = partnerPersonGrid.getSelection();

      if(selections.length <= 0) {
         return false;
		}

		selections.forEach(function(record){
			record.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.DELETE);
		});
		
		partnerPersonStore.remove(selections);
   },

	onPartnerPersonGridDblclick : function() {
      var me = this;
      var refs = me.getReferences();
      var partnerPersonGrid = refs.refPartnerPersonGrid;
      var editor = partnerPersonGrid.getPlugin('partnerPersonGridEditor');

      partnerPersonGrid.getColumns().find(function(column){
         if(column.dataIndex == 'person') {
            column.getEditor().setDisabled(true);
         }
      });

		editor.cancelEdit();
   },
	
	onCancelEdit : function(editor, context) {
      if(context.record.phantom) {
         context.store.remove(context.record);
      }
   },

	onEdit : function(editor, context) {
      if(context.record.phantom) {
			context.record.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
      }else {
			context.record.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		}
   },
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});
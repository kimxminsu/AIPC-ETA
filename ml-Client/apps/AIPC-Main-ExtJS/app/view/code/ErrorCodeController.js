Ext.define("Aipc.Main.view.code.ErrorCodeController", {
	extend: "ESVC.view.foundation.BaseViewController",

	requires: [],

	alias: "controller.errorcode",

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: "refUserGrid", // Main Grid Name
	MAIN_STORE_NAME: "user", // Main Store Name

	ORDER_GRID_REF_NAME: "refOrderGrid",
	ORDER_STORE_NAME: "theDetail.orders",

	DEFAULT_MODEL: "Aipc.Main.model.code.User",

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function () {

		var me = this;
		var refs = me.getReferences();
		// var searchParm = Ext.create("Aipc.Main.model.association.SearchUser");
		//
		// me.setSearchParm(searchParm);
		// me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		me.onSearch();
	},

	/**
	 * IN
	 * ITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function (control) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		// var params = me.getSearchCondition();
		// var params = {
        //     originPort : originPort,
        //     destinationPort : destinationPort,
        //     shiptype : shiptype
        // }
		// if (params == null) {
		// 	return;
		// }

		store.load({
			// params: params,
			callback: function (records, operation, success) {
				// debugger
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			},
		});
	},

	// Grid Excel/PDF Export
	onExportExcelPdfWithServer: function (gridNameString, isExcel) {
		// var me = this;
		// var searchBizParm = me.getSearchCondition();
		// searchBizParm.classID =
		//   "com.tsb.web.edi.bizparm.errorcode.SearchErrorCodeBizParm";
		// searchBizParm.serviceID = "EDI.errorcode.searchItems";
		// me.exportExcelPdfWithServer(gridNameString, searchBizParm, isExcel);
	},

	// Grid Row Double
	onDblClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null) return;

		me.openDetailPopup(record);
	},
	onUserClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null) return;

		me.getViewModel().setData({ theDetail: record });
	},
	// Add
	onGridAdd: function () {
		var me = this;
		var refs = me.getReferences();

		me.openDetailPopup(null);
	},

	// Remove
	onGridRemove: function (isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection();
		var deleteItems = new Array();

		if (selections == null || selections.length == 0) return;

		MessageUtil.question("remove", "infodelete_msg", null, function (button) {
			if (button === "ok") {
				me.deleteProcess(selections, isDetailClose);
			} else if (button === "ok") {
				MessageUtil.error("fail_msg", MessageConstants.FAIL_DELETE_ITEMS, null);
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
	// Delete
	deleteProcess: function (selections, isDetailClose) {
		// debugger
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create("ESVC.model.foundation.parm.UpdateBizParm");

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set(
			"workingStatus",
			WorkingStatus.convertInt(WorkingStatus.DELETE)
		);
		updateParm.set("items", new Array());
		selections.forEach(function (item) {
			delete item.files;
			updateParm.get("items").push(item.data);


		});

		updateParm.save({
			success: function (record, operation) {

				debugger
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				store.commitChanges();
				MessageUtil.saveSuccess();
				if (isDetailClose == true) {
					var detailView = me.getDetailBizView();
					if (detailView) {
						detailView.close();
					}
				}
				me.onSearch();
			},
		});
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var searchParm = me.getViewModel().get("theSearch");

		var params = me.createParam(searchParm);

		return params;
	},

	// Grid Edit
	onEdit: function (editor, context) {
		var me = this;
		var theDetail = me.getViewModel().get("theDetail");
		context.record.data.workingStatus = WorkingStatus.convertInt(
			context.record.crudState
		);
		if (context.record.isDirty()) {
			theDetail.dirty = true;
		}
	},

	// Grid Cancel Edit
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
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
	onDetailLoad: function () {
		var me = this;
		var form = me.getDetailBizView().down("form");
		form.isValid(); // Mandatory to appear red for.

		me.setDetailInitialize();

		me.updateViewStyle(me.getDetailBizView());
	},

	// Detail Initialize
	setDetailInitialize: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		//디버거
		// debugger;
		if (recvData) {
			// UPDATE
			me.setUpdateModeControl();
		} else {
			// CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
		}

		// Update commit
		if (!recvData.phantom) {
			recvData.commit();
		}

		me.getViewModel().setData({ theDetail: recvData });
	},

	// set Update Mode Control
	setUpdateModeControl: function () {
		var me = this;
		var refs = me.getReferences();

		// refs.ctlErrorCodeDetailErrCode.setReadOnly(true);
		// refs.ctlErrorCodeDetailErrorType.setReadOnly(true);
	},

	// Build Data Item
	buildDataItem: function (detailItem) {
		var me = this;
		var refs = me.getReferences();

		detailItem.set("staffCd", me.getStaffCd());

		return detailItem;
	},

	// Detail Save
	onDetailSave: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get("theDetail");

		var store = me.getStore(me.MAIN_STORE_NAME);

		console.log("detailItem:"+detailItem)

		// debugger

		if (detailView) {
			var infoForm = detailView.down("form");

			if (infoForm.isValid()) {
				if (detailItem.dirty) {
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},

	test: function (change, newValue, oldValue, eOpts) {
		debugger
		console.log(newValue)
	},

	// Server Save Process
	saveProcess: function () {
		// debugger
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get("theDetail");
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create("ESVC.model.foundation.parm.UpdateBizParm");

		if (detailItem == null) {
			return;
		}


		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set(
			"workingStatus",
			WorkingStatus.convertInt(
				isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE
			)
		);
		updateParm.set("item", me.buildDataItem(detailItem).data);

		// debugger
		updateParm.save({
			success: function (record) {

				console.log("save process success")
				if (isCreated) {
					// debugger
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
					me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, true);
				}

				detailItem.set("updateTime", record.get("updateTime"));
				detailItem.commit();

				me.setUpdateModeControl();
				me.onSearch();
				MessageUtil.saveSuccess(); // Success Message
			},
		});
	},

	// Detail Delete
	onDetailRemove: function () {
		var me = this;
		me.onGridRemove(true);
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});

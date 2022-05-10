/**
 * KHH 2019.04.08
 * 1. listeners
 *		1) pagingSearch : Connect Controller's search function
 * 			(1) args : [pagingToolbar]
 * 			ex) listeners: {pagingSearch:'onSearch'}
 * 2. Property
 *		1) usePagingToolbar : Decide whether to show PagingToolbar
 *			ex) usePagingToolbar:false
 */
Ext.define("TSB.ux.grid.GridPanel", {
  extend: "Ext.grid.Panel",
  xtype: "tsb-datagrid",
  //	flex:1,
  PAGING_SEARCH_EVENT_NAME: "pagingSearch",

  viewConfig: {
    loadMask: false, // 'Loading...' MessageBox Remove
  },
  pagingToolbar: null,
  //20200222byAnna) for fixed column setting.
  enableLocking: true,
  //20200423 by Tiffany) add total record bar
  useRecordToolbar: false,

  selectedDataIndex: null,

  scrollable: false,

  /**
   * =================================================================================
   * Paging Toolbar Start
   * this is Grid Panel.
   */
  // bbar: {
  //   xtype: "pagingtoolbar",
  //   displayInfo: true,
  //   displayMsg: "Displaying records {0} - {1} of {2}",
  //   emptyMsg: "No records to display",
  //   inputItemWidth: 45,
  //   moveFirst: function () {
  //     this.ownerCt.onPagingMoveFirst(this);
  //   },
  //   movePrevious: function () {
  //     this.ownerCt.onPagingMovePrevious(this);
  //   },
  //   moveNext: function () {
  //     this.ownerCt.onPagingMoveNext(this);
  //   },
  //   moveLast: function () {
  //     this.ownerCt.onPagingMoveLast(this);
  //   },
  //   doRefresh: function () {
  //     this.ownerCt.onPagingRefresh(this);
  //   },
  //   beforeRender: function () {
  //     this.ownerCt.onBbarBeforeRender(this);
  //   },
  //   height: 35,
  // },
  // listeners: {
  //   cellclick: function (control, td, cellIndex, record, tr, rowIndex, e, eOpts) {
  //     this.selectedDataIndex = control.getColumnManager().columns[cellIndex].dataIndex;
  //   },

  //   resize: function () {
  //     this.updateRowSpan();
  //   },
  //   afterLayout: function (obj) {
  //     this.updateRowSpan();
  //   },
  //   afterrender: function () {
  //     var element = this.getEl();
  //     var me = this;

  //     element.on("mousewheel", function (e, t) {
  //       var height = element.getHeight();

  //       if (height + t.scrollTop >= t.scrollHeight) {
  //         me.updateRowSpan();
  //       }
  //     });
  //   },
  // },
  // Before Renderer - onCreate
  onBbarBeforeRender: function (pagingToolbar) {
    var me = this;

    if (me.usePagingToolbar != null && me.usePagingToolbar == false) {
      pagingToolbar.setVisible(false);
    }

    if (me.useRecordToolbar) {
      pagingToolbar.displayMsg = "Displaying records {2}";

      var pagingControls = pagingToolbar.items;
      Ext.Array.each(pagingControls.items, function (control) {
        if (control.xtype == "tbfill" || control.itemId == "displayItem") {
          control.setVisible(true);
        } else {
          control.setVisible(false);
        }
      });
    }

    pagingToolbar.down("#refresh").hide(); // refresh button hide
    me.pagingToolbar = pagingToolbar;
    me.on("beforeedit", me.onPreventEdit);
    //		me.settingDefaultColumnDisplay(); // default Column Display
  },

  // Setting Default Column Display
  settingDefaultColumnDisplay: function () {
    var me = this;

    var parentView = me.ownerCt;
    var viewId = parentView.xtype;
    var pgmCode = ESVC.config.Token.getPgmCode();

    var store = Ext.create("Ext.data.Store", {
      storeId: "columnDisplayStore",
      proxy: {
        showProgressBar: false,
        type: "rest",
        url: ESVC.config.Locale.getRestApiDestUrl() + "/v1/columnsetting/searchItems",
      },
    });

    var params = {
      menu: viewId,
      code: pgmCode,
      defaultCheck: CommonConstants.YES,
    };

    store.load({
      params: params,
      callback: function (records, operation, success) {
        if (success) {
          var defaultColumn = Ext.Array.findBy(records, function (record) {
            if (record.get("defaultCheck") === "Y") {
              return true;
            }
          });

          if (defaultColumn && defaultColumn.get("header")) {
            var arrHeader = defaultColumn.get("header").split(GridUtil.SPLIT_CHAR);
            me.displayColumns = arrHeader;
            me.columnId = defaultColumn.get("no");
            me.lockedCount = defaultColumn.get("fixedColumn");
            GridUtil.settingColumn(me);
          }
        }
      },
    });
  },

  onPreventEdit: function (editor, e) {
    var accessMenuItems = ESVC.config.Token.getAccessAuthorityMapItem();
    var activePanel = editor.view.isLockingView ? editor.view.lockedGrid.ownerCt.ownerCt : editor.view.ownerCt.ownerCt;
    if (accessMenuItems) {
      for (var j = 0; j < accessMenuItems.length; j++) {
        if (editor.view.isLockingView) {
          if (accessMenuItems[j].menuCaption == activePanel.xtype) {
            if (accessMenuItems[j].csave == "N") {
              return false;
            }
          }
        }
      }
    }
    return true;
  },
  onPagingLoad: function () {
    var me = this;
    me.pagingToolbar.onLoad();
  },

  // Paging Move First
  onPagingMoveFirst: function (pagingToolbar) {
    var me = this,
      store = pagingToolbar.store;

    if (pagingToolbar.fireEvent("beforechange", pagingToolbar, 1) !== false) {
      store.currentPage = 1;
      me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
      return true;
    }
    return false;
  },

  // Paging Move Previous
  onPagingMovePrevious: function (pagingToolbar) {
    var me = this,
      store = pagingToolbar.store,
      prev = store.currentPage - 1;

    if (prev > 0) {
      if (pagingToolbar.fireEvent("beforechange", me, prev) !== false) {
        store.currentPage--;
        me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
        return true;
      }
    }
    return false;
  },

  // Paging Move Next
  onPagingMoveNext: function (pagingToolbar) {
    var me = this;
    var store = pagingToolbar.store;
    var total = pagingToolbar.getPageData().pageCount;
    var next = store.currentPage + 1;

    if (next <= total) {
      if (pagingToolbar.fireEvent("beforechange", me, next) !== false) {
        store.currentPage++;
        me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
        return true;
      }
    }

    return false;
  },

  // Paging Move Last
  onPagingMoveLast: function (pagingToolbar) {
    var me = this,
      store = pagingToolbar.store,
      last = pagingToolbar.getPageData().pageCount;

    if (pagingToolbar.fireEvent("beforechange", me, last) !== false) {
      store.currentPage = last;
      me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
      return true;
    }

    return false;
  },

  // Paging Move Refresh
  onPagingRefresh: function (pagingToolbar) {
    var me = this;
    var store = pagingToolbar.store;
    var current = store.currentPage;

    if (pagingToolbar.fireEvent("beforechange", me, current) !== false) {
      me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
      return true;
    }

    return false;
  },

  isMergeable: function () {
    var columns = this.getColumns();
    for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      column = columns[columnIndex];
      if (column.mergeable) {
        return true;
      }
    }
    return false;
  },

  updateRowSpan: function () {
    if (!this.isMergeable()) {
      return;
    }
    var me = this;
    var columns = this.getColumns(),
      view = this.getView(),
      store = this.getStore(),
      rowCount = store.getCount(),
      column,
      dataIndex,
      spanCell = null,
      spanValue = null;

    // 1> check for mergeing column
    for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      column = columns[columnIndex];
      if (!column.mergeable) {
        continue;
      }

      spanValue = null;
      dataIndex = column.dataIndex;
      for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
        var gridRow = column.getView().getRow(rowIndex);
        if (gridRow === null) continue;
        var cell = gridRow.querySelector(column.getCellSelector()),
          record = store.getAt(rowIndex),
          value = record.get(dataIndex);
        if (spanValue != value) {
          Ext.fly(cell).addCls("grid-merge-cell");
          spanCount = 1;
          spanValue = value;
        } else {
          Ext.fly(cell).addCls("grid-merge-cell-color");
        }
      }
    }

    // 2. check for TOTAL row

    for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
      var totalcolumn = 10000;
      for (var columnIndex = 1; columnIndex < columns.length; columnIndex++) {
        column = columns[columnIndex];
        dataIndex = column.dataIndex;
        var gridRow = column.getView().getRow(rowIndex);
        if (gridRow === null) continue;
        var cell = gridRow.querySelector(column.getCellSelector()),
          record = store.getAt(rowIndex),
          value = record.get(dataIndex);

        if (cell === null) continue;

        if (column.mergeable && (record.get(dataIndex) == "TOTAL" || record.get(dataIndex) == "AVG")) {
          totalcolumn = columnIndex;
        }

        if (totalcolumn <= columnIndex) {
          if (totalcolumn == columnIndex) {
            // total first column
            Ext.fly(cell).addCls("grid-merge-cell-total-first");
          } else if (columnIndex == columns.length - 1) {
            // last column
            Ext.fly(cell).addCls("grid-merge-cell-total-last");
          } else if (totalcolumn < columnIndex) {
            // middle column
            Ext.fly(cell).addCls("grid-merge-cell-total-middle");
          }
        }
      }
    }
  },
  /**
   * Paging Toolbar End
   * =================================================================================
   */
});

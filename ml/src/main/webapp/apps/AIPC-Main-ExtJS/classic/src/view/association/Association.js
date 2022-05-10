Ext.define("Aipc.Main.view.association.Association", {
  extend: "Ext.form.Panel",
  alias: "widget.app-association",
  requires: [
    "Aipc.Main.view.association.AssociationModel",
    "Aipc.Main.view.assiciation.AssociationController",
    "Ext.grid.plugin.RowEditing",
    "Ext.grid.plugin.Exporter",
    "Ext.grid.plugin.Clipboard",
    "Ext.grid.filters.Filters",
    "Ext.grid.selection.SpreadsheetModel",
  ],

  detailViewAlias: "app-associationdetail",

  controller: "association",

  viewModel: {
    type: "association",
  },

  listeners: {
    afterrender: "onLoad",
  },

  /**
   * =========================================================================================================================
   * CONSTANT START
   */
  MAIN_GRID_REF_NAME: "refUserGrid", // Main Grid Name
  MAIN_STORE_NAME: "user", // Main Store Name
  MAIN_GRID_EDITOR_NAME: "userEditor", // MAIN Grid Editor Name

  ORDER_GRID_REF_NAME: "refOrderGrid",
  ORDER_STORE_NAME: "theDetail.orders",

  /**
   * CONSTANT END
   * =========================================================================================================================
   */
  layout: { type: "vbox", align: "stretch" },

  initComponent: function () {
    var me = this;

    // var rowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
    //   clicksToEdit: 1,
    //   pluginId: me.MAIN_GRID_EDITOR_NAME,
    //   listeners: {
    //     cancelEdit: "onCancelEdit",
    //     edit: "onEdit",
    //   },
    // });

    Ext.apply(me, {
      items: [
        {
          xtype: "tsb-datagrid",
          reference: me.MAIN_GRID_REF_NAME,
          flex: 1,
          plugins: [/*rowEditing,*/ "gridexporter", "gridfilters", "clipboard"],
          bind: {
            store: "{" + me.MAIN_STORE_NAME + "}",
          },
          listeners: {
            celldblclick: "onDblClick",
            cellclick: "onUserClick",
          },
          selModel: {
            type: "spreadsheet",
            rowSelect: true,
            cellSelect: false,
          },
          columns: {
            defaults: {
              style: "text-align: center",
              align: "center",
            },
            items: [
              { text: "IMO", dataIndex: "imo", width: 160 },
              { text: "TIMESTAMP", dataIndex: "timestamp_position", width: 160 },
              { text: "LAT", dataIndex: "lat", width: 160 },
              { text: "LON", dataIndex: "lon", width: 160 },
              { text: "HEADING", dataIndex: "heading", width: 160 },
              { text: "SHIPTYPE", dataIndex: "shiptype", width: 160 },
              { text: "COURSE", dataIndex: "course", width: 160 },
              { text: "DRAUGHT", dataIndex: "draught", width: 160 },
              { text: "DESTINATION", dataIndex: "destination", width: 160 },
              { text: "GEOMETRY", dataIndex: "geometry", width: 160 },
              { text: "ARRIVAL_DATE", dataIndex: "arrival_date", width: 160 },
              { text: "DEPARTURE_DATE", dataIndex: "departure_date", width: 160 },
              { text: "PORT_X", dataIndex: "port_x", width: 160 },
              { text: "PORT_Y", dataIndex: "port_y", width: 160 },
              { text: "POSITION_DATE", dataIndex: "position_date", width: 160 },
            ],
          },
        },
        // {
        //   xtype: "tsb-datagrid",
        //   reference: me.ORDER_GRID_REF_NAME,
        //   flex: 1,
        //   plugins: ["gridexporter", "gridfilters", "clipboard"],
        //   bind: {
        //     store: "{" + me.ORDER_STORE_NAME + "}",
        //   },
        //   selModel: {
        //     type: "spreadsheet",
        //     rowSelect: true,
        //     cellSelect: false,
        //   },
        //   columns: {
        //     defaults: {
        //       style: "text-align: center",
        //       align: "center",
        //     },
        //     items: [
        //       { text: "아이디", dataIndex: "id", width: 160 },
        //       { text: "유저 아이디", dataIndex: "userId", width: 160 },
        //     ],
        //   },
        // },
      ],

      dockedItems: [
        {
          xtype: "container",
          style: { "background-color": "white" },
          layout: {
            type: "hbox",
          },

          defaults: {
            margin: "1 1 1 1",
          },
          items: [
            {
              xtype: "tbfill",
            },
            {
              xtype: "button",
              text: ViewUtil.getLabel("search"),
              cls: "search-button",
              iconCls: "x-fa fa-search",
              listeners: {
                click: "onSearch",
              },
            },
            {
              xtype: "button",
              text: ViewUtil.getLabel("add"),
              iconCls: "x-fa fa-plus",
              itemId: "btnAdd",
              listeners: {
                click: "onGridAdd",
              },
            },
            {
              xtype: "button",
              text: ViewUtil.getLabel("remove"),
              ui: "delete-button",
              iconCls: "x-fa fa-minus",
              itemId: "btnDelete",
              listeners: {
                click: "onGridRemove",
              },
            },
            // {
            //   xtype: "button",
            //   text: ViewUtil.getLabel("exportToExcel"),
            //   itemId: "exportToExcelButton",
            //   iconCls: "excel-button-image",
            //   cls: "excel-button",
            //   listeners: {
            //     click: {
            //       fn: "onExportExcelPdfWithServer",
            //       args: [me.MAIN_GRID_REF_NAME, true],
            //     },
            //   },
            // },
            // {
            //   xtype: "button",
            //   text: ViewUtil.getLabel("columnSetting"),
            //   cls: "column-setting-button",
            //   iconCls: "x-fa fa-columns",
            //   listeners: {
            //     click: "onColumnSettingPopup",
            //     args: [me.MAIN_GRID_REF_NAME],
            //   },
            // },
            // {
            //   xtype: "button",
            //   text: ViewUtil.getLabel("searchCondition"),
            //   cls: "search-condition-button",
            //   iconCls: "x-fa fa-filter",
            //   ui: "create-button",
            //   listeners: {
            //     click: "onSearchConditionPopup",
            //   },
            // },
          ],
        },
        {
          xtype: "toolbar",
          enableOverflow: true,
          padding: "0 0 0 0",
          defaults: {
            labelAlign: "right",
          },
          // items: [
          //   {
          //     xtype: "fieldset",
          //     autoScroll: true,
          //     collapsible: true,
          //     flex: 1,
          //     title: ViewUtil.getLabel("search"),
          //     layout: {
          //       type: "vbox",
          //       align: "stretch",
          //     },
          //     defaults: {
          //       margin: "1 1 1 1",
          //     },
          //     items: [
          //       {
          //         xtype: "container",
          //         flex: 1,
          //         layout: {
          //           type: "hbox",
          //           align: "stretch",
          //         },
          //         defaults: {
          //           labelAlign: "right",
          //           margin: "1 1 1 1",
          //         },
          //         items: [
          //           {
          //             xtype: "textfield",
          //             reference: "ctlErrorCodeErrCode",
          //             fieldLabel: ViewUtil.getLabel("errorEdiCode"),
          //             labelWidth: 80,
          //             width: 240,
          //             maxLength: 10,
          //             enforceMaxLength: true,
          //             fieldStyle: "text-transform:uppercase",
          //             bind: "{theSearch.errCode}",
          //             listeners: {
          //               change: "onUpperCase",
          //             },
          //           },
          //           {
          //             xtype: "textfield",
          //             reference: "ctlErrorCodeErrName",
          //             fieldLabel: ViewUtil.getLabel("errorName"),
          //             labelWidth: 80,
          //             width: 240,
          //             maxLength: 50,
          //             enforceMaxLength: true,
          //             bind: "{theSearch.errName}",
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    });

    me.callParent();
  },
});

Ext.define("Aipc.Main.view.sample.Sample", {
    extend: "Ext.form.Panel",
    alias: "widget.app-sample",
    requires: [
        "Aipc.Main.view.sample.SampleModel",
        "Aipc.Main.view.sample.SampleController",
        "Ext.grid.plugin.RowEditing",
        "Ext.grid.plugin.Exporter",
        "Ext.grid.plugin.Clipboard",
        "Ext.grid.filters.Filters",
        "Ext.grid.selection.SpreadsheetModel",
    ],

    detailViewAlias: "app-sampledetail",

    controller: "sample",

    viewModel: {
        type: "sample",
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
                            // { text: "아이디", dataIndex: "id", width: 160 },
                            { text: "SHIP_IMO", dataIndex: "imo", width: 160 },
                            { text: "SHIP_TYPE", dataIndex: "shiptype", width: 160 },
                            { text: "SHIP_DIMA", dataIndex: "dima", width: 160 },
                            { text: "SHIP_DIMB", dataIndex: "dimb", width: 160 },
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
                // {
                //     xtype: "toolbar",
                //     enableOverflow: true,
                //     padding: "0 0 0 0",
                //     defaults: {
                //         labelAlign: "right",
                //     },
                //     items: [
                //       {
                //         xtype: "fieldset",
                //         autoScroll: true,
                //         collapsible: true,
                //         flex: 1,
                //         title: ViewUtil.getLabel("search"),
                //         layout: {
                //           type: "vbox",
                //           align: "stretch",
                //         },
                //         defaults: {
                //           margin: "1 1 1 1",
                //         },
                //         items: [
                //           {
                //             xtype: "container",
                //             flex: 1,
                //             layout: {
                //               type: "hbox",
                //               align: "stretch",
                //             },
                //             defaults: {
                //               labelAlign: "right",
                //               margin: "1 1 1 1",
                //             },
                //
                //             items: [
                //                 {
                //                     xtype: "textfield",
                //                     // reference: "ctlErrorCodeErrCode",
                //                     // fieldLabel: ViewUtil.getLabel("errorEdiCode"),
                //                     fieldLabel: "아이디",
                //                     labelWidth: 80,
                //                     width: 240,
                //                     maxLength: 10,
                //                     // enforceMaxLength: true,
                //                     // fieldStyle: "text-transform:uppercase",
                //                     // bind: "{theSearch.errCode}",
                //                     bind: {
                //                         value: "{theDetail.id}"
                //                     },
                //                     // listeners: {
                //                     //   change: "onUpperCase",
                //                     // },
                //                 },
                //               {
                //                 xtype: "textfield",
                //                 // reference: "ctlErrorCodeErrCode",
                //                 // fieldLabel: ViewUtil.getLabel("errorEdiCode"),
                //                 fieldLabel: "이름",
                //                 labelWidth: 80,
                //                 width: 240,
                //                 maxLength: 10,
                //                 // enforceMaxLength: true,
                //                 // fieldStyle: "text-transform:uppercase",
                //                 // bind: "{theSearch.errCode}",
                //                   bind: {
                //                       value: "{theDetail.name}"
                //                   },
                //                 // listeners: {
                //                 //   change: "onUpperCase",
                //                 // },
                //               },
                //               {
                //                 xtype: "textfield",
                //                 // reference: "ctlErrorCodeErrName",
                //                 // fieldLabel: ViewUtil.getLabel("errorName"),
                //                 fieldLabel: "코드",
                //                 labelWidth: 80,
                //                 width: 240,
                //                 maxLength: 50,
                //                 enforceMaxLength: true,
                //                 // bind: "{theSearch.errName}",
                //                   bind: {
                //                       value: "{theDetail.code}"
                //                   },
                //               },
                //             ],
                //           },
                //         ],
                //       },
                //     ],
                // },
            ],
        });

        me.callParent();
    },
});

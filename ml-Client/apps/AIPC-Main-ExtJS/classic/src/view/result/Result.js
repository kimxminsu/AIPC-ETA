Ext.define("Aipc.Main.view.result.Result", {
    extend: "Ext.form.Panel",
    alias: "widget.app-result",
    requires: [
        "Aipc.Main.view.result.ResultModel",
        "Aipc.Main.view.result.ResultController",
        "Ext.grid.plugin.RowEditing",
        "Ext.grid.plugin.Exporter",
        "Ext.grid.plugin.Clipboard",
        "Ext.grid.filters.Filters",
        "Ext.grid.selection.SpreadsheetModel",
    ],

    detailViewAlias: "app-resultdetail",

    controller: "result",

    viewModel: {
        type: "result"
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
                            { text: "TIME", dataIndex: "accumTime", width: 160 },
                            { text: "DIST", dataIndex: "accumDist", width: 160 },
                            { text: "EFFICIENCY", dataIndex: "efficiency", width: 160 },
                            { text: "GEOHASH", dataIndex: "geohash", width: 160 },
                            { text: "SHIPTYPE", dataIndex: "shiptype", width: 160 },
                            { text: "DIMA", dataIndex: "dima", width: 160 },
                            { text: "DIMB", dataIndex: "dimb", width: 160 },
                            { text: "DRAUGHT", dataIndex: "draught", width: 160 },
                            { text: "DESTINATION", dataIndex: "destinationPort", width: 160 },
                            { text: "ORIGIN_PORT", dataIndex: "originPort", width: 160 },

                        ],
                    },
                }
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
                        // {
                        //     xtype: "button",
                        //     text: ViewUtil.getLabel("search"),
                        //     cls: "search-button",
                        //     iconCls: "x-fa fa-search",
                        //     listeners: {
                        //         click: "onSearch",
                        //     },
                        // },
                        // {
                        //     xtype: "button",
                        //     text: ViewUtil.getLabel("add"),
                        //     iconCls: "x-fa fa-plus",
                        //     itemId: "btnAdd",
                        //     listeners: {
                        //         click: "onGridAdd",
                        //     },
                        // },
                        // {
                        //     xtype: "button",
                        //     text: ViewUtil.getLabel("remove"),
                        //     ui: "delete-button",
                        //     iconCls: "x-fa fa-minus",
                        //     itemId: "btnDelete",
                        //     listeners: {
                        //         click: "onGridRemove",
                        //     },
                        // }
                    ],
                },
                {
                    xtype: "toolbar",
                    enableOverflow: true,
                    padding: "0 0 0 0",
                    defaults: {
                        labelAlign: "right",
                    },
                    items: [
                      {
                        xtype: "fieldset",
                        autoScroll: true,
                        collapsible: true,
                        flex: 1,
                        title: ViewUtil.getLabel("search"),
                        layout: {
                          type: "vbox",
                          align: "stretch",
                        },
                        defaults: {
                          margin: "1 1 1 1",
                        },
                        items: [
                          {
                            xtype: "container",
                            flex: 1,
                            layout: {
                              type: "hbox",
                              align: "stretch",
                            },
                            defaults: {
                              labelAlign: "right",
                              margin: "1 1 1 1",
                            },

                            items: [
                              {
                                xtype: "textfield",
                                reference: "ctlErrorCodeErrCode",
                                fieldLabel: ViewUtil.getLabel("errorEdiCode"),
                                labelWidth: 80,
                                width: 240,
                                maxLength: 10,
                                enforceMaxLength: true,
                                allowBlank : false,
                                fieldStyle: "text-transform:uppercase",
                                  //★검색
                                // bind: "{theSearch.errCode}",
                                listeners: {
                                  // onClick: "onSearch",
                                },
                              },

                              {
                                xtype: "textfield",
                                reference: "ctlErrorCodeErrName",
                                fieldLabel: ViewUtil.getLabel("errorName"),
                                labelWidth: 80,
                                width: 240,
                                maxLength: 50,
                                allowBlank : false,
                                enforceMaxLength: true,
                                bind: "{theSearch.errName}",
                              },
                              {
                                  xtype: "combobox",
                                  reference: "ctlcomboTest",
                                  fieldLabel: "Combobox",
                                  labelWidth: 80,
                                  width: 240,
                                  editable : false,
                                  allowBlank : false,
                                  fieldStyle: 'text-transform:uppercase',
                                  displayField : 'shiptypeDesc',
                                  valueField : 'shiptype',
                                  value : '',
                                  bind : {
                                      store : '{shiptypeCombo}'
                                  }
                              },
                                //★버튼
                                {
                                    xtype: 'button',
                                    text: 'search',
                                    listeners: {
                                        click: "onSearch"
                                    }
                                }
                            ],
                          },
                        ],
                      },
                    ],
                },
            ],
        });

        me.callParent();
    },
});

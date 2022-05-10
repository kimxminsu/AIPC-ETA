Ext.define("Aipc.Main.view.association.AssociationDetail", {
  extend: "Ext.form.Panel",

  alias: "widget.app-associationdetail",

  requires: [
    "Ext.layout.container.Table",
    "Ext.grid.plugin.Exporter",
    "Ext.grid.plugin.Clipboard",
    "Ext.grid.filters.Filters",
    "Ext.grid.plugin.RowEditing",
    "Ext.grid.selection.SpreadsheetModel",
  ],

  width: 750,
  height: 340,
  scrollable: true,

  listeners: {
    afterrender: "onDetailLoad",
  },

  /**
   * =========================================================================================================================
   * CONSTANT START
   */
  ORDER_GRID_REF_NAME: "refOrderGrid",
  ORDER_STORE_NAME: "theDetail.orders",
  ORDER_GRID_EDITOR_NAME: "orderEditor", // MAIN Grid Editor Name

  /**
   * CONSTANT END
   * =========================================================================================================================
   */

  layout: {
    type: "vbox",
    align: "stretch",
  },

  initComponent: function () {
    var me = this;

    var rowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
      clicksToEdit: 1,
      pluginId: me.ORDER_GRID_EDITOR_NAME,
      listeners: {
        cancelEdit: "onCancelEdit",
        edit: "onEdit",
      },
    });

    Ext.apply(this, {
      defaults: {
        margin: "0 5 0 5", // top, right, bottom, left
      },
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          margin: "5 5 0 5",
          xtype: "container",
          layout: {
            type: "vbox",
            align: "stretch",
          },
          items: [
            {
              // 1
              xtype: "container",
              flex: 1,
              defaults: {
                margin: "0 5 5 5",
                labelAlign: "right",
                labelWidth: 80,
              },
              layout: {
                type: "hbox",
                align: "stretch",
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "IMO",
                  bind: {
                    value: "{theDetail.id}"
                  },
                },
                {
                  xtype: "textfield",
                  fieldLabel: "TIMESTAMP",
                  bind: {
                    value: "{theDetail.name}"
                  },
                },
              ],
            },
            {
              // 2
              xtype: "container",
              flex: 1,
              defaults: {
                margin: "0 5 5 5",
                labelAlign: "right",
                labelWidth: 80,
              },
              layout: {
                type: "vbox",
                align: "stretch",
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "LAT",
                  bind: {
                    value: "{theDetail.age}"
                  },

                  // listeners: {
                  //   change: "test"
                  // },

                },
                {
                  xtype: "textfield",
                  fieldLabel: "LON",
                  bind: {
                    value: "{theDetail.email}"
                  },
                },
                {
                  xtype: "textfield",
                  fieldLabel: "HEADING",
                  bind: {
                    value: "{theDetail.phone}"
                  },
                },
              ],
            },
            // {
            //   // 3
            //   xtype: "container",
            //   flex: 1,
            //   defaults: {
            //     margin: "0 5 5 5",
            //     labelAlign: "right",
            //     labelWidth: 80,
            //   },
            //   layout: {
            //     type: "vbox",
            //     align: "stretch",
            //   },
            //   items: [
            //     {
            //       xtype: "tsb-datagrid",
            //       reference: me.ORDER_GRID_REF_NAME,
            //       flex: 1,
            //       plugins: [
            //         rowEditing,
            //         "gridexporter",
            //         "gridfilters",
            //         "clipboard",
            //       ],
            //       bind: {
            //         store: "{" + me.ORDER_STORE_NAME + "}",
            //       },
            //       selModel: {
            //         type: "spreadsheet",
            //         rowSelect: true,
            //         cellSelect: false,
            //       },
            //       columns: {
            //         defaults: {
            //           style: "text-align: center",
            //           align: "center",
            //         },
            //         items: [
            //           {
            //             text: "아이디",
            //             dataIndex: "id",
            //             width: 160,
            //             editor: {
            //               xtype: "textfield",
            //             },
            //           },
            //           {
            //             text: "유저 아이디",
            //             dataIndex: "userId",
            //             width: 160,
            //             editor: {
            //               xtype: "textfield",
            //             },
            //           },
            //         ],
            //       },
            //     },
            //   ],
            // },
          ],
        },
      ],
    });
    me.callParent();
  },
});

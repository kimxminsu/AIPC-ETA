Ext.define("ESVC.view.usercontrol.CommonCodeField", {
  extend: "Ext.Container",
  alias: "widget.commoncodefield",
  padding: "0,0,0,0",

  requires: [],

  controller: "commoncodefield",

  viewModel: {
    type: "commoncodepopup",
  },

  layout: "hbox",

  config: {
    allowBlank: true,
    editableControl: true,
    visibleName: false,
    parent: null,
    params: null,
    gridMode: false,
  },

  updateEditableControl: function (value) {
    var me = this;
    var fieldButton = this.lookupReference("ctlOpenPopupButton");
    var fieldControl = this.lookupReference("ctlField");

    if (fieldControl && fieldButton) {
      fieldControl.setEditable(value);
      fieldButton.setDisabled(!value);
    }
  },

  initComponent: function () {
    var me = this;

    if (me.gridMode) {
    } else {
    }
    Ext.apply(me, {
      defaults: {
        labelAlign: "right",
      },
      items: [
        {
          xtype: "label",
          cls: "label-text-align",
          margin: "0 5 0 0",
          width: 100,
          reference: "ctlFieldLabel",
          listeners: {
            beforeRender: "onRenderField",
          },
        },
        {
          xtype: "textfield",
          flex: 1,
          margin: "0 5 0 0",
          fieldStyle: "text-transform:uppercase",
          reference: "ctlField",
          labelWidth: 30,
          listeners: {
            focusleave: "onFieldFocusleave",
            change:function(f, newValue, oldValue, eOpts){              
              me.fireEvent('change',me, newValue,oldValue,eOpts);              
            },
            render: function () {
              if (me.gridMode) {
                this.getEl().on("contextmenu", function (e, t, eOpts) {
                  me.getController().openPopup("popup-commoncodepopup");
                });
              }
            },
          },
        },
        {
          xtype: "button",
          reference: "ctlOpenPopupButton",
          iconCls: "x-fa fa-search",
          fieldStyle: "text-transform: uppercase",
          listeners: {
            click: {
              fn: "openPopup",
              args: ["popup-commoncodepopup"],
            },
          },
        },
        {
          xtype: "textfield",
          flex: 1,
          margin: "0 0 0 5",
          reference: "ctlFieldName",
          editable: false,
        },
      ],

      getValue: function () {
        return me.lookupReference("ctlField").getValue();
      },

      setValue: function (codeValue) {
        me.lookupReference("ctlField").setValue(codeValue);
      },

      getName: function () {
        return me.lookupReference("ctlFieldName").getValue();
      },

      setName: function (codeName) {
        me.lookupReference("ctlFieldName").setValue(codeName);
      },
    });

    me.callParent();
  },
});

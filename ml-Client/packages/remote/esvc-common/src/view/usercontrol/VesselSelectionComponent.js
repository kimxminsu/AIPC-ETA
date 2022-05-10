Ext.define("ESVC.view.usercontrol.VesselSelectionComponent", {
  extend: "Ext.Container",
  alias: "widget.app-vesselselectioncomponent",
  layout: "hbox",
  controller: "vesselselectioncomponent",
  viewModel: {
    type: "vesselselectioncomponent",
  },
  listeners: {
    afterrender: "onLoad",
  },

  requires: ["ESVC.view.usercontrol.VesselSelectionList"],

  detailViewAlias: "vesselSelectionList",

  VESSEL_STATUS_COMBOBOX_STORE: "vesselStatusCombo",

  config: {
    editableControl: true,
    parent: null,
    vesselScheduleType: CodeConstants.VesselScheduleTypes.BOTH,
    vesselDepartureType: CodeConstants.VesselDepartureTypes.ALL,
  },

  updateEditableControl: function (value) {
    var me = this;
    var cbStatus = me.lookupReference("cbStatus");
    var txVslCd = me.lookupReference("txVslCd");
    var numCallYear = me.lookupReference("numCallYear");
    var cbCallSeq = me.lookupReference("cbCallSeq");
    var txPortVoy = me.lookupReference("txPortVoy");
    var txVslNm = me.lookupReference("txVslNm");
    var btnFind = me.lookupReference("btnFind");
    var btnClear = me.lookupReference("btnClear");

    if (cbStatus) {
      cbStatus.setReadOnly(!value);
      txVslCd.setReadOnly(!value);
      numCallYear.setReadOnly(!value);
      cbCallSeq.setReadOnly(!value);
      txPortVoy.setReadOnly(!value);
      txVslNm.setReadOnly(!value);
      btnFind.setDisabled(!value);
      btnClear.setDisabled(!value);
    }
  },

  initComponent: function () {
    var me = this;
    Ext.apply(me, {
      items: [
        {
          xtype: "fieldset",
          title: ViewUtil.getLabel("vesselSchedule"),
          flex: "1",
          margin: "5 0 5 0",
          collapsible: true,
          items: [
            {
              xtype: "container",
              layout: {
                type: "vbox",
                align: "stretch",
              },
              items: [
                {
                  xtype: "container",
                  layout: {
                    type: "hbox",
                    align: "stretch",
                  },
                  defaults: {
                    labelAlign: "right",
                  },
                  margin: "0 0 5 0",
                  items: [
                    {
                      xtype: "combo",
                      reference: "cbStatus",
                      fieldLabel: ViewUtil.getLabel("vesselSelectionComponentStatus"),
                      bind: {
                        store: "{" + me.VESSEL_STATUS_COMBOBOX_STORE + "}",
                      },
                      queryMode: "local",
                      displayField: "codeName",
                      valueField: "code",
                      width: 280,
                      labelWidth: 120,
                      emptyText: "ALL",
                    },
                    {
                      xtype: "textfield",
                      reference: "txVslCd",
                      fieldLabel: ViewUtil.getLabel("vesselSelectionComponentSchedule"),
                      labelWidth: 85,
                      width: 160,
                      fieldStyle: "text-transform:uppercase",
                      vtype: "alphanum",
                      maxLength: 4,
                      enforceMaxLength: true,
                      listeners: {
                        change: "onVesselCodeChange",
                      },
                    },
                    {
                      xtype: "paddednumber",
                      reference: "numCallYear",
                      listeners: {
                        change: "onCallYearChange",
                      },
                      margin: "0 0 0 5",
                      width: 85,
                      zeroPadding: 4,
                      minValue: 0,
                      maxValue: 9999,
                    },
                    {
                      xtype: "combo",
                      reference: "cbCallSeq",
                      displayField: "comName",
                      valueField: "comCode",
                      queryMode: "local",
                      labelPad: "0",
                      margin: "0 0 0 5",
                      vtype: "alphanum",
                      maxLength: 4,
                      enforceMaxLength: true,
                      listeners: {
                        change: "onCallSeqChange",
                      },
                      store: new Ext.data.ArrayStore({
                        id: 0,
                        fields: ["comName", "comCode"],
                        data: [],
                      }),
                      width: 85,
                    },
                    {
                      xtype: "button",
                      reference: "btnFind",
                      width: 40,
                      margin: "0 0 0 5",
                      text: "··",
                      listeners: {
                        click: "onFind",
                      },
                    },
                    {
                      xtype: "textfield",
                      reference: "txInVoy",
                      fieldLabel: ViewUtil.getLabel("vesselSelectionComponentVoy"),
                      margin: "0 0 0 5",
                      labelWidth: 35,
                      readOnly: true,
                      width: 100,
                    },
                    {
                      xtype: "textfield",
                      reference: "txOutVoy",
                      margin: "0 0 0 5",
                      readOnly: true,
                      width: 70,
                    },
                    {
                      xtype: "textfield",
                      reference: "txETB",
                      fieldLabel: ViewUtil.getLabel("vesselSelectionComponentETB"),
                      margin: "0 0 0 5",
                      labelWidth: 90,
                      readOnly: true,
                      width: 240,
                    },
                  ],
                },
                {
                  xtype: "container",
                  layout: {
                    type: "hbox",
                    align: "stretch",
                  },
                  defaults: {
                    labelAlign: "right",
                  },
                  items: [
                    {
                      xtype: "textfield",
                      reference: "txPortVoy",
                      width: 280,
                      labelWidth: 120,
                      fieldLabel: ViewUtil.getLabel("vesselSelectionComponentPortVoy"),
                    },
                    {
                      xtype: "container",
                      layout: {
                        type: "hbox",
                        align: "stretch",
                      },
                      defaults: {
                        labelAlign: "right",
                      },
                      items: [
                        {
                          xtype: "textfield",
                          reference: "txVslNm",
                          labelWidth: 85,
                          width: 340,
                          fieldLabel: ViewUtil.getLabel("vesselSelectionComponentVesselName"),
                        },
                        {
                          xtype: "button",
                          reference: "btnClear",
                          text: "X",
                          width: 40,
                          margin: "0 0 0 5",
                          listeners: {
                            click: "onClearClick",
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: {
                        type: "hbox",
                        align: "stretch",
                      },
                      defaults: {
                        labelAlign: "right",
                        readOnly: true,
                      },
                      items: [
                        {
                          xtype: "textfield",
                          reference: "txInLane",
                          fieldLabel: ViewUtil.getLabel("vesselSelectionComponentLane"),
                          margin: "0 0 0 5",
                          labelWidth: 35,
                          width: 100,
                        },
                        {
                          xtype: "textfield",
                          reference: "txOutLane",
                          margin: "0 0 0 5",
                          width: 70,
                        },
                      ],
                    },
                    {
                      xtype: "textfield",
                      reference: "txATD",
                      labelWidth: 90,
                      width: 240,
                      margin: "0 0 0 5",
                      readOnly: true,
                      fieldLabel: ViewUtil.getLabel("vesselSelectionComponentATD"),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      // get selected value
      getValue: function () {
        return me.selectionData;
      },

      // set selected value
      setValue: function (vvd) {
        me.controller.setVvd(vvd);
      },

      getDisplayValue: function () {
        return me.selectionData.callYear + "/" + me.selectionData.userVoyage;
      },

      fieldLabel: TSB.locale.i18n.Bundle.instance.getMsg("vesselSchedule"),
    });
    me.callParent();
  },
});

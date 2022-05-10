Ext.define("ESVC.view.usercontrol.CommonCodeFieldController", {
  extend: "ESVC.view.foundation.usercontrol.PopupFieldViewController",

  requires: ["ESVC.view.popup.CommonCodePopup"],

  alias: "controller.commoncodefield",

  /**
   * =========================================================================================================================
   * CONSTANT/VARIABLE START
   */
  prevValue: null,
  /**
   * CONSTANT/VARIABLE END
   * =========================================================================================================================
   */

  /**
   * =========================================================================================================================
   * INITIALIZE START
   */
  // Field Before Renderer
  onRenderField: function () {
    var me = this;
    var fieldButton = me.lookupReference("ctlOpenPopupButton");
    var fieldLabelControl = me.lookupReference("ctlFieldLabel");
    var fieldControl = me.lookupReference("ctlField");
    var nameControl = me.lookupReference("ctlFieldName");

    if (fieldControl.getEditable()) {
      fieldControl.setEditable(me.getView().editableControl);
    }

    fieldButton.setDisabled(!me.getView().editableControl);

    if (me.getView().visibleName === true) {
      nameControl.setVisible(true);
      fieldControl.setReadOnly(false);
      fieldControl.readOnly = false;

      if (me.getView().nameWidth) {
        nameControl.setFlex(null);
        nameControl.setWidth(me.getView().nameWidth);
      }
    } else {
      nameControl.setVisible(false);
      fieldControl.setReadOnly(true);
      fieldControl.readOnly = true;
    }

    if (me.getView().labelWidth) {
      fieldLabelControl.setWidth(me.getView().labelWidth);
    }

    if (!StringUtil.isNullorEmpty(me.getView().fieldLabel)) {
      fieldLabelControl.setText(me.getView().fieldLabel);
    } else {
      fieldLabelControl.setWidth(0);
    }

    if (!StringUtil.isNullorEmpty(me.getView().emptyText)) {
      fieldControl.setEmptyText(me.getView().emptyText);
    }

    if (me.getView().bind) {
      fieldControl.bind = me.getView().bind;
    }

    fieldControl.allowBlank = me.getView().allowBlank;

    if (me.getView().gridMode) {
      nameControl.setVisible(false);
      fieldButton.setVisible(false);
      fieldLabelControl.setVisible(false);
      fieldControl.fieldStyle = "background-color: " + CommonConstants.BackColorType.CODE_COLOR;
    }
  },
  /**
   * INITIALIZE END
   * =========================================================================================================================
   */

  /**
   * =========================================================================================================================
   * EVENT HANDLER START
   */
  onFieldFocusleave: function () {
    var me = this;
    var store = me.getStore("commonCodePopup");
    var compareFieldName = "code";
    var searchParams = {};
    var returnItemFieldNames = {
      code: "code",
      name: "name",
    };

    if (me.getView().params) {
      var params = me.getView().params;
      searchParams["itemKey"] = params["itemKey"];
    }

    store.proxy.showProgressBar = false;

    me.onValidationCode(store, searchParams, compareFieldName, returnItemFieldNames);
  },

  afterSetCodePopupData: function (xtype, targetControl, returnValue, me, parent) {
    var fieldControl = me.lookupReference("ctlField");
    var nameControl = me.lookupReference("ctlFieldName");
    if (returnValue) {
      me.prevValue = returnValue.code;
      fieldControl.setValue(returnValue.code);
      nameControl.setValue(returnValue.name);
    } else {
      me.prevValue = null;
      fieldControl.setValue("");
      nameControl.setValue("");
    }

    // 부모 컨트롤러에 afterSetCodePopupData 메서드가 있는 경우 호출
    if (parent.afterSetCodePopupData) {
      parent.afterSetCodePopupData(xtype, targetControl, returnValue);
    }
  },
  /**
   * EVENT HANDLER END
   * =========================================================================================================================
   */
});

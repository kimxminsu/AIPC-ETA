Ext.define("Iotos.grid.filters.filter.Base", {
  override: "Ext.grid.filters.filter.Base",

  updateBuffer: 5000,

  privates: {
    /**
     * @private
     * Handler method called when there is a significant event on an input item.
     */
    onValueChange: function (field, e) {
      var me = this,
        keyCode = e.getKey(),
        updateBuffer = me.updateBuffer,
        value;

      // Don't process tabs!
      if (keyCode === e.TAB) {
        return;
      }

      //<debug>
      if (!field.isFormField) {
        Ext.raise("`field` should be a form field instance.");
      }
      //</debug>

      if (field.isValid()) {
        if (keyCode === e.RETURN) {
          me.menu.hide();
          // return; // ! 수정된 라인
        }

        value = me.getValue(field);

        if (value === me.value) {
          return;
        }

        // ! 엔터키가 눌렸을때는 버퍼 걸리지 않고 바로 처리
        if (updateBuffer && keyCode !== e.RETURN) {
          me.task.delay(updateBuffer, null, null, [value]);
        } else {
          me.setValue(value);
          me.task.cancel();
        }
      }
    },
  },
});

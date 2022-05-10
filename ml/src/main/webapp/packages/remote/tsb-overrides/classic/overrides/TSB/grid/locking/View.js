/**
 * *rownumberer 더블 클릭 시 column에 null이 들어있다.
 */
Ext.define("TSB.grid.locking.View", {
  override: "Ext.grid.locking.View",
  onCellSelect: function (cellContext) {
    if (cellContext.column) {
      // Pass a contextless cell descriptor to the child view
      cellContext.column.getView().onCellSelect({
        record: cellContext.record,
        column: cellContext.column,
      });
    } else {
      console.log("onCellSelect col == null");
    }
  },

  onCellDeselect: function (cellContext) {
    //! ADDED BLOCK by YS.Bae
    if (cellContext.column) {
      // Pass a contextless cell descriptor to the child view
      cellContext.column.getView().onCellDeselect({
        record: cellContext.record,
        column: cellContext.column,
      });
    } else {
      console.log("onCellDeselect col == null");
    }
  },

  getCellByPosition: function (pos, returnDom) {
    var me = this,
      view = pos.view,
      col = pos.column;

    //! ADDED BLOCK by YS.Bae
    if (col) {
      // Access the real Ext.view.Table for the specified Column
      if (view === me) {
        pos = new Ext.grid.CellContext(col.getView()).setPosition(pos.record, pos.column);
      }

      return view.getCellByPosition(pos, returnDom);
    } else {
      console.log("getCellByPosition col == null");
    }
  },
});

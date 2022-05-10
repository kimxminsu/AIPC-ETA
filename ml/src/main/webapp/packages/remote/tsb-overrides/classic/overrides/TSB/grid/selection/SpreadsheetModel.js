Ext.define("TSB.grid.selection.SpreadsheetModel", {
  override: "Ext.grid.selection.SpreadsheetModel",
  privates: {
    onNavigate: function (navigateEvent) {
      var me = this,
        // Use outermost view. May be lockable
        view = navigateEvent.view && navigateEvent.view.ownerGrid.view,
        record = navigateEvent.record,
        sel = me.selected,
        // Create a new Context based upon the outermost View.
        // NavigationModel works on local views. TODO: remove this step when NavModel is fixed to use outermost view in locked grid.
        // At that point, we can use navigateEvent.position
        pos = view && new Ext.grid.CellContext(view).setPosition(record, navigateEvent.column),
        keyEvent = navigateEvent.keyEvent,
        ctrlKey = keyEvent.ctrlKey,
        shiftKey = keyEvent.shiftKey,
        keyCode = keyEvent.getKey(),
        selectionChanged;
      // if there's no position then the user might have clicked outside a cell
      if (!pos) {
        return;
      }
      // A Column's processEvent method may set this flag if configured to do so.
      if (keyEvent.stopSelection) {
        return;
      }
      // CTRL/Arrow just navigates, does not select
      if (
        ctrlKey &&
        (keyCode === keyEvent.UP ||
          keyCode === keyEvent.LEFT ||
          keyCode === keyEvent.RIGHT ||
          keyCode === keyEvent.DOWN)
      ) {
        return;
      }
      // Click is the mouseup at the end of a multi-cell/multi-column select swipe; reject.
      if (
        sel &&
        (sel.isCells || (sel.isColumns && !me.getRowSelect() && !(ctrlKey || shiftKey))) &&
        sel.getCount() > 1 &&
        !keyEvent.shiftKey &&
        keyEvent.type === "click"
      ) {
        return;
      }
      // If all selection types are disabled, or it's not a selecting event, return
      if (
        !(me.cellSelect || me.columnSelect || me.rowSelect) ||
        !navigateEvent.record ||
        keyEvent.type === "mousedown"
      ) {
        return;
      }
      // Ctrl/A key - Deselect current selection, or select all if no selection
      if (ctrlKey && keyEvent.keyCode === keyEvent.A) {
        // No selection, or only one, select all
        if (!sel || sel.getCount() < 2) {
          me.selectAll();
        } else {
          me.deselectAll();
        }
        me.updateHeaderState();
        return;
      }
      if (shiftKey) {
        // If the event is in one of the row selecting cells, or cell selecting is turned off
        if (
          pos.column === me.numbererColumn ||
          pos.column === me.checkColumn ||
          !(me.cellSelect || me.columnSelect) ||
          (sel && sel.isRows)
        ) {
          if (me.rowSelect) {
            // Ensure selection object is of the correct type
            if (!sel || !sel.isRows || sel.view !== view) {
              me.resetSelection(true);
              sel = me.selected = new Ext.grid.selection.Rows(view);
            }
            // First shift
            if (!sel.getRangeSize()) {
              sel.setRangeStart(navigateEvent.previousRecordIndex || 0);
            }
            sel.setRangeEnd(navigateEvent.recordIndex);
            sel.addRange();
            selectionChanged = true;
          }
        }
        // Navigate event in a normal cell
        else {
          if (me.cellSelect) {
            // Ensure selection object is of the correct type
            if (!sel || !sel.isCells || sel.view !== view) {
              me.resetSelection(true);
              sel = me.selected = new Ext.grid.selection.Cells(view);
            }
            // First shift
            if (!sel.getRangeSize()) {
              sel.setRangeStart(navigateEvent.previousPosition || me.getCellContext(0, 0));
            }
            sel.setRangeEnd(pos);
            selectionChanged = true;
          } else if (me.columnSelect) {
            // Ensure selection object is of the correct type
            if (!sel || !sel.isColumns || sel.view !== view) {
              me.resetSelection(true);
              sel = me.selected = new Ext.grid.selection.Columns(view);
            }
            if (!sel.getCount()) {
              sel.setRangeStart(pos.column);
            }
            sel.setRangeEnd(navigateEvent.position.column);
            selectionChanged = true;
          }
        }
      } else {
        // If the event is in one of the row selecting cells, or we have enabled row selection but not column selection
        // so prioritize selecting rows
        if (pos.column === me.numbererColumn || pos.column === me.checkColumn || (me.rowSelect && !me.cellSelect)) {
          // Ensure selection object is of the correct type
          if (!sel || !sel.isRows || sel.view !== view) {
            me.resetSelection(true);
            sel = me.selected = new Ext.grid.selection.Rows(view);
          }
          if (ctrlKey || pos.column === me.checkColumn) {
            if (sel.contains(record)) {
              sel.remove(record);
            } else {
              sel.add(record);
            }
          } else {
            sel.clear();
            sel.add(record);
          }
          selectionChanged = true;
        }
        // Navigate event in a normal cell
        else {
          // Prioritize cell selection over column selection
          if (me.cellSelect) {
            // Ensure selection object is of the correct type
            if (!sel || !sel.isCells || sel.view !== view) {
              me.resetSelection(true);
              me.selected = sel = new Ext.grid.selection.Cells(view);
            } else {
              sel.clear();
            }
            sel.setRangeStart(pos);
            selectionChanged = true;
          } else if (me.columnSelect) {
            // Ensure selection object is of the correct type
            if (!sel || !sel.isColumns || sel.view !== view) {
              me.resetSelection(true);
              me.selected = sel = new Ext.grid.selection.Columns(view);
            }
            if (ctrlKey) {
              if (sel.contains(pos.column)) {
                sel.remove(pos.column);
              } else {
                sel.add(pos.column);
              }
            } else {
              sel.setRangeStart(pos.column);
            }
            selectionChanged = true;
          }
        }
      }
      // If our configuration allowed selection changes, update check header and fire event
      if (selectionChanged) {
        if (sel.isRows) {
          me.updateHeaderState();
        }
        me.fireSelectionChange();
      }
    },
    // handleMouseDown: function (view, td, cellIndex, record, tr, rowIdx, e) {
    //   var me = this,
    //     sel = me.selected,
    //     header = e.position.column,
    //     isCheckClick,
    //     startDragSelect;
    //   // debugger;
    //   // Ignore right click, shift and alt modifiers.
    //   // Also ignore touchstart because e cannot drag select using touches and
    //   // ignore when actionableMode is true so we can select the text inside an editor
    //   if (
    //     e.button ||
    //     e.shiftKey ||
    //     e.altKey ||
    //     e.pointerType === "touch" ||
    //     view.actionableMode ||
    //     (header === me.numbererColumn && e.ctrlKey) //! 추가된 줄
    //   ) {
    //     return;
    //   }

    //   if (header) {
    //     me.mousedownPosition = e.position.clone();

    //     isCheckClick = header === me.checkColumn;

    //     if (isCheckClick) {
    //       me.checkCellClicked = e.position.getCell(true);
    //     }

    //     // Differentiate between row and cell selections.
    //     if (header === me.numbererColumn || isCheckClick || !me.cellSelect) {
    //       // Enforce rowSelect setting
    //       if (me.rowSelect) {
    //         if (sel && sel.isRows) {
    //           if (!e.ctrlKey && !isCheckClick) {
    //             sel.clear();
    //           }
    //         } else {
    //           if (sel) {
    //             sel.clear();
    //           }
    //           sel = me.selected = new Ext.grid.selection.Rows(view);
    //         }
    //         startDragSelect = true;
    //       } else if (me.columnSelect) {
    //         if (sel && sel.isColumns) {
    //           if (!e.ctrlKey && !isCheckClick) {
    //             sel.clear();
    //           }
    //         } else {
    //           if (sel) {
    //             sel.clear();
    //           }
    //           sel = me.selected = new Ext.grid.selection.Columns(view);
    //         }
    //         startDragSelect = true;
    //       } else {
    //         return false;
    //       }
    //     } else {
    //       if (sel) {
    //         sel.clear();
    //       }
    //       if (!sel || !sel.isCells) {
    //         sel = me.selected = new Ext.grid.selection.Cells(view);
    //       }
    //       startDragSelect = true;
    //     }

    //     me.lastOverRecord = me.lastOverColumn = null;

    //     // Add the listener after the view has potentially been corrected
    //     Ext.getBody().on("mouseup", me.onMouseUp, me, { single: true, view: sel.view });

    //     // Only begin the drag process if configured to select what they asked for
    //     if (startDragSelect) {
    //       sel.view.el.on("mousemove", me.onMouseMove, me, { view: sel.view });
    //     }
    //   }
    // },
  },
});

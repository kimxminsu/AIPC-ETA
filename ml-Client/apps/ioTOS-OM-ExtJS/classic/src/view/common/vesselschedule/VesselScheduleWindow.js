Ext.define('IoTosOmExt.view.common.vesselschedule.VesselScheduleWindow', {
   extend : 'Ext.window.Window',
   alias : 'widget.app-vesselschedulewin',

   width: 1150,
   height : 150,

   initComponent : function() {
      var me = this;
      Ext.apply(me, {
         items : [{
            xtype: 'app-vesselselectioncomponent',
            reference:'ctlVesselSelectionWin',
            parentView : this,
            flex : 1,
            vesselScheduleType: CodeConstantsOM.vesselScheduleType.ALL,
            vesselDepartureType: CodeConstantsOM.vesselDepartureType.ALL
         }]
      });
      me.callParent();
   },

   tools : [{
      xtype : 'button',
      text : 'Apply',
      listeners : {
         click : 'onVesslScheduleApply'
      }
   }]
});
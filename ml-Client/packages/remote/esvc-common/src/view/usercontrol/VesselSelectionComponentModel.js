Ext.define('ESVC.view.usercontrol.VesselSelectionModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.vesselselectioncomponent',
   	
	requires: [
		'Ext.data.proxy.Rest'
	],
	stores : {
		vesselSelectionList: {
			model: 'ESVC.model.common.VesselScheduleItem',
			storeId: 'vesselSelectionListStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: ESVC.config.Locale.getRestApiDestUrl() + '/dm/vesselschedule'
			}
        },
        
		vesselStatusCombo : {},
        callSeqCombo : {}
	}
});
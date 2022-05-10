Ext.define('ESVC.view.usercontrol.VesselSelectModel', {
    extend: 'ESVC.view.foundation.BaseViewModel',
	alias: 'viewmodel.vesselselect',
    requires:[
        'Ext.data.proxy.Rest'
    ],
    
    stores : {
		vesselSelectList: {
			model: 'ESVC.model.common.VesselScheduleItem',
			storeId: 'vesselSelectListStore',
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
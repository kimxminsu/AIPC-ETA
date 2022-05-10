Ext.define('IoTosOmExt.view.export.coprarlist.ExportCoprarListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.exportcoprarlist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.export.coprarlist.ExportCoprarList'
   ],
	
	stores:{
		exportCoprarListStore:{
			model: 'IoTosOmExt.model.export.coprarlist.ExportCoprarList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarlist/exportcoprarlist',
			}
      },
      feCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      billingOprCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      oprCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      billingOprCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      porCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      vvdPortCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      polCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      podCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      fPodCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      fDestCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      transTypeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      cargoTypeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      deliveryCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      handleInstrCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      absoluteConstStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      cntrHeightWidthStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      cntrLengthStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      cntrTypeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      weightGroupCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      sztpCodeStore : {
         model : 'IoTosOmExt.model.export.bookinglist.BookingList',
         proxy : {
				type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/bookinglist/sztpCodes',
         }
      },
      hazardDetailInfoStore : {
         model : 'IoTosOmExt.model.common.hazardousinformation.HazardousInformation',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/hazardousInformationList/imdgDataList',
         }
      },
      marinePollutantStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      hazardInfoStore : {
         model : 'IoTosOmExt.model.common.hazardousinformation.HazardousInformation',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/hazardousInformationList/hazardousInformationList',
         }
      },    
      hazardousPackingGroupStore : {
			storeId : 'hazardousPackingGroupStore',
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
			listeners : {
				beforeload : 'onPackingGroupStoreLoad'
			}
		},
   }
});
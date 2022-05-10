Ext.define('IoTosOmExt.view.import.throughcontainerlist.ThroughContainerListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.throughcontainerlist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.import.throughcontainerlist.ThroughContainerList'
   ],
	
	stores:{
		throughContainerListStore:{
			model: 'IoTosOmExt.model.import.throughcontainerlist.ThroughContainerList',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/throughcontainerlist/throughcontainerlist',
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
      hazardDetailInfoStore : {
         model : 'IoTosOmExt.model.common.hazardousinformation.HazardousInformation',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/hazardousInformationList/imdgDataList',
         }
      },
		feCodeStore  : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
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
      porCodeStore  : {
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
      podCodeStore : {
         model : 'Iotos.model.Code',
      },
      vvdPortCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      fPodCodeStore : {
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
      cargoTypeStore : {
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
         },
         filters: [{
            property: 'code',
            value: 'T'
        }]
      },
      shiftingTimeStore  : {
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
      cntrHeightWidthStore : {
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
	}
});
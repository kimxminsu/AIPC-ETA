Ext.define('IoTosOmExt.view.import.stowagebayplanlist.StowageBayPlanListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.stowagebayplanlist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan'
   ],

   formulas : {
		setDisabledMode : {
			bind : '{theSearch.checkOption}',
			get : function(value) {
				if(value && value.checkOption == CodeConstantsOM.commonCode.INVENTORY) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledOprFeCheck : {
			bind : '{theSearch.checkOption}',
			get : function(value) {
				if(value && value.checkOption == CodeConstantsOM.commonCode.EXPORT_RESERVED) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledNoMessageCheck : {
			bind : '{theSearch.checkOption}',
			get : function(value) {
				if(value && value.checkOption == CodeConstantsOM.commonCode.INVENTORY) {
					return true;
				}else {
					return false;
				}
			}
      },
      setDisabledShiftingContainerFieldSet : {
         bind : '{theDetail.delv}',
         get : function(value) {
            if(value == CodeConstantsOM.delivery.SHIFTING) {
               return false;
            }else {
               return true;
            }
         }
      },
      setDisabledTransshipmentContainerFieldSet : {
         bind : '{theDetail.delv}',
         get : function(value) {
            if(value == CodeConstantsOM.delivery.HOTCONNECTION
               || value == CodeConstantsOM.delivery.TRANSSHIPMENT
               || value == CodeConstantsOM.delivery.RE_EXPORT
            ) {
               return false;
            }else {
               return true;
            }
         }
      }
	},
	
	stores:{
		stowageBayPlanListStore:{
			model: 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/stowagebayplanlist/stowagebayplanlist',
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
      inventoryStore : {
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/stowagebayplanlist/getinventory',
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
      polCodeStore  : {
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
      storageStore  : {
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
      shipperConsineeCodeStore  : {
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
      damageConditionStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },     
      shiftingTimeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      shiftingRsnStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      },
      shiftingTypeStore : {
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
      weightGroupCodeStore : {
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
      cntrStateStore : {
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
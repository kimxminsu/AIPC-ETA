Ext.define('IoTosOmExt.view.code.containertypesize.ContainerTypeSizeModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.containertypesize',
	
	requires:[
		'Ext.data.proxy.Rest',
      'IoTosOmExt.model.code.containertypesize.ContainerTypeSize',
      'Iotos.model.Code'
   ],
   
   formulas : {
      setDisableOperatorCodeCmb : {
         bind : '{theSearch.isoType}',
         get : function(value) {
            if(value && value.isoType == CodeConstantsOM.commonCode.Operator) {
               return false;
            }else {
               return true;
            }
         }
      }
   },
	
	stores:{
		containerTypeSizeStore : {
			model : 'IoTosOmExt.model.code.containertypesize.ContainerTypeSize',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/containertypesize/containertypesizecode'
			}
		},
		operatorCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
      },
      containerTypeStore : {
         model : 'IoTosOmExt.model.code.containertypesize.ContainerType',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/containertypesize/containertypecode'
         },
      },
      containerSizeStore : {
         model : 'IoTosOmExt.model.code.containertypesize.ContainerSize',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/containertypesize/containersizecode'
         },
      },
	}
});
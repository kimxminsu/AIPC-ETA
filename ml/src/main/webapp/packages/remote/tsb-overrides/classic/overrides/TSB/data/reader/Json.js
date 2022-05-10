Ext.define('TSB.data.reader.Json', {
	override: 'Ext.data.reader.Json',
	
	config: {
		rootProperty : 'response.data',
		totalProperty:'response.limit'
	},
	
    constructor: function(config) {
		var me = this;
//		me.setTransform(function(data){
//			if (!data.response) return data;
//			var me = this;
//			var jsonData = data;
//			var vModel = this.getModel();
//			var d = new Date(),
//				n = d.getTimezoneOffset() * 60 * 1000;
				
			//console.debug('Origin data to return : ', data);
				
//			Ext.Array.each(vModel.getFields(), function(f) {
//				if(f.type === 'date') {
//				//if(f.type != null) {
//					//console.log(f);
//					//manufacturing & processing data
//					Ext.Array.each(jsonData.response.data, function(r) {
//						if (r) {
//							if (r[f.name]) {
//								//console.log(r[f.name]);
//								r[f.name] = r[f.name] + n;
//							}
//						}
//					});
//				} else 
//				if (f.type == 'boolean' || f.type == 'bool') {	// added by Alex.Min(2015.04.29)
//					Ext.Array.each(jsonData.response.data, function(r) {
//						if (r) {
//							if (r[f.name] != undefined) {
//								if (r[f.name] == 'Y') {
//									r[f.name] = true;
//								} else {
//									r[f.name] = false;
//								}
//							}
//						}
//					});
//				}
//			});
			
//			return data;	
//		});
		
//		me.initConfig(config);
		me.callParent(arguments);        
    }	
});


//					transform: {
//				    	fn: function(data){
//						if (data.request && data.status && data.status === 200) return data;
//						me = this;
//						jsonData = data;
//						vModel = this.getModel();
//						var d = new Date(),
//							n = d.getTimezoneOffset() * 60 * 1000;
//							
//						console.debug('Origin data to return : ', data);
//							
//						Ext.Array.each(vModel.getFields(), function(f) {
//							if(f.type === 'date') {
//							//if(f.type != null) {
//								console.log(f);
//								//manufacturing & processing data
//								Ext.Array.each(jsonData.response.data, function(r) {
//									if (r[f.name]) {
//										console.log(r[f.name]);
//										r[f.name] = r[f.name] - n;
//									}
//								});
//							}
//						});
//							
//							return data;	
//						}
//					}
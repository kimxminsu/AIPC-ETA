
Ext.define('ESVC.util.ProjectUtil', {
	singleton: true,
	alternateClassName: 'ProjectUtil',	

	 
	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	

	getPackagePath : function(id){
		 var systemCode = (CONSTANTS.SYSTEM_CODE+'').toUpperCase();
		 var mouduleCode = (CONSTANTS.MODULE+'').toUpperCase();
		 var path = "";
		 console.log("CONSTANTS.SYSTEM_CODE: " + systemCode);
		 console.log("CONSTANTS.MODULE: " + mouduleCode);
		 
		if(id == null || id === '')
			id='*';
		 if(mouduleCode === 'STAT'){
			if(systemCode == 'GWCT'){
				path = 'esvc-gwct';
			}else if(systemCode == 'CWT'){
				path = 'esvc-cwt';
			}else if(systemCode == 'DNP'){
				path = 'esvc-dnp';
			}else if(systemCode == 'TCT'){
				path = 'esvc-tct';
			}else if(systemCode == 'PCTC'){
				path = 'esvc-pctc';
			}else if(systemCode == 'GCT'){
				path = 'esvc-gct';
			}
			
		 }
		 else if(mouduleCode === 'WEBIP'){
			 if(systemCode == 'KMCT'){
					path = 'esvc-kmct';
			 } 
		 }
		 if(mouduleCode === 'CUSTOMS'){
			if(systemCode == 'GWCT'){
				path = 'esvc-gwct';
			}else if(systemCode == 'CWT'){
				path = 'esvc-cwt';
			}else if(systemCode == 'DNP'){
				path = 'esvc-dnp';
			}else if(systemCode == 'TCT'){
				path = 'esvc-tct';
			}else if(systemCode == 'PCTC'){
				path = 'esvc-pctc';
			}else if(systemCode == 'GCT'){
				path = 'esvc-gct';
			}
			
		  }
		
		 return path;
	},

	getPgmCode : function() {
		var mouduleCode = (CONSTANTS.MODULE+'').toUpperCase();
		var pgmCode = "EV";
		
		if(mouduleCode === 'EDI'){
			pgmCode = "ED";
		}else if(mouduleCode === 'CUSTOMS'){
			pgmCode = "CM";
		}else if(mouduleCode === 'STAT'){
			pgmCode = "ST";
		}
		
		
		return pgmCode;
	}
	 
});
Ext.define('IoTosOmExt.model.export.loadinglist.LoadingList', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
	fields: [{
		name:'baySeq'
	},{
		name:'cntrStateDesc'
	},{
		name:'returnCancelCode'
	},{
		name:'rowLock'
	},{
		name:'isDomesticChk'
	},{
		name:'isTholdChk',
		convert : function(value) {
			if(value == 'Y' || value == true) {
				return true;
			}else {
				return false;
			}
		}
	},{
		name:'isToppingCheck'
	},{
		name:'msgType'
	},{
		name:'movementType'
	},{
		name:'dockReceipt'
	},{
		name:'isDockReceiptCheck',
		convert : function(value) {
			if(value == 'Y' || value == true) {
				return true;
			}else {
				return false;
			}
		}
	},{
		name:'prevCntrState'
	},{
		name:'isRequiredVgmCheck',
		convert : function(value) {
			if(value == 'Y' || value == true) {
				return true;
			}else {
				return false;
			}
		}
	},{
		name:'displaySetTempF'
	},{
		name:'atcOfVesselSchedule'
	},{
		name:'applyCheck'
	}]
});
Ext.define('IoTosOmExt.model.export.coprarloadinglistreconcile.SearchCoprarLoadingListReconcile', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name:'vslCd',
	},{
		name:'callYear',
	},{
		name:'callSeq',
	},{
		name:'userVoy',
	},{
		name:'bay',
	},{
		name:'row',
	},{
		name:'tier',
	},{
		name:'jobType',
	},{
		name:'jobTypes',
	},{
		name:'compareMode',
	},{
		name:'directFillMode',
	},{
		name:'rowShowHideMode',
	},{
		name:'movinsLockYN',
	},{
		name : 'retrieveFromOthersMode'
	},{
		name : 'retrieveFromOthersOpr',
		convert : function(value) {
			if(value == null || value == '') {
				return false;
			}
		}
	},{
		name : 'retrieveFromOthersFe',
		convert : function(value) {
			if(value == null || value == '') {
				return false;
			}
		}
	}]
});
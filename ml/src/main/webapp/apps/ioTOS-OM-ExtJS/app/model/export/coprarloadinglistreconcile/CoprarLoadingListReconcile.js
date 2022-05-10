Ext.define('IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name:'coprarItem',
		mapping:'exportCoprarList'
	},{
		name:'loadingItem',
		mapping:'loadingList'
	},{
		name:'applyCheck'
	},{
		name:'vslCd'
	},{
		name:'callYear'
	},{
		name:'callSeq'
	},{
		name:'userVoy'
	},{
		name:'status'
	},{
		name:'loadingConfirm'
	},{
		name:'matched'
	},{
		name:'compareMode'
	},{
		name:'sortNo'
	},{
		name:'staffCd'
	},{
		name:'rowLock'
	},{
		name:'importStatus'
	},{
		name:'weightTolerance'
	},{
		name:'holding'
	},{
		name:'coprarItemTableName'
	},{
		name : 'isRequiredVgmCheck',
		convert : function(value) {
			if(value == 'Y' || value == true) {
				return true;
			}else {
				return false;
			}
		}
	}],
	

	associations : [{
		type : 'hasMany',
		name : 'exportCoprarList',
		model : 'IoTosOmExt.model.export.coprarlist.ExportCoprarList'
	},{
		type : 'hasMany',
		name : 'loadingList',
		model : 'IoTosOmExt.model.export.loadinglist.LoadingList'
	}]
});
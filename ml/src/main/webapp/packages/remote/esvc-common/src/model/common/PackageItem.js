Ext.define('ESVC.model.common.PackageItem', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',

	fields: [{
	    name: 'bIncludedPackages',
	    type: 'bool',
	    convert: function(v) {
	        return(v === "true" || v === true) ? true : false;
	    }
	}, {
		name: 'sIncludedPackages',
		type: 'string'
	}, {
		name: 'itemId',
		type: 'string'
	}, {
		name: 'itemType',
		type: 'string'
	}, {
		name: 'itemDesc',
		type: 'string'
	}, {
	    name: 'itemCate',
	    type: 'string'
	}, {
		name: 'templateId',
		type: 'string'
	}, {
		name: 'templateDesc',
		type: 'string'
	}, {
		name: 'templateJson',
		type: 'string'
	}, {
		name: 'shareScope',
		type: 'string'
	}, {
		name: 'packageId',
		type: 'string'
	}, {
		name: 'packageDesc',
		type: 'string'
	}, {
	    name: 'fileName',
	    type: 'string'
	}, {
	    name: 'content',
	    type: 'string'
	}, {
	    name: 'reportFilePath',
	    type: 'string'
	}, {
	    name: 'reportTitle',
	    type: 'string'
	}, {
		name: 'listType',
		type: 'string'
	}, {
		name: 'summaryType',
	    type: 'string'
	}, {
		name: 'printPaperSize',
		type: 'string'
	}]
});
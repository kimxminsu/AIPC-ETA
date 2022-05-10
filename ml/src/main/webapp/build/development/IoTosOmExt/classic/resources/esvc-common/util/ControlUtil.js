/**
 * Control Utility
 */
var ControlUtil = function(){}

// Check if the value exists in the combo box
ControlUtil.validationQueryMatch=function(combo, displayFieldName){
	if(!StringUtil.isNullorEmpty(combo.rawValue)){
		var index = combo.getStore().findBy(function(record, id){
						if(record.get(displayFieldName) === combo.rawValue){
							return true;
						}
					});
		
		if(index < 0){
			combo.setValue(null);
		}
	}
}
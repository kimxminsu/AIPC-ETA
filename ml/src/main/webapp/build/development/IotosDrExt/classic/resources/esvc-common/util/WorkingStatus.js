/**
 * WorkingStatus
 */
var WorkingStatus = function(){}

WorkingStatus.FIELD_NAME = "workingStatus";
WorkingStatus.SELECT = "R";
WorkingStatus.INSERT = "C";
WorkingStatus.UPDATE = "U";
WorkingStatus.DELETE = "D";

WorkingStatus.convertInt = function(crudState){
	switch(crudState){
		case WorkingStatus.SELECT: 
			return 1;
			break;
		case WorkingStatus.INSERT: 
			return 2;
			break;
		case WorkingStatus.UPDATE: 
			return 3;
			break;
		case WorkingStatus.DELETE:
			return 4;
			break;
		default: return 0;
	}
}
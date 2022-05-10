/**
 * Date Utility
 */
var DateUtil = function(){}

DateUtil.START_TIME = 'STARTTIME';
DateUtil.END_TIME = 'ENDTIME';

// Check DateTime
DateUtil.checkDateTime=function(me, dateControlName, isMandatory){
	return DateUtil.checkDateFormat(me, dateControlName, isMandatory, true);
}

// Check Date
DateUtil.checkDate=function(me, dateControlName, isMandatory){
	return DateUtil.checkDateFormat(me, dateControlName, isMandatory, false);
}

// Check Date Format
DateUtil.checkDateFormat=function(me, dateControlName, isMandatory, isDateTime){
	var dateControl = me.lookupReference(dateControlName);
	
	var dateValue = dateControl.getValue();
	
	// Mandatory Check
	if(isMandatory){
		if(dateValue == null || dateValue == ""){
			dateControl.focus();
			MessageUtil.warning('Warning', 'period_mandatory_msg');
			return null;
		}
	} else {
		if(dateValue == null || dateValue == ""){
			return {
				dateString : "",
				dateValue : null
			}
		}
	}
	
	var dateString;
	
	if(isDateTime){
		dateString = dateValue==null?null:Ext.Date.format(dateValue, ESVC.config.Locale.getDefaultDateFormatWithNoSeconds());
	} else {
		dateString = dateValue==null?null:Ext.Date.format(dateValue, ESVC.config.Locale.getShortDate());
	}
	
	return {
		dateString : dateString,
		dateValue : dateValue
	}
}

// From Date, Determines whether or not To Date is Mandatory, and returns the Date value.
DateUtil.checkFromToDateTime=function(me, fromDateControlName, toDateControlName, isMandatory){
	return DateUtil.checkFromToDateFormat(me, fromDateControlName, toDateControlName, isMandatory, true);
}

// Check From To Date
DateUtil.checkFromToDate=function(me, fromDateControlName, toDateControlName, isMandatory){
	return DateUtil.checkFromToDateFormat(me, fromDateControlName, toDateControlName, isMandatory, false);
}

// Check From To Date Format
DateUtil.checkFromToDateFormat=function(me, fromDateControlName, toDateControlName, isMandatory, isDateTime){
	var arrFromDt = null;
	
	if(isDateTime){
		arrFromDt = DateUtil.checkDateTime(me, fromDateControlName, isMandatory);
	} else{
		arrFromDt = DateUtil.checkDate(me, fromDateControlName, isMandatory);
	}
	
	if (arrFromDt == null) return null;
	
	var arrToDt = null;
	
	if(isDateTime){
		arrToDt = DateUtil.checkDateTime(me, toDateControlName, isMandatory);
	} else{
		arrToDt = DateUtil.checkDate(me, toDateControlName, isMandatory);
	}
	
	if (arrToDt == null) return null;
	
	if( (arrFromDt.dateValue != null && arrToDt.dateValue != null) && 
		(arrFromDt.dateValue > arrToDt.dateValue)){
		var fromDateControl = me.lookupReference(fromDateControlName);
		MessageUtil.warning('Warning', 'validPeriod_msg');
		fromDateControl.focus();
		return null;
	}
	
	var isEmpty = false;
	
	if(StringUtil.isNullorEmpty(arrFromDt.dateString) ||
	   StringUtil.isNullorEmpty(arrToDt.dateString)){
		isEmpty = true;
	}
	
	return {
		fromDtString : arrFromDt.dateString,
		toDtString : arrToDt.dateString,
		fromDt : arrFromDt.dateValue,
		toDt : arrToDt.dateValue,
		isEmpty : isEmpty
	}
}

// From To Date Check
DateUtil.validateFromToDate=function(fromDate, toDate){
	if(fromDate == null || toDate == null) return false;
	
	if(fromDate > toDate){
		MessageUtil.warning('Warning', 'validPeriod_msg');
		return false;
	} else {
		return true;
	}
},

// Mandatory and Set Period
DateUtil.checkPeriodDateTime=function(me, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory){
	return DateUtil.checkPeriodDateFormat(me, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory, true);
}

// Check Period Date
DateUtil.checkPeriodDate=function(me, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory){
	return DateUtil.checkPeriodDateFormat(me, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory, false);
}

// Check Period DateFormat
DateUtil.checkPeriodDateFormat=function(me, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory, isDateTime){
	var arrFromToDate = null;
	
	if(isDateTime){
		arrFromToDate = DateUtil.checkFromToDateTime(me, fromDateControlName, toDateControlName, isMandatory);
	} else {
		arrFromToDate = DateUtil.checkFromToDate(me, fromDateControlName, toDateControlName, isMandatory);
	}
	
	if(arrFromToDate == null) return null;
	
	var periodDay = Ext.Date.diff(arrFromToDate.fromDt, arrFromToDate.toDt, Ext.Date.DAY);
	
	if(periodDay > maxDatePeriod){
		var fromDateControl = me.lookupReference(fromDateControlName);
		MessageUtil.warning('Warning','validMaxPeriod_msg', maxDatePeriod);
		fromDateControl.focus();
		return null;
	}
	
	return arrFromToDate;
}

// Validate Period Date
DateUtil.validatePeriodDate=function(fromDate, toDate, maxDatePeriod){
	var validateFromToDate = DateUtil.validateFromToDate(fromDate, toDate);
	
	if(!validateFromToDate) return false;
	
	var periodDay = Ext.Date.diff(fromDate, toDate, Ext.Date.DAY);
	
	if(periodDay > maxDatePeriod){
		MessageUtil.warning('Warning','validMaxPeriod_msg', maxDatePeriod);
		return false;
	}
	
	return true;
}

//Set Date format in days for DataItem start time
DateUtil.setDateInDaysForDataItemStartTime = function(dataItem, fieldName, days){
	DateUtil.setDateInDaysFormatForDataItem(dataItem, fieldName, days, DateUtil.START_TIME);
}

//Set Date format in days for DataItem end time
DateUtil.setDateInDaysForDataItemEndTime = function(dataItem, fieldName, days){
	DateUtil.setDateInDaysFormatForDataItem(dataItem, fieldName, days, DateUtil.END_TIME);
}

//Set Date format in days for DataItem
DateUtil.setDateInDaysForDataItem = function(dataItem, fieldName, days){
	DateUtil.setDateInDaysFormatForDataItem(dataItem, fieldName, days);
}

//set date in days start time
DateUtil.setDateInDaysStartTime = function(me, dateControlName, days){
	DateUtil.setDateInDaysFormat(me, dateControlName, days, DateUtil.START_TIME);
}

// set date in days end time
DateUtil.setDateInDaysEndTime = function(me, dateControlName, days){
	DateUtil.setDateInDaysFormat(me, dateControlName, days, DateUtil.END_TIME);
}


// set date in days
DateUtil.setDateInDays = function(me, dateControlName, days){
	DateUtil.setDateInDaysFormat(me, dateControlName, days);
}


// set date in days format
DateUtil.setDateInDaysFormat = function(me, dateControlName, days, startEndString){
	var dateValue = DateUtil.getDateInDaysFormatForDateValue(days, startEndString);
	var dateControl = me.lookupReference(dateControlName);
	dateControl.setValue(dateValue);
}

//Set Date format in days for DataItem
DateUtil.setDateInDaysFormatForDataItem = function(dataItem, fieldName, days, startEndString){
	var dateValue = DateUtil.getDateInDaysFormatForDateValue(days, startEndString);
	dataItem.set(fieldName, dateValue);
}

// Get Date format in days for date value
DateUtil.getDateInDaysFormatForDateValue = function(days, startEndString){
	var currentDate = new Date();
	
	if(days == undefined){
		days = 0;
	}

	var dateValue = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+days);
	
	if(startEndString){
		if(startEndString === DateUtil.START_TIME){
			dateValue.setHours(0);
			dateValue.setMinutes(0);
		} else if(startEndString === DateUtil.END_TIME){
			dateValue.setHours(23);
			dateValue.setMinutes(59);
		}
	}
	
	return dateValue;
}

// set date in days by date
DateUtil.setDateInDaysByDate = function(me, dateControlName, days, standardDate){
	if(standardDate == null){
		return;
	}
	
	var dateControl = me.lookupReference(dateControlName);
	
	if(days == undefined){
		days = 0;
	}
	
	var dateValue = new Date(standardDate.getFullYear(), standardDate.getMonth(), standardDate.getDate()+days);

	dateControl.setValue(dateValue);
}

// 'yyyyMMddHHmmss' Format Convert String to Date
DateUtil.convertDate = function(value){
	if(value != '' || value != null){
		var year = value.substring(0,4);
		var month = value.substring(4,6);
		var day = value.substring(6,8);
		var hour = value.substring(8,10);
		var minute = value.substring(10, 12);
		 
		return new Date(year, month-1, day, hour, minute);
	} else {
		return null;
	}
}

// DateField, TimeField Converting control values ​​to Date
DateUtil.changeDateToControl = function(me, dateFieldName, timeFieldName){
	var dateField = me.lookupReference(dateFieldName);
	var timeField = me.lookupReference(timeFieldName);
	var dateString = Ext.Date.format(new Date(dateField.getValue()), 'Ymd');
	var timeString = Ext.Date.format(new Date(timeField.getValue()), 'Hi');

	return DateUtil.convertDate(dateString + timeString);
}

// Return the time format as a string value
DateUtil.timeFormat = function(val){
	if (val != '' && val.length == 4) {
        return val.substr(0, 2) + ':' + val.substr(2, 2);
    } else {
    	return val;
    }
}

// Covert date to long
DateUtil.convertDateToLong = function(targetObj, values){
	if(Ext.isArray(values)){
		values.forEach(function(value, index){
			DateUtil.convertTargetValue(targetObj, value);
		});
	} else {
		DateUtil.convertTargetValue(targetObj, values);
	}
	
	return targetObj;
}

// Convert target value
DateUtil.convertTargetValue = function(targetObj, value){
	var fieldValue = targetObj[value];
	if(fieldValue != null){
		targetObj[value] = new Date(fieldValue);
	}
	
	return targetObj;
}

DateUtil.addSeconds = function(date, secs){
	if(date == null){
		return null;
	}
	var newDate = new Date(date);
	
	var mSecs = secs * 1000;
	var sum = mSecs + newDate.getTime();
	
	return new Date(sum);
}

//'dd/MM/yyyy/ HH:mm:ss' Format Convert String to Date
DateUtil.tctConvertDate = function(value){
	if(value != '' && value != null && value != undefined){
		if(typeof(value.substring) != 'undefined'){
			if(value.substring(2,3) == '/' || value.substring(2,3) == '-'){			
				var year = value.substring(6,10);
				var month = value.substring(3,5);
				var day = value.substring(0,2);
				var hour = value.substring(11,13);
				var minute = value.substring(14, 16);
				var second = value.substring(17, 19);
				return new Date(year, month-1, day, hour, minute, second);
			}else{
				return value;
			}
		}else{
			return value;
		}
		 
	} else {
		return null;
	}
}

/**
 * String Utility
 */
var StringUtil = function(){}

// Check Null or Empty
StringUtil.isNullorEmpty = function(value){
	if(value == undefined ||
	   value == null ||
	   (typeof value === 'string' && value.trim() === '')){
		return true;
	}
	
	return false;
}

// Check Null or Emtpy, Equal String
StringUtil.equalString = function(value, equalString){
	if(!StringUtil.isNullorEmpty(value) &&
	   value === equalString){
		return true;
	}
	
	return false;
}

//Check Null or Emtpy, Equal String
StringUtil.notEqualString = function(value, equalString){
	if(!StringUtil.isNullorEmpty(value) &&
	   value !== equalString){
		return true;
	}
	
	return false;
}

// trim
StringUtil.trim = function(value){
	if(value == undefined ||
	   value == null){
		return '';
	} else {
		return value.trim();
	}
}

// First UpperCase
StringUtil.firstUpperCase = function(value){
	if(value == undefined ||
	   value == null){
		return '';
	} else {
		return value.substring(0,1).toUpperCase() + value.substring(1);
	}
}

//UpperCase
StringUtil.toUpperCase = function(value) {
	if(value == undefined || value == null) {
		return '';
	}
	else {
		return value.toUpperCase();
	}
}

// LowerCase
StringUtil.toLowerCase = function(value) {
	if(value == undefined || value == null) {
		return '';
	}
	else {
		return value.toLowerCase();
	}
}

StringUtil.numberPad = function(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

StringUtil.combineWithSeparator = function(separator, ...args)
{
	var str = '';
	for (var i = 0; i < args.length; i++)
	{
		if (i != 0)
		str += separator;

		str += args[i];

	}
	return str;
}

/**
 * 'AAA,BBB,CCC,DDD' 포맷으로 들어오는 문자열을 SQL의 IN 문에서 사용할 수 있도록 변환
 * 
 * @param {string} value 변환할 문자열
 * @param {boolean} returnArray true일 경우 배열을 반환한다.
 * @returns {string[]} returnArray == true  --> ['AAA', 'BBB', 'CCC', 'DDD'] 형태의 문자열 배열
 * 										 returnArray == false --> "('AAA','BBB','CCC','DDD')" 형태의 문자열
 */
StringUtil.makeInValue = function(value, returnArray)
{
	if (StringUtil.isNullorEmpty(value) || StringUtil.equalString(value, CommonConstants.ASTERISK))
	{
		return null;
	}

	var values = value.split(',');

	if(returnArray){
		var sql = values;
	}
	else{
		var sql = '';
		sql = sql + '(';
		for (var i = 0; i < values.length; i++)
		{
			if (i > 0)
			{
				sql = sql + ',';
			}
	
			sql = sql + '\'';
			sql = sql + values[i].trim();
			sql = sql + '\'';
	
		}
		sql = sql + ')';	
	}

	return sql;
}

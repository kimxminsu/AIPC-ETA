/**
 * Temp Convert
 */
var TempConvert = function(){}

// fahrenheit -> Centigrade
TempConvert.convertToCentigrade=function(fahrenheitTemp, precision){
	fahrenheitTemp = (fahrenheitTemp - 32) / 1.8;
	
	if(precision){
		return Ext.Number.roundToPrecision(fahrenheitTemp, precision);
	} else {
		return Ext.Number.roundToPrecision(fahrenheitTemp, 0);		
	}
}

// Centigrade -> fahrenheit
TempConvert.convertToFahrenheit=function(centigradeTemp, precision){
	centigradeTemp = (centigradeTemp * 1.8) + 32;
	
	if(precision){
		return Ext.Number.roundToPrecision(centigradeTemp, precision);
	} else {
		return Ext.Number.roundToPrecision(centigradeTemp, 0);		
	}
}

// round
TempConvert.round=function(num, position, base){
}
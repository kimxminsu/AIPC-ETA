Ext.define('ESVC.util.ColorUtil', {
	singleton: true,
    alternateClassName: 'ColorUtil',

    getCovertColorDecToRGB: function(value) {
        if (StringUtil.isNullorEmpty(value) === true || Number.isNaN(value) === true || value === '0') {
            return '';
        }
        else {
            var decValue = Number.parseInt(value);

            var r = (decValue & 0xFF);
            var g = (decValue & 0xFF00) >>> 8;
            var b = (decValue & 0xFF0000) >>> 16;
            
            return "rgb(" + [r, g, b].join(",") + ")";
        }
    },

    getCovertDecFromRGB: function(r, g, b) {
        return (b << 16) + (g << 8) + (r);
    },
    
   // Win32Color -> HEX Tonny.Kim.2020.07.06
    getWin32ColorToHexString : function(value) {
		var hexColor = "000000" + parseInt(value, 10).toString(16);
		hexColor = hexColor.substr(hexColor.length - 6);
		hexColor = hexColor.substr(4, 2) + hexColor.substr(2, 2)+ hexColor.substr(0, 2);
		return hexColor;
	},
	
	// HEX -> Win32Color Tonny.Kim.2020.07.06
	getHexStringToWin32Color : function(hexColor) {
		var win32Color = hexColor.substr(4, 2) + hexColor.substr(2, 2)+ hexColor.substr(0, 2);
		win32Color = "000000" + win32Color;
		win32Color = parseInt(win32Color, 16).toString(10);
		return win32Color; 
	}
});
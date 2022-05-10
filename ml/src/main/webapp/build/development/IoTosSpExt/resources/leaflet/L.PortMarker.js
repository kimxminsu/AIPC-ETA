L.PortMarker = L.Marker.extend({
    options: {
    	fleetCode: '', 
    	portPrvCd: '',   // Port Rotate Id
    	serviceLaneCode: '',  
    	portSeq : '',   
    	portUnloCd : '',  // Port Code
    	portName : ''   
    }, 
	
    statics: {
        TRANSFORM_ORIGIN: L.DomUtil.testProp(
            ['transformOrigin', 'WebkitTransformOrigin', 'OTransformOrigin', 'MozTransformOrigin', 'msTransformOrigin'])
    },

    _initIcon: function() {
        L.Marker.prototype._initIcon.call(this);

        this._icon.style[L.PortMarker.TRANSFORM_ORIGIN] = this._getTransformOrigin();
    },

    _getTransformOrigin: function() {
        var iconAnchor = this.options.icon.options.iconAnchor;

        if (!iconAnchor) {
            return '50% 50%';
        }

        return iconAnchor[0] + 'px ' + iconAnchor[1] + 'px';
    },

    _setPos: function (pos) {
        L.Marker.prototype._setPos.call(this, pos);

        if (L.DomUtil.TRANSFORM) {
            // use the CSS transform rule if available
            this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.heading + 'deg)';
        } else if(L.Browser.ie) {
            // fallback for IE6, IE7, IE8
            var rad = this.options.heading * (Math.PI / 180),
                costheta = Math.cos(rad),
                sintheta = Math.sin(rad);
            this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
                costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
        }
    },
    
    getFleetCode: function() {
		return this.options.fleetCode;
	},
	
	setFleetCode: function (fleetCode) {
		this.options.fleetCode = fleetCode;
	},
	
	getPortPrvCd: function() {
		return this.options.portPrvCd;
	},
	
	setPortPrvCd: function (portPrvCd) {
		this.options.portPrvCd = portPrvCd;
	},
	
	getSvcLaneCd: function() {
		return this.options.serviceLaneCode;
	},
	
	setSvcLaneCd: function (serviceLaneCode) {
		this.options.serviceLaneCode = serviceLaneCode;
	},
	
	getPortSeq: function() {
		return this.options.portSeq;
	},
	
	setPortSeq: function (portSeq) {
		this.options.portSeq = portSeq;
	},
	
	getPortUnloCd: function() {
		return this.options.portUnloCd;
	},
	
	setPortUnloCd: function (portUnloCd) {
		this.options.portUnloCd = portUnloCd;
	},
	
	getPortName: function() {
		return this.options.portName;
	},
	
	setPortName: function (portName) {
		this.options.portName = portName;
	}
});

L.portMarker = function (pos, options) {
    return new L.PortMarker(pos, options);
};

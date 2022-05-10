//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselOutHoldDraw', {
	extend: 'Ext.draw.sprite.Line',
	
	alias: 'widget.app-vesseloutholddraw',
	
	meta: {},
	x: 0,
	y: 0,
	holdNo: 0,
	
    render: function(surface, ctx) {
    	var me = this;
    	var x1;
    	
    	if(me.meta.bayDirection === 'RTL') {
    		x1 = me.x + me.meta.hatchWidth;
    	}else{
    		x1 = me.x;
    	}
    	
    	if(me.meta.viewCargoHoldLine === 'Y') {
    		ctx.beginPath();
    		ctx.strokeStyle = 'cyan';
    		ctx.lineWidth = 3;
    		ctx.moveTo(x1, me.y);
    		ctx.lineTo(x1, me.y + me.meta.hatchHeight);
    		ctx.stroke();
    		ctx.beginPath();
    	}
        
		//Hold Number
        //modify font
		ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillStyle = me.meta.generalFontColor
		hatchFontSize = me.meta.fontSizeRowTier * me.meta.baseUnit;
		ctx.fillText('HOLD ' + me.holdNo, me.x, me.y);
    }
});
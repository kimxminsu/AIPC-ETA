//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselHatchDraw', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.draw.sprite.Line',
	
	alias: 'widget.app-vesselhatchdraw',
	
	mixins : [
	          'TSB.gux.vessel.VesselRenderer'          
	],
	
	meta: {},
	x: 0,
	y: 0,
	hatchNo: 0,
	hatchQC: null,
	equX: 0,
	equY: 0,
	ioType: 0,
	
    render: function(surface, ctx) {
		var me = this;
		// console.log('hatch');
		//Draw Hatch Rect
    	ctx.clearRect( me.x,
						me.y,
						me.meta.hatchWidth,
						me.meta.hatchHeight);
    	
        ctx.strokeStyle = me.meta.hatchGuideColor;
		ctx.strokeRect( me.x,
						me.y,
						me.meta.hatchWidth,
						me.meta.hatchHeight);
                
		//Hatch Number
		//modify font
		ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillStyle = me.meta.generalFontColor
		ctx.fillText('HATCH ' + me.hatchNo, me.x + ctx.measureText('HOLD 99 ').width, me.y);
		
		//notes
		var color = '#5fa2dd'; //me.notes && me.notes != '' ? me.meta.messageColor : me.meta.messageEmptyColor;	
    }
});
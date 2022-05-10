//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.berth.BerthLegendDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-berthlegenddraw',
    
    mixins : [
	          'TSB.gux.berth.BerthRenderer'          
	],
    
	meta: {},
	x: 0,
	y: 0,
	
    render: function(surface, ctx) {
    	var me = this;

		//Draw Entire Rect
		ctx.strokeStyle = me.meta.timelineForecolor;
		ctx.lineWidth=1;
		ctx.fillStyle = me.meta.berthBackcolor;
		ctx.fillRect( me.x,
				me.y,
				me.meta.timelineWidth,
				me.meta.berthHeight);
		ctx.strokeRect( me.x,
				me.y,
				me.meta.timelineWidth,
				me.meta.berthHeight);
		
		//Legend
		var w = me.meta.timelineWidth * 7 / 10;
		var x = me.x + me.meta.timelineWidth / 2 - w / 2;
		var h = ctx.measureText('W').width * 1.5;
		var y, txt;
		
		
		//Unplanned
		txt = 'NOT CONFIRM';
		y = me.y + 3;
		ctx.fillStyle = me.meta.vesselBackcolor;
		ctx.fillRect(x,	y, w, h);
//		ctx.strokeRect(x, y, w, h);
		ctx.font = me.meta.berthNameFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = me.meta.vesselGuideColor;
		ctx.fillText(txt , x + w / 2, y + h / 2);
		
		//Planned
		txt = 'CONFIRMED';
		y += h + 3;
		ctx.fillStyle = me.meta.vesselPlannedBackcolor;
		ctx.fillRect(x,	y, w, h);
//		ctx.strokeRect(x, y, w, h);
		ctx.font = me.meta.berthNameFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = me.meta.vesselGuideColor;
		ctx.fillText(txt , x + w / 2, y + h / 2);
		
		//Berthing
		txt = 'AT BERTH';
		y += h + 3;
		ctx.fillStyle = me.meta.vesselBerthedBackcolor;
		ctx.fillRect(x,	y, w, h);
//		ctx.strokeRect(x, y, w, h);
		ctx.font = me.meta.berthNameFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = me.meta.vesselGuideColor;
		ctx.fillText(txt , x + w / 2, y + h / 2);
		
		//Departed
		txt = 'DEPARTED';
		y += h + 3;
		ctx.fillStyle = me.meta.vesselDepartedBackcolor;
		ctx.fillRect(x,	y, w, h);
//		ctx.strokeRect(x, y, w, h);
		ctx.font = me.meta.berthNameFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = me.meta.vesselGuideColor;
		ctx.fillText(txt , x + w / 2, y + h / 2);
			
    }
});
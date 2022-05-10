//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.berth.BerthTimelineDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-berthtimelinedraw',
    
    mixins : [
	          'TSB.gux.berth.BerthRenderer'          
	],
    
	meta: {},
	berths: {},
	x: 0,
	y: 0,
	
    render: function(surface, ctx) {
    	var me = this;

		//Draw Entire Rect
		ctx.strokeStyle = me.meta.timelineForecolor;
		ctx.lineWidth=1;
		ctx.fillStyle = me.meta.timelineBackcolor;
		
		//Timeline
		ctx.fillRect( me.x,
				me.y,
				me.meta.timelineWidth,
				me.meta.windowHeight);
		ctx.strokeRect( me.x,
				me.y,
				me.meta.timelineWidth,
				me.meta.windowHeight);
		
		//Hour Vertical Line
		var dayXPos = me.meta.timelineWidth - me.meta.timelineWidth / 10 * 3.5
		ctx.beginPath();
		ctx.moveTo(dayXPos, me.y);
		ctx.lineTo(dayXPos, me.meta.viewHeight);
		ctx.strokeStyle=me.meta.timelineForecolor;
		ctx.stroke();
		
		//Draw Date & Time
		var dayOffset, dayHeight, dayTextX, hourLineGap, hourLineOffset, hourLineX, hourTextX;
		var preYOffset = 0;
		dayHeight = 24 * me.meta.baseHeight * me.meta.baseTimeUnit;
		dayTextX = dayXPos/2;
		
		hourLineGap = 24 / me.meta.timelineHoursOffset;
		// hourLineX = me.meta.timelineWidth - me.meta.timelineWidth / 10;
		hourLineX = dayXPos;
		// hourTextX = me.meta.timelineWidth - me.meta.timelineWidth / 10 * 2;
		// hourTextX = me.meta.timelineWidth - me.meta.timelineWidth / 10;
		hourTextX = me.meta.timelineWidth - (me.meta.timelineWidth - dayXPos)/2;

		for(var i=0; i<me.meta.days; i++)	{	//Replace with period later
			//Day Rect
			dayOffset = i * 24 * me.meta.baseHeight * me.meta.baseTimeUnit;
			ctx.strokeStyle=me.meta.timelineForecolor;
			ctx.strokeRect( me.x,
					me.y + dayOffset,
					me.meta.timelineWidth,
					dayHeight);
			
			var dt = Ext.Date.add(me.meta.fromDate, Ext.Date.DAY, i);
			
			//Day Text
			ctx.font = me.meta.dateTimeFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			var dpColor = me.meta.workdayColor;
			if(Ext.Date.format(dt, 'w') === '0'){ 
				dpColor = me.meta.holidayColor;	
			} else if(Ext.Date.format(dt, 'w') === '6'){ 
				dpColor = me.meta.saturdayColor;	
			} else {
				dpColor = me.meta.workdayColor;	
			}
			ctx.fillStyle = dpColor;	
			ctx.fillText(Ext.Date.format(dt, 'D') , me.x + dayTextX, me.y + dayOffset + dayHeight / 3);
			ctx.fillText(Ext.Date.format(dt, 'd') , me.x + dayTextX, me.y + dayOffset + dayHeight / 2);
			
			for(var j=0; j<=hourLineGap;j++) {
				//Hour Lines
				ctx.beginPath();
				hourLineOffset = dayOffset + j * me.meta.timelineHoursOffset * me.meta.baseHeight * me.meta.baseTimeUnit;
				ctx.moveTo(me.x + hourLineX, me.y + hourLineOffset);
				ctx.lineTo(me.x + me.meta.timelineWidth, me.y + hourLineOffset);
				ctx.strokeStyle=me.meta.timelineForecolor;

				if(j < hourLineGap && j > 0)
					ctx.stroke();
				
				//Hour Text
				if(j>0){
					ctx.font = me.meta.dateTimeFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillStyle = dpColor;
					var yOffset =  (hourLineOffset - (hourLineOffset - preYOffset)/2);
					ctx.fillText(j * me.meta.timelineHoursOffset , me.x + hourTextX, me.y + yOffset);
				}
				preYOffset = hourLineOffset;
			}
		}
    }
});
//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselGeneralDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-vesselgeneraldraw',
    
	meta: {},
	x: 0,
	y: 0,
	renderMode: '',
	printOpts: {},
	
    render: function(surface, ctx) {
    	var me = this;
		//Draw General Rect
		ctx.strokeStyle = me.meta.hatchGuideColor;
		
		ctx.fillStyle = '#EBEBEB';
		ctx.fillRect( me.x,
				me.y,
				me.meta.viewWidth,
				me.meta.viewHeight);
				
		//Draw Print
		if(me.renderMode === 'print' && me.printOpts) {
			//Print Titile
			ctx.font = 'bold ' + '30px ' + me.meta.fontType;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillStyle = me.meta.generalFontColor;
			ctx.fillText(me.printOpts.title, me.meta.viewWidth / 2, 0);
			 
			//Print Sections
			ctx.font = 'bold ' + '20px ' + me.meta.fontType;
			ctx.textBaseline = 'bottom';
			ctx.fillStyle = me.meta.generalFontColor;
			
			//Print Section1
			ctx.textAlign = 'left';
			ctx.fillText(me.printOpts.section1, 0, me.printOpts.headerHeight);
			
			//Print Section2
			ctx.textAlign = 'center';
			ctx.fillText(me.printOpts.section2, me.meta.viewWidth / 3, me.printOpts.headerHeight);
			
			//Print Section3
			ctx.textAlign = 'center';
			ctx.fillText(me.printOpts.section3, me.meta.viewWidth * 2 / 3, me.printOpts.headerHeight);
			
			//Print Section4
			ctx.textAlign = 'right';
			ctx.fillText(me.printOpts.section4, me.meta.viewWidth, me.printOpts.headerHeight);
			
			
			//Draw Rect
			ctx.strokeRect( me.x,
							me.y,
							me.meta.viewWidth,
							me.meta.viewHeight + me.printOpts.headerHeight);
		} else {
			ctx.strokeRect( me.x,
							me.y,
							me.meta.viewWidth,
							me.meta.viewHeight);
		}
		
		var elapsed = new Date().getTime();
		
    }
});
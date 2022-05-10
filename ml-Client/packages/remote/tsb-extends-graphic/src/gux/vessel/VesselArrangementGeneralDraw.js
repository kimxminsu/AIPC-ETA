//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselArrangementGeneralDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-vesselarrangementgeneraldraw',
    
    mixins : [
	          'TSB.gux.vessel.VesselArrangementRenderer'          
	],
	
	meta: {},
	vsl: {},
	bays: {},
	x: 0,
	y: 0,
	viewMode: '',
	planMode: false,
	printOpts: {},
	firstBayHoldTierEndIndex: 0,
	lastBayHoldTierEndIndex: 0,
	deckhouseBayHoldTierEndIndex: 0,
	funnelBayHoldTierEndIndex: 0,
	
    render: function(surface, ctx) {
    	var me = this;
    	
    	//Fill background color
//    	ctx.fillStyle = 'white';
//		ctx.fillRect(me.x,
//				me.y,
//				me.meta.viewWidth,
//				me.meta.vesselAreaHeight + me.meta.assignmentHeight);
		
    	if(me.planMode || me.viewMode === 'LONG_HATCH_SUMMARY') {
    		var offsetX = me.meta.baseUnit * (me.meta.padLeft + me.meta.marginStern) + me.meta.timelineWidth;
    		if(me.viewMode === 'LONG_HATCH_SUMMARY') {
    			offsetX = me.meta.baseUnit * (me.meta.padLeft + me.meta.marginStern);
    		}
    		var offsetY = me.meta.baseUnit * (me.meta.padTop + me.meta.padBottom + me.meta.marginTop + me.meta.marginBottom + me.meta.bayNoAreaHeight);
    		
			//Dis Summary
			ctx.strokeStyle = me.meta.bayGuideColor;
			ctx.fillStyle = '#8B0000';
			ctx.fillRect(me.x + offsetX,
					me.y + me.getValueY('SumDisD'),
					me.meta.summaryDisWidth,
					me.meta.summaryDisHeight - 2 * me.meta.baseUnit);
			ctx.strokeRect(me.x + offsetX,
					me.y + me.getValueY('SumDisD'),
					me.meta.summaryDisWidth,
					me.meta.summaryDisHeight - 2 * me.meta.baseUnit);
			
			var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'DD ' : 'DIS DECK ';
			ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black';
			ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumDisD')  + me.meta.summaryDisHeight / 4 - me.meta.summaryDisHeight / 8);
			
			// var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'DSD ' : 'DIS SFT DECK ';
			// ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			// ctx.textAlign = 'right';
			// ctx.textBaseline = 'middle';
			// ctx.fillStyle = 'black';
			// ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumDisD')  + me.meta.summaryDisHeight / 4 + me.meta.summaryDisHeight / 8);
			
			var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'DH ' : 'DIS HOLD ';
			ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black';
			ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumDisH')  + me.meta.summaryDisHeight / 4 - me.meta.summaryDisHeight / 8);

			// var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'DSH ' : 'DIS SFT HOLD ';
			// ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			// ctx.textAlign = 'right';
			// ctx.textBaseline = 'middle';
			// ctx.fillStyle = 'black';
			// ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumDisH')  + me.meta.summaryDisHeight / 4 + me.meta.summaryDisHeight / 8);
		
			//Lod Summary
			ctx.strokeStyle = me.meta.bayGuideColor;
			ctx.fillStyle = '#00008B';
			ctx.fillRect(me.x + offsetX,
					me.y + me.getValueY('SumLodD'),
					me.meta.summaryLodWidth,
					me.meta.summaryLodHeight - 2 * me.meta.baseUnit);
			ctx.strokeRect(me.x + offsetX,
					me.y + me.getValueY('SumLodD'),
					me.meta.summaryLodWidth,
					me.meta.summaryLodHeight - 2 * me.meta.baseUnit);
			
			var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'LD ' : 'LOAD DECK ';
			ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black';
			ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumLodD')  + me.meta.summaryDisHeight / 4 - me.meta.summaryDisHeight / 8);
			
			// var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'LSD ' : 'LOAD SFT DECK ';
			// ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			// ctx.textAlign = 'right';
			// ctx.textBaseline = 'middle';
			// ctx.fillStyle = 'black';
			// ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumLodD')  + me.meta.summaryDisHeight / 4 + me.meta.summaryDisHeight / 8);
			
			var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'LH ' : 'LOAD HOLD ';
			ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black';
			ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumLodH')  + me.meta.summaryDisHeight / 4 - me.meta.summaryDisHeight / 8);

			// var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'LSH ' : 'LOAD SFT HOLD ';
			// ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			// ctx.textAlign = 'right';
			// ctx.textBaseline = 'middle';
			// ctx.fillStyle = 'black';
			// ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumLodH')  + me.meta.summaryDisHeight / 4 + me.meta.summaryDisHeight / 8);
		
			//TTL Summary
			ctx.strokeStyle = me.meta.bayGuideColor;
			ctx.fillStyle = '#FF8C00';
			ctx.fillRect(me.x + offsetX,
					me.y + me.getValueY('SumTtl'),
					me.meta.summaryTtlWidth,
					me.meta.summaryTtlHeight);
			ctx.strokeRect(me.x + offsetX,
					me.y + me.getValueY('SumTtl'),
					me.meta.summaryTtlWidth,
					me.meta.summaryTtlHeight);

			var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'TTL ' : 'TTL DIS + LOAD ';
			ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black';
			ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumTtl')  + me.meta.summaryTtlHeight / 2 - me.meta.summaryTtlHeight / 4);

			// var text = me.viewMode === 'LONG_HATCH_SUMMARY' ? 'TTLS ' : 'TTL SHT ';
			// ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			// ctx.textAlign = 'right';
			// ctx.textBaseline = 'middle';
			// ctx.fillStyle = 'black';
			// ctx.fillText(text, me.x + offsetX, me.y + me.getValueY('SumTtl')  + me.meta.summaryTtlHeight / 2 + me.meta.summaryTtlHeight / 4);
    	}
    	
    	
    	if(me.viewMode !== 'LONG_HATCH_SUMMARY') {
    		//Draw Ship Shape
    		var imgBow = new Image();
    		var imgDeckhouse = new Image();
    		var imgFunnel = new Image();
    		var imgPropeller = new Image();
    		imgBow.src = me.meta.bayDirection === 'RTL' ? 'resources/images/draw/vesselstarbow.png' : 'resources/images/draw/vesselportbow.png';
    		imgDeckhouse.src = me.meta.bayDirection === 'RTL' ? 'resources/images/draw/vesselstardeckhouse.png' : 'resources/images/draw/vesselportdeckhouse.png';
    		imgFunnel.src = 'resources/images/draw/funnel.png';
    		imgPropeller.src = me.meta.bayDirection === 'RTL' ? 'resources/images/draw/vesselstarpropeller.png' : 'resources/images/draw/vesselportpropeller.png';
    		
    		var bowPos, deckhousePos, propellerPos, funnelPos;
    		bowPos = me.getImageBowPos(me.firstBayHoldTierEndIndex);
    		deckhousePos = me.getImageDeckhousePos(me.deckhouseBayHoldTierEndIndex);
    		propellerPos = me.getImagePropellerPos(me.lastBayHoldTierEndIndex, me.firstBayHoldTierEndIndex);
    		
    		imgBow.onload = function () {
    			if(me.meta) ctx.drawImage(imgBow,bowPos[0],bowPos[1] + me.meta.baseUnit,bowPos[2],bowPos[3]);
    		}
    		
    		imgDeckhouse.onload = function () {
    			ctx.drawImage(imgDeckhouse,deckhousePos[0],deckhousePos[1],deckhousePos[2],deckhousePos[3]);
    		}
    		
    		if(me.vsl.funnelIndex > -1) {
    			funnelPos = me.getImagefunnelPos(me.funnelBayHoldTierEndIndex);
    			imgFunnel.onload = function () {
    				ctx.drawImage(imgFunnel,funnelPos[0],funnelPos[1],funnelPos[2],funnelPos[3]);
    			}
    		}
    		
    		imgPropeller.onload = function () {
    			ctx.drawImage(imgPropeller,propellerPos[0],propellerPos[1],propellerPos[2],propellerPos[3]);
    		}
    		
    		ctx.beginPath();
    		ctx.strokeStyle = me.meta.vesselGuideColor;
    		ctx.moveTo(bowPos[0],bowPos[1] + bowPos[3] - me.meta.baseUnit);
    		ctx.lineTo(propellerPos[0] + propellerPos[2],bowPos[1] + bowPos[3] - me.meta.baseUnit);
    		
    		var offset = me.meta.bayDirection === 'RTL' ? 0 : propellerPos[2];
    		ctx.moveTo(propellerPos[0] + offset, propellerPos[1]);
    		ctx.lineTo(propellerPos[0] + offset, deckhousePos[1] + deckhousePos[3]);
    		ctx.stroke();
    	}
        
        //Draw General Rect
		ctx.strokeStyle = me.meta.hatchGuideColor;
		
		//Draw Print
		if(me.workMode === 'print' && me.printOpts) {
			//ToDo
			
			//Draw Rect
			ctx.strokeRect( me.x,
							me.y,
							me.meta.viewWidth,
							me.meta.viewHeight + me.printOpts.headerHeight);
		}
		
    }
});
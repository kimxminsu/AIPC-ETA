//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselArrangementBayDraw', {
	/**
     * @memberOf TSB.gux.vessel.VesselArrangementRenderer
     */
	extend: 'Ext.draw.sprite.Line',
	
	alias: 'widget.app-vesselarrangementbaydraw',
	
	mixins : [
	          'TSB.gux.vessel.VesselArrangementRenderer'          
	],
	
	meta: {},
	vsl: {},
	bays: {},
	asc: {},
	storeCraneAssignmentPlan: {},
	svc: {},
	ports: {},
	bay: {},
    preBay:{},
    postBay: {},
    offsetHchX: 0,
    bayX: 0,
    bayX40: 0,
    preHatchNo: '',
    preHoldNo: '',
	holdNo: '',
    viewMode:'',
    planMode:false,
    firstBayHoldTierEndIndex: 0,
    podBays: [],
    maxAmount: 0,
	
    render: function(surface, ctx) {
    	var me = this;
    	var hatchWidth = me.getHatchWidth(me.bay);
		var hatchX = me.getHatchXbyBay(me.offsetHchX, me.bay);

    	//Draw Bay
    	if(me.viewMode === 'GENERAL_ARRANGEMENT' ) {
			
			var tiers = me.bay.deckTierEndIndex + 1;
		
    		//Bay Tiers
    		for(var j=0;j<tiers;j++){
    			if(me.bayX) {
    				if(me.bay.tierNo[j] !== "") {
    					var cellY = me.getCellY(me.bay, j);
    					
    					ctx.strokeStyle = me.meta.bayGuideColor;
    					ctx.strokeRect(me.bayX,
    							cellY,
    							me.getBayWidth(me.bay),
    							me.meta.bayHeight);
    				}
    			}
	    		if(me.bay.tierNo[j] !== "" && me.podBays) {
	    			//Draw Bays
	    			if(me.podBays[j][0] !== "" && me.podBays[j][2]){
	    				var cellY = me.getCellY(me.bay, j);
	    				ctx.strokeStyle = me.meta.bayGuideColor;
	    				ctx.fillStyle = me.getPodBackcolor(me.podBays[j][0]);
	    				ctx.fillRect( me.bayX40,
	    						cellY,
	    						me.getBayWidth(me.bay),
	    						me.meta.bayHeight);
	    				ctx.strokeRect( me.bayX40,
	    						cellY,
	    						me.getBayWidth(me.bay),
	    						me.meta.bayHeight);
	    			} 
	    		}
    		}
    		
    	} else if(me.viewMode === 'LONG_HATCH' || me.viewMode === 'LONG_HATCH_SIMPLE') {
    		var vesselGraphHeight = me.meta.bayHeight * (me.vsl.maxTierEndIndex - me.vsl.maxTierStartIndex + 1);
    		var scaleUnit = 0;
    		if(me.bay.holdTierEndIndex > me.vsl.maxTierEndIndex - me.vsl.maxTierStartIndex + 1 - me.bay.holdTierEndIndex) {
    			scaleUnit = me.bay.holdTierEndIndex * me.meta.bayHeight / me.maxAmount;
    		} else {
    			scaleUnit = (vesselGraphHeight - me.bay.holdTierEndIndex * me.meta.bayHeight) / me.maxAmount;
    		}
//    		if(me.bay.holdTierEndIndex > me.vsl.maxTierEndIndex - me.vsl.maxTierStartIndex + 1 - me.bay.holdTierEndIndex) {
//    			scaleUnit = (vesselGraphHeight - (me.vsl.maxTierEndIndex - me.vsl.maxTierStartIndex + 1 - me.bay.holdTierEndIndex) * me.meta.bayHeight) / me.maxAmount;
//    		} else {
//    			scaleUnit = (vesselGraphHeight - me.bay.holdTierEndIndex * me.meta.bayHeight) / me.maxAmount;
//    		}
    		
    		var graphWidth = me.meta.bayWidth / 3;
    		
    		if(me.bay.hatchNo !== me.preHatchNo) {
    			//find max amount of hatch
    			var maxHatchAmountD = 0, maxHatchAmountH = 0;
    			for(j=0;j<me.bay.bayListInHatch.length;j++) {
    				
    				if(me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisH + me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisSftH + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodH + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodSftH > maxHatchAmountH) {
    					maxHatchAmountH = me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisH + me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisSftH + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodH + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodSftH;
    				}
    				
    				if(me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisD + me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisSftD + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodD + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodSftD > maxHatchAmountD) {
    					maxHatchAmountD = me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisD + me.bays.getAt(me.bay.bayListInHatch[j]).data.noDisSftD + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodD + me.bays.getAt(me.bay.bayListInHatch[j]).data.noLodSftD;
    				}
    				
    			}
    			
    			//Graph Background - Hold
    			if(maxHatchAmountH > 0) {
    				var y = me.getCellY(me.bay, me.bay.holdTierEndIndex);
    				var graphHeight = scaleUnit * maxHatchAmountH;
    				ctx.fillStyle = '#D3D3D3';
    				ctx.fillRect( hatchX,
    						y - me.meta.baseUnit,
    						hatchWidth,
    						graphHeight + me.meta.baseUnit * 2);
    			}
    			
    			//Graph Background - Deck
    			if(maxHatchAmountD > 0) {
    				var y = me.getCellY(me.bay, me.bay.holdTierEndIndex)  - me.meta.hatchCoverAreaHeight * me.meta.baseUnit;
    				var graphHeight = scaleUnit * maxHatchAmountD;
    				ctx.fillStyle = '#D3D3D3';
    				ctx.fillRect( hatchX,
    						y - graphHeight - me.meta.baseUnit,
    						hatchWidth,
    						graphHeight + me.meta.baseUnit * 2);
    			}
    			
    		}
    		
    		
    		//Loading Graph - Hold
    		var y = me.getCellY(me.bay, me.bay.holdTierEndIndex);
    		var graphHeight = scaleUnit * (me.bay.noLodH + me.bay.noLodSftH);
    		ctx.fillStyle = 'blue';
			ctx.fillRect( me.bayX40 + me.getBayWidth(me.bay) / 2 - graphWidth / 2,
					y,
					graphWidth,
					graphHeight);
			
			//Loading Graph - Deck
			var y = me.getCellY(me.bay, me.bay.holdTierEndIndex)  - me.meta.hatchCoverAreaHeight * me.meta.baseUnit;
			var graphHeight = scaleUnit * (me.bay.noLodD + me.bay.noLodSftD);
			ctx.fillStyle = 'blue';
			ctx.fillRect( me.bayX40 + me.getBayWidth(me.bay) / 2 - graphWidth / 2,
					y - graphHeight,
					graphWidth,
					graphHeight);
			
			//Discharging Graph - Hold
    		var y = me.getCellY(me.bay, me.bay.holdTierEndIndex) + scaleUnit * (me.bay.noLodH + me.bay.noLodSftH);;
    		var graphHeight = scaleUnit * (me.bay.noDisH + me.bay.noDisSftH);
    		ctx.fillStyle = 'red';
			ctx.fillRect( me.bayX40 + me.getBayWidth(me.bay) / 2 - graphWidth / 2,
					y,
					graphWidth,
					graphHeight);
			
			//Discharging Graph - Deck
			var y = me.getCellY(me.bay, me.bay.holdTierEndIndex)  - me.meta.hatchCoverAreaHeight * me.meta.baseUnit - scaleUnit * (me.bay.noLodD + me.bay.noLodSftD);
			var graphHeight = scaleUnit * (me.bay.noDisD + me.bay.noDisSftD);
			ctx.fillStyle = 'red';
			ctx.fillRect( me.bayX40 + me.getBayWidth(me.bay) / 2 - graphWidth / 2,
					y - graphHeight,
					graphWidth,
					graphHeight);
    		
    	}
    	
    	//Planning Data
    	if(me.planMode || me.viewMode === 'LONG_HATCH_SUMMARY') {
    		if(me.bay.hatchNo !== me.preHatchNo) {
				//Summary Boxes
				var gap = 2 * me.meta.baseUnit;
				ctx.fillStyle = 'white';
				
				var y = me.getValueY('SumDisD');
				ctx.fillRect(hatchX,
						y + gap,
						hatchWidth,
						me.meta.summaryDisHeight / 2 - gap * 2);
				
				//Dis - Deck - Shift Line
				ctx.beginPath();
				ctx.lineWidth = 0.1;
	            ctx.strokeStyle = '#8B0000';
				ctx.moveTo(hatchX, me.getValueY('SumDisD') + me.meta.summaryDisHeight / 4);
				ctx.lineTo(hatchX + hatchWidth, me.getValueY('SumDisD') + me.meta.summaryDisHeight / 4);
				//ctx.stroke();
				ctx.lineWidth = 1;
				ctx.beginPath();
				
				var y = me.getValueY('SumDisH');
				ctx.fillRect(hatchX,
						y,
						hatchWidth,
						me.meta.summaryDisHeight / 2 - gap * 2);
				
				//Dis - Hold - Shift Line
				ctx.beginPath();
				ctx.lineWidth = 0.1;
	            ctx.strokeStyle = '#8B0000';
				ctx.moveTo(hatchX, me.getValueY('SumDisH') + me.meta.summaryDisHeight / 4);
				ctx.lineTo(hatchX + hatchWidth, me.getValueY('SumDisH') + me.meta.summaryDisHeight / 4);
				//ctx.stroke();
				ctx.lineWidth = 1;
				ctx.beginPath();
				
				var y = me.getValueY('SumLodD');
				ctx.fillRect( hatchX,
						y + gap,
						hatchWidth,
						me.meta.summaryLodHeight / 2 - gap * 2);
				
				//Load - Deck - Shift Line
				ctx.beginPath();
				ctx.lineWidth = 0.1;
	            ctx.strokeStyle = '#00008B';
				ctx.moveTo(hatchX, me.getValueY('SumLodD') + me.meta.summaryDisHeight / 4);
				ctx.lineTo(hatchX + hatchWidth, me.getValueY('SumLodD') + me.meta.summaryDisHeight / 4);
				//ctx.stroke();
				ctx.lineWidth = 1;
				ctx.beginPath();
				
				var y = me.getValueY('SumLodH');
				ctx.fillRect( hatchX,
						y,
						hatchWidth,
						me.meta.summaryLodHeight / 2 - gap * 2);
				
				//Load - Hold - Shift Line
				ctx.beginPath();
				ctx.lineWidth = 0.1;
	            ctx.strokeStyle = '#00008B';
				ctx.moveTo(hatchX, me.getValueY('SumLodH') + me.meta.summaryDisHeight / 4);
				ctx.lineTo(hatchX + hatchWidth, me.getValueY('SumLodH') + me.meta.summaryDisHeight / 4);
				//ctx.stroke();
				ctx.lineWidth = 1;
				ctx.beginPath();
				
				var y = me.getValueY('SumTtl');
				ctx.fillRect( hatchX,
						y + gap,
						hatchWidth,
						me.meta.summaryTtlHeight - gap * 2);
				
				//TTL Shift Line
				ctx.beginPath();
				ctx.lineWidth = 0.1;
	            ctx.strokeStyle = '#FF8C00';
				ctx.moveTo(hatchX, me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 2);
				ctx.lineTo(hatchX + hatchWidth, me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 2);
				//ctx.stroke();
				ctx.lineWidth = 1;
				ctx.beginPath();
				
				if(me.bay.index === 0) {
					//Total Summary Boxes
    				var gap = 2 * me.meta.baseUnit;
    				var x = me.meta.viewWidth - me.meta.baseUnit * ( me.meta.padRight + me.meta.marginBow ) - me.meta.bayWidth;
    				if(me.viewMode === 'LONG_HATCH_SUMMARY') {
						x = me.meta.viewWidth - me.meta.bayWidth * 2;
					}
    				var width = me.meta.bayWidth * 2 - gap;
    				ctx.fillStyle = '#FFFACD';
    				
    				var y = me.getValueY('SumDisD');
    				ctx.fillRect( x,
    						y + gap,
    						width,
    						me.meta.summaryDisHeight / 2 - gap * 2);
    				
    				//Dis - Deck - Shift Line
    				ctx.beginPath();
    				ctx.lineWidth = 0.1;
    	            ctx.strokeStyle = '#8B0000';
    				ctx.moveTo(x, me.getValueY('SumDisD') + me.meta.summaryDisHeight / 4);
    				ctx.lineTo(x + width, me.getValueY('SumDisD') + me.meta.summaryDisHeight / 4);
    				//ctx.stroke();
    				ctx.lineWidth = 1;
    				ctx.beginPath();
    				
    				var y = me.getValueY('SumDisH');
    				ctx.fillRect( x,
    						y,
    						width,
    						me.meta.summaryDisHeight / 2 - gap * 2);
    				
    				//Dis - Hold - Shift Line
    				ctx.beginPath();
    				ctx.lineWidth = 0.1;
    	            ctx.strokeStyle = '#8B0000';
    				ctx.moveTo(x, me.getValueY('SumDisH') + me.meta.summaryDisHeight / 4);
    				ctx.lineTo(x + width, me.getValueY('SumDisH') + me.meta.summaryDisHeight / 4);
    				//ctx.stroke();
    				ctx.lineWidth = 1;
    				ctx.beginPath();
    				
    				var y = me.getValueY('SumLodD');
    				ctx.fillRect( x,
    						y + gap,
    						width,
    						me.meta.summaryLodHeight / 2 - gap * 2);
    				
    				//Load - Deck - Shift Line
    				ctx.beginPath();
    				ctx.lineWidth = 0.1;
    	            ctx.strokeStyle = '#00008B';
    				ctx.moveTo(x, me.getValueY('SumLodD') + me.meta.summaryDisHeight / 4);
    				ctx.lineTo(x + width, me.getValueY('SumLodD') + me.meta.summaryDisHeight / 4);
    				//ctx.stroke();
    				ctx.lineWidth = 1;
    				ctx.beginPath();
    				
    				var y = me.getValueY('SumLodH');
    				ctx.fillRect( x,
    						y,
    						width,
    						me.meta.summaryLodHeight / 2 - gap * 2);
    				
    				//Load - Hold - Shift Line
    				ctx.beginPath();
    				ctx.lineWidth = 0.1;
    	            ctx.strokeStyle = '#00008B';
    				ctx.moveTo(x, me.getValueY('SumLodH') + me.meta.summaryDisHeight / 4);
    				ctx.lineTo(x + width, me.getValueY('SumLodH') + me.meta.summaryDisHeight / 4);
    				//ctx.stroke();
    				ctx.lineWidth = 1;
    				ctx.beginPath();
    				
    				var y = me.getValueY('SumTtl');
    				ctx.fillRect( x,
    						y + gap,
    						width,
    						me.meta.summaryTtlHeight - gap * 2);
    				
    				//TTL Shift Line
    				ctx.beginPath();
    				ctx.lineWidth = 0.1;
    	            ctx.strokeStyle = '#FF8C00';
    				ctx.moveTo(x, me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 2);
    				ctx.lineTo(x + width, me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 2);
    				//ctx.stroke();
    				ctx.lineWidth = 1;
    				ctx.beginPath();
    				
				}
			}
			//hatch View 칸마다 표시되는 부분 (배 그림 밑)
    		//Summary Amount
			ctx.font = 'bold ' + me.meta.fontSizeSummary * me.meta.baseUnit * 1.2 + 'px ' + me.meta.fontType;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black';

			if(me.meta.countMode === 'split') {
				var gap = me.meta.baseUnit
				var gapOffset = parseInt(me.bay.name) % 2 === 0 ? 1 : -1;

				//Load, Dis
				var offset = parseInt(me.bay.name) % 2 === 0 ? 0.8 : 2.3;
				
				var y = me.getValueY('SumDisD') + offset * me.meta.summaryDisHeight / 10 + gap * gapOffset;
				var value = me.bay.noDisD;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumDisH') + offset * me.meta.summaryDisHeight / 10 + gap * gapOffset;
				var value = me.bay.noDisH;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumLodD') + offset * me.meta.summaryLodHeight / 10 +  + gap * gapOffset;
				var value = me.bay.noLodD;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumLodH') + offset * me.meta.summaryLodHeight / 10 + gap * gapOffset;
				var value = me.bay.noLodH;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumTtl') + offset * me.meta.summaryTtlHeight / 6 + gap * gapOffset;
				var value = me.bay.noDisD + me.bay.noDisH + me.bay.noLodD + me.bay.noLodH;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				//Shift
				var offset = parseInt(me.bay.name) % 2 === 0 ? 3.5 : 5;
				
				var y = me.getValueY('SumDisD') + offset * me.meta.summaryDisHeight / 10 + gap * gapOffset;
				var value = me.bay.noDisSftD;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumDisH') + offset * me.meta.summaryDisHeight / 10 + gap * gapOffset;
				var value = me.bay.noDisSftH;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumLodD') + offset * me.meta.summaryLodHeight / 10 +  + gap * gapOffset;
				var value = me.bay.noLodSftD;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumLodH') + offset * me.meta.summaryLodHeight / 10 + gap * gapOffset;
				var value = me.bay.noLodSftH;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
				var y = me.getValueY('SumTtl') + offset * me.meta.summaryTtlHeight / 6 + gap * gapOffset;
				var value = me.bay.noDisSftD + me.bay.noDisSftH + me.bay.noLodSftD + me.bay.noLodSftH;
				value = value > 0 ? value : '';
				ctx.fillText(value, me.bayX40 + me.getBayWidth(me.bay) / 2, y);
				
			} else if(me.meta.countMode === 'sum') {
				
				var offset = me.meta.bayDirection === 'RTL' ? 1 : -1;
				var noDisD = 0, noDisSftD = 0, noDisH = 0, noDisSftH = 0, noLodD = 0, noLodSftD = 0, noLodH = 0, noLodSftH = 0;
				var bayPos;
				
				for(var i=0;i<me.bay.bayListInHatch.length;i++) {
					noDisD += me.bays.getAt(me.bay.bayListInHatch[i]).data.noDisD; 
					noDisSftD += me.bays.getAt(me.bay.bayListInHatch[i]).data.noDisSftD; 
					noDisH += me.bays.getAt(me.bay.bayListInHatch[i]).data.noDisH; 
					noDisSftH += me.bays.getAt(me.bay.bayListInHatch[i]).data.noDisSftH; 
					noLodD += me.bays.getAt(me.bay.bayListInHatch[i]).data.noLodD; 
					noLodSftD += me.bays.getAt(me.bay.bayListInHatch[i]).data.noLodSftD; 
					noLodH += me.bays.getAt(me.bay.bayListInHatch[i]).data.noLodH; 
					noLodSftH += me.bays.getAt(me.bay.bayListInHatch[i]).data.noLodSftH; 
					
					if(me.bay.bayListInHatch[i] === me.bay.index) {
						bayPos = i;
					}
				}
				
				if(bayPos===0) {
					var y = me.getValueY('SumDisD') + me.meta.summaryDisHeight / 4;
					var value = noDisD;
					value = value > 0 ? value : '';
					ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					// var y = me.getValueY('SumDisD') + me.meta.summaryDisHeight / 2.5;
					// var value = noDisSftD;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					var y = me.getValueY('SumDisH') + me.meta.summaryDisHeight / 4;
					var value = noDisH;
					value = value > 0 ? value : '';
					ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					// var y = me.getValueY('SumDisH') + me.meta.summaryDisHeight / 2.5;
					// var value = noDisSftH;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					var y = me.getValueY('SumLodD') + me.meta.summaryLodHeight / 4;
					var value = noLodD;
					value = value > 0 ? value : '';
					ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					// var y = me.getValueY('SumLodD') + me.meta.summaryLodHeight / 2.5;
					// var value = noLodSftD;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					var y = me.getValueY('SumLodH') + me.meta.summaryLodHeight / 4;
					var value = noLodH;
					value = value > 0 ? value : '';
					ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					// var y = me.getValueY('SumLodH') + me.meta.summaryLodHeight / 2.5;
					// var value = noLodSftH;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					var y = me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 2
					var value = noDisD + noDisH + noLodD + noLodH;
					value = value > 0 ? value : '';
					ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
					
					// var y = me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 1.3
					// var value = noDisSftD + noDisSftH + noLodSftD + noLodSftH;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, me.offsetHchX - offset * me.getHatchWidth(me.bay) / 2, y);
				}
				
			} else if(me.meta.countMode === 'move') {
				//TODO
			}
			
			
			if(me.bay.index === 0) { //3bay중 첫번째 bay
				//Total Summary Count
				var noDisD = 0, noDisSftD = 0, noDisH = 0, noDisSftH = 0, noLodD = 0, noLodSftD = 0, noLodH = 0, noLodSftH = 0;
				
				for(var i=0;i<me.bays.length;i++) {
					noDisD += me.bays.getAt(i).data.noDisD;
					noDisSftD += me.bays.getAt(i).data.noDisSftD;
					noDisH += me.bays.getAt(i).data.noDisH;
					noDisSftH += me.bays.getAt(i).data.noDisSftH;
					noLodD += me.bays.getAt(i).data.noLodD;
					noLodSftD += me.bays.getAt(i).data.noLodSftD;
					noLodH += me.bays.getAt(i).data.noLodH;
					noLodSftH += me.bays.getAt(i).data.noLodSftH;
				}
				
				if(me.meta.countMode === 'split' || me.meta.countMode === 'sum') {
					var x = me.meta.viewWidth - me.meta.baseUnit * ( me.meta.padRight + me.meta.marginBow );
    				if(me.viewMode === 'LONG_HATCH_SUMMARY') {
						x = me.meta.viewWidth - me.meta.bayWidth;
					}
					var y = me.getValueY('SumDisD') + me.meta.summaryDisHeight / 4;
					var value = noDisD;
					value = value > 0 ? value : '';
					ctx.fillText(value, x, y);
					
					// var y = me.getValueY('SumDisD') + me.meta.summaryDisHeight / 2.5;
					// var value = noDisSftD;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, x, y);
					
					var y = me.getValueY('SumDisH') + me.meta.summaryDisHeight / 4;
					var value = noDisH;
					value = value > 0 ? value : '';
					ctx.fillText(value, x, y);
					
					// var y = me.getValueY('SumDisH') + me.meta.summaryDisHeight / 2.5;
					// var value = noDisSftH;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, x, y);
					
					var y = me.getValueY('SumLodD') + me.meta.summaryLodHeight / 4;
					var value = noLodD;
					value = value > 0 ? value : '';
					ctx.fillText(value, x, y);
					
					// var y = me.getValueY('SumLodD') + me.meta.summaryLodHeight / 2.5;
					// var value = noLodSftD;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, x, y);
					
					var y = me.getValueY('SumLodH') + me.meta.summaryLodHeight / 4;
					var value = noLodH;
					value = value > 0 ? value : '';
					ctx.fillText(value, x, y);
					
					// var y = me.getValueY('SumLodH') + me.meta.summaryLodHeight / 2.5;
					// var value = noLodSftH;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, x, y);
					
					var y = me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 2
					var value = noDisD + noDisH + noLodD + noLodH;
					value = value > 0 ? value : '';
					ctx.fillText(value, x, y);
					
					// var y = me.getValueY('SumTtl') + me.meta.summaryTtlHeight / 1.3
					// var value = noDisSftD + noDisSftH + noLodSftD + noLodSftH;
					// value = value > 0 ? value : '';
					// ctx.fillText(value, x, y);
					
				} else if(me.meta.countMode === 'move') {
					//TODO
				}
				
			}
			
			//Display Planning Values
			var offset = me.meta.bayDirection === 'RTL' ? 1 : -1;
			var bayPos;
			for(var i=0;i<me.bay.bayListInHatch.length;i++) {
				if(me.bay.bayListInHatch[i] === me.bay.index) {
					bayPos = i;
				}
			}
			
			if(bayPos===0) {
				var offset = me.meta.bayDirection === 'RTL' ? 1 : 0;
				var gap = 2 * me.meta.baseUnit;
				
				//Discharge - Deck
				var items = me.getPlannedItemsListInSection('D', 'D', me.bay);
				var r = me.meta.summaryDisHeight / 6;
				var y = me.getValueY('SumDisD') + gap;
				var width = me.getHatchWidth(me.bay);
				
				for(var i=0;i<items.length;i++) {
					var x = me.offsetHchX /*- (r - 2 * gap) * offset*/ - width * offset;
					ctx.fillStyle = '#' + items[i].data.backColor;
    				ctx.fillRect(x + (r - 2 * gap) * i, y, r - 2 * gap, r - 2 * gap);
					
					ctx.textAlign = 'center';
					ctx.textBaseline = 'top';
					ctx.fillStyle = '#' + items[i].data.foreColor;
					ctx.fillText(items[i].data.qcSeq, x + (r - 2 * gap) / 2 + ((r - 2 * gap) * i), y);
				}
				
				//Discharge - Hold
				var items = me.getPlannedItemsListInSection('D', 'H', me.bay);
				var r = me.meta.summaryDisHeight / 6;
				var y = me.getValueY('SumDisH');
				
				for(var i=0;i<items.length;i++) {
					var x = me.offsetHchX /*- (r - 2 * gap) * offset*/ - width * offset;
					ctx.fillStyle = '#' + items[i].data.backColor;
    				ctx.fillRect(x + (r - 2 * gap) * i, y, r - 2 * gap, r - 2 * gap);
					
					ctx.textAlign = 'center';
					ctx.textBaseline = 'top';
					ctx.fillStyle = '#' + items[i].data.foreColor;
					ctx.fillText(items[i].data.qcSeq, x + (r - 2 * gap) / 2 + ((r - 2 * gap) * i), y);
				}
				
				//Load - Deck
				var items = me.getPlannedItemsListInSection('L', 'D', me.bay);
				var r = me.meta.summaryDisHeight / 6;
				var y = me.getValueY('SumLodD') + gap;
				
				for(var i=0;i<items.length;i++) {
					var x = me.offsetHchX /*- (r - 2 * gap) * offset*/ - width * offset;
					ctx.fillStyle = '#' + items[i].data.backColor;
    				ctx.fillRect(x + (r - 2 * gap) * i, y, r - 2 * gap, r - 2 * gap);
					
					ctx.textAlign = 'center';
					ctx.textBaseline = 'top';
					ctx.fillStyle = '#' + items[i].data.foreColor;
					ctx.fillText(items[i].data.qcSeq, x + (r - 2 * gap) / 2 + ((r - 2 * gap) * i), y);
				}
				
				//Load - Hold
				var items = me.getPlannedItemsListInSection('L', 'H', me.bay);
				var r = me.meta.summaryDisHeight / 6;
				var y = me.getValueY('SumLodH');
				
				for(var i=0;i<items.length;i++) {
					var x = me.offsetHchX /*- (r - 2 * gap) * offset*/ - width * offset;
					ctx.fillStyle = '#' + items[i].data.backColor;
    				ctx.fillRect(x + (r - 2 * gap) * i, y, r - 2 * gap, r - 2 * gap);
					
					ctx.textAlign = 'center';
					ctx.textBaseline = 'top';
					ctx.fillStyle = '#' + items[i].data.foreColor;
					ctx.fillText(items[i].data.qcSeq, x + (r - 2 * gap) / 2 + ((r - 2 * gap) * i), y);
				}
				
			}
		}
		

		if(me.viewMode !== 'LONG_HATCH_SUMMARY' ) {
			//Deck Line
			if(me.bay.hatchNo !== me.preHatchNo) {
				var deckY = me.getCellY(me.bay, me.bay.holdTierEndIndex)  - (me.meta.hatchCoverAreaHeight / 2) * me.meta.baseUnit;
				var hatchX = me.getHatchXbyBay(me.offsetHchX, me.bay);
				var hatchWidth = me.getHatchWidth(me.bay);
				ctx.beginPath();
				ctx.strokeStyle = me.meta.vesselGuideColor;
				ctx.moveTo(hatchX, deckY);
				ctx.lineTo(hatchX + hatchWidth + me.meta.baseHatchGap * me.meta.baseUnit, deckY);
				ctx.stroke();
			}

			//Hold Line
			if (me.preHoldNo !== me.holdNo) {
				if(me.holdNo > 1) {
					var craneAssignmentOffset = me.planMode ? me.meta.summaryHeight+ me.meta.summaryGap: 0;
					//For phase 1, no need crane working window
	//    			var craneAssignmentOffset = me.planMode ? me.meta.summaryHeight+ me.meta.summaryGap + me.meta.assignmentHeight : 0;
					var x = me.offsetHchX;
					var pos = me.getHoldY(me.firstBayHoldTierEndIndex);
					var y = pos[1] + pos[3];
					var y1 = me.meta.viewHeight - (me.meta.padBottom + me.meta.marginBottom - 5) * me.meta.baseUnit - craneAssignmentOffset;

					ctx.beginPath();
					ctx.strokeStyle = me.meta.vesselGuideColor;
					ctx.moveTo(x, y);
					ctx.lineTo(x, y1);
					ctx.stroke();
				}
			}
		}
    	
        
    	
        //Bay Number
		if(me.bayNo !== '') {
			var bayNoY = parseInt(me.bay.name) % 2 === 0 ? 0 : me.meta.bayNoAreaHeight * 2 / 3;
			var bayNoColor = parseInt(me.bay.name) % 2 === 0 ? me.meta.evenFontColor : me.meta.oddFontColor;
					
			ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillStyle = bayNoColor;
			ctx.fillText(me.bay.name, me.getBayNoX(me.offsetHchX, me.bay, me.preBay, me.postBay), (me.meta.padTop + bayNoY) * me.meta.baseUnit);
		}
		
		if(me.planMode) {
			if(me.bayNo !== '') {
				var bayNoY = parseInt(me.bay.name) % 2 === 0 ? 0 : me.meta.bayNoAreaHeight * 2 / 3;
				var bayNoColor = parseInt(me.bay.name) % 2 === 0 ? me.meta.evenFontColor : me.meta.oddFontColor;
				var pos = me.getHoldY(me.firstBayHoldTierEndIndex);
    			var y = pos[1] + pos[3];
    			
				ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = bayNoColor;
				ctx.fillText(me.bay.name, 
						me.getBayNoX(me.offsetHchX, me.bay, me.preBay, me.postBay), 
						y + bayNoY * me.meta.baseUnit);
			}
		}

		//AlloFileTest
		if (me.bay.hatchNo !== me.preHatchNo) {
			
			var craneStoreData = me.storeCraneAssignmentPlan.data.items;
			for (var i = 0; i < craneStoreData.length; i++) {
				if (me.bay.hatchNo == craneStoreData[i].data.hatchIndex && craneStoreData[i].data.allocState === "Y") {
				var ioStr = craneStoreData[i].data.ioMode == 1 ? "Dis" : "Lod";
				var deckHold = craneStoreData[i].data.deckHoldStr == "D" ? "D" : "H";
				var disLoadValue = "Sum" + ioStr + deckHold;
				var y = me.getValueY(disLoadValue) + me.meta.summaryDisHeight / 2;

				ctx.beginPath();
				ctx.strokeStyle = "#FAD000";
				ctx.lineWidth = 3;
				ctx.moveTo(hatchX, y - gap);
				ctx.lineTo(hatchX + hatchWidth, me.getValueY(disLoadValue));
				ctx.stroke();
				ctx.closePath();
				}
			}
		}
    },
    

	getPodBackcolor: function(pod) {
		var me = this;
		if(me.ports.data.length > 0){
			for(var i = 0 ; i< me.ports.data.length ; i++){
				if(me.ports.getAt(i).data.portCode == pod){
					return '#' + me.ports.getAt(i).data.backColor;
				}
			}
		}
		
		// if(me.svc.data.length > 0){
		// 	for(var i=0;i<me.svc.data.getAt(0).port(0).data.length;i++){
		// 		if(me.svc.data.getAt(0).port(0).data.getAt(i).data.portCode === pod) {
		// 			return '#' + me.svc.data.getAt(0).port(0).data.getAt(i).data.backColor;
		// 		}
		// 	}
		// }
				
		return 'gray';
	}
		
    
});
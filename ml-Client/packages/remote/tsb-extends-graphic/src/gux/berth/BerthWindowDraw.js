//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.berth.BerthWindowDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-berthwindowdraw',
    
    mixins : [
	          'TSB.gux.berth.BerthRenderer'          
	],
    
	meta: {},
	berths: {},
	bitts: {},
	plans: {},
	x: 0,
	y: 0,
	viewMode: '',

    render: function(surface, ctx) {
    	var me = this;

		ctx.strokeStyle = me.meta.timelineForecolor;
		ctx.lineWidth=1;
		ctx.fillStyle = me.meta.timelineBackcolor;
		
		//Berth Window
		ctx.strokeRect( me.x,
				me.y,
				me.meta.windowWidth,
				me.meta.windowHeight);
		
		//Draw Date & Time
		var dayOffset, hourLineOffset, hourLineGap;
		hourLineGap = 24 / me.meta.timelineHoursOffset;
		
		for(var i=0; i<me.meta.days; i++)	{	//Replace with period later
			//Day Rect
			dayOffset = i * 24 * me.meta.baseHeight * me.meta.baseTimeUnit;
			
			//Day Guide Lines
			ctx.beginPath();
			ctx.moveTo(me.x, me.y + dayOffset);
			ctx.lineTo(me.meta.viewWidth, me.y + dayOffset);
			ctx.strokeStyle=me.meta.timelineForecolor;
			ctx.stroke();
			
			for(var j=0; j<hourLineGap;j++) {
				hourLineOffset = dayOffset + j * me.meta.timelineHoursOffset * me.meta.baseHeight * me.meta.baseTimeUnit;
				
				//Hour Guide Lines
				ctx.beginPath();
				ctx.moveTo(me.x, me.y + hourLineOffset);
				ctx.lineTo(me.meta.viewWidth, me.y + hourLineOffset);
				ctx.strokeStyle=me.meta.hourGuideColor;
				ctx.stroke();
				
				//Hour Guide Lines
				ctx.beginPath();
				ctx.moveTo(me.x, me.y + hourLineOffset + (me.meta.timelineHoursOffset * me.meta.baseHeight * me.meta.baseTimeUnit) / 2);
				ctx.lineTo(me.meta.viewWidth, me.y + hourLineOffset + (me.meta.timelineHoursOffset * me.meta.baseHeight * me.meta.baseTimeUnit) / 2);
				ctx.strokeStyle=me.meta.hourGuideColor;
				ctx.setLineDash([2]);
				ctx.stroke();
				ctx.setLineDash([]);
			}
			
		}
		
		//Draw Berths
		var terminalX = me.meta.berthDirection === 'RTL' ? me.meta.viewWidth : me.x;
		var berthX = me.meta.berthDirection === 'RTL' ? me.meta.viewWidth : me.x;
		var dirOffset = me.meta.berthDirection === 'RTL' ? -1 : 1;
		var terminalLength = 0, preRecord;
		me.berths.each(function(record,idx){
			if(record.data.drawable === 1) {
				if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					var length = parseFloat(record.data.length) * me.meta.baseWidth * me.meta.baseBerthUnit;
				} else {
					var length = me.meta.baseFixedBerthWidth * me.meta.baseBerthUnit;
				}
				
				//Draw Berth Dash
				if(preRecord && preRecord.data.berthNm === record.data.berthNm) {
					ctx.beginPath();
					ctx.moveTo(berthX, me.y);
					ctx.lineTo(berthX, me.meta.viewHeight);
					ctx.strokeStyle=me.meta.berthLineColor;
					ctx.stroke();
				}
				
				//Draw Berth Type Line
				if(preRecord && preRecord.data.berthNm !== record.data.berthNm) {
					ctx.beginPath();
					ctx.moveTo(berthX, me.y);
					ctx.lineTo(berthX, me.meta.viewHeight); 
					ctx.strokeStyle=me.meta.berthTypeLineColor;
					ctx.stroke();
				}
				
				//Draw Terminal Line
				if(preRecord && preRecord.data.terminalCd !== record.data.terminalCd) {
					ctx.beginPath();
					ctx.lineWidth=3;
					ctx.moveTo(berthX, me.y);
					ctx.lineTo(berthX, me.meta.viewHeight); 
					ctx.strokeStyle=me.meta.timelineForecolor;
					ctx.stroke();
					ctx.lineWidth=1;
					
					terminalX += terminalLength * dirOffset;
					terminalLength = 0;
				}
				
				//Draw Bitts
				if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					var isBittExisted = false;
					me.bitts.each(function(bittRecord,idx){
						if(record.data.berthCd === bittRecord.data.berthCd) {
							isBittExisted = true;
							
							var x = terminalX + bittRecord.data.xPos * me.meta.baseWidth * me.meta.baseBerthUnit * dirOffset;
							
							//Bitt Guide Lines
							ctx.beginPath();
							ctx.moveTo(x, me.y);
							ctx.lineTo(x, me.meta.viewHeight);
							ctx.strokeStyle=me.meta.bittLineColor;
							ctx.setLineDash([2]);
							ctx.stroke();
							ctx.setLineDash([]);
						}
					});
					
					//Draw Meter if Bitt is not existed
					if(!isBittExisted) {
						for(var i=0; i<parseInt(record.data.length / me.meta.berthMeterGuideOffset); i++) {
							var x = berthX + (i + 1) * me.meta.berthMeterGuideOffset * me.meta.baseWidth * me.meta.baseBerthUnit * dirOffset;
							
							//Meter Guide Lines
							ctx.beginPath();
							ctx.moveTo(x, me.y);
							ctx.lineTo(x, me.meta.viewHeight);
							ctx.strokeStyle=me.meta.bittLineColor;
							ctx.setLineDash([2]);
							ctx.stroke();
							ctx.setLineDash([]);
						}
					}
				} else {
					//Jetty
					var x = berthX + length / 2 * dirOffset;
					
					//Meter Guide Lines
					ctx.beginPath();
					ctx.moveTo(x, me.y);
					ctx.lineTo(x, me.meta.viewHeight);
					ctx.strokeStyle=me.meta.bittLineColor;
					ctx.setLineDash([2]);
					ctx.stroke();
					ctx.setLineDash([]);
				}
				
				terminalLength += length;
				berthX += length * dirOffset;
				preRecord = record;
			}
		});
		
		//Draw Berth Plan
		me.plans.each(function(record,idx){
			var berthCdIdx = me.berths.findExact('berthCd',record.data.berthCd);
			if(berthCdIdx > -1) {
				berthRecord = me.berths.getAt(berthCdIdx);
				if(berthRecord.data.drawable === 1) {
					var pos = me.getBerthPlanPos(record.data);
					//Draw Vessel
					me.drawVessel(ctx, pos, record.data, berthRecord.data);
				}
			}
		});
    },
    
	drawVessel: function(ctx, pos, rec, berth) {
		var me = this;
		var arrTime = me.getBerthPlanTimeRule(rec, 'arrival');
		var depTime = me.getBerthPlanTimeRule(rec, 'departure');
		var vslBackcolor;
		if(rec.vslStat) {
			if(rec.vslStat === 'BBN') {
				vslBackcolor = me.meta.vesselBackcolor;
			}else if(rec.vslStat === 'BBY') {
				vslBackcolor = me.meta.vesselPlannedBackcolor;
			}else if(rec.vslStat === 'ONB') {
				vslBackcolor = me.meta.vesselBerthedBackcolor;
			}else if(rec.vslStat === 'DPA') {
				vslBackcolor = me.meta.vesselDepartedBackcolor;
			}
		}
		//Draw Vessel Rect
		ctx.font = me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
		ctx.strokeStyle = me.meta.vesselGuideColor;
		ctx.fillStyle = me.meta.vesselBerthInfoBoxBackcolor;
		ctx.globalAlpha = "0.7";

		// var height = pos[3];
		// if((rec.berthAlongside == 'B' || rec.berthAlongside == 'T') && pos[3] < hgtOffset*2){
		// 	height *= 2;
		// }

		ctx.fillRect(me.x + pos[0],
				me.y + pos[1],
				pos[2],
				pos[3]);
		ctx.strokeRect(me.x + pos[0],
				me.y + pos[1],
				pos[2],
				pos[3]);
		
		var hgtOffset = ctx.measureText('W').width * 1.5;
		var inboxWidth = pos[2] * 6 / 10;
		
		//Draw Vessel InBox
		ctx.globalAlpha = "1";
		ctx.strokeStyle = me.meta.vesselGuideColor;
		ctx.fillStyle = vslBackcolor;
		
		ctx.fillRect(me.x + pos[0] + (pos[2] - inboxWidth) / 2,
				me.y + pos[1],
				inboxWidth,
				hgtOffset);
		ctx.strokeRect(me.x + pos[0] + (pos[2] - inboxWidth) / 2,
				me.y + pos[1],
				inboxWidth,
				hgtOffset);
		
		//Draw Bow
		var x, x2, x3;
		if(me.meta.alongsideProjection === 'OTI') {
			if(rec.berthAlongside === 'S') {
				x = me.meta.berthDirection === 'RTL' ? pos[0] + (pos[2] - inboxWidth) / 2 + inboxWidth : pos[0] + (pos[2] - inboxWidth) / 2;
				x2 = me.meta.berthDirection === 'RTL' ? pos[0]  + (pos[2] - inboxWidth) / 2 + inboxWidth + hgtOffset : pos[0] + (pos[2] - inboxWidth) / 2 - hgtOffset;
			} else if(rec.berthAlongside === 'P') {
				x = me.meta.berthDirection === 'RTL' ? pos[0] + (pos[2] - inboxWidth) / 2 : pos[0] + (pos[2] - inboxWidth) / 2 + inboxWidth;
				x2 = me.meta.berthDirection === 'RTL' ? pos[0] + (pos[2] - inboxWidth) / 2 - hgtOffset : pos[0]  + (pos[2] - inboxWidth) / 2 + inboxWidth + hgtOffset;
			} else if(rec.berthAlongside === 'B') {	//Bow
				x = pos[0] + pos[2] / 2;
				x2 = x - hgtOffset / 2;
				x3 = x + hgtOffset / 2;
				// y = pos[1] + pos[3];
				y = pos[1] + hgtOffset*2;
				y2 = y - hgtOffset;
			} else if(rec.berthAlongside === 'T') { //Stern
				x = pos[0] + pos[2] / 2;
				x2 = x - hgtOffset / 2;
				x3 = x + hgtOffset / 2;
				// y2 = pos[1] + pos[3];
				y2 = pos[1] + hgtOffset*2;
				y = y2 - hgtOffset;
			}
		} else {
			if(rec.berthAlongside === 'S') {
				x = me.meta.berthDirection === 'RTL' ? pos[0] + (pos[2] - inboxWidth) / 2 : pos[0] + (pos[2] - inboxWidth) / 2 + inboxWidth;
				x2 = me.meta.berthDirection === 'RTL' ? pos[0] + (pos[2] - inboxWidth) / 2 - hgtOffset : pos[0]  + (pos[2] - inboxWidth) / 2 + inboxWidth + hgtOffset;
			} else if(rec.berthAlongside === 'P') {
				x = me.meta.berthDirection === 'RTL' ? pos[0] + (pos[2] - inboxWidth) / 2 + inboxWidth : pos[0] + (pos[2] - inboxWidth) / 2;
				x2 = me.meta.berthDirection === 'RTL' ? pos[0]  + (pos[2] - inboxWidth) / 2 + inboxWidth + hgtOffset : pos[0] + (pos[2] - inboxWidth) / 2 - hgtOffset;
			} else if(rec.berthAlongside === 'B') {	//Bow
				x = pos[0] + pos[2] / 2;
				x2 = x - hgtOffset / 2;
				x3 = x + hgtOffset / 2;
				// y2 = pos[1] + pos[3];
				y2 = pos[1] + hgtOffset*2;
				y = y2 - hgtOffset;
			} else if(rec.berthAlongside === 'T') { //Stern
				x = pos[0] + pos[2] / 2;
				x2 = x - hgtOffset / 2;
				x3 = x + hgtOffset / 2;
				// y = pos[1] + pos[3];
				y = pos[1] + hgtOffset*2;
				y2 = y - hgtOffset;
			}
		}
		
		if(rec.berthAlongside === 'S' || rec.berthAlongside === 'P') {
			ctx.beginPath();
			ctx.moveTo(me.x + x, me.y + pos[1]);
			ctx.lineTo(me.x + x2, me.y + pos[1] + hgtOffset / 2);
			ctx.lineTo(me.x + x, me.y + pos[1] + hgtOffset);
			ctx.closePath();
			ctx.stroke();
		} else if(rec.berthAlongside === 'B' || rec.berthAlongside === 'T') {
			ctx.beginPath();
			ctx.moveTo(me.x + x, me.y + y);
			ctx.lineTo(me.x + x2, me.y + y2);
			ctx.lineTo(me.x + x3, me.y + y2);
			ctx.closePath();
			ctx.stroke();
		}
		
		//Vessel Call Id
		ctx.font = 'bold ' + me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillStyle = me.meta.vesselNameColor;
		//ctx.fillText(rec.jpvcNo + ' (' + rec.berthAlongside + ')', me.x + pos[0] + pos[2] / 2, me.y + pos[1]);
		ctx.fillText(rec.jpvcNo, me.x + pos[0] + pos[2] / 2, me.y + pos[1]+ hgtOffset / 2 - (hgtOffset / 4));

		
		//Start Pos, End Pos
		var startPos, endPos;
		var planInfo = me.getBerthPlanInfo(pos, rec);
		var leftPos = me.meta.berthDirection === 'RTL' ? planInfo[1] : planInfo[0];
		var rightPos = me.meta.berthDirection === 'RTL' ? planInfo[0] : planInfo[1];
		startPos = me.meta.berthDirection === 'RTL' ? rightPos : leftPos;
		endPos = me.meta.berthDirection === 'RTL' ? leftPos : rightPos;
		
		// if(rec.startPos && rec.startPos > 0){
		// 	startPos = rec.startPos;
		// 	endPos = rec.startPos + rec.loa;
		// }else{
		// 	startPos = rec.pstSta;
		// 	endPos = rec.pstSta + rec.loa;
		// }

		var posX = me.meta.berthDirection === 'RTL' ? pos[0] + pos[2] : pos[0];
		var align = me.meta.berthDirection === 'RTL' ? 'right' : 'left';
		ctx.font = me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = align;
		ctx.textBaseline = 'top';
		ctx.fillStyle = me.meta.vesselGuideColor;
		ctx.fillText(startPos , me.x + posX +1, me.y + pos[1] + 1 + hgtOffset);
		
		var posX = me.meta.berthDirection === 'RTL' ? pos[0] : pos[0] + pos[2];
		var align = me.meta.berthDirection === 'RTL' ? 'left' : 'right';
		ctx.font = me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = align;
		ctx.textBaseline = 'top';
		ctx.fillStyle = me.meta.vesselGuideColor;
		ctx.fillText(endPos , me.x + posX + 1, me.y + pos[1] + 1 + hgtOffset);
		
		//Arrival ~ Departure Time
		// var txt = Ext.Date.format(arrTime, 'm-d H:i') + ' ~ ' + Ext.Date.format(depTime, 'm-d H:i');
		// ctx.font = me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
		// ctx.textAlign = 'center';
		// ctx.textBaseline = 'top';
		// ctx.fillStyle = me.meta.vesselGuideColor;
		// ctx.fillText(txt , me.x + pos[0] + pos[2] / 2, me.y + pos[1] + hgtOffset + 1);
		
		//Vessel Name
		// var txt = rec.vesselName
		// ctx.font = me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
		// ctx.textAlign = 'center';
		// ctx.textBaseline = 'top';
		// ctx.fillStyle = me.meta.vesselGuideColor;
		// ctx.fillText(txt , me.x + pos[0] + pos[2] / 2, me.y + pos[1] + hgtOffset * 2);
		
	}
});
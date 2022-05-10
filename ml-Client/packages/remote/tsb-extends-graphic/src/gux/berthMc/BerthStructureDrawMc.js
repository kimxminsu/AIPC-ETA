/*
 * Monthly-Chart : Steve Lee (2021.04.05)
 * 
 * http://www.w3schools.com/tags/ref_canvas.asp 
 * 
 */
Ext.define('TSB.gux.berthMc.BerthStructureDrawMc', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-berthstructuredraw-mc',
    
	mixins : [
	          'TSB.gux.berthMc.BerthRendererMc'          
	],
    
	meta: {},
	berths: {},
	bitts: {},
	x: 0,
	y: 0,
	
	render: function(surface, ctx) {
		var me = this;
		
    	var viewSTSCoverageOffset = me.meta.viewSTSCoverage === 'Y' ? 1 : 0;
    	var viewTerminalNameOffset = me.meta.viewTerminalName === 'Y' ? 1 : 0;
    	var viewBerthNameOffset = me.meta.viewBerthName === 'Y' ? 1 : 0;
    	var viewMeterOffset = me.meta.viewMeter === 'Y' ? 1 : 0;
    	var viewBittOffset = me.meta.viewBitt === 'Y' ? 1 : 0;

		// Area 구분
    	var terminalAreaY = me.y;
    	var terminalAreaHeight = me.meta.baseFixedUnit * me.meta.terminalNameArea * viewTerminalNameOffset;

    	var stsAreaY = terminalAreaY + terminalAreaHeight;
    	var stsAreaHeight = me.meta.baseFixedUnit * me.meta.stsCoverageArea * viewSTSCoverageOffset;
    	
    	var berthAreaY = stsAreaY + stsAreaHeight;
    	var berthAreaHeight = me.meta.baseFixedUnit *  me.meta.berthNameArea * viewBerthNameOffset;
    	
    	var meterAreaY = berthAreaY + berthAreaHeight;
    	var meterAreaHeight = me.meta.baseFixedUnit * me.meta.meterArea * viewMeterOffset;
    	
    	var bittAreaY = meterAreaY + meterAreaHeight;
    	var bittAreaHeight = me.meta.baseFixedUnit * me.meta.bittArea * viewBittOffset;

		//Draw Berth Entire Rect
		ctx.strokeStyle = me.meta.timelineForecolor;
		ctx.fillStyle = me.meta.berthBackcolor;
		ctx.fillRect( me.x,
				me.y,
				me.meta.viewWidth,
				me.meta.berthHeight);

		ctx.strokeRect( me.x,
				me.y,
				me.meta.viewWidth,
				me.meta.berthHeight);

		// Split Line(TimeLineWidth) |
		ctx.beginPath();
		ctx.moveTo(me.meta.timelineWidth, me.y);
		ctx.lineTo(me.meta.timelineWidth, me.meta.berthHeight); 
		ctx.strokeStyle=me.meta.timelineForecolor;
		ctx.stroke();		
		
		// Draw [Berths]
		var terminalX = me.meta.berthDirection === 'RTL' ? me.meta.viewWidth : me.meta.timelineWidth;
		var berthX = me.meta.berthDirection === 'RTL' ? me.meta.viewWidth : me.meta.timelineWidth;
		var berthPos = 0;
		var dirOffset = me.meta.berthDirection === 'RTL' ? -1 : 1;
		var terminalLength = 0, preRecord;
		var berthLengthOffset = 0;
		
		me.berths.each(function(record,idx){
			var length = parseFloat(record.data.length) * me.meta.baseWidth * me.meta.baseBerthUnit;

			if(record.data.group === 1) {
				// Draw Berth Dash: 같은 Berth의 연속 인 경우 구분선 표시
				if(preRecord && preRecord.data.name === record.data.name) {
					ctx.beginPath();
					ctx.moveTo(berthX, berthAreaY);
					ctx.lineTo(berthX, berthAreaY + berthAreaHeight);
					ctx.strokeStyle = me.meta.berthLineColor;
					ctx.setLineDash([2]);
					ctx.stroke();
					ctx.setLineDash([]);
				}	

				// Draw Berth Type Line
				if(preRecord && preRecord.data.name !== record.data.name) {
					ctx.beginPath();
					ctx.moveTo(berthX, berthAreaY);
					ctx.lineTo(berthX, berthAreaHeight); 
					ctx.strokeStyle = me.meta.berthTypeLineColor;
					ctx.stroke();
					
					berthPos = 0;
				}	
				
				//Berth Name
				ctx.font = me.meta.berthNameFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = me.meta.berthNameColor;	
				ctx.fillText(record.data.name, berthX + length / 2 * dirOffset, berthAreaY + 4);

				// Berth length
				berthLengthOffset = ctx.measureText(record.data.name).width + me.meta.berthLengthOffset;
				ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = me.meta.defaultFontColor;

				if(record.data.length > 0)
					ctx.fillText(record.data.length, (berthX + length / 2 * dirOffset) + berthLengthOffset, berthAreaY + 4);

				// Draw Bitts
				var isBittExisted = false;
				me.bitts.each(function(bittRecord,idx){
					if(record.data.name === bittRecord.data.berth) {
						isBittExisted = true;
						
						var x = terminalX + bittRecord.data.x * me.meta.baseWidth * me.meta.baseBerthUnit * dirOffset;
						var y = bittAreaY + bittAreaHeight / 2;
						
						ctx.beginPath();
						ctx.arc(x, y, 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
						ctx.fillStyle = me.meta.bittColor;
						ctx.fill();
						
						//Bitt Name
						ctx.font = me.meta.bittFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'bottom';
						ctx.fillStyle = me.meta.bittNameColor;	
						ctx.fillText(bittRecord.data.name, x, y - 2);
						
						//Bitt Meter
						ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillStyle = me.meta.meterNameColor;	
						ctx.fillText(parseInt(bittRecord.data.x), x, meterAreaY + meterAreaHeight / 2);
						
					}
				});
				
				//Draw Meter if Bitt is not existed
				// if(!isBittExisted) {
				// 	for(var i=0; i<parseInt(record.data.length / me.meta.berthMeterGuideOffset); i++) {
				// 		var x = berthX + (i + 1) * me.meta.berthMeterGuideOffset * me.meta.baseWidth * me.meta.baseBerthUnit * dirOffset;
				// 		var posX = berthPos + (i + 1) * me.meta.berthMeterGuideOffset;
				// 		var y = bittAreaY + bittAreaHeight / 2;
						
				// 		//Meter Circle
				// 		ctx.beginPath();
				// 		ctx.arc(x, y, 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
				// 		ctx.fillStyle = me.meta.bittColor;
				// 		ctx.fill();
						
				// 		//Meter Name
				// 		ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
				// 		ctx.textAlign = 'center';
				// 		ctx.textBaseline = 'middle';
				// 		ctx.fillStyle = me.meta.meterNameColor;	
				// 		ctx.fillText(parseInt(posX), x, meterAreaY + meterAreaHeight / 2);
				// 	}
					
				// }
				
				// Next Record:
				terminalLength += length;
				berthX += length * dirOffset;
				berthPos += parseFloat(record.data.length);				
				preRecord = record;
			}
		});
	},
	
    render_back: function(surface, ctx) {
    	
    	var me = this;
    	var viewSTSCoverageOffset = me.meta.viewSTSCoverage === 'Y' ? 1 : 0;
    	var viewTerminalNameOffset = me.meta.viewTerminalName === 'Y' ? 1 : 0;
    	var viewBerthNameOffset = me.meta.viewBerthName === 'Y' ? 1 : 0;
    	var viewMeterOffset = me.meta.viewMeter === 'Y' ? 1 : 0;
    	var viewBittOffset = me.meta.viewBitt === 'Y' ? 1 : 0;

    	var terminalAreaY = me.y;
    	var terminalAreaHeight = me.meta.baseFixedUnit * me.meta.terminalNameArea * viewTerminalNameOffset;

    	var stsAreaY = terminalAreaY + terminalAreaHeight;
    	var stsAreaHeight = me.meta.baseFixedUnit * me.meta.stsCoverageArea * viewSTSCoverageOffset;
    	
    	var berthAreaY = stsAreaY + stsAreaHeight;
    	var berthAreaHeight = me.meta.baseFixedUnit *  me.meta.berthNameArea * viewBerthNameOffset;
    	
    	var meterAreaY = berthAreaY + berthAreaHeight;
    	var meterAreaHeight = me.meta.baseFixedUnit * me.meta.meterArea * viewMeterOffset;
    	
    	var bittAreaY = meterAreaY + meterAreaHeight;
    	var bittAreaHeight = me.meta.baseFixedUnit * me.meta.bittArea * viewBittOffset;

		//Draw Entire Rect
		ctx.strokeStyle = me.meta.timelineForecolor;
		ctx.fillStyle = me.meta.berthBackcolor;
		ctx.fillRect( me.x,
				me.y,
				me.meta.viewWidth,
				me.meta.berthHeight);

		ctx.strokeRect( me.x,
				me.y,
				me.meta.viewWidth,
				me.meta.berthHeight);

		ctx.beginPath();
		ctx.moveTo(me.meta.timelineWidth, me.y);
		ctx.lineTo(me.meta.timelineWidth, me.meta.berthHeight); 
		ctx.strokeStyle=me.meta.timelineForecolor;
		ctx.stroke();
		
		// Draw Berths
		var terminalX = me.meta.berthDirection === 'RTL' ? me.meta.viewWidth : me.meta.timelineWidth;
		var berthX = me.meta.berthDirection === 'RTL' ? me.meta.viewWidth : me.meta.timelineWidth;
		var berthPos = 0;
		var dirOffset = me.meta.berthDirection === 'RTL' ? -1 : 1;
		var terminalLength = 0, preRecord;
		var berthLengthOffset = 0;
		
		me.berths.each(function(record,idx){	// Record-Data 기준으로 Berth Drawing
			if(record.data.drawable === 1) {
				if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					var length = parseFloat(record.data.length) * me.meta.baseWidth * me.meta.baseBerthUnit;
				} else {
					var length = me.meta.baseFixedBerthWidth * me.meta.baseBerthUnit;	// Berth-Length 기본길이
				}
				
				//Draw Berth Dash
				if(preRecord && preRecord.data.berthNm === record.data.berthNm) {
					ctx.beginPath();
					ctx.moveTo(berthX, berthAreaY);
					ctx.lineTo(berthX, berthAreaY + berthAreaHeight);
					ctx.strokeStyle=me.meta.berthLineColor;
					ctx.setLineDash([2]);
					ctx.stroke();
					ctx.setLineDash([]);
				}
				
				//Draw Berth Type Line
				if(preRecord && preRecord.data.berthNm !== record.data.berthNm) {
					ctx.beginPath();
					ctx.moveTo(berthX, berthAreaY);
					ctx.lineTo(berthX, bittAreaY + bittAreaHeight); 
					ctx.strokeStyle=me.meta.berthTypeLineColor;
					ctx.stroke();
					
					berthPos = 0;
				}
				
				//Berth Name
				ctx.font = me.meta.berthNameFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = me.meta.berthNameColor;	
				ctx.fillText(record.data.berthCd, berthX + length / 2 * dirOffset, berthAreaY);

				// Berth length
				berthLengthOffset = ctx.measureText(record.data.berthCd).width + me.meta.berthLengthOffset;
				ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = me.meta.defaultFontColor;

				if(record.data.length > 0)
					ctx.fillText(record.data.length, (berthX + length / 2 * dirOffset) + berthLengthOffset, berthAreaY);
				
				//Draw Terminal Line
				if(preRecord && preRecord.data.terminalCd !== record.data.terminalCd) {
					ctx.beginPath();
					ctx.lineWidth=3;
					ctx.moveTo(berthX, terminalAreaY);
					ctx.lineTo(berthX, bittAreaY + bittAreaHeight); 
					ctx.strokeStyle=me.meta.timelineForecolor;
					ctx.stroke();
					ctx.lineWidth=1;
					
					//Terminal Name
					ctx.font = me.meta.terminalNameFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'top';
					ctx.fillStyle = me.meta.terminalNameColor;	
					ctx.fillText(preRecord.data.terminalCd, terminalX + terminalLength / 2 * dirOffset, terminalAreaY);

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
							var y = bittAreaY + bittAreaHeight / 2;
							
							ctx.beginPath();
							ctx.arc(x, y, 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
							ctx.fillStyle = me.meta.bittColor;
							ctx.fill();
							
							//Bitt Name
							ctx.font = me.meta.bittFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
							ctx.textAlign = 'center';
							ctx.textBaseline = 'bottom';
							ctx.fillStyle = me.meta.bittNameColor;	
							ctx.fillText(bittRecord.data.bittCd, x, y - 2);
							
							//Bitt Meter
							ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.fillStyle = me.meta.meterNameColor;	
							ctx.fillText(parseInt(bittRecord.data.xPos), x, meterAreaY + meterAreaHeight / 2);
							
						}
					});
					
					//Draw Meter if Bitt is not existed
					if(!isBittExisted) {
						for(var i=0; i<parseInt(record.data.length / me.meta.berthMeterGuideOffset); i++) {
							var x = berthX + (i + 1) * me.meta.berthMeterGuideOffset * me.meta.baseWidth * me.meta.baseBerthUnit * dirOffset;
							var posX = berthPos + (i + 1) * me.meta.berthMeterGuideOffset;
							var y = bittAreaY + bittAreaHeight / 2;
							
							//Meter Circle
							ctx.beginPath();
							ctx.arc(x, y, 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
							ctx.fillStyle = me.meta.bittColor;
							ctx.fill();
							
							//Meter Name
							ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.fillStyle = me.meta.meterNameColor;	
							ctx.fillText(parseInt(posX), x, meterAreaY + meterAreaHeight / 2);
						}
						
					}
				} else {
					//Jetty
					var x = berthX + length / 2 * dirOffset;
					var y = bittAreaY + bittAreaHeight / 2;
					
					//Meter Circle
					ctx.beginPath();
					ctx.arc(x, y, 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
					ctx.fillStyle = me.meta.bittColor;
					ctx.fill();
					
					//Meter Name
					ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillStyle = me.meta.meterNameColor;	
					ctx.fillText(parseInt(record.data.length / 2), x, meterAreaY + meterAreaHeight / 2);
				}
				
				terminalLength += length;
				berthX += length * dirOffset;
				berthPos += parseFloat(record.data.length);
				preRecord = record;
			}
		});
		
		//Draw Last Terminal Name
		if(preRecord) {
			ctx.font = me.meta.terminalNameFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillStyle = me.meta.terminalNameColor;	
			ctx.fillText(preRecord.data.terminalCd, terminalX + terminalLength / 2 * dirOffset, terminalAreaY + 10);
		}
    }
});
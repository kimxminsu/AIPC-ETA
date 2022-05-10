//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselOutBayDraw', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.draw.sprite.Line',
	
	alias: 'widget.app-vesseloutbaydraw',
	
	mixins : [
	          'TSB.gux.vessel.VesselOutRenderer'          
	],
	
	meta: {},
    bay: {},
    preBay:{},
    postBay: {},
    vsl: {},
    bayX: 0,
    bayY: 0,
    viewMode:'',
    asc: {},
	serviceLane: {},
	ports: {},
    slotMeta: {},
    cellDisplayOption: '',		//POD, POL, POD2 - by user config
    pol: '',
    polVoyage: '',
    polTerminal: '',
    polBerth: '',
    pod: '',
    podTerminal: '',
    podBerth: '',
    seqNo: '',
    maskType: '',				//45, 48, 53, 63, RF
    blinkType: '',				//REMARK, RESTOW, BBAK, RF, HC, POS, 45, EMTY
	planSize: 20,
    filterItems: null,
    selectedItems: [],
    
    render: function(surface, ctx) {
    	
//    	var bayDrawStart = new Date().getTime();
    	
    	var me = this;
		var rows = me.bay.rowEndIndex + 1;
		var tiers = me.bay.deckTierEndIndex + 1;
		var seq = 1;
		//console.log(rows);
    	var ratio = parseFloat((me.meta.baseUnit / me.meta.baseUnitOrign).toFixed(2));
		/*if(ratio >= 1) {
			ctx.lineWidth = 1;
		} else if(ratio >= 0.8) {
			ctx.lineWidth = 0.8;
		} else if(ratio > 0.5) {
			ctx.lineWidth = 0.5;
		} else {
			ctx.lineWidth = 0.4;
		}*/
		ctx.lineWidth = (me.meta.baseUnit / me.meta.baseUnitOrign * 0.4).toFixed(1);

	    //Cell
	    var cellPosX, cellPosY, flag, cntrInfo, cellInfo, cellWidth,
	        colors, backcolor, backColorBottom, forecolor, foreColorBottom, varText, 
	        cargoType, cntrType1, cntrType2, cntrTp, x, xx, y, yy;
	    
	    //Make a gap between row for lashing bridge
	    var rowGap = 0.5;
	    if (/hatch|bay/.test(me.viewMode)) {
    		ctx.font = 'bold ' + parseFloat(me.meta.fontSizeCell.toFixed(1)) + 'px ' + me.meta.fontType;
    		cellWidth = me.meta.cellWidth - Math.round(rowGap * me.meta.baseUnit * 2);
    	} else {
    		ctx.font = 'bold ' + parseFloat((me.meta.fontSizeCell * 1.2).toFixed(1)) + 'px ' + me.meta.fontType;
    		cellWidth = me.meta.cellWidth;
    	}
		
	    for(var j=0;j<rows;j++) {
	    	
	    	var accumulatedHgt = 0, hq, hgt;
	    	for(var k=0;k<tiers;k++) {
				
				
	    		if(me.bay.outcells[k][j].value > 0) {
		    		
	    			//****get cell info.
	            	cellInfo = me.bay.outcells[k][j];
	            	var hd = k > me.bay.holdTierEndIndex ? 'D' : 'H';
	            	hgt = me.meta.generalContainerHeight;
	            	
	            	if(me.meta.highCubicViewMode === 'Y') {
						if(cellInfo.status === 'S') {
							if(me.asc.getById(cellInfo.id)) {
								hgt = me.asc.getById(cellInfo.id).data.height;
							}
						} else if(cellInfo.status === 'X') {
							var id = cellInfo.postId || cellInfo.preId; 
							if(me.asc.getById(id)) {
								hgt = me.asc.getById(id).data.height;
							}
						}
						
						accumulatedHgt = k === me.bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
						accumulatedHgt += (me.getCellHeight(hgt) - me.meta.cellHeight);
					}
	            	
	    			cellPosY = me.getCellY(me.bay, me.bayY, k) - accumulatedHgt;
		    		cellPosX = me.getCellX(me.bay, me.bayX, j, hd);
		    		//Make a gap between row for lashing bridge
	            	x = /hatch|bay/.test(me.viewMode) ? cellPosX + Math.round(rowGap * me.meta.baseUnit) : cellPosX;
	            	y = cellPosY;
	            	xx = x + cellWidth;
	            	yy = y + me.getCellHeight(hgt);	
	            	
	            	//0.5 make line clear
	            	if(Number.isInteger(x)) x+=0.5;
					if(Number.isInteger(y)) y+=0.5;
					if(Number.isInteger(xx)) xx+=0.5;
					if(Number.isInteger(yy)) yy+=0.5;
	            	
	            	
	            	//****get setting for drawing config
	            	//Only for Vessel is applicable 2 bay mode. For Hold/Hatch View is always 3 bay mode
	            	flag = true;
	            	if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') {
	            		if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
	            			if(me.bay.pos === 'F') {
	            				//Consider 2x20' hatch, 1x20' hatch
	            				if(me.bay.bayListInHatch.length > 2) flag =  me.postBay && me.postBay.outcells[k][j].value <= 0 ? true : me.bay.outcells[k][j].status === 'S' ? true : false;
	            			} else if(me.bay.pos === 'M') {
	            				if(me.preBay && me.preBay.hatchNo === me.bay.hatchNo) flag = me.preBay.outcells[k][j].status === 'S' ? false : true;
	            			} else if(me.bay.pos === 'A') {
	            				flag = true;
	            			}
	            		} else {
	            			if(me.bay.pos === 'F') {
	            				flag = true;
	            			} else if(me.bay.pos === 'M') {
	            				if(me.postBay && me.postBay.hatchNo === me.bay.hatchNo) flag = me.postBay.outcells[k][j].status === 'S' ? false : true;
	            			} else if(me.bay.pos === 'A') {
	            				//Consider 2x20' bay
	            				if(me.bay.bayListInHatch.length > 2) flag =  me.preBay && me.preBay.outcells[k][j].value <= 0 ? true : me.bay.outcells[k][j].status === 'S' ? true : false;
	            			}
	            		}
	            	}

	            	if (flag){
						//****draw cntr info
						if (!me.blinkType) {
			            	//****get color info & fill color in cell 
			            	backcolor = 'white'; 
			            	forecolor = me.meta.cellGuideColor;
			            	if (cellInfo.status === 'S' && me.asc.getById(cellInfo.id)) {
			            		//****get cntr info
			            		cntrInfo = me.asc.getById(cellInfo.id);
								// if(cntrInfo.data.cntrNo == 'MRKU4153357'){
								// 	console.log(cellInfo.status);
								// 	//FCIU4697064
								// 	debugger;
								// }
								
			            		var displayOpt = me.cellDisplayOption;
		            			var isNotFilteredItem = false;
		            			var isSelectedItem = false;
			            		
			            		if(me.filterItems) {
			            			for(var f=0;f<me.filterItems.length;f++) {
			            				if(me.filterItems.getAt(f).id === cntrInfo.id) {
			            					isNotFilteredItem = true;
			            					break;
			            				}
			            			}
			            		} else {
			            			isNotFilteredItem = true;
			            		}
			            		
			            		if(me.selectedItems) {
			            			for(var s=0;s<me.selectedItems.length;s++) {
			            				if(me.selectedItems[s].id === cntrInfo.id) {
			            					isSelectedItem = true;
			            					break;
			            				}
			            			}
			            		}
			            		
			            		if(isNotFilteredItem) {
			            			if(isSelectedItem) {
				            			colors = ['gray', 'white'];	//Back, Fore
				            		} else {
				            			colors = me.getColor(displayOpt, 'backcolor', cntrInfo.data, me.ports);
				            		}
			            		} else {
			            			colors = ['#D3D3D3', '#D3D3D3'];	//Back, Fore
			            		}
								
			            		//To differentiate the Pre-Plan, Palette, LoadList Plan
			            		if(cntrInfo.data.planMode === 'P' || cntrInfo.data.planMode === 'A') {
			            			ctx.globalAlpha = 0.7;
			            		} else {
			            			ctx.globalAlpha = 1;
			            		}
			            		
								//ship cell 사각형 그리기 (기본 POD 색상)
								//사각형 셀 배경 그리고 left-top, center, right-top에 들어가는 slot 정보 그리고
								//backColorBottom 색상 다르면 bottom Text 전에 그려야 bottomText가 보이므로 
								//slot 정보 - bottom 색상 - bottom Text 순으로 그려준다.
								if (/POD|UNNO|SZTP|SZTP2/.test(displayOpt)) { //total
									backcolor = colors[0];
									forecolor = colors[1];
									backColorBottom = '';
									foreColorBottom = '';				
									ctx.fillStyle = backcolor;
									ctx.fillRect(x,y,xx-x,yy-y);
								} else if (/OPR|POL|HOLD|WGT|WGTGRP|NIY/.test(displayOpt)) { //top - bottom
									backcolor = colors[0];
									forecolor = colors[1];
									backColorBottom = colors[2];
									foreColorBottom = colors[3];
									if(backcolor === backColorBottom){ //색상 같으면 total 사각형 그린다
										ctx.fillStyle = backcolor;
										ctx.fillRect(x,y,xx-x,yy-y);
									}else{
										//위쪽 사각형 (2/3 정도)
										ctx.fillStyle = backcolor;
										ctx.fillRect(x, y, xx-x, (yy-y)*(2/3));
										//backColor backColorBottom 색상 다르면 bottomText(bText) 그리기 전 bottom Color 그리기
									}									
								}

								//20' 40' 음영 만들기
								if(Number(cntrInfo.data.size) != me.planSize){
									var lineGap = Number((me.meta.baseUnit / me.meta.baseUnitOrign * 0.9).toFixed(1));
									ctx.beginPath();
									ctx.moveTo(x, y + lineGap);
									ctx.lineTo(x + (xx-x), y + lineGap);
									ctx.moveTo(x + lineGap, y);
									ctx.lineTo(x + lineGap, y + (yy-y));
									ctx.strokeStyle = 'white';
									ctx.lineWidth = lineGap;
                                    ctx.stroke();
                                    ctx.beginPath();

                                    ctx.beginPath();

                                    ctx.moveTo(x + (xx-x) - lineGap, y);
									ctx.lineTo(x + (xx-x) - lineGap, y + (yy -y));
									ctx.moveTo(x, y + (yy-y) - lineGap);
									ctx.lineTo(x + (xx-x), y + (yy-y) - lineGap);
									ctx.strokeStyle = 'dimgray';
									ctx.lineWidth = lineGap;
									ctx.stroke();
									
									ctx.beginPath();
								}
								ctx.lineWidth = (me.meta.baseUnit / me.meta.baseUnitOrign * 0.4).toFixed(1);
								ctx.globalAlpha = 1;
								
								if (/hatch|bay/.test(me.viewMode)) {									
									me.slotMeta.each(function(record, idx, count){
										if(/hatch|bay/.test(record.data.level)) {
											//[posX, posY, posW, posH, posR, textAlign]
											var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
												
											if(record.data.type === 'text') {
												var value = me.getCellDrawValue(record, cntrInfo, cellInfo);
												if(record.data.item === 'unnonum') {
													if(cntrInfo.data.unno != null && cntrInfo.data.unno != '' && (cntrInfo.data.obSeqNo == null || cntrInfo.data.obSeqNo == '')){
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 1.1 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.unno,pos[0],pos[1]);
													}
												}
												//center
												if(record.data.item === 'obSeqNo') {
													ctx.font = 'bold '+parseFloat((me.meta.fontSizeCell).toFixed(1)) * 1.5 + 'px ' + me.meta.fontType;
													ctx.textAlign = pos[5];
													ctx.textBaseline = record.data.align ? record.data.align :'middle';
													ctx.fillStyle = forecolor;
													ctx.fillText(cntrInfo.data.obSeqNo,pos[0],pos[1]);
												}
												//left second
												if(record.data.item === 'widthType2') {
													if(cntrInfo.data.widthType2 != null && cntrInfo.data.widthType2 != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 1 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.widthType2,pos[0],pos[1]);
													}
												}
												//left top
												if(record.data.item === 'size2') {
													if(cntrInfo.data.size2 != null && cntrInfo.data.size2 != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 1 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.size2,pos[0],pos[1]);
													}
												}	
												//right top
												if(record.data.item === 'obEquNo') {
													if(cntrInfo.data.obEquNo != null && cntrInfo.data.obEquNo != '' && cntrInfo.data.obEquNo != 0){
														if(record.data.section === 'C'){
															pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
															//rectangle
															var pos2 = me.getCellDrawPos(record.data.section, record.data.scope, 'rect', x, y, xx-x, yy-y);
															ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 1 + 'px ' + me.meta.fontType;
															ctx.textAlign = pos[5];
															ctx.textBaseline = record.data.align ? record.data.align :'middle';
															var QCColor = me.getQCColor(cntrInfo.data.obEquStr);
															ctx.fillStyle = '#' + QCColor[0];//'#000'; //equNo 크레인 색상
  
															ctx.fillRect(pos2[0], pos2[1], pos2[2], pos2[3]);	
															ctx.fillStyle = '#' + QCColor[1];
															
															ctx.fillText(cntrInfo.data.obEquNo,pos[0],pos[1]);
														}
													}
												}	
												// if(value){
												// 	if(record.data.item === 'weight') {
												// 		ctx.font = 'bold ' + parseFloat((me.meta.fontSizeCell * 1.2).toFixed(1)) + 'px ' + me.meta.fontType;
												// 	} else {
												// 		ctx.font = 'bold ' + parseFloat(me.meta.fontSizeCell.toFixed(1)) + 'px ' + me.meta.fontType;
												// 	}
												// 	ctx.textAlign = pos[5];
												// 	ctx.textBaseline = record.data.align ? record.data.align :'middle';
												// 	ctx.fillStyle = forecolor;
												// 	//ctx.fillText('2',pos[0],pos[1]);	
												// }
											}else if(record.data.type === 'diamond') {	
												if(record.data.item === 'unno') {
													if(cntrInfo.data.unno != null && cntrInfo.data.unno != '' || cntrInfo.data.imdg != null && cntrInfo.data.imdg != '' ){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														
														ctx.beginPath();
														ctx.moveTo(pos[0]+pos[2]/2,pos[1]);
														ctx.lineTo(pos[0],pos[1]+pos[3]/2);
														ctx.lineTo(pos[0]+pos[2]/2,pos[1]+pos[3]);
														ctx.lineTo(pos[0]+pos[2],pos[1]+pos[3]/2);
														ctx.lineTo(pos[0]+pos[2]/2,pos[1]);
														if(record.data.style === 'fill') {
															ctx.fillStyle = forecolor;
															ctx.fill();
														} else {
															ctx.strokeStyle = forecolor;
															ctx.stroke();
														}
														
														ctx.beginPath();
													}
												}
											}
											if(record.data.type === 'rect') {	
												if(record.data.item === 'isObDone') { //대각선 긋기
													if(cntrInfo.data.isObDone == true || cntrInfo.data.state === CodeConstants.CntrState.DELIVERED){
														var offset = cellWidth / 2;
														var cx = Math.round(x + cellWidth / 2);
														var cy = Math.round(y + (me.getCellHeight(hgt) / 2));
														ctx.beginPath();
														ctx.strokeStyle = forecolor;
														ctx.moveTo(cx, cy);
														ctx.lineTo(cx - offset, cy + offset);
														ctx.moveTo(cx, cy);
														ctx.lineTo(cx + offset, cy - offset);
														ctx.stroke();
														ctx.beginPath();
													}
												}

												if(record.data.item === 'obTwin') { //D 포지션에 사각형
													if(cntrInfo.data.obTwin == true){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.strokeStyle = forecolor;
														ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
													}
												}
												
												if(record.data.item === 'isDual') { //D 포지션에 사각형
													if(cntrInfo.data.isIbDual == true || cntrInfo.data.isObDual == true){
														
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.strokeStyle = forecolor;
														ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
													}
												}
											}
											if(record.data.type === 'circle') {	
												if(record.data.item === 'rstTime') { //circle
													if(cntrInfo.data.rstTime > CodeConstants.RST_NONE && cntrInfo.data.rstTime < CodeConstants.RST_ROB){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.beginPath();
														ctx.arc(pos[0],pos[1],pos[4],0,2*Math.PI);
														if(record.data.style === 'fill') {
															ctx.fillStyle = forecolor;
															ctx.fill();
														} else {
															ctx.strokeStyle = forecolor;
															ctx.stroke();
														}
														ctx.beginPath();
													}
												}
																																		
											}
												/*
											} else if(record.data.type === 'rect') {
												var colors = me.getCellDrawValue(record, cntrInfo, cellInfo);
												if(colors) {
													ctx.fillStyle = colors[0];
													if(record.data.style === 'fill') {
														ctx.fillRect(pos[0], pos[1], pos[2], pos[3]);
													} else {
														ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
													}
												}
											} else if(record.data.type === 'circle') {
												var colors = me.getCellDrawValue(record, cntrInfo, cellInfo);
												if(colors) {
													ctx.beginPath();
													ctx.strokeStyle = colors[1];
													ctx.fillStyle = colors[0];
													ctx.arc(pos[0],pos[1],pos[4],0,2*Math.PI);
													if(record.data.style === 'fill') {
														ctx.fill();
													} else {
														ctx.stroke();
													}
													ctx.beginPath()
												}*/
											
										}
									});
								}

				                if (/vessel|hold/.test(me.viewMode)) {
				                	me.slotMeta.each(function(record, idx, count){
				                		if(/vessel|hold/.test(record.data.level)) {
											var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
				                			if(record.data.type === 'text') {	
												var value = me.getCellDrawValue(record, cntrInfo, cellInfo);
												
												//center
												if(record.data.item === 'unnonum') {
													if(cntrInfo.data.unno != null && cntrInfo.data.unno != '' && (cntrInfo.data.obSeqNo == null || cntrInfo.data.obSeqNo == '')){
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 0.5 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.unno,pos[0],pos[1]);
													}
												}
												if(record.data.item === 'obSeqNo') {
													if(cntrInfo.data.obSeqNo != null && cntrInfo.data.obSeqNo != ''){
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 0.7 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.obSeqNo,pos[0],pos[1]);
													}
												}	
												
												//left second
												if(record.data.item === 'widthType2') {
													if(cntrInfo.data.widthType2 != null && cntrInfo.data.widthType2 != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 0.5 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.widthType2,pos[0],pos[1]);
													}
												}	
											
												//left top
												if(record.data.item === 'size2') {
													if(cntrInfo.data.size2 != null && cntrInfo.data.size2 != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 0.5 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';
														ctx.fillStyle = forecolor;
														ctx.fillText(cntrInfo.data.size2,pos[0],pos[1]);
													}
												}	
												//right top
												if(record.data.item === 'obEquNo') {
													if(cntrInfo.data.obEquNo != null && cntrInfo.data.obEquNo != '' && cntrInfo.data.obEquNo != 0){
														if(record.data.section === 'C'){
															pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
															//rectangle
															var pos2 = me.getCellDrawPos(record.data.section, record.data.scope, 'rect', x, y, xx-x, yy-y);
															ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 0.5 + 'px ' + me.meta.fontType;
															ctx.textAlign = pos[5];
															ctx.textBaseline = record.data.align ? record.data.align :'middle';
															var QCColor = me.getQCColor(cntrInfo.data.obEquStr);
															ctx.fillStyle = '#' + QCColor[0]; //equNo 크레인 색상

															ctx.fillRect(pos2[0], pos2[1], pos2[2], pos2[3]);	
															ctx.fillStyle = '#' + QCColor[1];
															ctx.fillText(cntrInfo.data.obEquNo,pos[0],pos[1]);
														}
													}
												}										
				                			}else if(record.data.type === 'diamond') {	
												if(record.data.item === 'unno') {
													if(cntrInfo.data.unno != null && cntrInfo.data.unno != '' || cntrInfo.data.imdg != null && cntrInfo.data.imdg != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														
														ctx.beginPath();
														ctx.moveTo(pos[0]+pos[2]/2,pos[1]);
														ctx.lineTo(pos[0],pos[1]+pos[3]/2);
														ctx.lineTo(pos[0]+pos[2]/2,pos[1]+pos[3]);
														ctx.lineTo(pos[0]+pos[2],pos[1]+pos[3]/2);
														ctx.lineTo(pos[0]+pos[2]/2,pos[1]);
														if(record.data.style === 'fill') {
															ctx.fillStyle = forecolor;
															ctx.fill();
														} else {
															ctx.strokeStyle = forecolor;
															ctx.stroke();
														}
														
														ctx.beginPath();
													}
												}
											}
											if(record.data.type === 'rect') {	
												if(record.data.item === 'isObDone') { //대각선 긋기
													//isObDone에 들어오는 데이터가, Delivered면 이미 입고, 출고 된 Container이므로 아래 와 같이 변경함
													if(cntrInfo.data.isObDone == true || cntrInfo.data.state === CodeConstants.CntrState.DELIVERED){
														var offset = cellWidth / 2;
														var cx = Math.round(x + cellWidth / 2);
														var cy = Math.round(y + (me.getCellHeight(hgt) / 2));
														ctx.beginPath();
														ctx.strokeStyle = forecolor;
														ctx.moveTo(cx, cy);
														ctx.lineTo(cx - offset, cy + offset);
														ctx.moveTo(cx, cy);
														ctx.lineTo(cx + offset, cy - offset);
														ctx.stroke();
														ctx.beginPath();
													}
												}
												if(record.data.item === 'obTwin') { //D 포지션에 사각형
													if(cntrInfo.data.obTwin == true){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.strokeStyle = forecolor;
														ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
													}
												}
												// if(record.data.item === 'isDual') { //대각선 긋기
												// 	if(cntrInfo.data.ibDual == true || cntrInfo.data.obDual == true){
												// 		pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
												// 		ctx.strokeStyle = forecolor;
												// 		ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
												// 	}
												// }																					
											}
											if(record.data.type === 'circle') {	
												if(record.data.item === 'rstTime') { //circle
													if(cntrInfo.data.rstTime > CodeConstants.RST_NONE && cntrInfo.data.rstTime < CodeConstants.RST_ROB){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.beginPath();
														ctx.arc(pos[0],pos[1],pos[4],0,2*Math.PI);
														if(record.data.style === 'fill') {
															ctx.fillStyle = forecolor;
															ctx.fill();
														} else {
															ctx.strokeStyle = forecolor;
															ctx.stroke();
														}
														ctx.beginPath()
													}
												}
																																		
											}
				                		}
				                	});				                		
						        }

								if (/OPR|POL|HOLD|WGT|WGTGRP|NIY/.test(displayOpt)) { //bottom Rect 그리기
									//색상 다르면 글자를 덮도록 bottomColor Rect 나중에 그려줌
									if(backcolor != backColorBottom){
										ctx.fillStyle = backColorBottom; 
										//중간의 seqNo가 가려지기 때문에 2/3 지점을 POD 색상, 하단의 1/3지점을 bottom 색상으로 사용
										ctx.fillRect(x, y + (yy-y)*(2/3), xx-x, (yy-y)/3); 
									}									
								}

								//bottomText 따로 드로잉
								if (/hatch|bay/.test(me.viewMode)) {
									me.slotMeta.each(function(record, idx, count){
										if(/hatch|bay/.test(record.data.level)) {
											//[posX, posY, posW, posH, posR, textAlign]
											var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
											if(record.data.type === 'text') {
												//bottom
												if(record.data.item === 'bText') {
													if(cntrInfo.data.bText != null && cntrInfo.data.bText != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 1 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';   
														ctx.fillStyle = nullChk_(foreColorBottom) ? forecolor : foreColorBottom;
														ctx.fillText(cntrInfo.data.bText,pos[0],pos[1]);
													}
												}	
											}
										}
									});
								}

								if (/vessel|hold/.test(me.viewMode)) {
									me.slotMeta.each(function(record, idx, count){
				                		if(/vessel|hold/.test(record.data.level)) {
											var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
				                			if(record.data.type === 'text') {	
												//bottom
												if(record.data.item === 'bText') {
													if(cntrInfo.data.bText != null && cntrInfo.data.bText != ''){
														pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
														ctx.font = parseFloat((me.meta.fontSizeCell).toFixed(1)) * 0.5 + 'px ' + me.meta.fontType;
														ctx.textAlign = pos[5];
														ctx.textBaseline = record.data.align ? record.data.align :'middle';   
														ctx.fillStyle = nullChk_(foreColorBottom) ? forecolor : foreColorBottom;
														ctx.fillText(cntrInfo.data.bText,pos[0],pos[1]);
													}
												}		
											}
										}
									});
								}

				                
				                //For OOG over slot
				                if(cntrInfo.data.osh > 0 || cntrInfo.data.osp > 0 || cntrInfo.data.oss > 0) {
				                	ctx.beginPath();
						            ctx.strokeStyle = 'black';
						            ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign * 3 ;
						            
					            	var px,py,py,sx,sy;
					            	if(cntrInfo.data.osp > 0 && cntrInfo.data.oss > 0 && cntrInfo.data.osh > 0) {
					            		px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
					            		py = y + me.getCellHeight(hgt) / 2;
					            		sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
					            		sy = y + me.getCellHeight(hgt) / 2;
					            		
					            		//Port Side
										ctx.moveTo(x, py);
										ctx.lineTo(px, py);
										
										//Height
										ctx.lineTo(px, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(sx, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(sx, sy);
										
										//Starboard
										ctx.lineTo(x+cellWidth, sy);
					            		
					            	} else if(cntrInfo.data.osp > 0 && cntrInfo.data.osh > 0) {
					            		px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
					            		py = y + me.getCellHeight(hgt) / 2;
					            		
					            		//Port Side
										ctx.moveTo(x, py);
										ctx.lineTo(px, py);
										
										//Height
										ctx.lineTo(px, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(x + cellWidth / 2, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(x + cellWidth / 2, y);
										
					            	} else if(cntrInfo.data.oss > 0 && cntrInfo.data.osh > 0) {
					            		sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
					            		sy = y + me.getCellHeight(hgt) / 2;
										
										//Height
					            		ctx.moveTo(x + cellWidth / 2, y);
										ctx.lineTo(x + cellWidth / 2, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(sx, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(sx, sy);
										
										//Starboard
										ctx.lineTo(x+cellWidth, sy);
					            		
					            	} else if(cntrInfo.data.osp > 0 && cntrInfo.data.oss > 0) {
					            		px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
					            		py = y + me.getCellHeight(hgt) / 3 * 2;
					            		sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
					            		sy = y + me.getCellHeight(hgt) / 3 * 2;
					            		
					            		//Port Side
										ctx.moveTo(x, py);
										ctx.lineTo(px, py);
										ctx.lineTo(px, y + me.getCellHeight(hgt) / 3);
										ctx.lineTo(x, y + me.getCellHeight(hgt) / 3);
										
										//Starboard
										ctx.moveTo(x + cellWidth, y + me.getCellHeight(hgt) / 3);
										ctx.lineTo(sx, y + me.getCellHeight(hgt) / 3);
										ctx.lineTo(sx, sy);
										ctx.lineTo(x + cellWidth, sy);
										
					            	} else if(cntrInfo.data.osp > 0) {
					            		px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
					            		py = y + me.getCellHeight(hgt) / 3 * 2;
					            		
					            		//Port Side
										ctx.moveTo(x, py);
										ctx.lineTo(px, py);
										ctx.lineTo(px, y + me.getCellHeight(hgt) / 3);
										ctx.lineTo(x, y + me.getCellHeight(hgt) / 3);
					            		
					            	} else if(cntrInfo.data.oss > 0) {
					            		sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
					            		sy = y + me.getCellHeight(hgt) / 3 * 2;
					            		
					            		//Starboard
										ctx.moveTo(x + cellWidth, y + me.getCellHeight(hgt) / 3);
										ctx.lineTo(sx, y + me.getCellHeight(hgt) / 3);
										ctx.lineTo(sx, sy);
										ctx.lineTo(x + cellWidth, sy);
					            		
					            	} else if(cntrInfo.data.osh > 0) {
										//Height
					            		ctx.moveTo(x + cellWidth / 3, y);
										ctx.lineTo(x + cellWidth / 3, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(x + cellWidth / 3 * 2, y - me.getCellHeight(hgt) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
										ctx.lineTo(x + cellWidth / 3 * 2, y);
					            	}
									
									ctx.stroke();
									ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign;
									ctx.beginPath();
				                }
				                
					            
							} else if (cellInfo.status === 'X'){
								var flag = true;
								if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2' && parseInt(me.bay.name) % 2 === 0){
									flag = false;
								}
								
								if(flag){
									var offset = cellWidth / 6;
									var cx = Math.round(x + cellWidth / 2);
									var cy = Math.round(y + (me.getCellHeight(hgt) / 2));
									ctx.beginPath();
									ctx.strokeStyle = me.meta.cellGuideColor;
									ctx.moveTo(cx, cy);
									ctx.lineTo(cx - offset, cy - offset);
									ctx.moveTo(cx, cy);
									ctx.lineTo(cx - offset, cy + offset);
									ctx.moveTo(cx, cy);
									ctx.lineTo(cx + offset, cy - offset);
									ctx.moveTo(cx, cy);
									ctx.lineTo(cx + offset, cy + offset);
									ctx.stroke();
									ctx.beginPath();
								}
								
							} else if (!(cellInfo.status === 'S' || cellInfo.status === 'X') ) {
								
								me.slotMeta.each(function(record, idx, count){
									var patt = new RegExp(me.viewMode);
									if(patt.test(record.data.level)) {
										//[posX, posY, posW, posH, posR, textAlign]
										var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
										
										var color = me.getCellDrawValue(record, null, cellInfo);
										if(color) {
											if(record.data.type === 'text') {
												ctx.textAlign = pos[5];
												ctx.textBaseline = record.data.align ? record.data.align :'middle';
												ctx.fillStyle = color;
												ctx.fillText(value,pos[0],pos[1]);
												
											} else if(record.data.type === 'rect') {
												ctx.fillStyle = color;

												if(record.data.style === 'fill') {
													ctx.fillRect(pos[0], pos[1], pos[2], pos[3]);
												} else {
													ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
												}
												
											} else if(record.data.type === 'circle') {
												ctx.beginPath();
												ctx.arc(pos[0],pos[1],pos[4],0,2*Math.PI);
												if(record.data.style === 'fill') {
													ctx.fillStyle = color;
													ctx.fill();
												} else {
													ctx.strokeStyle = color;
													ctx.stroke();
												}
												ctx.beginPath()
												
											} else if(record.data.type === 'diamond') {
												//[posX, posY, posW, posH, posR, textAlign]
												ctx.beginPath();
												ctx.moveTo(pos[0]+pos[2]/2,pos[1]);
												ctx.lineTo(pos[0],pos[1]+pos[3]/2);
												ctx.lineTo(pos[0]+pos[2]/2,pos[1]+pos[3]);
												ctx.lineTo(pos[0]+pos[2],pos[1]+pos[3]/2);
												ctx.lineTo(pos[0]+pos[2]/2,pos[1]);
												if(record.data.style === 'fill') {
													ctx.fillStyle = color;
													ctx.fill();
												} else {
													ctx.strokeStyle = color;
													ctx.stroke();
												}
												
												ctx.beginPath();
											}
											
											if(record.data.item === 'reefer') {
												if (/hatch|bay/.test(me.viewMode)) {
													//Reefer Plug Fore / Aft
													var value = 'A';
													if(me.bay.reeferPlugPos && me.bay.reeferPlugPos === 1) {
														value = 'F';
													}
													ctx.textAlign = 'center';
													ctx.textBaseline = 'middle';
													ctx.fillStyle = ctx.strokeStyle;
													ctx.fillText(value, x + (xx-x) / 2, y + (yy-y) / 2);
												}
											}
										}
									}
								});
							}

			            	//****draw all of bay cell - important!!!!!
							ctx.strokeStyle = me.meta.cellGuideColor;
							//Check 40ft dedicated cell
							if(me.bay.pos === 'M') {
								if(me.preBay && me.preBay.hatchNo === me.bay.hatchNo && me.postBay && me.postBay.hatchNo === me.bay.hatchNo) {
									if(me.preBay.outcells[k][j].value <= 0 && me.postBay.outcells[k][j].value <= 0) {
										ctx.strokeStyle = 'blue';
									}
								}
							}
							
							//Check 20ft dedicated cell
							if(me.bay.pos === 'F') {
								if(me.bay.bayListInHatch.length > 1 && me.postBay && me.postBay.hatchNo === me.bay.hatchNo) {
									if(me.postBay.outcells[k][j].value <= 0) {
										ctx.strokeStyle = 'red';
									}
								}
							}
							
							//Check 20ft dedicated cell
							if(me.bay.pos === 'A') {
								if(me.bay.bayListInHatch.length > 1 && me.preBay && me.preBay.hatchNo === me.bay.hatchNo) {
									if(me.preBay.outcells[k][j].value <= 0) {
										ctx.strokeStyle = 'red';
									}
								}
							}

							
							
							//To prevent cell over hold area
							var holdEndY = me.getRowValueY(me.bay, me.bayY, 'HatchCoverArea') + me.meta.hatchCoverHeight * me.meta.baseUnit + me.meta.baseUnit;
							if(!cellInfo.status && hd === 'H') {
								if(y < holdEndY) y = holdEndY;
								if(yy < holdEndY) yy = holdEndY;
							}
							
							ctx.strokeRect(x,y,xx-x,yy-y);
				    			
						} else if (me.blinkType && cellInfo.status === 'S') {
							//me.blinkType : REMARK, RESTOW, BBAK, RF, DG, HC, POS, 45, 48, 53, EMTY
							var bdraw = false;
							cntrInfo = me.asc.getById(cellInfo.id);

							if (me.blinkType === 'REMARK' && cntrInfo.data.specialRmk.length > 0){
								bdraw = true;
							} else if (me.blinkType === 'BBAK' && (cntrInfo.data.cargoType === 'OG' || cntrInfo.data.cargoType === 'BB') ) {
								bdraw = true;
							} else if (me.blinkType === 'RF' && (cntrInfo.data.cargoType === 'RF' ) ) {
								bdraw = true;
							} else if (me.blinkType === 'HC' && cntrInfo.data.hq === 'H' ) {
								bdraw = true;
							} else if (me.blinkType === 'DG' && cntrInfo.data.imdg) {
								bdraw = true;
							} else if (me.blinkType === '45' && cntrInfo.data.size === '45') {
								bdraw = true;
							} else if (me.blinkType === '48' && cntrInfo.data.size === '48') {
								bdraw = true;
							} else if (me.blinkType === '53' && cntrInfo.data.size === '53') {
								bdraw = true;
							} else if (me.blinkType === 'EMTY' && (cntrInfo.data.cargoType === 'MT' || cntrInfo.data.cargoType === 'ED') ) {
								bdraw = true;
							} else if (me.blinkType === 'NONVGM' && !cntrInfo.data.vgm ) {
								bdraw = true;
							} else if (me.blinkType === 'LOAD' && (cntrInfo.data.pol === me.pol || cntrInfo.data.sftCntr === 'Y')) {
//							} else if (me.blinkType === 'LOAD' && (cntrInfo.data.planMode === 'L' || cntrInfo.data.planMode === 'P' || cntrInfo.data.planMode === 'A') && cntrInfo.data.sftCntr !== 'Y' ) {
								bdraw = true;
							} else if (me.blinkType === 'RESTOW' && cntrInfo.data.sftCntr === 'Y') {
							    bdraw = true;
							} else if (me.blinkType === 'OVERSTOW' && cntrInfo.data.irrOverStow === 'Y') {
								bdraw = true;
							}
							
							if (bdraw) {
								ctx.fillStyle = 'blue';
								ctx.fillRect(x,y,xx-x,yy-y);
								
								ctx.strokeStyle = 'white';
								ctx.strokeRect(x,y,xx-x,yy-y);
							}
						} 
	            	}
	    		}
	    	}
    	}
	    
//	    var markStart = new Date().getTime();
	    
	    //Draw Bay, Row, Tier, Hatch Cover, etc
	    var isSacleViewable = true;
		
		if(me.viewMode === 'vessel'){
        	if(me.meta.baseVesselUnit / me.meta.baseVesselUnitOrign < 0.6) isSacleViewable = false;
        } else if(me.viewMode === 'hold'){
        	if(me.meta.baseHoldUnit / me.meta.baseHoldUnitOrign < 0.6) isSacleViewable = false;
        } else if(me.viewMode === 'hatch'){
        	if(me.meta.baseHatchUnit / me.meta.baseHatchUnitOrign < 0.6) isSacleViewable = false;
        } else if(me.viewMode === 'bay'){
        	if(me.meta.baseBayUnit / me.meta.baseBayUnitOrign < 0.5) isSacleViewable = false;
        }
		
	    if (!me.blinkType) {
	    	
        	var bayName = 'Bay ' + me.bay.name;
	    	if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') {
        		if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
        			if(me.bay.pos === 'F') {
        				if(me.bay.bayListInHatch.length > 2) bayName = '';
        			} else if(me.bay.pos === 'M') {
        				if(me.bay.bayListInHatch.length > 2) bayName = 'Bay ' + me.preBay.name + ' (' + me.bay.name + ')'; 
        			} else if(me.bay.pos === 'A') {
        				bayName = 'Bay ' + me.bay.name;
        			}
        		} else {
        			if(me.bay.pos === 'F') {
        				bayName = 'Bay ' + me.bay.name;
        			} else if(me.bay.pos === 'M') {
        				if(me.bay.bayListInHatch.length > 1) bayName = '';
        			} else if(me.bay.pos === 'A') {
        				if(me.bay.bayListInHatch.length > 2) bayName = 'Bay ' + me.bay.name + ' (' + me.preBay.name + ')'; 
        			}
        		}
        	}
	    	
			//Draw Bay Rect
			if(bayName !== '') {
		        ctx.strokeStyle = me.meta.bayGuideColor;
				ctx.strokeRect( me.bayX,
								me.bayY,
								me.meta.bayWidth,
								me.meta.bayHeight);
	        }
			
			//Bay Number
	        if(bayName !== '') {
				ctx.font = 'bold ' + me.meta.fontSizeBayNo * me.meta.baseUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = me.meta.generalFontColor
				ctx.fillText(bayName, me.bayX + me.meta.bayWidth / 2, me.bayY);
			}
	        
	        //Hatch Cover
		    for(var j=0;j<me.bay.smallHatchCoverPosition.length;j++) {
		    	var flag = true;
		    	if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') { 
    				if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
    					if(me.bay.pos === 'M' && me.bay.bayListInHatch.length > 2) flag = me.preBay.smallHatchCoverPosition[j] > 0 ? false : true;
    				} else {
    					if(me.bay.pos === 'A' && me.bay.bayListInHatch.length > 2) flag = me.preBay.smallHatchCoverPosition[j] > 0 ? false : true;
    				}
    			}
	        	
				if (me.bay.smallHatchCoverPosition[j] > 0) {
					if(flag) {
						if(me.viewMode !== 'vessel' && me.meta.viewHatchCoverClearance === 'Y'){
							ctx.fillStyle = me.meta.hatchCoverClearanceColor;
							ctx.strokeStyle = me.meta.hatchCoverClearanceColor;
						} else {
							ctx.fillStyle = me.meta.hatchCoverColor;
							ctx.strokeStyle = me.meta.hatchCoverColor;
						}
						// tierNoAreaWidth 10 tierNoPlace B
						// baseUnit baseVesselUnit (bay)   3
						var tierNoPlaceOffset = (me.meta.tierNoPlace === 'L' || me.meta.tierNoPlace === 'B') ? me.meta.tierNoAreaWidth * me.meta.baseUnit : 0;
						var hx, hy, hw, hh;
						//bay X 시작점 + 10 + 3*5(pad-left) + 3(baseUnit)*10(baseWidthVesselHold)/4*j
						hx = me.bayX + tierNoPlaceOffset + me.meta.baseUnit * me.meta.padleft + me.meta.baseUnit * me.meta.baseWidth / 4 * j - me.meta.baseUnit * me.meta.baseWidth / 4 * me.vsl.maxRowStartIndex * 4;
						hy = me.getRowValueY(me.bay, me.bayY, 'HatchCover');
						//10 / 4 * 3 =  7.5
						hw = me.bay.smallHatchCoverPosition[j] === 0 ? 0 : me.meta.baseWidth / 4 * me.meta.baseUnit;
						//3 * 3
						hh = me.meta.hatchCoverHeight * me.meta.baseUnit;
						
						ctx.fillRect(hx, hy, hw, hh);
						ctx.strokeRect(hx, hy, hw, hh);
					}
				}
		    }
	        
	        
	        ctx.beginPath();
        	for(var j=0;j<rows+1;j++) {
        		if(isSacleViewable) {
	        		
	        		if(j<rows) {
	        			//Hold Row Number
	        			if(me.meta.viewRowTierNo === 'Y') {
	        				if (me.bay.holdRowNo[j] != '') {
	        					var flag = true;
	        					if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') { 
	        						if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
	        							if(me.bay.pos === 'M' && me.bay.bayListInHatch.length > 2) flag = me.preBay.holdRowNo[j] != '' ? false : true; 
	        						} else {
	        							if(me.bay.pos === 'A' && me.bay.bayListInHatch.length > 2) flag = me.preBay.holdRowNo[j] != '' ? false : true; 
	        						}
	        					}
	        					
	        					if(flag) {
	        						ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        						ctx.textAlign = 'center';
	        						ctx.textBaseline = 'top';
	        						ctx.fillStyle = me.meta.generalFontColor;
	        						ctx.fillText(me.bay.holdRowNo[j], 
	        								me.getCellX(me.bay, me.bayX, j, 'H') + cellWidth / 2,
	        								me.getRowValueY(me.bay, me.bayY, 'HoldRowNo'));
	        					}
	        				}
	        			}
	        			
	        			//Hold StackWeight 
	        			if(me.viewMode !== 'vessel' && me.meta.viewStackWeight === 'Y'){
//	        				var value = parseInt((me.bay.stackWeightHold[j] ? me.bay.stackWeightHold[j] : 0) - (me.bay.accumulatedStackWeightHold[j] ? me.bay.accumulatedStackWeightHold[j] : 0) / 100);
	        				var value = parseFloat(((me.bay.stackWeightHold[j] ? me.bay.stackWeightHold[j] : 0) - (me.bay.accumulatedStackWeightHold[j] ? me.bay.accumulatedStackWeightHold[j] : 0) / 100) / 10).toFixed(1);
	        				ctx.font = 'bold ' + me.meta.fontSizeStackWeight * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        				ctx.textAlign = 'center';
	        				ctx.textBaseline = 'top';
	        				ctx.fillStyle = value >= 0 ? 'blue' : 'red';
	        				ctx.fillText(value, 
	        						me.getCellX(me.bay, me.bayX, j, 'H') + cellWidth / 2,
	        						me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight'));
	        			}
	        			
	        			//Deck Row Number
	        			if(me.meta.viewRowTierNo === 'Y') {
	        				if (me.bay.deckRowNo[j] != '') {	
	        					var flag = true;
	        					if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') { 
	        						if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
	        							if(me.bay.pos === 'M' && me.bay.bayListInHatch.length > 2) flag = me.preBay.deckRowNo[j] != '' ? false : true; 
	        						} else {
	        							if(me.bay.pos === 'A' && me.bay.bayListInHatch.length > 2) flag = me.preBay.deckRowNo[j] != '' ? false : true; 
	        						}
	        					}
	        					
	        					if(flag) {
	        						ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        						ctx.textAlign = 'center';
	        						ctx.textBaseline = 'middle';
	        						ctx.fillStyle = me.meta.generalFontColor;
	        						ctx.fillText(me.bay.deckRowNo[j], 
	        								me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
	        								me.getRowValueY(me.bay, me.bayY, 'DeckRowNo') + me.meta.rowNoAreaHeight / 2);
	        					}
	        				}
	        			}
	        			
	        			//Deck Lashing Bridge
	        			if (/hatch|bay/.test(me.viewMode)) {
	        				
	        				var lashingBridge = 0;
	            			if(me.bay.pos === 'F') {
	            				lashingBridge = me.bay.lashingBridgeFore[j];
	            			} else if(me.bay.pos === 'A') {
	            				lashingBridge = me.bay.lashingBridgeAft[j];
	            			} else if(me.bay.pos === 'M') {
	            				lashingBridge = me.bay.lashingBridgeFore[j];
	            			}
	            			
	        				if(lashingBridge > 0) {
	        					var sx = me.getCellX(me.bay, me.bayX, j, 'D');
	        					var ex = me.getCellX(me.bay, me.bayX, j, 'D') + me.meta.cellWidth;
	        					var sy = me.getCellY(me.bay, me.bayY, me.bay.deckTierStartIndex) + me.meta.cellHeight;
	        					var ey = sy - lashingBridge * me.meta.cellHeight - me.meta.cellHeight / 5;
	        					
	        					ctx.beginPath();
	        					ctx.strokeStyle = me.meta.cellGuideColor;
	        					ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign * 2;
	        					ctx.moveTo(sx, sy);
	        					ctx.lineTo(sx, ey);
	        					ctx.stroke();
	        					if(j === rows - 1) {
	        						ctx.moveTo(ex, sy);
	        						ctx.lineTo(ex, ey);
	        						ctx.stroke();
	        					}
	        					ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign;
	        					ctx.beginPath();
	        				}
	        			}
	        			
	        			//Deck StackWeight 
	        			if(me.viewMode !== 'vessel' && me.meta.viewStackWeight === 'Y'){
//	        				var value = parseInt((me.bay.stackWeightDeck[j] ? me.bay.stackWeightDeck[j] : 0) - (me.bay.accumulatedStackWeightDeck[j] ? me.bay.accumulatedStackWeightDeck[j] : 0) / 100);
	        				var value = parseFloat(((me.bay.stackWeightDeck[j] ? me.bay.stackWeightDeck[j] : 0) - (me.bay.accumulatedStackWeightDeck[j] ? me.bay.accumulatedStackWeightDeck[j] : 0) / 100) / 10).toFixed(1);
	        				ctx.font = 'bold ' + me.meta.fontSizeStackWeight * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        				ctx.textAlign = 'center';
	        				ctx.textBaseline = 'middle';
	        				ctx.fillStyle = value >= 0 ? 'blue' : 'red';
	        				ctx.fillText(value, 
	        						me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
	        						me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2);
	    	        	} 
	        			
	        			//Deck Lashing Result
	        			if(me.viewMode !== 'vessel' && me.meta.viewLashingResult === 'Y' && me.bay.deckRowNo[j] != ''){
	        				var value = 0;
	        				if(me.bay.deckRowLashingResult) {
	        					value = parseFloat(me.bay.deckRowLashingResult[j].cornerCastCompression) > parseFloat(me.bay.deckRowLashingResult[j].cornerCasting) ? parseFloat(me.bay.deckRowLashingResult[j].cornerCastCompression) : parseFloat(me.bay.deckRowLashingResult[j].cornerCasting);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].cornerPostCompression) ? value : parseFloat(me.bay.deckRowLashingResult[j].cornerPostCompression);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashingRodTension) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashingRodTension);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerHForces) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerHForces);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerVForces) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerVForces);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].longitudinalRacking) ? value : parseFloat(me.bay.deckRowLashingResult[j].longitudinalRacking);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].pullOut) ? value : parseFloat(me.bay.deckRowLashingResult[j].pullOut);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].shear) ? value : parseFloat(me.bay.deckRowLashingResult[j].shear);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].transverseRacking) ? value : parseFloat(me.bay.deckRowLashingResult[j].transverseRacking);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lifting) ? value : parseFloat(me.bay.deckRowLashingResult[j].lifting);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].racking) ? value : parseFloat(me.bay.deckRowLashingResult[j].racking);
	        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashing) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashing);
	        				}
	        				
	        				if(value > 0) {
	        					var fillColor = value > 100 ? 'red' : '#000080';
	        					ctx.font = 'bold ' + me.meta.fontSizeStackWeight * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        					ctx.textAlign = 'center';
	        					ctx.textBaseline = 'middle';
	        					ctx.fillStyle = fillColor;
	        					ctx.fillText(value, 
	        							me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
	        							me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2);
	        				}
		        		}
	        			
	        			//Deck Visibility Result
	        			if(me.viewMode !== 'vessel' && me.meta.viewVisibility === 'Y' && me.bay.deckRowNo[j] != ''){
	        				var value = '';
	        				if(me.bay.deckRowVisibilityResult) {
	        					if(me.meta.visibilityScale === 'M') {
	        						value = parseFloat(me.bay.deckRowVisibilityResult[j].freeHeightMeters);
	        					} else if(me.meta.visibilityScale === 'F') {
	        						value = parseFloat(me.bay.deckRowVisibilityResult[j].freeHeightFeet);
	        					}
	        				}
	        				if(value && value !== '') {
	        					var fillColor = value < 0 ? 'red' : '#000080';
	        					ctx.font = 'bold ' + me.meta.fontSizeStackWeight * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        					ctx.textAlign = 'center';
	        					ctx.textBaseline = 'middle';
	        					ctx.fillStyle = fillColor;
	        					ctx.fillText(value, 
	        							me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
	        							me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2);
	        				}
	        			}
	        			
	        			//Hatch Cover Clearance
		        		if(me.viewMode !== 'vessel' && me.meta.viewHatchCoverClearance === 'Y'){
		        			var clearance = parseInt((me.bay.hatchCoverClearance[j] ? me.bay.hatchCoverClearance[j] : 0) * 10);
		        			var allowance = me.bay.availableStackSlotsHold[j] * me.meta.generalContainerHeight + clearance;
		        			var value;
		        			if(me.meta.viewMode4HatchCoverClearance === 'A') {
		        				//Allowance
		        				if(allowance - me.bay.accumulatedStackHeightHold[j] < 0) {
		        					value = allowance - me.bay.accumulatedStackHeightHold[j];
		        				} else {
		        					if(me.bay.accumulatedStackHeightHold[j] > me.bay.availableStackSlotsHold[j] * me.meta.generalContainerHeight) {
		        						value = allowance - me.bay.accumulatedStackHeightHold[j];
		        					} else {
		        						value = clearance;
		        					}
		        				}
		        				
		        			} else {
		        				//Remained Height
		        				value = allowance - me.bay.accumulatedStackHeightHold[j];
		        			}
		        			
		        			
		        			ctx.font = 'bold ' + me.meta.fontSizeHatchCoverClearance * me.meta.baseUnit + 'px ' + me.meta.fontType;
		        			ctx.textAlign = 'center';
		        			ctx.textBaseline = 'hanging';
		        			ctx.fillStyle = value >= 0 ? me.meta.generalFontColor : 'red';
		        			ctx.fillText(parseFloat(value / 10).toFixed(1), 
		        					me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
		        					me.getRowValueY(me.bay, me.bayY, 'HatchCover'));
		        			//Number.isInteger is not working in IE yet
//		        			ctx.fillText(Number.isInteger(value) ? value : parseFloat(value).toFixed(1), 
//		        					me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
//		        					me.getRowValueY(me.bay, me.bayY, 'HatchCover'));
				    	} 
	        		}
	        		
	        		//Cell Guide Clearance
	        		if(me.viewMode !== 'vessel' && me.meta.viewCellGuideClearance === 'Y'){
	        			var value = me.bay.cellGuideClearance[j] ? me.bay.cellGuideClearance[j] : 0;
	        			ctx.font = 'bold ' + me.meta.fontSizeHatchCoverClearance * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        			ctx.textAlign = 'center';
	        			ctx.textBaseline = 'top';
	        			ctx.fillStyle = me.meta.generalFontColor;
	        			ctx.fillText(value, 
	        					me.getCellX(me.bay, me.bayX, j, 'H'),
	        					me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance'));
		        	}
	        		
	        	}
        		
        		if(j<rows) {
	        		//Hold StackWeight for general view
		        	if(me.viewMode === 'vessel' && me.meta.viewStackWeight === 'Y'){
	        			var value = parseInt((me.bay.stackWeightHold[j] ? me.bay.stackWeightHold[j] : 0) - (me.bay.accumulatedStackWeightHold[j] ? me.bay.accumulatedStackWeightHold[j] : 0) / 100);
	        			if(value < 0) {
	        				ctx.arc(me.getCellX(me.bay, me.bayX, j, 'H') + cellWidth / 2,
	        					me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.baseUnit * me.meta.stackWeightAreaHeight / 2,
	        					2 * me.meta.baseUnit,0,2*Math.PI);
							ctx.fillStyle = 'red';
							ctx.fill();
							ctx.beginPath();
	        			}
	        			
	        		}
		        	
		        	//Deck StackWeight 
		        	if(me.viewMode === 'vessel' && me.meta.viewStackWeight === 'Y'){
		        		var value = parseInt((me.bay.stackWeightDeck[j] ? me.bay.stackWeightDeck[j] : 0) - (me.bay.accumulatedStackWeightDeck[j] ? me.bay.accumulatedStackWeightDeck[j] : 0) / 100);
	        			if(value < 0) {
	        				ctx.arc(me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
	        					me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.baseUnit * me.meta.stackWeightAreaHeight / 2,
	        					2 * me.meta.baseUnit,0,2*Math.PI);
							ctx.fillStyle = 'red';
							ctx.fill();
							ctx.beginPath();
	        			}
		        	}
		        	
        			//Deck Lashing Result
		        	if(me.viewMode === 'vessel' && me.meta.viewLashingResult === 'Y' && me.bay.deckRowNo[j] != ''){
		        		var value = 0;
        				if(me.bay.deckRowLashingResult) {
        					value = parseFloat(me.bay.deckRowLashingResult[j].cornerCastCompression) > parseFloat(me.bay.deckRowLashingResult[j].cornerCasting) ? parseFloat(me.bay.deckRowLashingResult[j].cornerCastCompression) : parseFloat(me.bay.deckRowLashingResult[j].cornerCasting);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].cornerPostCompression) ? value : parseFloat(me.bay.deckRowLashingResult[j].cornerPostCompression);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashingRodTension) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashingRodTension);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerHForces) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerHForces);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerVForces) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashingSpecialCornerVForces);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].longitudinalRacking) ? value : parseFloat(me.bay.deckRowLashingResult[j].longitudinalRacking);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].pullOut) ? value : parseFloat(me.bay.deckRowLashingResult[j].pullOut);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].shear) ? value : parseFloat(me.bay.deckRowLashingResult[j].shear);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].transverseRacking) ? value : parseFloat(me.bay.deckRowLashingResult[j].transverseRacking);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lifting) ? value : parseFloat(me.bay.deckRowLashingResult[j].lifting);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].racking) ? value : parseFloat(me.bay.deckRowLashingResult[j].racking);
        					value = value > parseFloat(me.bay.deckRowLashingResult[j].lashing) ? value : parseFloat(me.bay.deckRowLashingResult[j].lashing);
        				}
        				
	        			if(value > 100) {
	        				var x = me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2 - cellWidth / 4;
	        				var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.baseUnit * me.meta.deckLashingAreaHeight / 2 + me.meta.baseUnit * me.meta.deckLashingAreaHeight / 4;
	        				var x2 = me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2;
	        				var y2 = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.baseUnit * me.meta.deckLashingAreaHeight / 2 - me.meta.baseUnit * me.meta.deckLashingAreaHeight / 4;
	        				var x3 = me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2 + cellWidth / 4;
	        				
	        				ctx.beginPath();
	        				ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign * 2;
	        				ctx.lineJoin = "miter";
	        				ctx.moveTo(x, y);
	        				ctx.lineTo(x2, y2);
	        				ctx.lineTo(x3, y);
	        				ctx.strokeStyle = 'red';
	        				ctx.stroke();
	        				ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign;
	        				ctx.beginPath();
	        			}
		        	}
		        	
		        	//Deck Visibility Result
		        	if(me.viewMode === 'vessel' && me.meta.viewVisibility === 'Y' && me.bay.deckRowNo[j] != ''){
		        		var value = '';
        				if(me.bay.deckRowVisibilityResult) {
        					if(me.meta.visibilityScale === 'M') {
        						value = parseFloat(me.bay.deckRowVisibilityResult[j].freeHeightMeters);
        					} else if(me.meta.visibilityScale === 'F') {
        						value = parseFloat(me.bay.deckRowVisibilityResult[j].freeHeightFeet);
        					}
        				}
        				if(value && value !== '' && value < 0) {
        					var x = me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2 - cellWidth / 4;
	        				var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.baseUnit * me.meta.visibilityAreaHeight / 2 - me.meta.baseUnit * me.meta.visibilityAreaHeight / 4;
	        				var x2 = me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2 ;
	        				var y2 = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.baseUnit * me.meta.visibilityAreaHeight / 2;
	        				var y3 = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.baseUnit * me.meta.visibilityAreaHeight / 2 + me.meta.baseUnit * me.meta.visibilityAreaHeight / 4;
		        			
		        			ctx.beginPath();
		        			ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign * 2;
		        			ctx.lineJoin = "miter";
		        			ctx.moveTo(x, y);
		        			ctx.lineTo(x2, y2);
		        			ctx.lineTo(x, y3);
		        			ctx.strokeStyle = 'red';
		        			ctx.stroke();
		        			ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign;
		        			ctx.beginPath();
		        		}
		        	}
		        	
		        	
		        	//Hatch Cover Clearance //draw red circle
		        	// if(me.viewMode === 'vessel' && me.meta.viewHatchCoverClearance === 'Y'){
		        	// 	var clearance = parseInt((me.bay.hatchCoverClearance[j] ? me.bay.hatchCoverClearance[j] : 0) * 10);
		        	// 	var allowance = me.bay.availableStackSlotsHold[j] * me.meta.generalContainerHeight + clearance;
		        	// 	var value = allowance - me.bay.accumulatedStackHeightHold[j] < 0 ? allowance - me.bay.accumulatedStackHeightHold[j] : clearance;
		        		
		        	// 	if(value < 0) {
		        	// 		ctx.arc(me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
		        	// 				me.getRowValueY(me.bay, me.bayY, 'HatchCover') + me.meta.hatchCoverAreaHeight / 8 * me.meta.baseUnit,
		        	// 				2 * me.meta.baseUnit,0,2*Math.PI);
		        	// 		ctx.fillStyle = 'red';
		        	// 		ctx.fill();
		        	// 		ctx.beginPath();
		        	// 	}
		        	// }
	        	}
	        } 
			
	        //Berth Drawing
        	var berthRectStartPosX; 	// Berth Rect의 X 좌표
        	var berthRectStartPosY; 	// Berth Rect의 Y 좌표
        	var berthTextStartPosX; 	// Berth Text의 X 좌표
        	var berthTextStartPosY; 	// Berth Text의 Y 좌표
        	if(me.alongSide){
            	if(me.alongSide === "S"){
            		berthRectStartPosX = me.bayX + (me.meta.bayWidth - me.meta.bayWidth/14);
            		berthRectStartPosY = me.bayY + me.meta.bayHeight/2
            		berthTextStartPosX = berthRectStartPosX + (cellWidth*2/3)/2;
            		berthTextStartPosY = (berthRectStartPosY/me.getCellHeight() - ALONGSIDE_BERTH.length)/2 * me.getCellHeight();
            	}else if(me.alongSide === "P"){
            		berthRectStartPosX = me.bayX + me.meta.bayWidth/14;
            		berthRectStartPosY = me.bayY + me.meta.bayHeight/2
            		berthTextStartPosX = berthRectStartPosX + (cellWidth*2/3)/2;
            		berthTextStartPosY = (berthRectStartPosY/me.getCellHeight() - ALONGSIDE_BERTH.length)/2 * me.getCellHeight();
            	}
            	//ShipBayView Berth Rect Drawing
            	ctx.fillStyle = "#d0ad91";
        		ctx.fillRect(berthRectStartPosX,
        				berthRectStartPosY,
        				cellWidth*2/3,
        				me.meta.bayHeight/2 - me.getCellHeight());
        		//ShipBayView Berth Text Drawing
            	ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
            	ctx.textAlign = 'center';
            	ctx.textBaseline = 'middle';
            	ctx.fillStyle = "black";
            	
            	for(var i = 0; i < ALONGSIDE_BERTH.length; i++){
            		ctx.fillText(ALONGSIDE_BERTH[i], 
            				berthTextStartPosX, 
            				berthRectStartPosY + 80 + i * me.getCellHeight());
            	}
        	}

	        //Tier Number
	        if(isSacleViewable) {
	        	
	        	if(me.meta.viewRowTierNo === 'Y') {
	        		//Lashing, StackWeight, Visibility Legend
	        		if(me.meta.tierNoPlace === 'B') {
	        			
	        			//Left
	        			var x = me.bayX + me.meta.baseUnit * me.meta.padright;
	        			ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        			ctx.textAlign = 'left';
	        			ctx.textBaseline = 'middle';
	        			ctx.fillStyle = me.meta.generalFontColor;
	        			
	        			// //Deck StackWeight
	        			// if(me.meta.viewStackWeight === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			// 	ctx.fillText('S.', x, y);
	        			// }
	        			
	        			// //Hold StackWeight
	        			// if(me.meta.viewStackWeight === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			// 	ctx.fillText('S.', x, y); //down / left 
	        			// }
	        			
	        			// //Lashing
	        			// if(me.meta.viewLashingResult === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2;
	        			// 	ctx.fillText('L.', x, y);
	        			// }
	        			
	        			// //Visibility
	        			// if(me.meta.viewVisibility === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2;
	        			// 	ctx.fillText('V.', x, y);
	        			// }
	        			
	        			// //Cell Guide Clearance
	        			// if(me.meta.viewCellGuideClearance === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance') + me.meta.cellGuideClearanceAreaHeight / 2;
	        			// 	ctx.fillText('C.', x, y);
	        			// }
	        			
	        			
	        			//Right
	        			var x = me.bayX + me.meta.bayWidth - me.meta.baseUnit * (me.meta.padright);
	        			ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        			ctx.textAlign = 'right';
	        			ctx.textBaseline = 'middle';
	        			ctx.fillStyle = me.meta.generalFontColor;
	        			
	        			// //Deck StackWeight
	        			// if(me.meta.viewStackWeight === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			// 	ctx.fillText('S.', x, y);
	        			// }
	        			
	        			// //Hold StackWeight
	        			// if(me.meta.viewStackWeight === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			// 	ctx.fillText('S.', x, y);
	        			// }
	        			
	        			// //Lashing
	        			// if(me.meta.viewLashingResult === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2;
	        			// 	ctx.fillText('L.', x, y);
	        			// }
	        			
	        			// //Visibility
	        			// if(me.meta.viewVisibility === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2;
	        			// 	ctx.fillText('V.', x, y);
	        			// }
	        			
	        			// //Cell Guide Clearance
	        			// if(me.meta.viewCellGuideClearance === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance') + me.meta.cellGuideClearanceAreaHeight / 2;
	        			// 	ctx.fillText('C.', x, y);
	        			// }
	        			
	        		} else {
	        			
	        			var x = me.meta.tierNoPlace === 'L' ? me.bayX + me.meta.baseUnit * me.meta.padright : me.bayX + me.meta.bayWidth - me.meta.baseUnit * (me.meta.padright);
	        			ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        			ctx.textAlign = me.meta.tierNoPlace === 'L' ? 'left' : 'right';
	        			ctx.textBaseline = 'middle';
	        			ctx.fillStyle = me.meta.generalFontColor;
	        			
	        			// //StackWeight
	        			// if(me.meta.viewStackWeight === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			// 	ctx.fillText('S.', x, y);
	        			// }
	        			
	        			// //Hold StackWeight
	        			// if(me.meta.viewStackWeight === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			// 	ctx.fillText('S.', x, y);
	        			// }
	        			
	        			// //Lashing
	        			// if(me.meta.viewLashingResult === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2;
	        			// 	ctx.fillText('L.', x, y);
	        			// }
	        			
	        			// //Visibility
	        			// if(me.meta.viewVisibility === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2;
	        			// 	ctx.fillText('V.', x, y);
	        			// }
	        			
	        			// //Cell Guide Clearance
	        			// if(me.meta.viewCellGuideClearance === 'Y') {
	        			// 	var y = me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance') + me.meta.cellGuideClearanceAreaHeight / 2;
	        			// 	ctx.fillText('C.', x, y);
	        			// }
	        			
	        		}
	        		
	        		//Tier No
	        		for(var j=0;j<tiers;j++) {
	        			if (me.bay.tierNo[j] != "") {	
	        				var flag = true;
	        				if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') { 
	        					if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
	        						if(me.bay.pos === 'M' && me.bay.bayListInHatch.length > 2) flag = me.preBay.tierNo[j] != '' ? false : true; 
	        					} else {
	        						if(me.bay.pos === 'A' && me.bay.bayListInHatch.length > 2) flag = me.preBay.tierNo[j] != '' ? false : true; 
	        					}
	        				}
	        				
	        				if(flag) {
	        					
	        					if(me.meta.tierNoPlace === 'B') {
	        						//Left
	        						var x = me.bayX + me.meta.baseUnit * me.meta.padright;
	        						ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        						ctx.textAlign = 'left';
	        						ctx.textBaseline = 'middle';
	        						ctx.fillStyle = me.meta.generalFontColor;
	        						ctx.fillText(me.bay.tierNo[j], 
	        								x, 
	        								me.getCellY(me.bay, me.bayY, j) + me.meta.cellHeight / 2);
	        						
	        						//Right
	        						var x = me.bayX + me.meta.bayWidth - me.meta.baseUnit * (me.meta.padright);
	        						ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        						ctx.textAlign = 'right';
	        						ctx.textBaseline = 'middle';
	        						ctx.fillStyle = me.meta.generalFontColor;
	        						ctx.fillText(me.bay.tierNo[j], 
	        								x, 
	        								me.getCellY(me.bay, me.bayY, j) + me.meta.cellHeight / 2);
	        						
	        					} else {
	        						var x = me.meta.tierNoPlace === 'L' ? me.bayX + me.meta.baseUnit * me.meta.padright : me.bayX + me.meta.bayWidth - me.meta.baseUnit * (me.meta.padright);
	        						ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        						ctx.textAlign = me.meta.tierNoPlace === 'L' ? 'left' : 'right';
	        						ctx.textBaseline = 'middle';
	        						ctx.fillStyle = me.meta.generalFontColor;
	        						ctx.fillText(me.bay.tierNo[j], 
	        								x, 
	        								me.getCellY(me.bay, me.bayY, j) + me.meta.cellHeight / 2);
	        					}
	        				}
	        			}
	        		}
	        	}
	        }
		    
		    //POL Terminal Restriction Guideline
		    var spriteOutReachLimit, spriteMaxTierHeightLimit, terminalInfo;
		    spriteOutReachLimit = me.getSpriteByCustomId(surface, 'id-outreach-pol-' + me.bay.name);
		    if(!spriteOutReachLimit) {
		    	spriteOutReachLimit = surface.add({
		    		type: 'line',
		    		strokeStyle: me.meta.terminalLimitColorPOL,
		    		lineDash: [2,2],
		    		hidden: true,
		    		customType: 'outReachLimitPOL',
		    		customId: 'id-outreach-pol-' + me.bay.name
		    	});
		    }
		    spriteMaxTierHeightLimit = me.getSpriteByCustomId(surface, 'id-maxtierheightlimit-pol-' + me.bay.name);
		    if(!spriteMaxTierHeightLimit) {
		    	spriteMaxTierHeightLimit = surface.add({
		    		type: 'line',
		    		strokeStyle: me.meta.terminalLimitColorPOL,
		    		lineDash: [2,2],
		    		hidden: true,
		    		customType: 'maxTierHeightLimiPOL',
		    		customId: 'id-maxtierheightlimit-pol-' + me.bay.name
		    	});
		    }
		    terminalInfo = me.getTerminalInfo(me.serviceLane, me.pol, me.polTerminal, me.polBerth);
		    me.applyTerminalLimits('POL', terminalInfo, spriteOutReachLimit, spriteMaxTierHeightLimit, surface);
		    
		    //POD Terminal Restriction Guideline
		    spriteOutReachLimit = me.getSpriteByCustomId(surface, 'id-outreach-pod-' + me.bay.name);
		    if(!spriteOutReachLimit) {
			    spriteOutReachLimit = surface.add({
					type: 'line',
					strokeStyle: me.meta.terminalLimitColorPOD,
					lineDash: [3,3],
					hidden: true,
					customType: 'outReachLimitPOD',
					customId: 'id-outreach-pod-' + me.bay.name
				});
		    }
		    spriteMaxTierHeightLimit = me.getSpriteByCustomId(surface, 'id-maxtierheightlimit-pod-' + me.bay.name);
		    if(!spriteMaxTierHeightLimit) {
		    	spriteMaxTierHeightLimit = surface.add({
		    		type: 'line',
		    		strokeStyle: me.meta.terminalLimitColorPOD,
		    		lineDash: [3,3],
		    		hidden: true,
		    		customType: 'maxTierHeightLimiPOD',
		    		customId: 'id-maxtierheightlimit-pod-' + me.bay.name
		    	});
		    }
		    terminalInfo = me.getTerminalInfo(me.serviceLane, me.pod, me.podTerminal, me.podBerth);
		    me.applyTerminalLimits('POD', terminalInfo, spriteOutReachLimit, spriteMaxTierHeightLimit, surface);
		    
//	    	//Workflow Message
//	    	var color = me.workflowMessage && me.workflowMessage != '' ? me.meta.messageColor : me.meta.messageEmptyColor;
//	    	var message = me.getSpriteByCustomId(surface, 'workflow-' + me.bay.name);
//	    	if(!message) {
//	    		 message = surface.add({
//	    			type: 'rect',
//	    			customType: 'workflow',
//	    			customId: 'workflow-' + me.bay.name,
//	    			workflowPosition: me.bay.name
//	    		});
//	    	}
//	    	message.setAttributes({
//	    		x: me.bayX + me.meta.bayWidth - me.meta.bayNoAreaHeight * me.meta.baseUnit * 2 - me.meta.baseUnit,
//				y: me.bayY + me.meta.baseUnit + me.meta.baseUnit,
//				width: me.meta.bayNoAreaHeight * me.meta.baseUnit - me.meta.baseUnit,
//				height: me.meta.bayNoAreaHeight * me.meta.baseUnit - me.meta.baseUnit,
//				fillStyle: color,
//				strokeStyle: me.meta.bayGuideColor
//	    	});
//	    	surface.renderSprite(message);
		}
	    
//	    var markElapsed = new Date().getTime() - markStart;
//    	console.log("BayMark: " + markElapsed);
	    
	    
//	    var bayDrawElapsed = new Date().getTime() - bayDrawStart;
//    	console.log("BayDraw: " + bayDrawElapsed);
	},

	getQCColor: function(qcName){
		var res = new Array();
		var yardQCStore = IoTosSpExt.getApplication().yardQCs;
		if(yardQCStore.find('name', qcName) > -1){
			res[0] = yardQCStore.getAt(yardQCStore.find('name', qcName)).get('backColor');
			res[1] = yardQCStore.getAt(yardQCStore.find('name', qcName)).get('foreColor');
		}else{
			res[0] = '000000';
			res[1] = 'FFFFFF';
		}
		
		return res;
	},
	
    getColor: function(category, type, cntr, ports) {
		var codeCollectionStore = IoTosSpExt.getApplication().codeCollection;

		//영역 total(0, 1) / bottom(2, 3) / left(4, 5) / right(6, 7) 순서 back / fore, bottomText(8)
		// var rtnRst = ['gray', 'black', 'gray', 'black', 'gray', 'black', 'gray', 'black', ''], findFirstCondition = false, findSecondCondition = false;
		var rtnRst = ['silver', 'black', 'silver', 'black', 'silver', 'black', 'silver', 'black', ''], findFirstCondition = false, findSecondCondition = false;
		if(cntr.rstTime === CodeConstants.RST_ROB){ //rob container
			rtnRst[0] = 'gray';
			rtnRst[1] = 'black';
			rtnRst[2] = rtnRst[0];
			rtnRst[3] = rtnRst[1];
			rtnRst[4] = rtnRst[0];
			rtnRst[5] = rtnRst[1];
			rtnRst[6] = rtnRst[0];
			rtnRst[7] = rtnRst[1];
		}else{
			if(ports.data.length > 0) {
				//기본 - POD 색상
				port = ports.findRecord('portCode', cntr.pod);
				if(port !== null || port !== undefined){
					rtnRst[0] = '#' + port.data.backColor;
					rtnRst[1] = '#' + port.data.foreColor;
					cntr.bText = cntr.bottomText;

					rtnRst[2] = rtnRst[0];
					rtnRst[3] = rtnRst[1];
					rtnRst[4] = rtnRst[0];
					rtnRst[5] = rtnRst[1];
					rtnRst[6] = rtnRst[0];
					rtnRst[7] = rtnRst[1];
				}

				if(category === 'OPR'){ //bottom
					port = codeCollectionStore.data.getAt(0).getData().oprCodeLists.filter(item => item.code === cntr.opr);
					if(port !== null && port !== undefined && port.length > 0){
						rtnRst[2] = '#' + port[0].backColor;
						rtnRst[3] = '#' + port[0].foreColor;						
					}else{
						rtnRst[2] = '#C0C0C0';
						rtnRst[3] = '#000000';
					}
					// rtnRst[8] = cntr.opr;
					cntr.bText = cntr.opr;
					return rtnRst;

				} else if(category === 'POL'){ //bottom	
					port = codeCollectionStore.data.getAt(0).getData().portCodeLists.filter(item => item.code === cntr.pol);			
					if(port !== null && port !== undefined && port.length > 0){
						rtnRst[2] = '#' + port[0].backColor; 
						rtnRst[3] = '#' + port[0].foreColor;
						
					}else{
						rtnRst[2] = '#C0C0C0'; //BORDER_COLOR
						rtnRst[3] = '#000000'; //BLACK
					}
					rtnRst[8] = cntr.pol;
					cntr.bText = !nullChk_(cntr.pol) && cntr.pol.length > 2 ? cntr.pol.substring(2, cntr.pol.length) : cntr.pol;
					return rtnRst;	
				} else if(category === 'HOLD'){ //bottom	
					if(cntr.cHold && cntr.tHold){
						rtnRst[2] = 'cyan'; 
						rtnRst[3] = 'black';
						cntr.bText = CodeConstants.HoldType.ALL_HOLD;
					}else if(cntr.cHold){
						rtnRst[2] = 'green'; 
						rtnRst[3] = 'black';
						cntr.bText = CodeConstants.HoldType.CUSTOM_HOLD;

					}else if(cntr.tHold){
						rtnRst[2] = 'red'; 
						rtnRst[3] = 'white';
						cntr.bText = CodeConstants.HoldType.TERMINAL_HOLD;
					}
					return rtnRst;	
				}else if(category === 'UNNO'){ 
					cntr.bText = cntr.imdg + (!nullChk_(cntr.imdg) && cntr.imdg.length > 2 ? "" : " ") + cntr.unno;
				}else if(category === 'SZTP'){ 
					cntr.bText = cntr.sztp;
				}else if(category === 'SZTP2'){ 
					cntr.bText = cntr.sztp2;
				}else if(category === 'WGT'){  //bottom
					port = codeCollectionStore.data.getAt(0).getData().wgtGrpCodeLists[Number(cntr.weightGroup)];			
					rtnRst[2] = '#' + port.backColor; 
					rtnRst[3] = '#' + port.foreColor;
					cntr.bText = cntr.formattedWeight;
				}else if(category === 'WGTGRP'){ //bottom
					port = codeCollectionStore.data.getAt(0).getData().wgtGrpCodeLists[Number(cntr.weightGroup)];			
					rtnRst[2] = '#' + port.backColor; 
					rtnRst[3] = '#' + port.foreColor;
					cntr.bText = port.code;
				}else if(category === 'NIY'){ //CellViewNotArrival bottom
					var isNotArrivalFromOtherTrans = cntr.ixCd === CodeConstants.IX_EXPORT && (cntr.state === CodeConstants.CntrState.BOOKING || cntr.state === CodeConstants.CntrState.RESERVED);
					if(isNotArrivalFromOtherTrans){
						if(!nullChk_(cntr.yBlockAreaName)){
							if(cntr.yBlockAreaName === CodeConstants.VBlockName.VBLOCK_TS){
								rtnRst[2] = 'blue';
								rtnRst[3] = 'white';
								cntr.bText = ViewUtil.getLabel('WRD_CTSP_Label_TS') + cntr.preVessel;
							}else if(cntr.yBlockAreaName === CodeConstants.VBlockName.VBLOCK_NIY ||
								cntr.yBlockAreaName === CodeConstants.VBlockName.VBLOCK_SHUTTLE){
								rtnRst[2] = 'red';
								rtnRst[3] = 'white';
								cntr.bText = cntr.yBlockAreaName;
							}
						}
					}
				}
			}
		}

		if(rtnRst[0] == null || rtnRst[0] == '#'){
			rtnRst[0] = '#9c9c9c';
		}
		return rtnRst;
	},
  
	applyTerminalLimits: function(portType, terminalInfo, spriteOutReachLimit, spriteMaxTierHeightLimit, surface) {
		var me = this;
		var rows = me.bay.rowEndIndex + 1;
		var tiers = me.bay.deckTierEndIndex + 1;
		
	    if(terminalInfo && terminalInfo.preferSideAlongSide !== null && terminalInfo.preferSideAlongSide !== '' 
	    	&& terminalInfo.outReach !== null && terminalInfo.outReach !== '') {
	    	
	    	if(parseInt(terminalInfo.outReach) < rows) {
	    		
	    		var rowIdx = terminalInfo.preferSideAlongSide === 'STB' ? rows - parseInt(terminalInfo.outReach) : parseInt(terminalInfo.outReach);
	    		var orX = me.getCellX(me.bay, me.bayX, rowIdx, 'D'); 
	    		
	    		spriteOutReachLimit.setAttributes({
	    			fromX: orX,
	    			fromY: me.bayY,
	    			toX: orX,
	    			toY: me.bayY + me.meta.bayHeight,
	    			hidden: me.meta.viewTerminalLimit === 'Y' ? false : true
	    		});
	    	}
	    } else {
	    	spriteOutReachLimit.setAttributes({
    			hidden: true
    		});
	    }
	    surface.renderSprite(spriteOutReachLimit);
	    
	    if(terminalInfo && terminalInfo.maxHcOnDeck !== null && terminalInfo.maxHcOnDeck !== '') {
	    	if(parseInt(terminalInfo.maxHcOnDeck) < tiers - me.bay.holdTierEndIndex ) {
	    		var hcY = me.getCellY(me.bay, me.bayY, parseInt(terminalInfo.maxHcOnDeck) + me.bay.holdTierEndIndex);
	    		hcY -= (me.getCellHeight(me.meta.highCubeContainerHeight) - me.meta.cellHeight) * parseInt(terminalInfo.maxHcOnDeck);
	    		spriteMaxTierHeightLimit.setAttributes({
	    			fromX: me.bayX,
	    			fromY: hcY,
	    			toX: me.bayX + me.meta.bayWidth,
	    			toY: hcY,
	    			hidden: me.meta.viewTerminalLimit === 'Y' ? false : true
	    		});
	    	}
	    } else {
	    	spriteMaxTierHeightLimit.setAttributes({
    			hidden: true
    		});
	    }
	    surface.renderSprite(spriteMaxTierHeightLimit);
	},
	
	//section A (text) - left top B center top C right top 
	//D left center E center center F right center G left bottom
	getCellDrawPos: function(section, scope, type, x, y, width, height) {
		var me = this;
		var posX, posY, posW, posH, posR;
		var offsetX, offsetY;
		var textAlignX = 'center', textAlignY = 'center';
		
		
		if(/[A-Z]/.test(section)) {
			posW = width / 3;
			posH = height / 3;
			
			offsetX = (section.charCodeAt(0) - 65) % 3;
			offsetY = parseInt((section.charCodeAt(0) - 65) / 3);
			
			if(offsetX === 0) {
				textAlignX = 'left'
			} else if(offsetX === 2) {
				textAlignX = 'right'
			}
			
			if(offsetY === 0) {
				textAlignY = 'top'
			} else if(offsetY === 2) {
				textAlignY = 'bottom'
			}
			
		} else if(/[0-9]/.test(section)) {
			posW = width / 4;
			posH = height / 4;
			
			offsetX = (parseInt(section) - 1) % 4;
			offsetY = parseInt((parseInt(section) - 1) / 4);
			
			if(offsetX === 0) {
				textAlignX = 'left'
			} else if(offsetX === 3) {
				textAlignX = 'right'
			}
			
			if(offsetY === 0) {
				textAlignY = 'top'
			} else if(offsetY === 3) {
				textAlignY = 'bottom'
			}
			
		} else {
			return;
		}
			
		if(type === 'text') {
			if(textAlignX === 'left') {
				posX = x + posW * offsetX + me.meta.baseUnit / 2;
			} else if(textAlignX === 'center') {
				posX = x + posW * offsetX + posW / 2;
			} else if(textAlignX === 'right') {
				posX = x + posW * offsetX + posW - me.meta.baseUnit / 2;
			}
			
			if(textAlignY === 'top') {
				
				posY = y + posH * offsetY + posH / 2 + me.meta.baseUnit / 2;
			} else if(textAlignY === 'center') {
				if (/hatch|bay/.test(me.viewMode)) {
					posY = y + posH * offsetY + posH / 2;
				} else {
					posY = y + posH * offsetY + posH / 2 + me.meta.baseUnit / 2;
				}
			} else if(textAlignY === 'bottom') {
				posY = y + posH * offsetY + posH / 2;
			}
			
			
		} else if(type === 'circle') {
			posX = x + posW * offsetX + posW / 2;
			posY = y + posH * offsetY + posH / 2;
			
		} else if(type === 'rect') {
			posX = x + posW * offsetX;
			posY = y + posH * offsetY;
			if(scope === 'section-half') {
				posX = x + posW * offsetX + posW / 4;
				posY = y + posH * offsetY + posH / 4;
				posW = posW / 2;
				posH = posH / 2;
			}else if(scope === 'section-small'){
				posX = x + posW * offsetX + posW / 4;
				posY = y + posH * offsetY + posH / 4;
				posW = posW / 4;
				posH = posH / 4;
			}
			
		} else if(type === 'triangle') {
			posX = x + posW * offsetX+me.meta.baseUnit/2;
			posY = y + posH * offsetY+me.meta.baseUnit/2;
			
		} else if(type === 'diamond') {
			if(scope === 'full') {
				posX = x+me.meta.baseUnit/2;
				posY = y+me.meta.baseUnit/2;
				posW = width-me.meta.baseUnit;
				posH = height-me.meta.baseUnit;
			} else if(scope === 'section') {
				posX = x + posW * offsetX;
				posY = y + posH * offsetY;
			} else if(scope === 'section-half') {
				posX = x + posW * offsetX + posW / 4;
				posY = y + posH * offsetY + posH / 4;
				posW = posW / 2;
				posH = posH / 2;
			}
		}
		
		if(scope === 'section') {
			posR = posW > posH ? posH / 2 : posW / 2;
		} else if(scope === 'section-half') {
			posR = posW > posH ? posH / 4 : posW / 4;
		} else if(scope === 'half') {
			posR = width > height ? height / 3 : width / 3;
		} else if(scope === 'full') {
			posR = width > height ? height / 2 : width / 2;
		}
		
		return [posX, posY, posW, posH, posR - me.meta.baseUnit / 2, textAlignX];
	},
	
	getCellDrawValue: function(record, cntrInfo, slotInfo) {
		var me = this;
		
		if(cntrInfo) {
			var value = cntrInfo.get(record.data.item);
			if(record.data.type === 'text') {
				if(/hatch|bay/.test(record.data.level)) {

					if(!record.data.hidden && record.data.item === 'hq' && value && value === 'H') {
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'sztp' && value) {
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'rfTemp' && value && value.length > 0) {
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'imdg' && value && value.length > 0) {
						value = value.replace('.','');
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'obSeqNo' && value && value.length > 0) {
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'weight') {
						//debugger;
						if(cntrInfo.data.planMode === 'A') {
							return 'P';
						} else {
							return parseFloat(value ? value / 1000 : 0).toFixed(1);
						}
					}
					
					if(!record.data.hidden && /pol|pod|por|secondPod|fpod|fdest/.test(record.data.item)) {
						return value && value.length > 0 ? value.substr(2,3) : '';
					}
					
					if(!record.data.hidden && record.data.item === 'ovh') {
						return value > 0 ? '^' : '';
					}
					
					if(!record.data.hidden && record.data.item === 'ovp') {
						return value > 0 ? '<' : '';
					}
					
					if(!record.data.hidden && record.data.item === 'ovs') {
						return value > 0 ? '>' : '';
					}
					
					//Item is not the dataitem of CntrInfo (CaspAsc)
					if(!record.data.hidden && record.data.item === 'empty' && cntrInfo.data.fe === 'E') {
						return record.data.text;
					}
					
					
				} else if(/vessel|hold/.test(record.data.level)) {
					if(!record.data.hidden && record.data.item === 'hq' && value && value === 'H') {
						return record.data.text ? record.data.text : value;
					}
					
					//3)
					if(!record.data.hidden && record.data.item === 'rfTemp' && value && value.length > 0 
							&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg) {
						return record.data.text;
					}
					
					//2)
					if(!record.data.hidden && record.data.item === 'imdg' && value && value.length > 0) {
						value = value.replace('.','');
						if(value.length === 3) value = value.substring(0, 2);
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'obSeqNo' && value && value.length > 0) {
					
						return record.data.text ? record.data.text : value;
					}
					
					if(!record.data.hidden && record.data.item === 'oog') {
						if(!cntrInfo.data.imdg && (cntrInfo.data.ovh > 0 || cntrInfo.data.ovf > 0 || cntrInfo.data.ova || cntrInfo.data.ovp || cntrInfo.data.ovs)) {
							return record.data.text;
						}
					}
					
					//5)
					// if(!record.data.hidden && record.data.item === 'hndlInst' && value && value.length > 0  
					// 		&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg 
					// 		&& cntrInfo.data.size !== '45'
					// 		&& cntrInfo.data.size !== '48'
					// 		&& cntrInfo.data.size !== '53'
					// 		&& !cntrInfo.data.rfTemp) {
					// 	return record.data.text;
					// }
					
					//Item is not the dataitem of CntrInfo (CaspAsc)
					//1)
					if(!record.data.hidden && record.data.item === 'empty' && cntrInfo.data.fe === 'E') {
						return record.data.text;
					}
					
					//4)
					if(!record.data.hidden && record.data.item === 'size45' && cntrInfo.data.size === '45' 
						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp) {
						return record.data.text;
					}
					
					if(!record.data.hidden && record.data.item === 'size48' && cntrInfo.data.size === '48' 
						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp) {
						return record.data.text;
					}
					
					if(!record.data.hidden && record.data.item === 'size53' && cntrInfo.data.size === '53' 
						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp) {
						return record.data.text;
					}
					
				}
				
				
				return null;
				
			} else if (record.data.type === 'rect' || record.data.type === 'circle' || record.data.type === 'triangle') {
				
				if(/hatch|bay/.test(record.data.level)) {
					if(!record.data.hidden && record.data.item === 'pol') {
						//[backcolor, forecolor]
						return me.getColor('POL', 'backcolor', cntrInfo.data, me.serviceLane);
					}
					
					//Item is not the dataitem of CntrInfo (CaspAsc)
					if(!record.data.hidden && record.data.item === 'shift' && cntrInfo.data.sftCntr === "Y" && cntrInfo.data.prevPosition && cntrInfo.data.prevPosition !== "" ) {
						//[backcolor, forecolor]
						return me.getColor('SFTPORT', 'backcolor', cntrInfo.data, me.serviceLane);
					}
					
					if(!record.data.hidden && record.data.item === 'overstow' && cntrInfo.data.irrOverStow === 'Y') {
						//[backcolor, forecolor]
						return me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
					}
					
					if(!record.data.hidden && record.data.item === 'hq' && cntrInfo.data.hq === 'H') {
						//[backcolor, forecolor]
						return me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
					}
					
				} else if(/vessel|hold/.test(record.data.level)) {
					if(!record.data.hidden && record.data.item === 'rob' && cntrInfo.data.pol !== me.pol && me.pol != "") {
						//[backcolor, forecolor]
						var colors =  me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
						return [colors[1], colors[1]];
					}
					
					//Item is not the dataitem of CntrInfo (CaspAsc)
					if(!record.data.hidden && record.data.item === 'shift' && cntrInfo.data.sftCntr === "Y" && cntrInfo.data.prevPosition && cntrInfo.data.prevPosition !== "" ) {
						//[backcolor, forecolor]
						return me.getColor('SFTPORT', 'backcolor', cntrInfo.data, me.serviceLane);
					}
					
					if(!record.data.hidden && record.data.item === 'overstow' && cntrInfo.data.irrOverStow === 'Y') {
						//[backcolor, forecolor]
						return me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
					}
					
					if(!record.data.hidden && record.data.item === 'hq' && cntrInfo.data.hq === 'H') {
						//[backcolor, forecolor]
						return me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
					}
				}
				
				return null;
			}
			
		} else {
			
			if(!record.data.hidden && record.data.item === 'c45ft' && slotInfo.c45ft === 'Y') {
				return record.data.foreColor;
			} else if(!record.data.hidden && record.data.item === 'c48ft' && slotInfo.c48ft === 'Y') {
				return record.data.foreColor;
			} else if(!record.data.hidden && record.data.item === 'c53ft' && slotInfo.c53ft === 'Y') {
				return record.data.foreColor;
			} else if(!record.data.hidden && record.data.item === 'reefer') {
				if(slotInfo.reefer === 'Y') {
					return record.data.foreColor;
				}
				if(slotInfo.reeferPP === 'Y') {
					return record.data.foreColorBottom;
				}
			} else if(!record.data.hidden && record.data.item === 'notDG' && slotInfo.notDG === 'Y') {
				return record.data.foreColor;
			} else if(!record.data.hidden && record.data.item === 'heatPosition' && slotInfo.heatPosition === 'Y') {
				return record.data.foreColor;
			}
			
			return null;
		}
		
		return null;
		
		/**
		 * LiMainExtJS Standard
		 * 
		 * In Case of hold, hatch, bay
		 * 	1)Top Left side     : Cargo Type + IMDG / HighCubic + Cntr Type
		 *  2)Bottom Right side : HQ + ' ' + Cntr Type
		 *  
		 * In case of hatch, bay
		 * 	1)Top Right side    : over height (may be shold change to slot) + ' ' + remark char('*')
		 *  2)middle Right side : over dimension to starboard side
		 *  3)middle center     : weight : (kg / 100) from EDI
		 *  4)middle left side  : over dimension to port side
		 *  5)bottom left side  : POL code as 3 chars
		 */								
	}
	
});
//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselPrintBayDraw', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.draw.sprite.Line',
	
	alias: 'widget.app-vesselprintbaydraw',
	
	mixins : [
	          'TSB.gux.vessel.VesselPrintRenderer'          
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
    slotMeta: {},
    cellDisplayOption: '',		//POD, POL, POD2 - by user config
    pol: '',
    polVoyage: '',
    polTerminal: '',
    polBerth: '',
    pod: '',
    podTerminal: '',
    podBerth: '',
    maskType: '',				//45, 48, 53, 63, RF
    
    render: function(surface, ctx) {
    	
//    	var bayDrawStart = new Date().getTime();
    	
    	var me = this;
		var rows = me.bay.rowEndIndex + 1;
		var tiers = me.bay.deckTierEndIndex + 1;
		
    	ctx.font = 'bold ' + me.meta.fontSizeCell + 'px ' + me.meta.fontType;
    	ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign;

	    //Cell
	    var cellPosX, cellPosY, flag, cntrInfo, cellInfo, cellWidth,
	        colors, backcolor, backcolor2, forecolor, forecolor2, varText, 
	        cargoType, cntrType1, cntrType2, cntrTp, x, xx, y, yy;
	    
	    //Make a gap between row for lashing bridge
	    var rowGap = 0.5;
    	if (/hatch|bay/.test(me.viewMode)) {
    		cellWidth = me.meta.cellWidth - rowGap * me.meta.baseUnit * 2;
    	} else {
    		cellWidth = me.meta.cellWidth;
    	}
    	
	    for(var j=0;j<rows;j++) {
	    	
	    	var accumulatedHgt = 0, hq;
	    	for(var k=0;k<tiers;k++) {
	    		if(me.bay.cells[k][j].value > 0) {
		    		
	    			//****get cell info.
	            	cellInfo = me.bay.cells[k][j];
	            	var hd = k > me.bay.holdTierEndIndex ? 'D' : 'H';
	            	
	            	if(me.meta.highCubicViewMode === 'Y') {
						if(cellInfo.status === 'S') {
							if(me.asc.getById(cellInfo.id)) {
								hq = me.asc.getById(cellInfo.id).data.hq;
							} else {
								hq = 'N';
							}
						} else if(cellInfo.status === 'X') {
							var id = cellInfo.postId || cellInfo.preId; 
							if(me.asc.getById(id)) {
								hq = me.asc.getById(id).data.hq;
							} else {
								hq = 'N';
							}
							
						} else {
							hq = 'N';
						}
						
						accumulatedHgt = k === me.bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
						accumulatedHgt += (me.getCellHeight(hq) - me.getCellHeight('N'));
					} else {
						hq = 'N';
					}
	            	
	    			cellPosY = me.getCellY(me.bay, me.bayY, k) - accumulatedHgt;
		    		cellPosX = me.getCellX(me.bay, me.bayX, j, hd);
		    		//Make a gap between row for lashing bridge
	            	x = /hatch|bay/.test(me.viewMode) ? cellPosX + rowGap * me.meta.baseUnit : cellPosX;
	            	y = cellPosY;
	            	xx = x + cellWidth;
	            	yy = y + me.getCellHeight(hq);	
	            	
	            	
	            	//****get setting for drawing config
	            	//Only for Vessel is applicable 2 bay mode. For Hold/Hatch View is always 3 bay mode
	            	flag = true;
	            	if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') {
	            		if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
	            			if(me.bay.pos === 'F') {
	            				//Consider 2x20' hatch, 1x20' hatch
	            				if(me.bay.bayListInHatch.length > 2) flag =  me.postBay && me.postBay.cells[k][j].value <= 0 ? true : me.bay.cells[k][j].status === 'S' ? true : false;
	            			} else if(me.bay.pos === 'M') {
	            				if(me.preBay && me.preBay.hatchNo === me.bay.hatchNo) flag = me.preBay.cells[k][j].status === 'S' ? false : true;
	            			} else if(me.bay.pos === 'A') {
	            				flag = true;
	            			}
	            		} else {
	            			if(me.bay.pos === 'F') {
	            				flag = true;
	            			} else if(me.bay.pos === 'M') {
	            				if(me.postBay && me.postBay.hatchNo === me.bay.hatchNo) flag = me.postBay.cells[k][j].status === 'S' ? false : true;
	            			} else if(me.bay.pos === 'A') {
	            				//Consider 2x20' bay
	            				if(me.bay.bayListInHatch.length > 2) flag =  me.preBay && me.preBay.cells[k][j].value <= 0 ? true : me.bay.cells[k][j].status === 'S' ? true : false;
	            			}
	            		}
	            	}

	            	if (flag){
	            		//****get color info & fill color in cell 
	            		backcolor = 'white'; 
	            		forecolor = me.meta.cellGuideColor;
	            		if (cellInfo.status === 'S' && me.asc.getById(cellInfo.id)) {
	            			//****get cntr info
	            			cntrInfo = me.asc.getById(cellInfo.id);
	            			var displayOpt = me.cellDisplayOption;
	            			
	            			colors = me.getColor(displayOpt, 'backcolor', cntrInfo.data, me.serviceLane);
	            			
	            			if (/^POL$|^POD$|^OPR$|^DEST$|^WEIGHT$/.test(displayOpt)) {
	            				backcolor = colors[0];
	            				forecolor = colors[1];
	            				backcolor2 = 'none';
	            				forecolor2 = 'none';									
	            				ctx.fillStyle = backcolor;
	            				ctx.fillRect(x,y,xx-x,yy-y);
	            			} else if (/PODPOL|PODOPR|PODDEST/.test(displayOpt)) {
	            				backcolor = colors[0];
	            				forecolor = colors[1];
	            				backcolor2 = colors[2];
	            				forecolor2 = colors[3];
	            				ctx.fillStyle = backcolor;
	            				ctx.fillRect(x, y, xx-x, yy-y);
	            				ctx.fillStyle = backcolor2;
	            				ctx.fillRect(x, yy - parseInt(me.meta.fontSizeCell), xx-x, parseInt(me.meta.fontSizeCell));
	            			} 
	            			
	            			
	            			if (/hatch|bay/.test(me.viewMode)) {
	            				
	            				me.slotMeta.each(function(record, idx, count){
	            					if(/hatch|bay/.test(record.data.level)) {
	            						//[posX, posY, posW, posH, posR, textAlign]
	            						var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
	            						
	            						if(record.data.type === 'text') {
	            							var value = me.getCellDrawValue(record, cntrInfo);
	            							if(value) {
	            								ctx.textAlign = pos[5];
	            								ctx.textBaseline = record.data.align ? record.data.align :'middle';
	            								ctx.fillStyle = forecolor;
	            								ctx.fillText(value,pos[0],pos[1]);
	            							}
	            							
	            						} else if(record.data.type === 'rect') {
	            							var colors = me.getCellDrawValue(record, cntrInfo);
	            							if(colors) {
	            								ctx.fillStyle = colors[0];
	            								if(record.data.style === 'fill') {
	            									ctx.fillRect(pos[0], pos[1], pos[2], pos[3]);
	            								} else {
	            									ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
	            								}
	            							}
	            						} else if(record.data.type === 'circle') {
	            							var colors = me.getCellDrawValue(record, cntrInfo);
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
	            							}
	            						}
	            					}
	            				});
	            			}
	            			
	            			if (/vessel|hold/.test(me.viewMode)) {
	            				
//				                	var slotMarkDrawStart = new Date().getTime();
	            				
	            				me.slotMeta.each(function(record, idx, count){
	            					if(/vessel|hold/.test(record.data.level)) {
	            						//[posX, posY, posW, posH, posR, textAlign]
	            						var pos = me.getCellDrawPos(record.data.section, record.data.scope, record.data.type, x, y, xx-x, yy-y);
	            						
	            						if(record.data.type === 'text') {
	            							var value = me.getCellDrawValue(record, cntrInfo);
	            							if(value) {
	            								ctx.textAlign = pos[5];
	            								ctx.textBaseline = record.data.align ? record.data.align :'middle';
	            								ctx.fillStyle = forecolor;
	            								ctx.fillText(value,pos[0],pos[1]);
	            							}
	            						} else if(record.data.type === 'rect') {
	            							var colors = me.getCellDrawValue(record, cntrInfo);
	            							if(colors) {
	            								ctx.fillStyle = colors[0];
	            								if(record.data.style === 'fill') {
	            									ctx.fillRect(pos[0], pos[1], pos[2], pos[3]);
	            								} else {
	            									ctx.strokeRect(pos[0], pos[1], pos[2], pos[3]);
	            								}
	            							}
	            						} else if(record.data.type === 'circle') {
	            							var colors = me.getCellDrawValue(record, cntrInfo);
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
	            							}
	            						}
	            					}
	            				});
	            				
//				                	var slotMarkDrawElapsed = new Date().getTime() - slotMarkDrawStart;
//				                	console.log("Slot Mark Draw: " + slotMarkDrawElapsed);
	            				
	            				
	            				if ((me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') 
	            						|| (me.viewMode === 'hold' && me.meta.baysInHatch === '2') ) {
	            					
	            					var flag = false;
	            					if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
	            						flag = me.bay.pos === 'F' ? true : false;
	            					} else {
	            						flag = me.bay.pos === 'A' ? true : false;
	            					}
	            					
	            					if (me.meta.sizeMark === '20' && flag) {
	            						if (cntrInfo.data.size === '20'){
	            							ctx.beginPath();
	            							ctx.strokeStyle = forecolor;
	            							ctx.moveTo(xx, y);
	            							ctx.lineTo(x, yy);
	            							ctx.stroke();
	            							ctx.beginPath();
	            						}
	            					} else if (me.meta.sizeMark === '40') {
	            						if (cntrInfo.data.size !== '20'){
	            							ctx.beginPath();
	            							ctx.strokeStyle = forecolor;
	            							ctx.moveTo(xx, y);
	            							ctx.lineTo(x, yy);
	            							ctx.stroke();
	            							ctx.beginPath();
	            						}
	            					}
	            					
	            				}
	            			}
	            			
	            			//For OOG over slot
	            			if(cntrInfo.data.osh > 0 || cntrInfo.data.osp > 0 || cntrInfo.data.oss > 0) {
	            				ctx.beginPath();
	            				ctx.strokeStyle = 'black';
	            				ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign * 5 ;
	            				
	            				var py,py,sx,sy;
	            				if(cntrInfo.data.osp > 0 && cntrInfo.data.oss > 0 && cntrInfo.data.osh > 0) {
	            					px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
	            					py = y + me.getCellHeight(hq) / 2;
	            					sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
	            					sy = y + me.getCellHeight(hq) / 2;
	            					
	            					//Port Side
	            					ctx.moveTo(x, py);
	            					ctx.lineTo(px, py);
	            					
	            					//Height
	            					ctx.lineTo(px, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(sx, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(sx, sy);
	            					
	            					//Starboard
	            					ctx.lineTo(x+cellWidth, sy);
	            					
	            				} else if(cntrInfo.data.osp > 0 && cntrInfo.data.osh > 0) {
	            					px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
	            					py = y + me.getCellHeight(hq) / 2;
	            					
	            					//Port Side
	            					ctx.moveTo(x, py);
	            					ctx.lineTo(px, py);
	            					
	            					//Height
	            					ctx.lineTo(px, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(x + cellWidth / 2, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(x + cellWidth / 2, y);
	            					
	            				} else if(cntrInfo.data.oss > 0 && cntrInfo.data.osh > 0) {
	            					sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
	            					sy = y + me.getCellHeight(hq) / 2;
	            					
	            					//Height
	            					ctx.moveTo(x + cellWidth / 2, y);
	            					ctx.lineTo(x + cellWidth / 2, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(sx, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(sx, sy);
	            					
	            					//Starboard
	            					ctx.lineTo(x+cellWidth, sy);
	            					
	            				} else if(cntrInfo.data.osp > 0 && cntrInfo.data.oss > 0) {
	            					px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
	            					py = y + me.getCellHeight(hq) / 3 * 2;
	            					sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
	            					sy = y + me.getCellHeight(hq) / 3 * 2;
	            					
	            					//Port Side
	            					ctx.moveTo(x, py);
	            					ctx.lineTo(px, py);
	            					ctx.lineTo(px, y + me.getCellHeight(hq) / 3);
	            					ctx.lineTo(x, y + me.getCellHeight(hq) / 3);
	            					
	            					//Starboard
	            					ctx.moveTo(x + cellWidth, y + me.getCellHeight(hq) / 3);
	            					ctx.lineTo(sx, y + me.getCellHeight(hq) / 3);
	            					ctx.lineTo(sx, sy);
	            					ctx.lineTo(x + cellWidth, sy);
	            					
	            				} else if(cntrInfo.data.osp > 0) {
	            					px = x - (cellWidth / 2 + (cntrInfo.data.osp - 1) * cellWidth);
	            					py = y + me.getCellHeight(hq) / 3 * 2;
	            					
	            					//Port Side
	            					ctx.moveTo(x, py);
	            					ctx.lineTo(px, py);
	            					ctx.lineTo(px, y + me.getCellHeight(hq) / 3);
	            					ctx.lineTo(x, y + me.getCellHeight(hq) / 3);
	            					
	            				} else if(cntrInfo.data.oss > 0) {
	            					sx = x + cellWidth + (cellWidth / 2 + (cntrInfo.data.oss - 1) * cellWidth);
	            					sy = y + me.getCellHeight(hq) / 3 * 2;
	            					
	            					//Starboard
	            					ctx.moveTo(x + cellWidth, y + me.getCellHeight(hq) / 3);
	            					ctx.lineTo(sx, y + me.getCellHeight(hq) / 3);
	            					ctx.lineTo(sx, sy);
	            					ctx.lineTo(x + cellWidth, sy);
	            					
	            				} else if(cntrInfo.data.osh > 0) {
	            					//Height
	            					ctx.moveTo(x + cellWidth / 3, y);
	            					ctx.lineTo(x + cellWidth / 3, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
	            					ctx.lineTo(x + cellWidth / 3 * 2, y - me.getCellHeight(hq) / 2 - (cntrInfo.data.osh -1 ) * me.meta.cellHeight);
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
	            				var cx = x + cellWidth / 2;
	            				var cy = y + me.getCellHeight(hq) / 2;
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
	            			
	            		} else if (me.maskType.length > 0 && !(cellInfo.status === 'S' || cellInfo.status === 'X') ) {
	            			var isSize = false, isType = false;
	            			if(/45/.test(me.maskType.join())) {
	            				if (cellInfo.c45ft != null && cellInfo.c45ft === 'Y'){
	            					isSize = true;	
	            				}
	            			}
	            			
	            			if(/48/.test(me.maskType.join())){
	            				if (cellInfo.c48ft != null && cellInfo.c48ft === 'Y'){
	            					isSize = true;	
	            				}
	            			}
	            			
	            			if(/53/.test(me.maskType.join())){
	            				if (cellInfo.c53ft != null && cellInfo.c53ft === 'Y'){
	            					isSize = true;	
	            				}
	            			}
	            			
	            			if(/63/.test(me.maskType.join())){
	            				if (cellInfo.c63ft != null && cellInfo.c63ft === 'Y'){
	            					isSize = true;	
	            				}
	            			}
	            			
	            			if(/RF/.test(me.maskType.join())){
	            				if (cellInfo.reefer != null && cellInfo.reefer === 'Y'){
	            					isType = true;	
	            				}
	            			}
	            			
	            			if (isSize || isType){
	            				ctx.beginPath();
	            				ctx.strokeStyle = me.meta.cellGuideColor;
	            				if(isSize) {
	            					//Circle
	            					var r = (xx-x) > (yy-y) ? (yy-y) / 2 : (xx-x) / 2;
	            					ctx.arc(x+(xx-x)/2, y+(yy-y)/2, r - 0.5 * me.meta.baseUnit , 0, 2*Math.PI);	
	            				} 
	            				
	            				if(isType) {
	            					//Diamond
	            					ctx.moveTo(x+(xx-x)/2,y);
	            					ctx.lineTo(x,y+(yy-y)/2);
	            					ctx.lineTo(x+(xx-x)/2,yy);
	            					ctx.lineTo(xx,y+(yy-y)/2);
	            					ctx.lineTo(x+(xx-x)/2,y);
	            				}
	            				ctx.stroke();
	            				ctx.beginPath();
	            			}
	            		}
	            		
	            		//****draw all of bay cell - important!!!!!
	            		ctx.strokeStyle = me.meta.cellGuideColor;
	            		//Check 40ft dedicated cell
	            		if(me.bay.pos === 'M') {
	            			if(me.preBay && me.preBay.hatchNo === me.bay.hatchNo && me.postBay && me.postBay.hatchNo === me.bay.hatchNo) {
	            				if(me.preBay.cells[k][j].value <= 0 && me.postBay.cells[k][j].value <= 0) {
	            					ctx.strokeStyle = 'blue';
	            				}
	            			}
	            		}
	            		
	            		//Check 20ft dedicated cell
	            		if(me.bay.pos === 'F') {
	            			if(me.bay.bayListInHatch.length > 1 && me.postBay && me.postBay.hatchNo === me.bay.hatchNo) {
	            				if(me.postBay.cells[k][j].value <= 0) {
	            					ctx.strokeStyle = 'red';
	            				}
	            			}
	            		}
	            		
	            		//Check 20ft dedicated cell
	            		if(me.bay.pos === 'A') {
	            			if(me.bay.bayListInHatch.length > 1 && me.preBay && me.preBay.hatchNo === me.bay.hatchNo) {
	            				if(me.preBay.cells[k][j].value <= 0) {
	            					ctx.strokeStyle = 'red';
	            				}
	            			}
	            		}
	            		ctx.strokeRect(x,y,xx-x,yy-y);
	            	}
	    		}
	    	}
    	}
	    
//	    var markStart = new Date().getTime();
	    
	    //Draw Bay, Row, Tier, Hatch Cover, etc
	    var isSacleViewable = true;
		
		if(me.viewMode === 'vessel'){
        	if(me.meta.baseVesselUnit / me.meta.baseVesselUnitOrign <= 0.6) isSacleViewable = false;
        } else if(me.viewMode === 'hold'){
        	if(me.meta.baseHoldUnit / me.meta.baseHoldUnitOrign <= 0.6) isSacleViewable = false;
        } else if(me.viewMode === 'hatch'){
        	if(me.meta.baseHatchUnit / me.meta.baseHatchUnitOrign <= 0.6) isSacleViewable = false;
        } else if(me.viewMode === 'bay'){
        	if(me.meta.baseBayUnit / me.meta.baseBayUnitOrign <= 0.5) isSacleViewable = false;
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
						
						var tierNoPlaceOffset = (me.meta.tierNoPlace === 'L' || me.meta.tierNoPlace === 'B') ? me.meta.tierNoAreaWidth * me.meta.baseUnit : 0;
						var hx, hy, hw, hh;
						hx = me.bayX + tierNoPlaceOffset + me.meta.baseUnit * me.meta.padleft + me.meta.baseUnit * me.meta.baseWidth / 4 * j - me.meta.baseUnit * me.meta.baseWidth / 4 * me.vsl.maxRowStartIndex * 4;
						hy = me.getRowValueY(me.bay, me.bayY, 'HatchCover');
						hw = me.bay.smallHatchCoverPosition[j] === 0 ? 0 : me.meta.baseWidth / 4 * me.meta.baseUnit;
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
	        					var sx = me.getCellX(me.bay, me.bayX, j, 'D') + rowGap * me.meta.baseUnit;
	        					var ex = me.getCellX(me.bay, me.bayX, j, 'D') + me.meta.cellWidth;
	        					var sy = me.getCellY(me.bay, me.bayY, me.bay.deckTierStartIndex) + me.meta.cellHeight;
	        					var ey = sy - lashingBridge * me.meta.cellHeight - me.meta.cellHeight / 5;
	        					
	        					ctx.beginPath();
	        					ctx.strokeStyle = me.meta.cellGuideColor;
	        					ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign * 2;
	        					ctx.moveTo(sx, sy);
	        					ctx.lineTo(sx, ey);
	        					ctx.stroke();
	        					ctx.moveTo(ex, sy);
	        					ctx.lineTo(ex, ey);
	        					ctx.stroke();
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
		        			var clearance = me.bay.hatchCoverClearance[j] ? me.bay.hatchCoverClearance[j] : 0;
		        			var allowance = me.bay.availableStackSlotsHold[j] * me.meta.generalContainerHeight + clearance;
		        			var value;
		        			if(allowance - me.bay.accumulatedStackHeightHold[j] < 0) {
		        				value = allowance - me.bay.accumulatedStackHeightHold[j];
		        			} else {
		        				if(me.bay.accumulatedStackHeightHold[j] > me.bay.availableStackSlotsHold[j] * me.meta.generalContainerHeight) {
		        					value = allowance - me.bay.accumulatedStackHeightHold[j];
		        				} else {
		        					value = clearance;
		        				}
		        			}
		        			
		        			
		        			ctx.font = 'bold ' + me.meta.fontSizeHatchCoverClearance * me.meta.baseUnit + 'px ' + me.meta.fontType;
		        			ctx.textAlign = 'center';
		        			ctx.textBaseline = 'hanging';
		        			ctx.fillStyle = value >= 0 ? me.meta.generalFontColor : 'red';
		        			ctx.fillText(parseFloat(value).toFixed(1), 
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
		        	
		        	
		        	//Hatch Cover Clearance
		        	if(me.viewMode === 'vessel' && me.meta.viewHatchCoverClearance === 'Y'){
		        		var clearance = me.bay.hatchCoverClearance[j] ? me.bay.hatchCoverClearance[j] : 0;
		        		var allowance = me.bay.availableStackSlotsHold[j] * me.meta.generalContainerHeight + clearance;
		        		var value = allowance - me.bay.accumulatedStackHeightHold[j] < 0 ? allowance - me.bay.accumulatedStackHeightHold[j] : clearance;
		        		
		        		if(value < 0) {
		        			ctx.arc(me.getCellX(me.bay, me.bayX, j, 'D') + cellWidth / 2,
		        					me.getRowValueY(me.bay, me.bayY, 'HatchCover') + me.meta.hatchCoverAreaHeight / 8 * me.meta.baseUnit,
		        					2 * me.meta.baseUnit,0,2*Math.PI);
		        			ctx.fillStyle = 'red';
		        			ctx.fill();
		        			ctx.beginPath();
		        		}
		        	}
	        	}
	        } 
	        
	        //Tier Number
	        if(isSacleViewable) {
	        	
	        	//Lashing, StackWeight, Visibility Legend
	        	if(me.meta.tierNoPlace === 'B') {
	        		
	        		//Left
	        		var x = me.bayX + me.meta.baseUnit * me.meta.padright;
	        		ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        		ctx.textAlign = 'left';
	        		ctx.textBaseline = 'middle';
	        		ctx.fillStyle = me.meta.generalFontColor;
	        		
	        		//Deck StackWeight
	        		if(me.meta.viewStackWeight === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			ctx.fillText('S.', x, y);
	        		}
					
	        		//Hold StackWeight
	        		if(me.meta.viewStackWeight === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			ctx.fillText('S.', x, y);
	        		}
	        		
					//Lashing
	        		if(me.meta.viewLashingResult === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2;
	        			ctx.fillText('L.', x, y);
	        		}
	        		
	        		//Visibility
	        		if(me.meta.viewVisibility === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2;
	        			ctx.fillText('V.', x, y);
	        		}
	        		
	        		//Cell Guide Clearance
	        		if(me.meta.viewCellGuideClearance === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance') + me.meta.cellGuideClearanceAreaHeight / 2;
	        			ctx.fillText('C.', x, y);
	        		}
	        		
					
					//Right
					var x = me.bayX + me.meta.bayWidth - me.meta.baseUnit * (me.meta.padright);
					ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
					ctx.textAlign = 'right';
					ctx.textBaseline = 'middle';
					ctx.fillStyle = me.meta.generalFontColor;
					
					//Deck StackWeight
	        		if(me.meta.viewStackWeight === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			ctx.fillText('S.', x, y);
	        		}
	        		
	        		//Hold StackWeight
	        		if(me.meta.viewStackWeight === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			ctx.fillText('S.', x, y);
	        		}
					
					//Lashing
	        		if(me.meta.viewLashingResult === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2;
	        			ctx.fillText('L.', x, y);
	        		}
	        		
	        		//Visibility
	        		if(me.meta.viewVisibility === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2;
	        			ctx.fillText('V.', x, y);
	        		}
	        		
	        		//Cell Guide Clearance
	        		if(me.meta.viewCellGuideClearance === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance') + me.meta.cellGuideClearanceAreaHeight / 2;
	        			ctx.fillText('C.', x, y);
	        		}
	        		
	        	} else {
	        		
	        		var x = me.meta.tierNoPlace === 'L' ? me.bayX + me.meta.baseUnit * me.meta.padright : me.bayX + me.meta.bayWidth - me.meta.baseUnit * (me.meta.padright);
	        		ctx.font = 'bold ' + me.meta.fontSizeRowTier * me.meta.baseUnit + 'px ' + me.meta.fontType;
	        		ctx.textAlign = me.meta.tierNoPlace === 'L' ? 'left' : 'right';
	        		ctx.textBaseline = 'middle';
	        		ctx.fillStyle = me.meta.generalFontColor;
	        		
	        		//StackWeight
	        		if(me.meta.viewStackWeight === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'DeckStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			ctx.fillText('S.', x, y);
	        		}
	        		
	        		//Hold StackWeight
	        		if(me.meta.viewStackWeight === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'HoldStackWeight') + me.meta.stackWeightAreaHeight / 2;
	        			ctx.fillText('S.', x, y);
	        		}
					
					//Lashing
	        		if(me.meta.viewLashingResult === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'DeckLashingResult') + me.meta.deckLashingAreaHeight / 2;
	        			ctx.fillText('L.', x, y);
	        		}
	        		
	        		//Visibility
	        		if(me.meta.viewVisibility === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'VisibilityResult') + me.meta.visibilityAreaHeight / 2;
	        			ctx.fillText('V.', x, y);
	        		}
	        		
	        		//Cell Guide Clearance
	        		if(me.meta.viewCellGuideClearance === 'Y') {
	        			var y = me.getRowValueY(me.bay, me.bayY, 'CellGuideClearance') + me.meta.cellGuideClearanceAreaHeight / 2;
	        			ctx.fillText('C.', x, y);
	        		}
					
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
	    
//	    var markElapsed = new Date().getTime() - markStart;
//    	console.log("BayMark: " + markElapsed);
	    
	    
//	    var bayDrawElapsed = new Date().getTime() - bayDrawStart;
//    	console.log("BayDraw: " + bayDrawElapsed);
    },
    
    /**
     * categor : POD/POL/POD2
     * type : backcolor / forecolor
     * cntr : cntr structure, that should have pod, pol, pod2.
     * serviceLane store
     */
	getColor: function(category, type, cntr, serviceLane) {
    	var rtnRst = ['gray', 'black', 'gray', 'black'], findFirstCondition = false, findSecondCondition = false;
		if(serviceLane.data.length > 0) {
			if(category === 'POD') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.pod) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						return rtnRst;	
					}
				}
			} else if (category === 'POL') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.pol) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						return rtnRst;	
					}
				}	
			} else if (category === 'SFTPORT') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.sftPort) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						return rtnRst;	
					}
				}					
			} else if (category === 'DEST') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.fdest) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						return rtnRst;	
					}
				}				
			} else if (category === 'OPR') {
				for(var i=0;i<serviceLane.data.getAt(0).operator(0).data.length;i++){
					if(serviceLane.data.getAt(0).operator(0).data.getAt(i).data.oprCode === cntr.opr) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).operator(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).operator(0).data.getAt(i).data.foreColor						
						return rtnRst;							        
					}
				}				
			} else if (category === 'PODPOL') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.pod) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						findFirstCondition = true;
						if (findFirstCondition && findSecondCondition) return rtnRst;
					}
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.pol) {
						rtnRst[2] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[3] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						findSecondCondition = true;
						if (findFirstCondition && findSecondCondition) return rtnRst;
					}
				}				
			} else if (category === 'PODOPR') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.pod) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						findFirstCondition = true;
					}
				}					
					
				for(var i=0;i<serviceLane.data.getAt(0).operator(0).data.length;i++){
					if(serviceLane.data.getAt(0).operator(0).data.getAt(i).data.portCode === cntr.opr) {
						rtnRst[2] = '#' + serviceLane.data.getAt(0).operator(0).data.getAt(i).data.backColor
						rtnRst[3] = '#' + serviceLane.data.getAt(0).operator(0).data.getAt(i).data.foreColor
						findSecondCondition = true;
					}
				}	
				
				if (findFirstCondition && findSecondCondition) return rtnRst;
				
			} else if (category === 'PODDEST') {
				for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.pod) {
						rtnRst[0] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[1] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						findFirstCondition = true;
						if (findFirstCondition && findSecondCondition) return rtnRst;
					}
					if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === cntr.fdest) {
						rtnRst[2] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.backColor
						rtnRst[3] = '#' + serviceLane.data.getAt(0).port(0).data.getAt(i).data.foreColor
						findSecondCondition = true;
						if (findFirstCondition && findSecondCondition) return rtnRst;
					}
				}	
			} else if (category === 'WEIGHT') {
				var color = CASP.config.Code.getWeightGroupColorValue(cntr.weightGroup);
				rtnRst[0] = '#' + color;
				rtnRst[1] = 'black';
				
				return rtnRst;	
			}
		
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
	    		hcY -= (me.getCellHeight('Y') - me.getCellHeight('N')) * parseInt(terminalInfo.maxHcOnDeck);
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
	
	getCellDrawPos: function(section, scope, type, x, y, width, height) {
		var me = this;
		var posX, posY, posW, posH, posR;
		var offsetX, offsetY;
		var textAlign = 'center';
		
		
		if(/[A-Z]/.test(section)) {
			posW = width / 3;
			posH = height / 3;
			
			offsetX = (section.charCodeAt(0) - 65) % 3;
			offsetY = parseInt((section.charCodeAt(0) - 65) / 3);
			
			if(offsetX === 0) {
				textAlign = 'left'
			} else if(offsetX === 2) {
				textAlign = 'right'
			}
			
		} else if(/[0-9]/.test(section)) {
			posW = width / 4;
			posH = height / 4;
			
			offsetX = (parseInt(section) - 1) % 4;
			offsetY = parseInt((parseInt(section) - 1) / 4);
			
			if(offsetX === 0) {
				textAlign = 'left'
			} else if(offsetX === 3) {
				textAlign = 'right'
			}
			
		} else {
			return;
		}
			
		if(type === 'text' || type === 'circle') {
			if(textAlign === 'left') {
				posX = x + posW * offsetX;
			} else if(textAlign === 'center') {
				posX = x + posW * offsetX + posW / 2;
			} else if(textAlign === 'right') {
				posX = x + posW * offsetX + posW;
			}
			posY = y + posH * offsetY + posH / 2;
			
		} else if(type === 'rect') {
			posX = x + posW * offsetX;
			posY = y + posH * offsetY;
			if(scope === 'section-half') {
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
		
		return [posX, posY, posW, posH, posR - 1, textAlign];
	},
	
	getCellDrawValue: function(record, cntrInfo) {
		var me = this;
		var value = cntrInfo.get(record.data.item);
		
		if(record.data.type === 'text') {
			if(/hatch|bay/.test(record.data.level)) {
				if(record.data.item === 'hq' && value && value === 'Y') {
					return record.data.text ? record.data.text : value;
				}
				
				if(record.data.item === 'sztp' && value) {
					return record.data.text ? record.data.text : value;
				}
				
				if(record.data.item === 'rfTemp' && value && value.length > 0) {
					return record.data.text ? record.data.text : value;
				}
				
				if(record.data.item === 'imdg' && value && value.length > 0) {
					return record.data.text ? record.data.text : value;
				}
				
				if(record.data.item === 'weight') {
					if(cntrInfo.data.planMode === 'A') {
						return 'P';
					} else {
						return parseFloat(value ? value / 1000 : 0).toFixed(1);
//						return parseInt(value ? value / 100 : 0);
					}
				}
				
				if(/pol|pod|por|secondPod|fpod|fdest/.test(record.data.item)) {
					return value && value.length > 0 ? value.substr(2,3) : '';
				}
				
				if(record.data.item === 'ovh') {
					return value > 0 ? '^' : '';
				}
				
				if(record.data.item === 'ovp') {
					return value > 0 ? '<' : '';
				}
				
				if(record.data.item === 'ovs') {
					return value > 0 ? '>' : '';
				}
				
				//Item is not the dataitem of CntrInfo (CaspAsc)
				if(record.data.item === 'empty' && cntrInfo.data.fe === 'E') {
					return record.data.text;
				}
				
				
			} else if(/vessel|hold/.test(record.data.level)) {
				if(record.data.item === 'hq' && value && value === 'Y') {
					return record.data.text ? record.data.text : value;
				}
				
				//3)
				if(record.data.item === 'rfTemp' && value && value.length > 0 
						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg) {
//						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && cntrInfo.data.pol === me.pol) {
					return record.data.text;
				}
				
				//2)
// 				if(record.data.item === 'imdg' && cntrInfo.data.fe === 'F') {
// //				if(record.data.item === 'imdg' && cntrInfo.data.fe === 'F' && cntrInfo.data.pol === me.pol) {
// 					return value && value.length > 0 ? value : '';
// 				}
				
				//5)
// 				if(record.data.item === 'hndlInst' && value && value.length > 0  
// 						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg 
// 						&& cntrInfo.data.size !== '45'
// 						&& cntrInfo.data.size !== '48'
// 						&& cntrInfo.data.size !== '53'
// 						&& !cntrInfo.data.rfTemp) {
// //						&& !cntrInfo.data.rfTemp && cntrInfo.data.pol === me.pol) {
// 					return record.data.text;
// 				}
				
				//Item is not the dataitem of CntrInfo (CaspAsc)
				//1)
				// if(record.data.item === 'empty' && cntrInfo.data.fe === 'E') {
				// 	return record.data.text;
				// }
				
				//4)
// 				if(record.data.item === 'size45' && cntrInfo.data.size === '45' 
// 						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp) {
// 					return record.data.text;
// 				}
				
// 				if(record.data.item === 'size48' && cntrInfo.data.size === '48' 
// 						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp) {
// //						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp && cntrInfo.data.pol === me.pol) {
// 					return record.data.text;
// 				}
				
// 				if(record.data.item === 'size53' && cntrInfo.data.size === '53' 
// 						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp) {
// //						&& cntrInfo.data.fe === 'F' && !cntrInfo.data.imdg && !cntrInfo.data.rfTemp && cntrInfo.data.pol === me.pol) {
// 					return record.data.text;
// 				}
				
			}
			
			
			return null;
			
		} else if (record.data.type === 'rect' || record.data.type === 'circle') {
			
			if(/hatch|bay/.test(record.data.level)) {
				if(record.data.item === 'pol') {
					//[backcolor, forecolor]
					return me.getColor('POL', 'backcolor', cntrInfo.data, me.serviceLane);
				}
				
				//Item is not the dataitem of CntrInfo (CaspAsc)
				if(record.data.item === 'shift' && cntrInfo.data.sftCntr === "Y" && cntrInfo.data.prevPosition && cntrInfo.data.prevPosition !== "" ) {
					//[backcolor, forecolor]
					return me.getColor('SFTPORT', 'backcolor', cntrInfo.data, me.serviceLane);
				}
				
				if(record.data.item === 'overstow' && cntrInfo.data.irrOverStow === 'Y') {
					//[backcolor, forecolor]
					return me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
				}
				
			} else if(/vessel|hold/.test(record.data.level)) {
				if(record.data.item === 'rob' && cntrInfo.data.pol !== me.pol && me.pol != "") {
					//[backcolor, forecolor]
					var colors =  me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
					return [colors[1], colors[1]];
				}
				
				//Item is not the dataitem of CntrInfo (CaspAsc)
				if(record.data.item === 'shift' && cntrInfo.data.sftCntr === "Y" && cntrInfo.data.prevPosition && cntrInfo.data.prevPosition !== "" ) {
					//[backcolor, forecolor]
					return me.getColor('SFTPORT', 'backcolor', cntrInfo.data, me.serviceLane);
				}
				
				if(record.data.item === 'overstow' && cntrInfo.data.irrOverStow === 'Y') {
					//[backcolor, forecolor]
					return me.getColor('POD', 'backcolor', cntrInfo.data, me.serviceLane);
				}
			}
			
			return null;
		}
		
		return null;
		
		/**
		 * CASP Standard
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
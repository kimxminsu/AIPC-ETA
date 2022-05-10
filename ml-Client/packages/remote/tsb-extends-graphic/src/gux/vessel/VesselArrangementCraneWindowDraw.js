//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselArrangementCraneWindowDraw', {
	/**
     * @memberOf TSB.gux.vessel.VesselArrangementCraneWindowDraw
     */
	extend: 'Ext.draw.sprite.Line',
	
	alias: 'widget.app-vesselarrangementcranewindowdraw',
	
	mixins : [
	          'TSB.gux.vessel.VesselArrangementRenderer'          
	],
	
	meta: {},
	vsl: {},
	bays: {},
	vslDis: {},
	baysDis: {},
	asc: {},
	storeCraneAssignmentPlan: {},
	svc: {},
	storeCrane: {},
	storeProductivity: {},
	planMode: false,
	
    render: function(surface, ctx) {
    	var me = this;
    	var plans = new Array();
    	
    	ctx.font = 'bold ' + me.meta.fontSizeSummary + 'px ' + me.meta.fontType;
    	ctx.lineWidth = me.meta.baseUnit / me.meta.baseUnitOrign;
    	
    	//Vertical Line
    	var hatchCount = 0, accBayUnits = 0;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0; 
		for(var i=0;i<me.vsl.noBays;i++){
    		bay = me.bays.getAt(i).data;
    		postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    		hatchNo = bay.hatchNo;
    		preHatchNo = preBay ? preBay.hatchNo : 0;
    		
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			hatchCount++;
    			
    			offsetHchX = me.getHatchX(hatchCount, accBayUnits);
    			accBayUnits += bay.bayListInHatch.length === 1 ? parseInt(bay.name) % 2 === 0 ? 2 : 1 : 2;
    		}
    		
    		//Vertical Hatch Guideline
        	if(bay.hatchNo !== preHatchNo) {
        		var offset = me.meta.bayDirection === 'RTL' ? 1 : -1;
        		var x = offsetHchX + 2 * me.meta.baseUnit * offset;
        		var y = 0;
        		
        		ctx.beginPath();
        		ctx.strokeStyle = me.meta.bayGuideColor;
        		ctx.moveTo(x, y);
        		ctx.lineTo(x, y + me.meta.craneWorkingWindowWidth);
        		ctx.stroke();
        	}
    		
	    	preBay = bay;
    	}
    	
    	
    	//Timeline
    	//Draw Entire Rect
    	ctx.strokeStyle = me.meta.timelineForecolor;
    	ctx.lineWidth=1;
    	ctx.fillStyle = me.meta.timelineBackcolor;
    	
    	//Timeline
    	ctx.fillRect( 0,
    			0,
    			me.meta.timelineWidth,
    			me.meta.craneWorkingWindowHeight);
    	ctx.strokeRect( 0,
    			0,
    			me.meta.timelineWidth,
    			me.meta.craneWorkingWindowHeight);
    	
    	
    	//Draw Date & Time
    	var hourHeight, minHeight, minLineX, minMajorLineX, minTextX, dayTextX;
    	
    	hourHeight = me.meta.baseUnit * me.meta.baseTimeUnit * 60;
    	minHeight = me.meta.baseUnit * me.meta.baseTimeUnit;
    	dayTextX = me.meta.timelineWidth - me.meta.timelineWidth / 10 * 7;
    	minLineX = me.meta.timelineWidth - me.meta.timelineWidth / 10;
    	minMajorLineX = me.meta.timelineWidth - me.meta.timelineWidth / 10 * 2;
    	minTextX = me.meta.timelineWidth - me.meta.timelineWidth / 10 * 4;
    	
    	var dt = me.meta.startTime;
    	var day = Ext.Date.format(dt, 'd');
    	var prevDay;
    	
    	ctx.font = me.meta.dateTimeFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
    	ctx.fillStyle = 'black';
    	
    	for(var i=0; i<me.meta.hours; i++)	{
    		
    		for(var j=0; j<60;j++) {
    			
    			dt = Ext.Date.add(dt, Ext.Date.MINUTE, 1);
    			prevDay = day;
    			day = Ext.Date.format(dt, 'd');
    			var min = Ext.Date.format(dt, 'i');
    			var hour = Ext.Date.format(dt, 'H');
    			
    			if((i===0 && j===0) || day !== prevDay) {
    				ctx.textAlign = 'center';
    				ctx.textBaseline = 'top';
    				ctx.fillText('(' + day + ')', dayTextX, i * hourHeight + j * minHeight);
    			}
    			
    			if(parseInt(min) % 2 === 0) {
    				ctx.beginPath();
    				ctx.moveTo(minLineX, i * hourHeight + j * minHeight);
    				ctx.lineTo(me.meta.timelineWidth, i * hourHeight + j * minHeight);
    				ctx.strokeStyle=me.meta.timelineForecolor;
    				ctx.stroke();
    			}
    			
    			if(parseInt(min) % me.meta.timelineMinutesOffset === 0) {
    				ctx.beginPath();
    				ctx.moveTo(minMajorLineX, i * hourHeight + j * minHeight);
    				ctx.lineTo(me.meta.timelineWidth, i * hourHeight + j * minHeight);
    				ctx.strokeStyle=me.meta.timelineForecolor;
    				ctx.stroke();
    				
    				ctx.textAlign = 'center';
    				ctx.textBaseline = 'middle';
    				ctx.fillText(hour + ':' + min , minTextX, i * hourHeight + j * minHeight);
    			}
    		}
    		
    	}
    	
    	//Planning
    	for(var i=0;i<me.storeCraneAssignmentPlan.getDataSource().getCount();i++) {
    		var record = me.storeCraneAssignmentPlan.getDataSource().items[i];
    		
    		var flag = true;
    		for(var j=0;j<plans.length;j++) {
    			if(plans[j].equipmentNo === record.data.equipmentNo) {
    				index = j;
    				flag = false;
    				break;
    			}
    		}
    		
    		if(flag) {
    			plans.push({
    				equipmentNo: record.data.equipmentNo,
    				list: new Array()
    			});
    			index = plans.length - 1;
    		}
    		
    		plans[index].list.push({
    			sequence: record.data.sequence,
    			startTime: record.data.startTime,
    			storeIndex: i
    		});
    	}
    	
    	for(var i=0;i<plans.length;i++) {
    		plans[i].list = me.sortByKey(plans[i].list, 'sequence', 'ASC');
    	}
    	
    	
    	for(var p=0;p<plans.length;p++) {
    		var crane = me.storeCrane.findRecord('equipmentNo', plans[p].equipmentNo);
    		var wpm = crane.wph / 60;	//work per minute
    		
    		for(var l=0;l<plans[p].list.length;l++) {
    			var record = me.storeCraneAssignmentPlan.getAt(plans[p].list[l].storeIndex);
    			
    			//Discharge Stowage
    			
    			//Main Stowage
    			for(var i=0;i<me.vsl.noBays;i++){
    	    		var bay = me.bays.getAt(i).data;
    	    		var rows = bay.rowEndIndex + 1;
    	    		var tier, tiers;
    	    		if(record.data.hd === 'H') {
    	    			tier = 0;
    	    			tiers = bay.holdTierEndIndex + 1;
    	    		} else {
    	    			tier = bay.deckTierStartIndex;
    	    			tiers = bay.deckTierEndIndex + 1
    	    		}
    	    		
    	        	if(bay.hatchNo == record.data.hatchNo) {
    	        		var foreBay, midBay, aftBay, bayType;
		        		if(bay.bayListInHatch.length === 1 && bay.pos === 'M') {
	    					//40' Dedicated Bay
		        			bayType = 'D4';
		        			midBay = me.bays.getAt(bay.bayListInHatch[0]).data;
		        			
		    			} else if(bay.bayListInHatch.length === 1 && bay.pos !== 'M') {
//		    				//20' Dedicated Bay
		    				bayType = 'D2';
		    				foreBay = me.bays.getAt(bay.bayListInHatch[0]).data;
		    				
	    				} else if(bay.bayListInHatch.length === 2) {
	    					//2x20' Dedicated Bay
	    					bayType = '22';
	    					foreBay = me.bays.getAt(bay.bayListInHatch[0]).data;
	    					aftBay = me.bays.getAt(bay.bayListInHatch[1]).data;
	    					
	    				} else {
	    					//Normal 3 bay hatches
	    					bayType = 'N3';
	    					foreBay = me.bays.getAt(bay.bayListInHatch[0]).data;
	    					midBay = me.bays.getAt(bay.bayListInHatch[1]).data;
	    					aftBay = me.bays.getAt(bay.bayListInHatch[2]).data;
	    				}
		        		
    	        		if(record.data.workMode === 'D') {
    	        			/*
    	        			 * Discharging
    	        			 * 0. Stern to Bow
    	        			 * 1. Top to Bottom
    	        			 * 2. Shore to Sea 	TODO: Adopt berthing alongSide later on. STB as default
    	        			 * 3. Tandem > Twin > Single
    	        			 */
    	        			for(var j=rows-1;j>=0;j--) {
            		        	for(var k=tiers-1;k>=tier;k--) {
            		        		var fAsc, mAsc, aAsc;
            		        		
            		        		if(foreBay && foreBay.cells[k][j].value > 0 && foreBay.cells[k][j].status === 'S') {
            		        			fAsc = me.asc.getById(foreBay.cells[k][j].id);
                	    			}
            		        		
            		        		if(midBay && midBay.cells[k][j].value > 0 && midBay.cells[k][j].status === 'S') {
            		        			mAsc = me.asc.getById(midBay.cells[k][j].id);
                	    			}
            		        		
            		        		if(aftBay && aftBay.cells[k][j].value > 0 && aftBay.cells[k][j].status === 'S') {
            		        			aAsc = me.asc.getById(aftBay.cells[k][j].id);
                	    			}
            		        		
            		        		if(bayType === 'N3') {
            		        			
            		        		}
            		        		
            		        	}
            		        }
        	    		} else {
        	    			/*
    	        			 * Loading
    	        			 * 0. Bow to Stern
    	        			 * 1. Bottom to Top
    	        			 * 2. Sea to Shore
    	        			 * 3. Single > Twin > Tandem
    	        			 */
        	    		}
    	        		
    	        		break;
    	        	}
    	    	}
    		}
    	}
    	
    	
    	
    	//Draw Crane Working Blocks
//    		me.storeCrane
//			me.storeProductivity
//			
//			
//			bay.noDisH = 0;
//			bay.noDisD = 0;
//			bay.noDisSftH = 0;
//			bay.noDisSftD = 0;
//			bay.noLodH = 0;
//			bay.noLodD = 0;
//			bay.noLodSftH = 0;
//			bay.noLodSftD = 0;
    	
    }

});
//Ext.define('CASP.view.service	.vessel.draw.VesselCell', {
//	extend: 'Ext.draw.sprite.Sprite',
//	
//	alias: 'widget.app-vslcell',
//
//	render: function(surface, ctx, clipRect) {
//		
//	}
//
//
//});
 
Ext.define('TSB.gux.vessel.PlanSpriteComposite', {
    // Typically, you'd want to extend the Composite sprite instead of using it directly.
    extend: 'Ext.draw.sprite.Composite',
    alias: 'sprite.planspritecomposite',

    inheritableStatics: {
	    def: {
	        // And define your own attributes on the composite that abstract away
	        // the actual implementation.
	        processors: {
	            // The first five attributes (start and end point coordinates and color)
	            // is all we really need for this sprite to work.
	        	//meta: 'object',
	            cellPosX: 'number',
	            cellPosY: 'number',
	            cellWidth: 'number',
	            cellHeight: 'number',
	            scale: 'number',
	            fontSizeCell: 'number',
	            cellDirty: 'bool',
	            hidden: 'bool'
	        },
	        // Changes to composite attributes will then trigger the recalculation of
	        // attributes of composite's children sprites.
	        // Here we define which composite's attributes should trigger such recalculation.
	        // In this case we use a single updater function called 'redraw', but it's
	        // possible to specify and use different updaters for different attributes.
	        dirtyTriggers: {
	            cellPosX: 'redraw',
	            cellPosY: 'redraw',
	            cellWidth: 'redraw',
	            cellHeight: 'redraw',
	            scale: 'redraw',
	            fontSizeCell: 'redraw',
	            cellDirty: 'redraw',
	            hidden: 'redraw'
	        },
	        // Default values of composite's attributes.
	        defaults: {
	        	//meta: {},
	            cellPosX: -1,
	            cellPosY: -1,
	            cellWidth: 20,
	            cellHeight: 20,
	            scale: 1,
	            fontSizeCell: 10,
	            cellDirty: false,
	            hidden: true
	        },
	        updaters: {
	            // This updater function is called every time the attributes
	            // of the composite change, including animations.
	            // Inside this updater we calculate and set the values of the attributes
	            // of the children of the composite based on the values of the composite's
	            // attributes.
	            redraw: function (attr) {
	                // Please see this ticket https://sencha.jira.com/browse/EXTJS-15521
	                // for a graphical representation of what's going on in this function.
	                var me = this;
	                if (me.getCustomId() === 'id-cellSelection') {
		                var occupiedMarkOffsetX = attr.cellWidth * 0.1,
		        			occupiedMarkOffsetY = attr.cellHeight * 0.1,
		                	cellPosX = attr.cellPosX - occupiedMarkOffsetX,
		                	cellPosY = attr.cellPosY - occupiedMarkOffsetY,
		                    cellWidth = attr.cellWidth + occupiedMarkOffsetX * 2,
		                    cellHeight = attr.cellHeight + occupiedMarkOffsetY * 2,
	
		                    fontSize = attr.fontSizeCell;
		
		                if (cellPosX < 0 || cellPosY < 0) {
		                    return;
		                }
		                
		                if (!me.cellSelection) me.createCellRect();
		                me.cellSelection.setAttributes({
		                	x: cellPosX,
		                	y: cellPosY,
		                    width: cellWidth,
		                    height: cellHeight,
		                    hidden: attr.hidden
		                });
		                
		            } else if (me.getCustomId() === 'id-planSelection') {
		            	if (!me.planSelection) me.createPlanRect();
		                me.planSelection.setAttributes({
		                	x: attr.cellPosX,
		                	y: attr.cellPosY,
		                    width: attr.cellWidth,
		                    height: attr.cellHeight,
		                    hidden: attr.hidden
		                });
		                
		            } else if (me.getCustomId() === 'id-segmentSelection') {
		            	if (!me.segmentSelection) me.createSegmentRect();
		                me.segmentSelection.setAttributes({
		                	x: attr.cellPosX,
		                	y: attr.cellPosY,
		                    width: attr.cellWidth,
		                    height: attr.cellHeight,
		                    hidden: attr.hidden
		                });
		            }
	                
	            	attr.cellDirty = false;
	            }
	        }
	    }
	},
	
	// Additional configuration options that are meant to be used once during setup time.
	// These need not be attributes, because we don't need them to animate
	// or trigger changes in other attributes.
	config: {
        fontType: 'Courier',
        customId: 'id'
	},
	
	// The 'recalculate' updater will be called at construction time.
	// But the children sprites have not been created and added to the composite yet.
	// We can't add children to the composite before the parent constructor call,
	// because the composite hasn't been initialized yet.
	// And adding them after construction is too late, because the 'recalculate'
	// updater needs them.
	// So we define the 'createSprites' function that is called inside the 'recalculate'
	// updater before the sprites are used.
	createCellRect: function () {
	    var me = this;
	    // Only create sprites if they haven't been created yet.
	    if (!me.cellSelection) {
	        me.cellSelection = me.add({
	            type: 'rect',
		        strokeStyle: me.meta.selectedRectStrokeColor,
	            lineDash: [3],
	            fillStyle: me.meta.selectedRectFillColor,
	            fillOpacity: 0.5,
	            customId: me.getCustomId()
	        });
	    }
	},
	
	createPlanRect: function () {
	    var me = this;
	    // Only create sprites if they haven't been created yet.
	    if (!me.planSelection) {
	        me.planSelection = me.add({
	            type: 'rect',
		        strokeStyle: me.meta.planRectStrokeColor,
	            lineDash: [1,1],  
	            customId: me.getCustomId()
	        });
	    }
	},
	
	createSegmentRect: function () {
		var me = this;
		// Only create sprites if they haven't been created yet.
		if (!me.segmentSelection) {
			me.segmentSelection = me.add({
				type: 'rect',
//				strokeStyle: me.meta.segmentRectStrokeColor,
//				lineDash: [1,1],  
				fillStyle: me.meta.segmentRectStrokeColor,
	            fillOpacity: 0.2,
				customId: me.getCustomId()
			});
		}
	}

});
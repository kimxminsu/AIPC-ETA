Ext.define('TSB.gux.AbstractRenderer', {
    /**
     * @memberOf erest.track_event
     */
    extend: 'Ext.draw.Container',

    requires: [
        'Ext.chart.interactions.Abstract',
        'Ext.data.StoreManager',
        'Ext.data.Store'
    ],
    
    mixins: {
        observable : 'Ext.mixin.Observable'
    },
//    
//    defaultBindProperty: 'store',

    delegationRegex: /^item([a-z]+)$/i,

    domEvents: new RegExp("click|focus|blur|paste|input|mousemove|mousedown|mouseup|mouseover|mouseout|keyup|keydown|keypress|submit|"+
                          "pinch|pinchstart|pinchend|touchmove|touchstart|touchend|rotate|rotatestart|rotateend|drag|dragstart|dragend|tap|doubletap|singletap"),

    config: {

        /**
         * @cfg {Ext.data.Store} store
         * The store that supplies data to this chart.
         */
        //vessel explorer
        storeAsc: 'ext-empty-store',
        storeOutbound: 'ext-empty-store',
        storeCntr: 'ext-empty-store',
        storeVslStruc: 'ext-empty-store',
        storeSlotMeta: 'ext-empty-store',
        storeSvc: 'ext-empty-store',
        storeCraneAssignmentPlan: 'ext-empty-store',

        storeMeta: 'ext-empty-store',
        storeBerth: 'ext-empty-store',
        storeBitt: 'ext-empty-store',
        storeBerthPlan: 'ext-empty-store',

        storeCell: 'ext-empty-store',
        storeBay: 'ext-empty-store',
        storeRow: 'ext-empty-store',
        storeUnused: 'ext-empty-store',

        /**
         * @cfg {Object} style
         * The style for the chart component.
         */
        style: null,
 
        /**
         * @cfg {Boolean/Object} shadow (optional) `true` for the default shadow configuration 
         * `{shadowOffsetX: 2, shadowOffsetY: 2, shadowBlur: 3, shadowColor: '#444'}`
         * or a standard shadow config object to be used for default chart shadows.
         */
        shadow: false,

        /**
         * @cfg {Boolean/Object} animation (optional) `true` for the default animation (easing: 'ease' and duration: 500)
         * or a standard animation config object to be used for default chart animations.
         */
        animation: !Ext.isIE8,

        /**
         * @cfg {Array} colors Array of colors/gradients to override the color of items and legends.
         */
        colors: null,

        /**
         * @cfg {Object|Number|String} insetPadding The amount of inset padding in pixels for the chart.
         * Inset padding is the padding from the boundary of the chart to any of its contents.
         */
        insetPadding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },

        searchCondition:{
        	from : '',
        	to : ''
        },
        
        /**
         * @cfg {Object} background Set the chart background. This can be a gradient object, image, or color.
         *
         * For example, if `background` were to be a color we could set the object as
         *
         *     background: '#ccc'
         *
         * You can specify an image by using:
         *
         *     background: {
         *         type: 'image',
         *         src: 'http://path.to.image/'
         *     }
         *
         * Also you can specify a gradient by using the gradient object syntax:
         *
         *     background: {
         *         type: 'linear',
         *         degrees: 0,
         *         stops: [
         *             {
         *                 offset: 0,
         *                 color: 'white'
         *             },
         *             {
         *                 offset: 1,
         *                 color: 'blue'
         *             }
         *         ]
         *     }
         */
        background: null,

        selectedItem: null,
        /**
         * @private
         * The main area of the draw where cells and marks are drawn.
         */
        mainRect: null,

        /**
         * @private
         * Override value.
         */
        resizeHandler: null,

        /**
         * @readonly
         * @cfg {Object} highlightItem
         * The current highlight item in the draw.
         * The object must be the one that you get from item events.
         *
         * Note that series can also own highlight items.
         * This notion is separate from this one and should not be used at the same time.
         */
        highlightItem: null
    },

    /**
     * @private
     */
    resizing: 0,

    /**
     * Toggle for chart interactions that require animation to be suspended.
     * @private
     */
    animationSuspended: 0,

    /**
     * @private The z-indexes to use for the various surfaces
     */
    surfaceZIndexes: {
        background: 0,
        main: 1,
        plan: 2,
        mask: 3,
        blink: 4,
        legend: 5
    },

    animating: 0,

    layoutSuspended: 0,

    applyAnimation: function (newAnimation, oldAnimation) {
        if (!newAnimation) {
            newAnimation = {
                duration: 0
            };
        } else if (newAnimation === true) {
            newAnimation = {
                easing: 'easeInOut',
                duration: 500
            };
        }
        return oldAnimation ? Ext.apply({}, newAnimation, oldAnimation) : newAnimation;
    },

    applyInsetPadding: function (padding, oldPadding) {
        if (!Ext.isObject(padding)) {
            return Ext.util.Format.parseBox(padding);
        } else if (!oldPadding) {
            return padding;
        } else {
            return Ext.apply(oldPadding, padding);
        }
    },

    suspendAnimation: function () {
        this.animationSuspended++;
        if (this.animationSuspended === 1) {
        	
        	//chad - TBD for animating cells
//            var series = this.getSeries(), i = -1, n = series.length;
//            while (++i < n) {
//                //update animation config to not animate
//                series[i].setAnimation(this.getAnimation());
//            }
        }
    },

    resumeAnimation: function () {
        this.animationSuspended--;
        if (this.animationSuspended === 0) {
        	
        	//chad - TBD for animating cells
//            var series = this.getSeries(), i = -1, n = series.length;
//            while (++i < n) {
//                //update animation config to animate
//                series[i].setAnimation(this.getAnimation());
//            }
        }
    },

    suspendDrawLayout: function () {
        this.layoutSuspended++;
        if (this.layoutSuspended === 1) {
            if (this.scheduledLayoutId) {
                this.layoutInSuspension = true;
                this.cancelLayout();
            } else {
                this.layoutInSuspension = false;
            }
        }
    },

    resumeDrawLayout: function () {
        this.layoutSuspended--;
        if (this.layoutSuspended === 0) {
            if (this.layoutInSuspension) {
                this.scheduleLayout();
            }
        }
    },

    /**
     * Cancel a scheduled layout.
     */
    cancelLayout: function () {
        if (this.scheduledLayoutId) {
            Ext.draw.Animator.cancel(this.scheduledLayoutId);
            this.scheduledLayoutId = null;
        }
    },

    /**
     * Schedule a layout at next frame.
     */
    scheduleLayout: function () {
        var me = this;

        if (me.rendered && !me.scheduledLayoutId) {
            me.scheduledLayoutId = Ext.draw.Animator.schedule('doScheduleLayout', me);
        }
    },

    doScheduleLayout: function () {
        if (this.layoutSuspended) {
            this.layoutInSuspension = true;
        } else {
            this.performLayout();
        }
    },

    getAnimation: function () {
        if (this.resizing || this.animationSuspended) {
            return {
                duration: 0
            };
        } else {
            return this.callParent();
        }
    },

    constructor: function (config) {
        var me = this;

        me.itemListeners = {};
        me.surfaceMap = {};

        me.isInitializing = true;
        me.suspendDrawLayout();
        me.callParent(arguments);
        delete me.isInitializing;

        me.getSurface('main');
        me.getSurface('plan');
        me.resumeDrawLayout();
        
        me.mixins.observable.constructor.call(me, config);
    },

    applySprites: function (sprites) {
        var surface = this.getSurface('main');

        sprites = Ext.Array.from(sprites);
        surface.removeAll(true);
        surface.add(sprites);
    },

    initItems: function () {
        var items = this.items,
            i, ln, item;
        if (items && !items.isMixedCollection) {
            this.items = [];
            items = Ext.Array.from(items);
            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (item.type) {
                    Ext.Error.raise("To add custom sprites to the chart use the 'sprites' config.");
                } else {
                    this.items.push(item);
                }
            }
        }
        this.callParent();
    },

    applyBackground: function (newBackground, oldBackground) {		//background, it can be removed.
        var surface = this.getSurface('background');
        if (newBackground) {
            surface.remove(oldBackground, true);
            if (newBackground.type === 'image' && Ext.isString(newBackground.src)) {
                oldBackground = surface.add(newBackground);
            } else {
                oldBackground = surface.add({
                    type: 'rect',
                    fillStyle: newBackground
                });
            }
        }
        return oldBackground;
    },

    resizeHandler: function (size) {
        var me = this;
        if (this.resizing === 0) me.scheduleLayout();
        return false;
    },

    applyMainRect: function (newRect, rect) {
        if (!rect) {
            return newRect;
        }
        if (newRect[0] === rect[0] &&
            newRect[1] === rect[1] &&
            newRect[2] === rect[2] &&
            newRect[3] === rect[3]) {
            return rect;
        } else {
            return newRect;
        }
    },

    getSurface: function (name, type) {
        name = name || 'main';
        type = type || name;
        var me = this,
            surface = this.callParent([name]),
            zIndexes = me.surfaceZIndexes;
        if (type in zIndexes) {
            surface.element.setStyle('zIndex', zIndexes[type]);
        }
        if (!me.surfaceMap[type]) {
            me.surfaceMap[type] = [];
        }
        if (Ext.Array.indexOf(me.surfaceMap[type], (surface)) < 0) {
            surface.type = type;
            me.surfaceMap[type].push(surface);
        }
        return surface;
    },

    circularCopyArray: function(inArray, startIndex, count) {
        var outArray = [],
            i, len = inArray && inArray.length;
        if (len) {
            for (i = 0; i < count; i++) {
                outArray.push(inArray[(startIndex + i) % len]);
            }
        }
        return outArray;
    },

    circularCopyObject: function(inObject, startIndex, count) {
        var me = this,
            name, value, outObject = {};
        if (count) {
            for (name in inObject) {
                if (inObject.hasOwnProperty(name)) {
                    value = inObject[name];
                    if (Ext.isArray(value)) {
                        outObject[name] = me.circularCopyArray(value, startIndex, count);
                    } else {
                        outObject[name] = value;
                    }
                }
            }
        }
        return outObject;
    },

    applyInteractions: function (interactions, oldInteractions) {
        if (!oldInteractions) {
            oldInteractions = [];
            oldInteractions.map = {};
        }
        var me = this,
            result = [], oldMap = oldInteractions.map,
            i, ln, interaction;
        result.map = {};
        interactions = Ext.Array.from(interactions, true);
        for (i = 0, ln = interactions.length; i < ln; i++) {
            interaction = interactions[i];
            if (!interaction) {
                continue;
            }
            interaction = Ext.factory(interaction, null, oldMap[interaction.getId && interaction.getId() || interaction.id], 'interaction');
            if (interaction) {
                interaction.setChart(me);
                result.push(interaction);
                result.map[interaction.getId()] = interaction;
            }
        }

        for (i in oldMap) {
            if (!result.map[oldMap[i]]) {
                oldMap[i].destroy();
            }
        }
        return result;
    },

    /********************** add for vessel explorer **********************/
    applyStoreAsc: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },
    applyStoreOutbound: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },
    applyStoreCntr: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },
    applyStoreVslStruc: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },
    applyStoreSlotMeta: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },
    applyStoreCraneAssignmentPlan: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },
    /********************** add for vessel explorer **********************/

    applyStoreMeta: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },
    
    applyStoreBerth: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },
    
    applyStoreBitt: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },
    
    applyStoreBerthPlan: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },

    applyStoreCell: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },
    
    applyStoreBay: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },
    
    applyStoreRow: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },
    
    applyStoreUnused: function (store) {
    	return store && Ext.StoreManager.lookup(store);
    },

    /********************** add for vessel explorer **********************/
    updateStoreAsc: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChangedAsc',
                add: 'onAddAsc',
                update: 'onUpdateAsc',
                remove: 'onRemoveAsc',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                //datachanged: 'onDataChangedAsc',
                add: 'onAddAsc',
                update: 'onUpdateAsc',
                remove: 'onRemoveAsc',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },

    updateStoreOutbound: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChangedOutbound',
                add: 'onAddOutbound',
                update: 'onUpdateOutbound',
                remove: 'onRemoveOutbound',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                //datachanged: 'onDataChangedOutbound',
                add: 'onAddOutbound',
                update: 'onUpdateOutbound',
                remove: 'onRemoveOutbound',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },

    updateStoreVslStruc: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChanged',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                //datachanged: 'onDataChanged',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },

    updateStoreSlotMeta: function (newStore, oldStore) {
    	var me = this;
    	if (oldStore) {
    		oldStore.un({
    			//datachanged: 'onDataChanged',
    			update: 'onUpdateSlotMeta',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    		if (oldStore.autoDestroy) {
    			oldStore.destroy();
    		}
    	}
    	if (newStore) {
    		newStore.on({
    			//datachanged: 'onDataChanged',
    			update: 'onUpdateSlotMeta',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    	}
    	
    	me.fireEvent('storechange', newStore, oldStore);
    	me.onLoad();
    },

    updateStoreCraneAssignmentPlan: function (newStore, oldStore) {
    	var me = this;
    	if (oldStore) {
    		oldStore.un({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddCraneAssignmentPlan',
    			update: 'onUpdateCraneAssignmentPlan',
    			remove: 'onRemoveCraneAssignmentPlan',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    		if (oldStore.autoDestroy) {
    			oldStore.destroy();
    		}
    	}
    	if (newStore) {
    		newStore.on({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddCraneAssignmentPlan',
    			update: 'onUpdateCraneAssignmentPlan',
    			remove: 'onRemoveCraneAssignmentPlan',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    	}
    	
    	me.fireEvent('storechange', newStore, oldStore);
    	me.onLoad();
    },

    /********************** add for vessel explorer **********************/

    updateStoreMeta: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChanged',
	            update: 'onUpdateMeta',
	            load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                //datachanged: 'onDataChanged',
                update: 'onUpdateMeta',
	            load: 'onLoad',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },
    
    updateStoreBerth: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChanged',
            	update: 'onUpdateBerth',
	            load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                //datachanged: 'onDataChanged',
            	update: 'onUpdateBerth',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },
    
    updateStoreBitt: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChanged',
	            load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                //datachanged: 'onDataChanged',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },
    
    updateStoreBerthPlan: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChangedAsc',
                add: 'onAddBerthPlan',
                update: 'onUpdateBerthPlan',
                remove: 'onRemoveBerthPlan',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
            	//datachanged: 'onDataChangedAsc',
            	add: 'onAddBerthPlan',
                update: 'onUpdateBerthPlan',
                remove: 'onRemoveBerthPlan',
	            load: 'onLoad',
	            scope: me,
	            order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },

    updateStoreCell: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un({
                //datachanged: 'onDataChangedAsc',
                add: 'onAddCell',
                update: 'onUpdateCell',
                remove: 'onRemoveCell',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
            	//datachanged: 'onDataChangedAsc',
            	add: 'onAddCell',
                update: 'onUpdateCell',
                remove: 'onRemoveCell',
	            load: 'onLoad',
	            scope: me,
	            order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },    
    
    updateStoreBay: function (newStore, oldStore) {
    	var me = this;
    	if (oldStore) {
    		oldStore.un({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddBay',
    			update: 'onUpdateBay',
    			remove: 'onRemoveBay',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    		if (oldStore.autoDestroy) {
    			oldStore.destroy();
    		}
    	}
    	if (newStore) {
    		newStore.on({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddBay',
    			update: 'onUpdateBay',
    			remove: 'onRemoveBay',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    	}
    	
    	me.fireEvent('storechange', newStore, oldStore);
    	me.onLoad();
    },    

    updateStoreRow: function (newStore, oldStore) {
    	var me = this;
    	if (oldStore) {
    		oldStore.un({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddRow',
    			update: 'onUpdateRow',
    			remove: 'onRemoveRow',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    		if (oldStore.autoDestroy) {
    			oldStore.destroy();
    		}
    	}
    	if (newStore) {
    		newStore.on({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddRow',
    			update: 'onUpdateRow',
    			remove: 'onRemoveRow',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    	}
    	
    	me.fireEvent('storechange', newStore, oldStore);
    	me.onLoad();
    },    

    updateStoreUnused: function (newStore, oldStore) {
    	var me = this;
    	if (oldStore) {
    		oldStore.un({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddUnused',
    			update: 'onUpdateUnused',
    			remove: 'onRemoveUnused',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    		if (oldStore.autoDestroy) {
    			oldStore.destroy();
    		}
    	}
    	if (newStore) {
    		newStore.on({
    			//datachanged: 'onDataChangedAsc',
    			add: 'onAddUnused',
    			update: 'onUpdateUnused',
    			remove: 'onRemoveUnused',
    			load: 'onLoad',
    			scope: me,
    			order: 'after'
    		});
    	}
    	
    	me.fireEvent('storechange', newStore, oldStore);
    	me.onLoad();
    },    
    
    
    
    /**
     * Redraw the draw. If animations are set this will animate the draw too.
     */
    redraw: function () {
    	this.fireEvent('redraw', this);
    },

    performLayout: function () {
        var me = this,
            size = me.bodyElement.getSize(),
            drawRect = [0, 0, size.width, size.height];
//            background = me.getBackground();				//background, it can be removed.

        me.hasFirstLayout = true;
        me.fireEvent('layout');
        me.cancelLayout();
//        me.getSurface('background').setRect(drawRect);	//background, it can be removed.
        me.getSurface('main').setRect(drawRect);
//        background.setAttributes({						//background, it can be removed.
//            width: size.width,
//            height: size.height
//        });
    },

    // Converts page coordinates into chart's 'main' surface coordinates.
    getEventXY: function (e) {
        return this.getSurface().getEventXY(e);
    },

    /**
     * @private
     */
    delayThicknessChanged: 0,

    /**
     * @private
     */
    thicknessChanged: false,

    /**
     * Suspend the layout initialized by thickness change
     */
    suspendThicknessChanged: function () {
        this.delayThicknessChanged++;
    },

    /**
     * Resume the layout initialized by thickness change
     */
    resumeThicknessChanged: function () {
        if (this.delayThicknessChanged > 0) {
            this.delayThicknessChanged--;
            if (this.delayThicknessChanged === 0 && this.thicknessChanged) {
                this.onThicknessChanged();
            }
        }
    },

    onAnimationStart: function () {
        this.fireEvent('animationstart', this);
    },

    onAnimationEnd: function () {
        this.fireEvent('animationend', this);
    },

    onThicknessChanged: function () {
        if (this.delayThicknessChanged === 0) {
            this.thicknessChanged = false;
            this.performLayout();
        } else {
            this.thicknessChanged = true;
        }
    },

//    /**
//     * @private
//     */
//    onDataChanged: function () {
//        var me = this;
//        if (me.isInitializing) {
//            return;
//        }
//        var rect = me.getMainRect(),
//            store = me.getStoreVslStruc(),
//            i, ln;
//        
//            
//        //Chad: During destroy it prevents to call the redraw
//        if (!store) {
//            return;
//        }
//        
//        if (!rect) { // The draw hasn't been rendered yet.
//            me.on({
//                redraw: me.onDataChanged,
//                scope: me,
//                single: true
//            });
//            return;
//        }
//        
//        me.redraw();
//        
//        //a = arguments[0]
//        //a.getModifiedRecords()
//        //a.getRemovedRecords()
//        //a.getNewRecords()
//    },

/********************** add for vessel explorer **********************/

/**
     * @private
     */
    onAddAsc: function (store, records, index, eOpts) {
        var me = this;
        
        //multiple bay selection
        var bays = new Array();
    	for(var i=0;i<records.length;i++) {
    	    var flag = true;
            for(var j=0;j<bays.length;j++) {
            	if(bays[j] === (records[i].data.dbay || records[i].getPrevious('dbay'))) {
            		flag = false;
            		break;
            	}
            }

            if(flag) {
                //Redraw entire drawing
                bays.push(records[i].data.dbay || records[i].getPrevious('dbay'));
                me.redraw(records[i], 'asc');
            }
    	}
    	
    	//Redraw entire drawing
//        me.redraw(records[0], 'asc');
    },
    
	/**
     * @private
     */
    onUpdateAsc: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        var me = this;
        
        if(operation === 'edit') {
            //Redraw entire drawing
            // console.log('redraw all In');
            me.redraw(record, 'asc');        
        }
        // else if(operation === 'crane') {
        // 	var bays = new Array();
        // 	for(var i=0;i<record.length;i++) {
        // 	    var flag = true;
        //         for(var j=0;j<bays.length;j++) {
        //         	if(bays[j] === (record[i].data.dbay || record[i].getPrevious('dbay'))) {
        //         		flag = false;
        //         		break;
        //         	}
        //         }

        //         if(flag) {
        //             bays.push(record[i].data.dbay || record[i].getPrevious('dbay'));
        //             me.redraw(record[i], operation);
                    
        //         }
        // 	}
        // 	me.fireEvent('storechange', store);
        // }
    },
    
	/**
     * @private
     */
    onRemoveAsc: function (store, records, index, isMove, eOpts) {
        var me = this;
        //multiple bay selection
        var bays = new Array();
    	for(var i=0;i<records.length;i++) {
    	    var flag = true;
            for(var j=0;j<bays.length;j++) {
                if(bays[j] === records[i].data.dbay) {
                    flag = false;
                    break;
                }
            }

            if(flag) {
                // console.log('remove and redraw');
                //Redraw entire drawing
                bays.push(records[i].data.dbay);
                me.redraw(records[i], 'asc');
            }
    	}
    	
    	//Redraw entire drawing
//        me.redraw(records[0], 'asc');
    },



/**
     * @private
     */
    onAddOutbound: function (store, records, index, eOpts) {
        var me = this;
        
        //multiple bay selection
        var bays = new Array();
    	for(var i=0;i<records.length;i++) {
    	    var flag = true;
            for(var j=0;j<bays.length;j++) {
            	if(bays[j] === (records[i].data.dbay || records[i].getPrevious('dbay'))) {
            		flag = false;
            		break;
            	}
            }

            if(flag) {
                //Redraw entire drawing
                bays.push(records[i].data.dbay || records[i].getPrevious('dbay'));
                me.redraw(records[i], 'asc');
            }
    	}
    	
    	//Redraw entire drawing
//        me.redraw(records[0], 'asc');
    },
    
	/**
     * @private
     */
    onUpdateOutbound: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        var me = this;
        
        if(operation === 'edit') {
            //Redraw entire drawing
            // console.log('redraw all Out');
           me.redraw(record, 'asc');
           
        }
    },
    
	/**
     * @private
     */
    onRemoveOutbound: function (store, records, index, isMove, eOpts) {
        var me = this;
        //multiple bay selection
        var bays = new Array();
    	for(var i=0;i<records.length;i++) {
    	    var flag = true;
            for(var j=0;j<bays.length;j++) {
                if(bays[j] === records[i].data.dbay) {
                    flag = false;
                    break;
                }
            }

            if(flag) {
                // console.log('remove and redraw');
                //Redraw entire drawing
                bays.push(records[i].data.dbay);
                me.redraw(records[i], 'asc');
            }
    	}
    	
    	//Redraw entire drawing
//        me.redraw(records[0], 'asc');
    },


    	/**
     * @private
     */
    onUpdateSvc: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        var me = this;
        
        if(operation === 'edit') {
        	//Redraw entire drawing
            me.redraw(null, 'svc');
        }
    },

    /**
     * @private
     */
    onUpdateSlotMeta: function (store, record, operation, modifiedFieldNames, details, eOpts) {
    	var me = this;
    	
    	if(operation === 'edit') {
    		//If meta changed, the resizing can be happend, so set 1 not to call redraw again
    		this.resizing = 1;
    		
    		//Redraw entire drawing
    		me.redraw(null, 'slotmeta');
    		this.resizing = 0;
    	}
    },

    /**
     * @private
     */
    onAddCraneAssignmentPlan: function (store, records, index, eOpts) {
    	var me = this;
    	
        //Redraw entire drawing
    	me.redraw(records[0], 'craneassignmentplan');
    },
    
    /**
     * @private
     */
    onUpdateCraneAssignmentPlan: function (store, record, operation, modifiedFieldNames, details, eOpts) {
    	var me = this;
    	
    	if(operation === 'edit') {
            //Redraw entire drawing
            // console.log('onUpdateCrane');
    		me.redraw(record, 'craneassignmentplan');
    	}
    },
    
    /**
     * @private
     */
    onRemoveCraneAssignmentPlan: function (store, records, index, isMove, eOpts) {
    	var me = this;
    	
    	//Redraw entire drawing
    	me.redraw(records[0], 'craneassignmentplan');
    },

/********************** add for vessel explorer **********************/

	/**
     * @private
     */
    onUpdateMeta: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        var me = this;
        
        if(operation === 'edit') {
        	//If meta changed, the resizing can be happend, so set 1 not to call redraw again
        	this.resizing = 1;
        	
        	//Redraw entire drawing
            me.redraw(null, 'meta');
            this.resizing = 0;
        }
    },
    
	/**
     * @private
     */
    onUpdateBerth: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        var me = this;
        
        if(operation === 'edit') {
        	//If meta changed, the resizing can be happend, so set 1 not to call redraw again
        	this.resizing = 1;
        	
        	//Redraw entire drawing
            me.redraw(null, 'meta');
            this.resizing = 0;
        }
    },
    
    
	/**
     * @private
     */
    onAddBerthPlan: function (store, records, index, eOpts) {
        var me = this;
        
    	//Redraw entire drawing
        me.redraw(records[0], 'berthplan');
    },
    
	/**
     * @private
     */
    onUpdateBerthPlan: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        var me = this;
        
        if(operation === 'edit') {
        	//Redraw entire drawing
//            me.redraw(record, 'berthplan');
            berthPlanTask.delay(500, null, me, [record]);
        }
    },
    
	/**
     * @private
     */
    onRemoveBerthPlan: function (store, records, index, isMove, eOpts) {
        var me = this;
        
    	//Redraw entire drawing
        me.redraw(records[0], 'craneassignmentplan');
    },
    
    onAddCell: function (store, records, index, eOpts) {
    	var me = this;
    	me.redraw();
    },
    onUpdateCell: function (store, record, operation, modifiedFieldNames, details, eOpts) {
    	var me = this;
    	
    	if(operation === 'edit') {
    		me.redraw();
    	}
    },
    onRemoveCell: function (store, records, index, isMove, eOpts) {
    	var me = this;
    	
    	me.redraw();
    }, 
    
    onAddBay: function (store, records, index, eOpts) {
    	var me = this;
    	me.redraw();
    },
    onUpdateBay: function (store, record, operation, modifiedFieldNames, details, eOpts) {
    	var me = this;
    	
    	if(operation === 'edit') {
    		me.redraw();
    	}
    },
    onRemoveBay: function (store, records, index, isMove, eOpts) {
    	var me = this;
    	
    	me.redraw();
    },
    
    onAddRow: function (store, records, index, eOpts) {
    	var me = this;
    	me.redraw();
    },
    onUpdateRow: function (store, record, operation, modifiedFieldNames, details, eOpts) {
    	var me = this;
    	
    	if(operation === 'edit') {
    		me.redraw();
    	}
    },
    onRemoveRow: function (store, records, index, isMove, eOpts) {
    	var me = this;
    	
    	me.redraw();
    },
    
    onAddUnused: function (store, records, index, eOpts) {
    	var me = this;
    	me.redraw();
    },
    onUpdateUnused: function (store, record, operation, modifiedFieldNames, details, eOpts) {
    	var me = this;
    	
    	if(operation === 'edit') {
    		me.redraw();
    	}
    },
    onRemoveUnused: function (store, records, index, isMove, eOpts) {
    	var me = this;
    	
    	me.redraw();
    },

    
	/**
     * @private
     */
    onLoad: function () {
         var me = this;
         if (me.isInitializing) {
             return;
         }
         var rect = me.getMainRect();
         
         
         //ToDo: specify the business
//         var store = me.getStoreVslStruc() || me.getStoreBerth();
             
         //Chad: During destroy it prevents to call the redraw
//         if (!store) {
//             return;
//         }
         
         if (!rect) { // The draw hasn't been rendered yet.
             me.on({
                 redraw: me.onLoad,
                 scope: me,
                 single: true
             });
             return;
         }
         
         //Redraw entire drawing
         me.redraw();
    },


    /**
     * Changes the data store bound to this chart and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this chart.
     */
    bindStore: function (store) {
        this.setStore(store);
    },

    applyHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (newHighlightItem === oldHighlightItem) {
            return;
        }
        if (Ext.isObject(newHighlightItem) && Ext.isObject(oldHighlightItem)) {
            if (newHighlightItem.sprite === oldHighlightItem.sprite &&
                newHighlightItem.index === oldHighlightItem.index
                ) {
                return;
            }
        }
        return newHighlightItem;
    },

    updateHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (oldHighlightItem) {
            oldHighlightItem.series.setAttributesForItem(oldHighlightItem, {highlighted: false});
        }
        if (newHighlightItem) {
            newHighlightItem.series.setAttributesForItem(newHighlightItem, {highlighted: true});
            this.fireEvent('itemhighlight', newHighlightItem);
        }
    },
    
    toastMessage: function (message, title, type, modal, isNotLocale, appendMessage) {
    	toastTask.delay(500, null, this, [message, title, type, modal, isNotLocale, appendMessage]);
    },
    
    toastMessageNoDelay: function (message, title, type, modal, isNotLocale, appendMessage) {
    	this.fireEvent('toastMessage', message, title, type, modal, isNotLocale, appendMessage);
    },
    
    onDelayedToastMessage: function(elements) {
		var me = this;
		me.fireEvent('toastMessage', elements[0], elements[1], elements[2], elements[3], elements[4], elements[5]);
	},
	
	generateUuid: function() {
		var me = this;
		var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    
	    return uuid;
	},
	
	sortByKey: function(array, key, dir) {
    	array.sort(function(a, b){
    		var x = a[key]; var y = b[key];
    		if(dir === 'ASC') {
    			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    		} else {
    			return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    		}
    	});
        return array;
    },

    // @private remove gently.
    destroy: function () {
        var me = this,
            emptyArray = [];
        me.surfaceMap = null;
        me.setHighlightItem(null);
        me.storeMeta = null;
        me.storeBerth = null;
        me.storeBitt = null;
        me.storeBerthPlan = null;
        
        me.storeCell = null;
        me.storeBay = null;
        me.storeRow = null;
        me.storeUnused = null;

        me.storeAsc = null;
        me.storeOutbound = null;
        me.storeCntr = null;
        me.storeVslStruc = null;
        me.storeSlotMeta = null;
        me.storeSvc = null;
        me.storeCraneAssignmentPlan = null;
        
        me.cancelLayout();
        this.callParent(arguments);
    }
});

var toastTask = new Ext.util.DelayedTask(function() {
	var me = this;
    me.onDelayedToastMessage(arguments);
});


var berthPlanTask = new Ext.util.DelayedTask(function() {
	var me = this;
	me.redraw(arguments, 'berthplan');
});
Ext.define('IoTosOmExt.view.code.containertypesize.ContainerTypeSizeWindow', {
   extend : 'Ext.window.Window',
   alias : 'widget.containertypesizewin',

   width : 650,
   height : 650,
   autoScroll : true,

   listeners : {
      close : function() {
         if(this.getViewModel()) {
            this.setViewModel(null);
         }
      }
   },

   initComponent : function() {
      var me = this;
      var columns;
      if(me.winType == CodeConstantsOM.commonCode.type) {
         columns = GridUtil.getGridColumns('ContainerTypeGrid');
      }else {
         columns = GridUtil.getGridColumns('ContainerSizeGrid');
      }
      me.setViewModel(me.parentView.getViewModel());

      Ext.apply(me, {
         items : [{
            xtype : 'grid',
            bind : {
               store : '{' + this.storeNm + '}'
            },
            flex : 1,
            columns: {
					defaults: {
						style: 'text-align: center',
						align :'center',
					},
					items: columns
				}
         }]
      });

      me.callParent();
   },

   tools : [{
      xtype : 'button',
      text : 'Save',
      value : this.winType,
      listeners : {
         click : 'onTypeSizeWinSave'
      }
   }]
});
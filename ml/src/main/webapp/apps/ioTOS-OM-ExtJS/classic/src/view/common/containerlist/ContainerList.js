Ext.define('IoTosOmExt.view.common.containerlist.Containerlist', {
   extend : 'Ext.window.Window',
   alias : 'widget.containerlist',

   width : 1400,
   height : 650,
   autoScroll : true,
   modal : true,

   initComponent : function() {
      var me = this;
      Ext.apply(me, {
         items : [{
            xtype : 'grid',
            bind : {
               store : '{' + this.storeNm + '}'
            },
            flex : 1,
            listeners: {
               celldblclick: 'onContainerListGridDblClick',
            },
            selModel: {
               type: 'spreadsheet',
               rowSelect: true,
               cellSelect:false
            },
            columns: {
					defaults: {
						style: 'text-align: center',
						align :'center',
					},
					items: GridUtil.getGridColumns('ContainerListGrid'),
				}
         }]
      });

      me.callParent();
   }
});
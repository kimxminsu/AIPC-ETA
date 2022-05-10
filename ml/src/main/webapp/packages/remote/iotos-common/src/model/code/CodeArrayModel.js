Ext.define('Iotos.model.code.CodeArrayModel', { 
   extend : 'Ext.data.Model',
   fields: [{
      name : 'codeType',
   },{
      name : 'codes',
      // mapping : 'codeList'
   }],

   // associations : [{
   //    type : 'hasMany',
   //    name : 'codeList',
   //    model : 'Iotos.model.Code'
   // }]
});
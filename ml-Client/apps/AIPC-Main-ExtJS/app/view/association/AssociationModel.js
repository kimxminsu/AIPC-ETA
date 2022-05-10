// orig
Ext.define("Aipc.Main.view.association.AssociationModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.association",
  requires: ["Ext.data.proxy.Rest", "Aipc.Main.model.association.User"],
  stores: {
    user: {
      model: "Aipc.Main.model.association.User",
      autoLoad: true,
      storeId: "userStore",
      proxy: {
        type: "rest",

        // type : 'ajax',
        // actionMethods : {
        //   read : 'POST'
        // },
        url: "http://localhost:1234/train/insert",
      },
    },
  },
});

//modify
// Ext.define("Aipc.Main.view.association.AssociationModel", {
//   extend: "Ext.app.ViewModel",
//
//   alias: "viewmodel.association",
//
//   requires: ["Ext.data.proxy.Rest", "Aipc.Main.model.association.User"],
//
//   stores: {
//     user: {
//       model: "Aipc.Main.model.association.User",
//       autoLoad: false,
//       fields: ['id','name','age','email','phone'],
//       storeId: "userStore",
//       proxy: {
//         type: "ajax",
//         actionMethods: {
//           read: "POST"
//         },
//         url: "/api/board/insert",
//         reader: {
//           type: 'json',
//           rootProperty: 'data', //목록에 대한 json key값
//           totalProperty: 'totalCount'
//         }
//       },
//     },
//   },
// });
// orig
Ext.define("Aipc.Main.view.result.ResultModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.result",
    requires: ["Ext.data.proxy.Rest", "Aipc.Main.model.result.User"],
    stores: {
        user: {
            model: "Aipc.Main.model.result.User",
            // autoLoad: true,
            storeId: "userStore",
            proxy: {
                type: "rest",

                // type : 'ajax',
                // actionMethods : {
                //   read : 'POST'
                // },
                url: "http://localhost:1234/result/insert",
            },
        },

        userKindCombo: {
            data: [
                { userKind: '', userKindDesc : 'ORIGIN_PORT' },
                { userKind: '51', userKindDesc : 'GUAM' },
                // { userKind: 'E', userKindDesc : 'External'},
                { userKind: '115', userKindDesc : 'NAHA'},
                { userKind: '164', userKindDesc : 'SHANGHAI'},
                { userKind: '99', userKindDesc : 'LOS ANGELES'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
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
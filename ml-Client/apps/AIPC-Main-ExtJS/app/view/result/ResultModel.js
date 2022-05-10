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

        shiptypeCombo: {
            data: [
                { shiptype: '', shiptypeDesc : 'SHIPTYPE' },
                { shiptype: '1', shiptypeDesc : '1' },
                { shiptype: '2', shiptypeDesc : '2' },
                { shiptype: '3', shiptypeDesc : '3' },
                { shiptype: '4', shiptypeDesc : '4' },
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        // portCombo: {
        //     data: [
        //         { port: '', portDesc : 'ORIGIN_PORT' },
        //         { port: '51', portDesc : 'GUAM' },
        //         // { userKind: 'E', userKindDesc : 'External'},
        //         { port: '115', portDesc : 'NAHA'},
        //         { port: '164', portDesc : 'SHANGHAI'},
        //         { port: '99', portDesc : 'LOS ANGELES'}
        //     ],
        //     proxy: {
        //         type: 'memory',
        //         reader: {
        //             type: 'json',
        //             rootProperty: 'data'
        //         }
        //     }
        // }
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
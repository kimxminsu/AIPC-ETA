// Ext.define("Aipc.Main.view.sample.Sample", {
//   extend: "Ext.form.Panel",
//   alias: "widget.app-sample",
//   requires: ["Aipc.Main.view.sample.SampleModel", "Aipc.Main.view.sample.SampleController"],
//
//   controller: "sample",
//
//   viewModel: {
//     type: "sample",
//   },
//
//   listeners: {
//     afterrender: "onLoad",
//   },
//   /**
//    * =========================================================================================================================
//    * CONSTANT START
//    */
//   /**
//    * CONSTANT END
//    * =========================================================================================================================
//    */
//   layout: { type: "vbox", align: "stretch" },
//
//   initComponent: function () {
//     var me = this;
//     Ext.apply(me, {
//       items: [
//         {
//           xtype: "app-vesselselectioncomponent",
//           reference: "ctlVesselSelection",
//           dock: "top",
//           parentView: this,
//           vesselScheduleType: CodeConstants.VesselScheduleTypes.CALLING_STORAGE,
//           vesselDepartureType: CodeConstants.VesselDepartureTypes.CALLING,
//         },
//         {
//           xtype: "commoncodefield",
//           fieldLabel: "Fdest",
//           emptyText: "Final Destination",
//           reference: "ctlFdestField",
//           // 이름 표시, popupType이 SINGLE로 고정, 코드 직접 입력 가능
//           visibleName: true,
//           nameWidth: 200,
//           labelWidth: 100,
//           params: {
//             title: "Final Destination",
//             // popupType: ViewUtil.POPUPTYPE_MULTI(기본값), ViewUtil.POPUPTYPE_SINGLE
//             popupType: ViewUtil.POPUPTYPE_MULTI,
//             // itemKey: 서버의 switch - case문에 사용되는 값
//             itemKey: PopupServiceConstants.ItemKey.FDEST,
//           },
//         },
//         {
//           layout: "hbox",
//           items: [
//             {
//               items: [
//                 {
//                   title: "Args Example",
//                   layout: "vbox",
//                   defaults: {
//                     width: 200,
//                   },
//                   items: [
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "LaneCd",
//                       emptyText: "Lane Code",
//                       allowBlank: false,
//                       reference: "ctlLaneCodeField",
//                       labelWidth: 50,
//                       params: {
//                         popupType: ViewUtil.POPUPTYPE_SINGLE,
//                         title: "Lane Code",
//                         itemKey: PopupServiceConstants.ItemKey.LANE_CODE,
//                       },
//                       bind: {
//                         value: "{theSearch.laneCode}",
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "LanePort",
//                       emptyText: "Lane Port",
//                       reference: "ctlLanePortField",
//                       params: {
//                         title: "Lane Port",
//                         itemKey: PopupServiceConstants.ItemKey.LANE_PORT,
//                       },
//                       args: ["laneCode"],
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "LineOperator",
//                       emptyText: "Line Operator",
//                       reference: "ctlLineOperatorField2",
//                       gridMode: true,
//                       params: {
//                         title: "Line Operator",
//                         itemKey: PopupServiceConstants.PartnerType.LINE_OPERATOR,
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   title: "Partner",
//                   layout: "vbox",
//                   items: [
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "Forwarder",
//                       emptyText: "Forwarder",
//                       reference: "ctlForwarderField",
//                       params: {
//                         title: "Forwarder",
//                         itemKey: PopupServiceConstants.PartnerType.FORWARDER,
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "LineOperator",
//                       emptyText: "Line Operator",
//                       reference: "ctlLineOperatorField",
//                       params: {
//                         title: "Line Operator",
//                         itemKey: PopupServiceConstants.PartnerType.LINE_OPERATOR,
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "Trucker",
//                       emptyText: "Trucker",
//                       reference: "ctlTruckerField",
//                       params: {
//                         title: "Trucker",
//                         itemKey: PopupServiceConstants.PartnerType.TRUCKER,
//                       },
//                       bind: {
//                         value: "{theSearch.trucker}",
//                       },
//                     },
//
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "OtherTerminal",
//                       emptyText: "Other Terminal",
//                       reference: "ctlOtherTerminalField",
//                       params: {
//                         title: "Other Terminal",
//                         itemKey: PopupServiceConstants.PartnerType.OTHER_TERMINAL,
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "RailOperator",
//                       emptyText: "Rail Operator",
//                       reference: "ctlRailOperatorField",
//                       params: {
//                         title: "Rail Operator",
//                         itemKey: PopupServiceConstants.PartnerType.RAIL_OPERATOR,
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "CustomerAgency",
//                       emptyText: "Customer Agency",
//                       reference: "ctlCustomerAgencyField",
//                       params: {
//                         title: "Customer Agency",
//                         itemKey: PopupServiceConstants.PartnerType.CUSTOMER_AGENCY,
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "ShipperConsignee",
//                       emptyText: "Shipper Consignee",
//                       reference: "ctlShipperConsigneeField",
//                       params: {
//                         title: "Shipper Consignee",
//                         itemKey: PopupServiceConstants.PartnerType.SHIPPER_CONSIGNEE,
//                       },
//                     },
//                     {
//                       xtype: "commoncodefield",
//                       fieldLabel: "ShippingAgency",
//                       emptyText: "Shipping Agency",
//                       reference: "ctlShippingAgencyPtnrField",
//                       params: {
//                         title: "Shipping Agency",
//                         itemKey: PopupServiceConstants.PartnerType.SHIPPING_AGENCY,
//                       },
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               title: "General Code",
//               layout: "vbox",
//               items: [],
//             },
//             {
//               title: "Master Code",
//               layout: "vbox",
//               items: [],
//             },
//             {
//               layout: "vbox",
//               items: [
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "ShippingAgency",
//                   emptyText: "Shipping Agency",
//                   reference: "ctlShippingAgencyField",
//                   params: {
//                     title: "Shipping Agency",
//                     itemKey: PopupServiceConstants.ItemKey.SHIPPING_AGENCY,
//                   },
//                   args: ["ptnrCode"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "PackingGroup",
//                   emptyText: "Packing Group",
//                   reference: "ctlPackingGroupField",
//                   params: {
//                     title: "Packing Group",
//                     itemKey: PopupServiceConstants.ItemKey.PACKING_GRP,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "CodeTypes",
//                   emptyText: "Code Types",
//                   reference: "ctlCodeTypesField",
//                   params: {
//                     title: "Code Types",
//                     itemKey: PopupServiceConstants.ItemKey.CODE_TYPES,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "StorageCode",
//                   emptyText: "Storage Code",
//                   reference: "ctlStorageCodeField",
//                   params: {
//                     title: "Storage Code",
//                     itemKey: PopupServiceConstants.ItemKey.STORAGE_CODE_OPR,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "Country Code",
//                   emptyText: "Country Code",
//                   reference: "ctlCountryCodeField",
//                   params: {
//                     title: "Country Code",
//                     itemKey: PopupServiceConstants.ItemKey.COUNTRY_CODE,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "AssignableVessel",
//                   emptyText: "Assignable Vessel",
//                   reference: "ctlAssignableVesselField",
//                   params: {
//                     title: "Assignable Vessel",
//                     itemKey: PopupServiceConstants.ItemKey.VVD_ASSIGNABLE_VESSEL_ONLY,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "Truck",
//                   emptyText: "Truck",
//                   reference: "ctlTruckField",
//                   params: {
//                     title: "Truck",
//                     itemKey: PopupServiceConstants.ItemKey.TRUCK,
//                   },
//                   args: ["trucker"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "TruckPool",
//                   emptyText: "Truck Pool",
//                   reference: "ctlTruckPoolField",
//                   params: {
//                     title: "Truck Pool",
//                     itemKey: PopupServiceConstants.ItemKey.TRUCK_POOL,
//                   },
//                   args: ["trucker"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "AssignedTruck",
//                   emptyText: "Assigned Truck",
//                   reference: "ctlAssignedTruckField",
//                   params: {
//                     title: "Assigned Truck",
//                     itemKey: PopupServiceConstants.ItemKey.TRUCK_POOL_ASSIGNED_TRUCKS,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "EquCoverFrom",
//                   emptyText: "Equ Cover From",
//                   reference: "ctlEquCoverFromField",
//                   params: {
//                     title: "Equ Cover From",
//                     itemKey: PopupServiceConstants.ItemKey.EQU_COVER_FROM,
//                   },
//                   args: ["block"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "EquCoverTo",
//                   emptyText: "Equ Cover To",
//                   reference: "ctlEquCoverToField",
//                   params: {
//                     title: "Equ Cover To",
//                     itemKey: PopupServiceConstants.ItemKey.EQU_COVER_TO,
//                   },
//                   args: ["block"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "BerthName",
//                   emptyText: "Berth Name",
//                   reference: "ctlBerthNameField",
//                   params: {
//                     title: "Berth Name",
//                     itemKey: PopupServiceConstants.ItemKey.BERTH_NAME,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "BittName",
//                   emptyText: "Bitt Name",
//                   reference: "ctlBittNameField",
//                   params: {
//                     title: "Bitt Name",
//                     itemKey: PopupServiceConstants.ItemKey.BITT_NAME,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "LanePort Only",
//                   emptyText: "Lane Port Only",
//                   reference: "ctlLanePortOnlyField",
//                   params: {
//                     title: "Lane Port Only",
//                     itemKey: PopupServiceConstants.ItemKey.LANE_PORT_ONLY,
//                   },
//                   args: ["laneCode"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "Opr",
//                   emptyText: "Operator",
//                   reference: "ctlOprField",
//                   params: {
//                     title: "Opr",
//                     itemKey: PopupServiceConstants.ItemKey.OPR_CODE,
//                   },
//                   args: ["ptnrCode"],
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "PorCode",
//                   emptyText: "POR Code",
//                   reference: "ctlPorCodeField",
//                   params: {
//                     title: "POR Code",
//                     itemKey: PopupServiceConstants.ItemKey.POR_CODE,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "PortCode",
//                   emptyText: "PORT Code",
//                   reference: "ctlPortCodeField",
//                   params: {
//                     title: "PORT Code",
//                     itemKey: PopupServiceConstants.ItemKey.PORT_CODE,
//                   },
//                 },
//                 {
//                   xtype: "commoncodefield",
//                   fieldLabel: "QC",
//                   emptyText: "QC",
//                   reference: "ctlQCField",
//                   params: {
//                     title: "QC",
//                     itemKey: PopupServiceConstants.ItemKey.QC_COLOR,
//                   },
//                 },
//               ],
//             },
//             // {
//             // 	layout:'vbox',
//             // 	items:[
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Cntr H & W',
//             // 			emptyText:'Cntr H & W',
//             // 			reference:'ctlCntrHWField',
//             // 			params:{
//             // 				title: 'Cntr H & W',
//             // 				itemKey: PopupServiceConstants.ItemKey.CNTR_HEIGHT_WIDTH
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Cntr Type',
//             // 			emptyText:'Cntr Type',
//             // 			reference:'ctlCntrTypeField',
//             // 			params:{
//             // 				title: 'Cntr Type',
//             // 				itemKey: PopupServiceConstants.ItemKey.CONTAINER_TYPE
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Weight Group Type',
//             // 			emptyText:'Weight Group Type',
//             // 			reference:'ctlWgtGrpTypeField',
//             // 			params:{
//             // 				title: 'Weight Group Type',
//             // 				itemKey: PopupServiceConstants.MasterCode.WEIGHT_GROUP_TYPE
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'IMDG',
//             // 			emptyText:'IMDG',
//             // 			reference:'ctlImdgField',
//             // 			params:{
//             // 				title: 'IMDG',
//             // 				itemKey: PopupServiceConstants.ItemKey.IMDG
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'UNNO',
//             // 			emptyText:'UNNO',
//             // 			reference:'ctlUnnoField',
//             // 			params:{
//             // 				title: 'UNNO',
//             // 				itemKey: PopupServiceConstants.ItemKey.UNNO
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Yes / No',
//             // 			emptyText:'Yes / No',
//             // 			reference:'ctlYesNoField',
//             // 			params:{
//             // 				title: 'Yes / No',
//             // 				itemKey: PopupServiceConstants.ItemKey.YES_NO
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Vessel Name',
//             // 			emptyText:'Vessel Name',
//             // 			reference:'ctlVesselNameField',
//             // 			params:{
//             // 				title: 'Vessel Name',
//             // 				itemKey: PopupServiceConstants.ItemKey.VESSEL_NAME
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Vessel Type 3',
//             // 			emptyText:'Vessel Type 3',
//             // 			reference:'ctlVesselType3Field',
//             // 			params:{
//             // 				title: 'Vessel Type 3',
//             // 				itemKey: PopupServiceConstants.MasterCode.VESSEL_TYPE3
//             // 			}
//             // 		},
//             // 		{
//             // 			xtype:'commoncodefield',
//             // 			labelWidth:90,
//             // 			width:300,
//             // 			fieldLabel:'Along Side',
//             // 			emptyText:'Along Side',
//             // 			reference:'ctlAlongSideField',
//             // 			params:{
//             // 				title: 'Along Side',
//             // 				itemKey: PopupServiceConstants.ItemKey.ALONG_SIDE
//             // 			}
//             // 		},
//             // 	]
//             // },
//           ],
//         },
//       ],
//     });
//
//     me.callParent();
//   },
// });

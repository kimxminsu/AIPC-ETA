Ext.define("ESVC.view.usercontrol.VesselSelectionList", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.popup-vesselselectionlist',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	controller: 'vesselselectioncomponent',
    viewModel: {
        type: 'vesselselectioncomponent'
    },
	padding : '0,0,0,0',
	requires : [
		'Ext.form.Panel',
	],
	listeners:{
		afterrender: 'onVesselSelectionListLoad'
	},
	title:'Vessel List for Search Criteria',
	width : 900,
    height : 500,
    MAIN_GRID_REF_NAME : 'refVesselSelectionListGrid',
    MAIN_STORE_NAME : 'vesselSelectionList',    		 		// Main Store Name
    
	lblPortVoy: {type: 'bundle', key: 'vesselSelectionComponentPortVoy'},
	lblVesselCode: {type: 'bundle', key: 'vesselSelectionComponentVesselCode'},
	lblVesselName: {type: 'bundle', key: 'vesselSelectionComponentVesselName'},
	lblYear: {type: 'bundle', key: 'vesselSelectionComponentYear'},
	lblSeq: {type: 'bundle', key: 'vesselSelectionComponentSeq'},
	lblInLane: {type: 'bundle', key: 'vesselSelectionComponentInLane'},
	lblOutLane: {type: 'bundle', key: 'vesselSelectionComponentOutLane'},
	lblInVoy: {type: 'bundle', key: 'vesselSelectionComponentInVoy'},
	lblOutVoy: {type: 'bundle', key: 'vesselSelectionComponentOutVoy'},
	lblETA: {type: 'bundle', key: 'vesselSelectionComponentETA'},
	lblATB: {type: 'bundle', key: 'vesselSelectionComponentATB'},
	lblATW: {type: 'bundle', key: 'vesselSelectionComponentATW'},
	lblATD: {type: 'bundle', key: 'vesselSelectionComponentATD'},
    initComponent: function(){
    	var me = this;
    	Ext.apply(me, {
			items : [
//				{
//					xtype:'container',
//					items:[
						{
							xtype : 'grid',
				            queryMode: 'local',
				            flex:1,
							reference : me.MAIN_GRID_REF_NAME,
							bind : {
								store : '{' + me.MAIN_STORE_NAME + '}'
							},
				
							listeners: {
				        	    		cellDblClick: 'onDblClick',
				        	    		pagingSearch:'onSearch'
				                    },
							columns : {
								defaults : {
									style : 'text-align:center',
									align : 'center'
								},
								items : [
									{
										reference : 'refUserVoyage',
										header : me.lblPortVoy,
										dataIndex : 'userVoyage',
				                        width : 150,
				                        
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refVesselCode',
										header : me.lblVesselCode,
										dataIndex : 'vesselCode',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refVesselName',
										header : me.lblVesselName,
										dataIndex : 'vesselName',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refCallYear',
										header : me.lblYear,
										dataIndex : 'callYear',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refCallSeq',
										header : me.lblSeq,
										dataIndex : 'callSeq',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refInLane',
										header : me.lblInLane,
										dataIndex : 'inLane',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refOutLane',
										header : me.lblOutLane,
										dataIndex : 'outLane',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refInVoyage',
										header : me.lblInVoy,
										dataIndex : 'inVoyage',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refOutVoyage',
										header : me.lblOutVoy,
										dataIndex : 'outVoyage',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refETA',
										header : me.lblETA,
										dataIndex : 'eta',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refATB',
										header : me.lblATB,
										dataIndex : 'atb',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refATW',
										header : me.lblATW,
										dataIndex : 'atw',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									},
									{
										reference : 'refATD',
										header : me.lblATD,
										dataIndex : 'atd',
										width : 150,
										editor : {
											xtype : 'textfield',
											readOnly : true,
											enforceMaxLength : true
										}
									}
				
								]
							}
						}
					]
//				}
//				
//				]
    	});
    	me.callParent();
    }
});
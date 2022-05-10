Ext.define('IoTosOmExt.model.operation.bundlecargolist.BundleCargoList', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
   fields: [{
      name:'bundleState'
   },{
      name:'type1'
   },{
      name:'bundleContainerNo1'
   },{
      name:'type2'
   },{
      name:'bundleContainerNo2'
   },{
      name:'type3'
   },{
      name:'bundleContainerNo3'
   },{
      name:'type4'
   },{
      name:'bundleContainerNo4'
   },{
      name:'type5'
   },{
      name:'bundleContainerNo5'
   },{
      name:'type6'
   },{
      name:'bundleContainerNo6'
   },{
      name:'type7'
   },{
      name:'bundleContainerNo7'
   },{
      name:'type8'
   },{
      name:'bundleContainerNo8'
   },{
      name:'type9'
   },{
      name:'bundleContainerNo9'
   },{
      name:'type10'
   },{
      name:'bundleContainerNo10'
   },{
      name:'bundleVslCd'
   },{
      name:'bundleCallYear'
   },{
      name:'bundleCallSeq'
   },{
      name:'parentBundleCntrUid'
   },{
      name:'bundleSeq'
   },{
      name:'packType'
   },{
      name:'bundleCntrId'
   },{
      name:'bundleCntrUid'
   },{
      name:'isThroughCheck',
      type:'boolean'
   },{
      name:'childItems',
      mapping : 'childList'
   },{
      name:'displayIxCd'
   },{
      name:'displayCntrState'
   },{
      name:'displayDelv'
   }],

   associations : [{
      type : 'hasMany',
      name : 'childList',
      model: 'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList'
   }]
});
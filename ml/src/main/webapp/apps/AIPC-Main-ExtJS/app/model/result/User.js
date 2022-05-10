Ext.define("Aipc.Main.model.result.User", {
  extend: "ESVC.model.foundation.dataitem.DataItem",
  fields: [
    {
      name: "accum_time",
      // type: "int"
      type: "string"
    },
    {
      name: "accum_dist",
      type: "string"
    },
    {
      name: "efficiency",
      type: "string"
    },
    {
      name: "geohash",
      type: "string"
    },
    {
      name: "shiptype",
      type: "string"
      // convert: function (value, record) { // *이렇게 각자 가능
      //   if (record.get("userInfo")) record.get("userInfo").phone = value;
      //   return value;
      // },
    },
    {
      name: "dimA",
      type: "string"
    },
    {
      name: "dimB",
      type: "string"
    },
    {
      name: "draught",
      type: "string"
    },
    {
      name: "origin_port",
      type: "string"
    },
  ]
});




    // Tells this model instance that an observer is looking at it.
    // The store or other owner object to which this model has been added.
    // 자기 자신을 자신의 옵저버로 등록
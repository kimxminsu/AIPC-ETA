Ext.define("Aipc.Main.model.code.User", {
  extend: "ESVC.model.foundation.dataitem.DataItem",
  fields: [
    {
      name: "id",
      // type: "int"
      type: "string"
    },
    {
      name: "name",
      type: "string"
    },
    {
      name: "age",
      type: "string"
    },
    {
      name: "email",
      type: "string"
    },
    {
      name: "phone",
      type: "string"
      // convert: function (value, record) { // *이렇게 각자 가능
      //   if (record.get("userInfo")) record.get("userInfo").phone = value;
      //   return value;
      // },
    }
  ]
});




    // Tells this model instance that an observer is looking at it.
    // The store or other owner object to which this model has been added.
    // 자기 자신을 자신의 옵저버로 등록
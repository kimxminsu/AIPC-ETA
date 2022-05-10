Ext.define("Aipc.Main.model.result.UserInfo", {
  extend: "ESVC.model.foundation.dataitem.DataItem",

  // fields: ["age", "email", "phone"],

  constructor: function () {
    this.callParent(arguments);

    // Tells this model instance that an observer is looking at it.
    // The store or other owner object to which this model has been added.
    // 자기 자신을 자신의 옵저버로 등록
    this.join(this);
  },
  afterEdit: function (modelInstance, modifiedFieldNames) {
    if (this.getUser) {
      this.getUser().dirty = true;
    }
  },
});

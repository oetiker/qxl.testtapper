(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.util.Base64": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.testtapperdemo.test.Test02", {
    extend: qx.dev.unit.TestCase,
    members: {
      testEncDecoding: function testEncDecoding() {
        var got = qx.util.Base64.decode(qx.util.Base64.encode("foo:bar")).split(":");
        this.assertIdentical(got[0], "foo");
        this.assertIdentical(got[1], "bar");

        got = qx.util.Base64.decode(qx.util.Base64.encode("foo:")).split(":");
        this.assertIdentical(got[0], "foo");
        this.assertIdentical(got[1], "");

        got = qx.util.Base64.decode(qx.util.Base64.encode("foo:undefined")).split(":");
        this.assertIdentical(got[0], "foo");
        this.assertIdentical(got[1], "undefined");
      }

    }

  });
  qxl.testtapperdemo.test.Test02.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Test02.js.map?dt=1554457202003
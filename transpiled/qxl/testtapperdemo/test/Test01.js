(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.testtapperdemo.test.Test01", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        console.debug("# Setup for TestCase");
      },
      tearDown: function tearDown() {
        console.debug("# Teardown for TestCase");
      },
      "test: assert 1==1": function testAssert11() {
        this.assert(true, "One equals one");
      },
      "test: got array ?": function testGotArray() {
        this.assertArray([], "This is an array");
      }

    }

  });
  qxl.testtapperdemo.test.Test01.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Test01.js.map?dt=1554457201991
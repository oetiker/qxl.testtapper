var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
    var $$dbClassInfo = {
        'dependsOn': {
            'qx.Class': {
                'usage': 'dynamic',
                'require': true
            },
            'qx.application.Standalone': {
                'require': true
            },
            'qx.bom.History': {},
            'qx.log.appender.Native': {},
            'qx.ui.basic.Label': {},
            'qx.Promise': {},
            'qx.dev.unit.TestLoaderBasic': {},
            'qx.dev.unit.TestResult': {}
        }
    };
    qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.testtapper.Application", {
        extend: qx.application.Standalone,
        members: {
            _cnt: null,
            main: function main() {
                var _this = this;

                qxl.testtapper.Application.prototype.main.base.call(this);
                this._cnt = 0;
                // eslint-disable-next-line no-undef
                var cfg = {};
                qx.bom.History.getInstance().getState().split(';').forEach(function (item) {
                    var _item$split = item.split('='),
                        _item$split2 = _slicedToArray(_item$split, 2),
                        key = _item$split2[0],
                        value = _item$split2[1];

                    cfg[key] = value;
                });
                qx.log.appender.Native;
                var matcher = new RegExp("\\.test\\." + (cfg.module || ''));
                this.getRoot().add(new qx.ui.basic.Label('\n                <h1>TestTAPper - the Qooxdoo Testrunner is at work</h1>\n                <p>See the debug console of your browser for details.</p>\n                ').set({
                    rich: true
                }), { left: 100, top: 100 });
                if (cfg.module) {
                    console.log("# running only tests that match " + cfg.module);
                }
                var clazzes = Object.keys(qx.Class.$$registry).filter(function (clazz) {
                    return clazz.match(matcher);
                });

                return new qx.Promise.all(clazzes.map(function (clazz) {
                    return _this.runAll(qx.Class.$$registry[clazz]).then(function () {
                        console.info('# done testing ' + clazz + '.');
                    });
                })).then(function () {
                    console.log('1..' + _this._cnt);
                    _this.getRoot().add(new qx.ui.basic.Label('\n                    <h1>TestTAPper - is Done</h1>\n                    ').set({
                        rich: true
                    }), { left: 100, bottom: 100 });
                });
            },
            runAll: function runAll(clazz) {
                var that = this;
                var methodNames = Object.keys(clazz.prototype).filter(function (name) {
                    return name.match(/^test/);
                });
                return new qx.Promise(function (resolve) {
                    var pos = clazz.classname.lastIndexOf(".");
                    var pkgname = clazz.classname.substring(0, pos);
                    var loader = new qx.dev.unit.TestLoaderBasic(pkgname);
                    var testResult = new qx.dev.unit.TestResult();
                    var methodNameIndex = -1;
                    var next = function next() {
                        methodNameIndex++;
                        if (!methodNames) {
                            console.log('# run default tests for ' + clazz.classname);
                            if (methodNameIndex === 0) {
                                loader.runTests(testResult, clazz.classname, null);
                            } else {
                                resolve();
                            }
                        } else if (methodNameIndex < methodNames.length) {
                            console.log('# run ' + clazz.classname + ':' + methodNames[methodNameIndex]);
                            loader.runTests(testResult, clazz.classname, methodNames[methodNameIndex]);
                        } else {
                            resolve();
                        }
                    };
                    var showExceptions = function showExceptions(arr) {
                        arr.forEach(function (item) {
                            that._cnt++;
                            var message = String(item.exception);
                            if (item.exception && item.exception.message) {
                                message = item.exception.message;
                            }
                            console.info('not ok ' + that._cnt + ' - ' + message + ' ' + item.test.getClassName() + ":" + item.test.getName());
                            if (item.exception && !item.exception.message) {
                                console.error(item.exception);
                            }
                        });
                        setTimeout(next, 0);
                    };

                    loader.getSuite().add(clazz);

                    testResult.addListener("endTest", function (evt) {
                        that._cnt++;
                        console.info('ok ' + that._cnt + ' - ' + evt.getData().getFullName());
                        setTimeout(next, 0);
                    });
                    testResult.addListener("wait", function (evt) {
                        that._cnt++;
                        console.info('not ok ' + that._cnt + ' - stop waiting for ' + evt.getData().getFullName());
                    });
                    testResult.addListener("failure", function (evt) {
                        return showExceptions(evt.getData());
                    });
                    testResult.addListener("error", function (evt) {
                        return showExceptions(evt.getData());
                    });
                    testResult.addListener("skip", function (evt) {
                        that._cnt++;
                        console.info('ok ' + that._cnt + ' - # SKIP ' + evt.getData().getFullName());
                    });

                    next();
                });
            }
        }
    });
    qxl.testtapper.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1554457201984
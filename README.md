# Qooxdoo testTAPper

![](https://github.com/qooxdoo/qxl.testtapper/workflows/Unit%20Tests/badge.svg?branch=master)

The is a TAP testrunner for Qooxdoo.

![ce53gt1e05](https://user-images.githubusercontent.com/429279/52718722-65c40d00-2fa4-11e9-94e5-b4be30bac433.gif)

## Online Demo

http://www.qooxdoo.org/qxl.testtapper/

## Adding an testTAPper to your own code
```
$ npx qx package update
$ npx qx package install qooxdoo/qxl.testtapper
$ echo 10 > .nvmrc
$ npm i puppeteer yargs nyc coveralls puppeteer-to-istanbul
```

Now edit the `"myapp.test.*"` entry in your `compile.json` file to point to the
test classes in your own application.

```
$ npx qx serve
```

Then browse to [http://localhost:8080](http://localhost:8080).  You will see that you now have a new application listed, the "Qooxdoo testTAPper", that you can click on the link to run. The output of the application may be a bit underwhelming ... have a look at the debug console to see the action.

If you want to run the tests from the command line you need a headless browser to run the tests. TestTAPper uses the puppeteer node module which comes with a built in copy of headless chrome and is thus very simple to use

```
$ node compile/source/resource/qxl/testtapper/run.js http://localhost:8080
$ node_modules/.bin/nyc report --reporter=text-lcov | node_modules/.bin/coveralls
```

if you start `run.js` without arguments it ouputs a little help

## Developing testTAPper
Clone this repo and compile it:

```
    $ git clone https://github.com/qooxdoo/qxl.testtapper
    $ cd qxl.testtapper
    $ qx serve
```
Then open [http://localhost:8080](http://localhost:8080)

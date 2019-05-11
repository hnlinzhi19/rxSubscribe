(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.observable = factory());
}(this, (function () { 'use strict';

  var getDataType = function (data) {
      return Object.prototype.toString.call(data).toLowerCase();
  };
  var isFunction = function (data) { return getDataType(data) === '[object function]'; };
  //# sourceMappingURL=util.js.map

  // Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  var Observer = /** @class */ (function () {
      function Observer() {
          var _this = this;
          this.next = function (data) {
              // console.log('next', data);
              if (_this.nextCb.length) {
                  _this.nextCb.forEach(function (item) {
                      item(data);
                  });
              }
          };
          this.complete = function () {
              _this.completeCb && _this.completeCb();
          };
          this.error = function (func, observer) {
              _this.errorCb && _this.errorCb();
          };
          this.addNext = function (func) {
              _this.nextCb.push(func);
          };
          this.clearNext = function () {
              _this.nextCb = [];
          };
          this.addComplete = function (func, observer) {
              _this.completeCb = function () {
                  func();
                  _this.clearAll();
                  observer = null;
              };
          };
          this.addError = function (func, observer) {
              _this.errorCb = function () {
                  func();
                  _this.clearAll();
                  observer = null;
              };
          };
          this.clearAll = function () {
              _this.completeCb = null;
              _this.errorCb = null;
              _this.clearNext();
          };
          this.nextCb = [];
          this.completeCb = null;
          this.errorCb = null;
      }
      return Observer;
  }());
  var Observable = /** @class */ (function () {
      function Observable(observFunc) {
          var _this = this;
          this.subscribe = function (subObj) {
              var observer = new Observer();
              if (subObj.next && isFunction(subObj.next)) {
                  // this.nextCb.push(subObj.next);
                  observer.addNext(subObj.next);
              }
              if (subObj.complete && isFunction(subObj.complete)) {
                  // this.nextCb.push(subObj.next);
                  observer.addComplete(subObj.complete, observer);
              }
              if (subObj.error && isFunction(subObj.error)) {
                  // this.nextCb.push(subObj.next);
                  observer.addError(subObj.error, observer);
              }
              // this.test.run();
              _this.initFunc(observer);
          };
          // this.test = subscriber();
          if (!isFunction(observFunc)) {
              throw Error('必须有初始化函数');
          }
          // this.test = new MyTest();
          this.initFunc = function (observer) {
              observFunc(observer);
          };
          return this;
      }
      return Observable;
  }());

  return Observable;

})));
//# sourceMappingURL=z-observable.umd.js.map

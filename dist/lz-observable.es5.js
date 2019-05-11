var getDataType = function (data) {
    return Object.prototype.toString.call(data).toLowerCase();
};
var isFunction = function (data) { return getDataType(data) === '[object function]'; };
var isObject = function (data) { return getDataType(data) === '[object object]'; };
//# sourceMappingURL=util.js.map

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
var subscriber = function (obj) {
    var objCb = {
        nextCb: [],
    };
    if (isObject(obj) && isFunction(obj.next)) {
        objCb.nextCb.push(obj.next);
    }
    if (isObject(obj) && isFunction(obj.complete)) {
        objCb.completeCb = obj.complete;
    }
    if (isObject(obj) && isFunction(obj.error)) {
        objCb.errorCb = obj.complete;
    }
    return objCb;
    // run();
};
var observable = function (func) {
    return {
        subscriber: function (obj) {
            var objCb = subscriber(obj);
            var clearAll = function () {
                objCb.errorCb = null;
                objCb.completeCb = null;
                objCb.nextCb = [];
            };
            func({
                next: function (data) {
                    objCb.nextCb.forEach(function (item) {
                        item(data);
                    });
                },
                complete: function (data) {
                    objCb.completeCb && objCb.completeCb(data);
                    clearAll();
                },
                error: function (data) {
                    objCb.errorCb && objCb.errorCb(data);
                    clearAll();
                }
            });
        }
    };
};

export default observable;
//# sourceMappingURL=lz-observable.es5.js.map

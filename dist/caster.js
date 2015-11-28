(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["caster"] = factory();
	else
		root["caster"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var toArray = __webpack_require__(1),
	    toNumber = __webpack_require__(2),
	    toString = __webpack_require__(3),
	    toObject = __webpack_require__(4),
	    all = __webpack_require__(5);
	
	function toFormData(input) {
	    if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object') {
	        input = toObject(input);
	    }
	    var data = new FormData();
	    Object.keys(input).forEach(function (key) {
	        data.append(key, input[key]);
	    });
	    return data;
	}
	
	all.toArray = toArray;
	all.toNumber = toNumber;
	all.toString = toString;
	all.toObject = toObject;
	all.toFormData = toFormData;
	
	module.exports = all;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function toArray(input) {
	    if (input instanceof Array) {
	        return input;
	    } else if (input !== null && typeof input !== 'undefined') {
	        return [input];
	    }
	    return [];
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * Converts given input to a number.
	 * Accepts:
	 * -number
	 * -string
	 * -object
	 *
	 * @param {number|string|object} input
	 * @returns {number}
	 */
	module.exports = function toNumber(input) {
	    if (typeof input === 'number') {
	        //eliminate NaN - outputs 0
	        return !!input ? input : 0;
	    } else if (typeof input === 'string') {
	        //most freq use case
	        //rerun to prevent returning NaN
	        var parsed;
	        if (input.substr(0, 2) === '0x') {
	            parsed = parseInt(input, 16);
	        } else if (input.substr(0, 1) === '#') {
	            parsed = parseInt(input.substr(1), 16);
	        } else if (input.indexOf('.') > 0 || input.indexOf(',') > 0) {
	            parsed = parseFloat(input.replace(',', '.'));
	        } else {
	            parsed = parseInt(input, 10);
	        }
	
	        return toNumber(parsed);
	    } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && typeof input.valueOf === 'function') {
	        //valueOf is obligated to return primitive value of undefined type
	        //so toNumber needs to rerun to resolve what type of value this primitive value is
	        return toNumber(input.valueOf());
	    }
	    return 0;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function onlyCustomStringifiers(input) {
	    var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
	    if (type !== 'undefined' && type !== 'object') {
	        // object methods should have return primitive value..
	        if (type === 'string') {
	            // ..so if it a string already..
	            if (input.substr(0, 7) !== '[object') {
	                // ..but not this ugly [object CLASSNAME] format
	                return input;
	            }
	        } else {
	            // Rerun toString for any other primitive value
	            return toString(input);
	        }
	    }
	}
	
	function tryObjectMethod(input, methodName) {
	    if (typeof input[methodName] === 'function') {
	        return onlyCustomStringifiers(input[methodName]());
	    }
	}
	
	/**
	 * Converts any input to string
	 * @param {*} input
	 * @returns {string}
	 */
	function toString(input) {
	    var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
	
	    if (type === 'string') {
	        //bypass
	        return input;
	    }
	    if (type === 'boolean') {
	        // simple
	        // i guess user is doing some kind of var dump to use this for boolean
	        return input.toString();
	    }
	
	    if (!input) {
	        //falsey
	        if (input === null || input === undefined) {
	            return "";
	        }
	        if (input === 0) {
	            return "0";
	        }
	    }
	
	    var aTry;
	    if (input) {
	        //truthy
	        if (type === 'number') {
	            return input.toString();
	        }
	        if (type === 'object') {
	            if (input instanceof Array) {
	                if (input.length === 0) {
	                    return "";
	                } else {
	                    return input.map(toString).join(', ');
	                }
	            }
	            aTry = tryObjectMethod(input, 'toLocaleString');
	            if (aTry && typeof aTry === 'string') {
	                return aTry;
	            }
	            aTry = tryObjectMethod(input, 'toString');
	            if (aTry && typeof aTry === 'string') {
	                return aTry;
	            }
	            aTry = tryObjectMethod(input, 'valueOf');
	            if (aTry && typeof aTry === 'string') {
	                return aTry;
	            }
	        }
	
	        try {
	            return JSON.stringify(input);
	        } catch (e) {
	            return "";
	        }
	    }
	
	    return "";
	}
	
	module.exports = toString;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var caster = __webpack_require__(5);
	
	function createValueObject(input) {
	
	    function valueObject() {}
	
	    valueObject.prototype.valueOf = function () {
	        return input;
	    };
	    valueObject.prototype.toString = function () {
	        return caster.toString(input);
	    };
	
	    return valueObject;
	}
	
	function mapToObject(input) {
	    var keys = input.keys();
	    var result = {};
	    while (true) {
	        var nextKey = keys.next();
	        if (nextKey.done) {
	            break;
	        }
	        var mapKey = nextKey.value;
	        var objectKey = caster.toString(mapKey);
	        if (objectKey) {
	            result[objectKey] = input.get(mapKey);
	        }
	    }
	    return result;
	}
	
	function toObject(input) {
	    var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
	
	    if (type === 'undefined' || input === null) {
	        // always cast empty values to empty values of proper type
	        return {};
	    } else if (type === "object") {
	        if (input instanceof Map) {
	            return mapToObject(input);
	        }
	        // bypass what already is an simple object
	        return input;
	    } else {
	        var valueObject = createValueObject(input);
	        return new valueObject();
	    }
	    return input;
	}
	
	module.exports = toObject;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=caster.js.map
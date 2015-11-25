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
	
	function toArray(input) {
	    if (input instanceof Array) {
	        return input;
	    } else if (!!input) {
	        return [input];
	    }
	    return [];
	}
	
	function _toString(input) {
	    if (typeof input === 'string') {
	        return input;
	    }
	
	    var aTry;
	
	    if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && typeof input.toString === 'function') {
	        aTry = input.toString();
	    }
	    if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && typeof input.valueOf === 'function') {
	        aTry = input.valueOf();
	    }
	    if (typeof aTry === 'string' && aTry.substr(0, 7) !== '[object') {
	        return aTry;
	    }
	
	    aTry = JSON.stringify(input);
	
	    if (aTry) {
	        return aTry;
	    }
	
	    return "";
	}
	
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
	
	function toObject(input) {
	    if (typeof input === "string") {
	        return {
	            toString: function toString() {
	                return input;
	            }
	        };
	    } else if (typeof input === "number") {
	        return {
	            valueOf: function valueOf() {
	                return input;
	            },
	            toString: function toString() {
	                return _toString(input);
	            }
	        };
	    }
	    return input;
	}
	
	module.exports = {
	    toArray: toArray,
	    toString: _toString,
	    toNumber: __webpack_require__(1),
	    toFormData: toFormData,
	    toObject: toObject
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=caster.js.map
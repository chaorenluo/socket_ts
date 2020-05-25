/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/socket.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/socket.ts":
/*!***********************!*\
  !*** ./src/socket.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var eventType;\n(function (eventType) {\n    eventType[\"message\"] = \"message\";\n    eventType[\"close\"] = \"close\";\n    eventType[\"error\"] = \"error\";\n    eventType[\"open\"] = \"open\";\n})(eventType || (eventType = {}));\nvar socket = (function () {\n    function socket(opts, connection_url) {\n        if (socket.new_socket) {\n            return socket.new_socket;\n        }\n        this.opts = opts;\n        this.connection_url = connection_url;\n        socket.new_socket = this;\n        this.connect();\n    }\n    socket.prototype.connect = function () {\n        if (window.WebSocket && this.connection_url) {\n            if (this.connection_url.startsWith(\"//\")) {\n                var scheme = window.location.protocol == \"https\" ? \"wss\" : \"ws\";\n                this.connection_url = scheme + \":\" + this.connection_url;\n            }\n            this.socket = new WebSocket(this.connection_url);\n            this.initEvent();\n        }\n        else {\n            console.log(window.WebSocket, this.connection_url);\n            throw new Error(\"wsurl為空或该浏览器不支持websocket\");\n        }\n    };\n    socket.prototype.initEvent = function () {\n        for (var key in eventType) {\n            this.addListener(key);\n        }\n    };\n    socket.prototype.addListener = function (event) {\n        var _this = this;\n        this.socket.addEventListener(event, function (e) {\n            switch (event) {\n                case eventType.open:\n                    _this.opts.open(e);\n                    break;\n                case eventType.message:\n                    _this.opts.message(e);\n                    break;\n                case eventType.close:\n                    _this.opts.close(e);\n                    break;\n                case eventType.error:\n                    _this.opts.error(e);\n                    break;\n                default:\n                    break;\n            }\n        });\n    };\n    socket.prototype.send = function (data, closeCallback) {\n        if (this.socket.readyState >= 2) {\n            closeCallback && closeCallback();\n        }\n        else {\n            this.socket.send(data);\n        }\n    };\n    socket.prototype.close = function () {\n        this.socket.close();\n    };\n    return socket;\n}());\n\n\n//# sourceURL=webpack:///./src/socket.ts?");

/***/ })

/******/ });
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./web/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/config.ssr.js":
/*!******************************!*\
  !*** ./config/config.ssr.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var resolvePath = function resolvePath(path) {\n  return __webpack_require__(/*! path */ \"path\").resolve(__dirname, path);\n};\n\nmodule.exports = {\n  type: 'ssr',\n  // 指定运行类型可设置为csr切换为客户端渲染\n  routes: [{\n    path: '/',\n    exact: true,\n    Component: function Component() {\n      return __webpack_require__(/*! @/page/index */ \"./web/page/index/index.js\")[\"default\"];\n    },\n    // 这里使用一个function包裹为了让它延迟require\n    controller: 'page',\n    handler: 'index'\n  }, {\n    path: '/news/:id',\n    exact: true,\n    Component: function Component() {\n      return __webpack_require__(/*! @/page/news */ \"./web/page/news/index.js\")[\"default\"];\n    },\n    controller: 'page',\n    handler: 'index'\n  }],\n  baseDir: resolvePath('../'),\n  injectCss: [\"/static/css/Page.chunk.css\"],\n  // 客户端需要加载的静态样式表\n  injectScript: [\"<script src='/static/js/runtime~Page.js'></script>\", \"<script src='/static/js/vendor.chunk.js'></script>\", \"<script src='/static/js/Page.chunk.js'></script>\"],\n  // 客户端需要加载的静态资源文件表\n  serverJs: resolvePath(\"../output/Page.server.js\")\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb25maWcvY29uZmlnLnNzci5qcz8yNThiIl0sIm5hbWVzIjpbInJlc29sdmVQYXRoIiwicGF0aCIsInJlcXVpcmUiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwibW9kdWxlIiwiZXhwb3J0cyIsInR5cGUiLCJyb3V0ZXMiLCJleGFjdCIsIkNvbXBvbmVudCIsImNvbnRyb2xsZXIiLCJoYW5kbGVyIiwiYmFzZURpciIsImluamVjdENzcyIsImluamVjdFNjcmlwdCIsInNlcnZlckpzIl0sIm1hcHBpbmdzIjoiQUFBQSxxREFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0MsSUFBRDtBQUFBLFNBQVVDLG1CQUFPLENBQUMsa0JBQUQsQ0FBUCxDQUFnQkMsT0FBaEIsQ0FBd0JDLFNBQXhCLEVBQW1DSCxJQUFuQyxDQUFWO0FBQUEsQ0FBcEI7O0FBRUFJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNmQyxNQUFJLEVBQUUsS0FEUztBQUNGO0FBQ2JDLFFBQU0sRUFBRSxDQUNOO0FBQ0VQLFFBQUksRUFBRSxHQURSO0FBRUVRLFNBQUssRUFBRSxJQUZUO0FBR0VDLGFBQVMsRUFBRTtBQUFBLGFBQU9SLG1CQUFPLENBQUMsK0NBQUQsQ0FBUCxXQUFQO0FBQUEsS0FIYjtBQUdzRDtBQUNwRFMsY0FBVSxFQUFFLE1BSmQ7QUFLRUMsV0FBTyxFQUFFO0FBTFgsR0FETSxFQVFOO0FBQ0VYLFFBQUksRUFBRSxXQURSO0FBRUVRLFNBQUssRUFBRSxJQUZUO0FBR0VDLGFBQVMsRUFBRTtBQUFBLGFBQU9SLG1CQUFPLENBQUMsNkNBQUQsQ0FBUCxXQUFQO0FBQUEsS0FIYjtBQUlFUyxjQUFVLEVBQUUsTUFKZDtBQUtFQyxXQUFPLEVBQUU7QUFMWCxHQVJNLENBRk87QUFrQmZDLFNBQU8sRUFBRWIsV0FBVyxDQUFDLEtBQUQsQ0FsQkw7QUFtQmZjLFdBQVMsRUFBRSw4QkFuQkk7QUFxQlo7QUFDSEMsY0FBWSxFQUFFLGdLQXRCQztBQTBCWjtBQUNIQyxVQUFRLEVBQUVoQixXQUFXO0FBM0JOLENBQWpCLEMiLCJmaWxlIjoiLi9jb25maWcvY29uZmlnLnNzci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlc29sdmVQYXRoID0gKHBhdGgpID0+IHJlcXVpcmUoJ3BhdGgnKS5yZXNvbHZlKF9fZGlybmFtZSwgcGF0aClcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHR5cGU6ICdzc3InLCAvLyDmjIflrprov5DooYznsbvlnovlj6/orr7nva7kuLpjc3LliIfmjaLkuLrlrqLmiLfnq6/muLLmn5NcbiAgcm91dGVzOiBbXG4gICAge1xuICAgICAgcGF0aDogJy8nLFxuICAgICAgZXhhY3Q6IHRydWUsXG4gICAgICBDb21wb25lbnQ6ICgpID0+IChyZXF1aXJlKCdAL3BhZ2UvaW5kZXgnKS5kZWZhdWx0KSwgLy8g6L+Z6YeM5L2/55So5LiA5LiqZnVuY3Rpb27ljIXoo7nkuLrkuoborqnlroPlu7bov59yZXF1aXJlXG4gICAgICBjb250cm9sbGVyOiAncGFnZScsXG4gICAgICBoYW5kbGVyOiAnaW5kZXgnXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL25ld3MvOmlkJyxcbiAgICAgIGV4YWN0OiB0cnVlLFxuICAgICAgQ29tcG9uZW50OiAoKSA9PiAocmVxdWlyZSgnQC9wYWdlL25ld3MnKS5kZWZhdWx0KSxcbiAgICAgIGNvbnRyb2xsZXI6ICdwYWdlJyxcbiAgICAgIGhhbmRsZXI6ICdpbmRleCdcbiAgICB9XG4gIF0sXG4gIGJhc2VEaXI6IHJlc29sdmVQYXRoKCcuLi8nKSxcbiAgaW5qZWN0Q3NzOiBbXG4gICAgYC9zdGF0aWMvY3NzL1BhZ2UuY2h1bmsuY3NzYFxuICBdLCAvLyDlrqLmiLfnq6/pnIDopoHliqDovb3nmoTpnZnmgIHmoLflvI/ooahcbiAgaW5qZWN0U2NyaXB0OiBbXG4gICAgYDxzY3JpcHQgc3JjPScvc3RhdGljL2pzL3J1bnRpbWV+UGFnZS5qcyc+PC9zY3JpcHQ+YCxcbiAgICBgPHNjcmlwdCBzcmM9Jy9zdGF0aWMvanMvdmVuZG9yLmNodW5rLmpzJz48L3NjcmlwdD5gLFxuICAgIGA8c2NyaXB0IHNyYz0nL3N0YXRpYy9qcy9QYWdlLmNodW5rLmpzJz48L3NjcmlwdD5gXG4gIF0sIC8vIOWuouaIt+err+mcgOimgeWKoOi9veeahOmdmeaAgei1hOa6kOaWh+S7tuihqFxuICBzZXJ2ZXJKczogcmVzb2x2ZVBhdGgoYC4uL291dHB1dC9QYWdlLnNlcnZlci5qc2ApXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./config/config.ssr.js\n");

/***/ }),

/***/ "./web/assets/common.less":
/*!********************************!*\
  !*** ./web/assets/common.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2NvbW1vbi5sZXNzP2VkNDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPLEtBQVUsRUFBRSxrQkFLZCIsImZpbGUiOiIuL3dlYi9hc3NldHMvY29tbW9uLmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTcwNjg2ODM4MDY1XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./web/assets/common.less\n");

/***/ }),

/***/ "./web/entry.js":
/*!**********************!*\
  !*** ./web/entry.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/layout */ \"./web/layout/index.js\");\n/* harmony import */ var ykfe_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ykfe-utils */ \"ykfe-utils\");\n/* harmony import */ var ykfe_utils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ykfe_utils__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _config_config_ssr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../config/config.ssr */ \"./config/config.ssr.js\");\n/* harmony import */ var _config_config_ssr__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_config_config_ssr__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\nvar clientRender =\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // 客户端渲染||hydrate\n            react_dom__WEBPACK_IMPORTED_MODULE_3___default.a[window.__USE_SSR__ ? 'hydrate' : 'render'](react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"BrowserRouter\"], null, // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps\n            _config_config_ssr__WEBPACK_IMPORTED_MODULE_7__[\"routes\"].map(function (_ref2) {\n              var path = _ref2.path,\n                  exact = _ref2.exact,\n                  Component = _ref2.Component;\n              var ActiveComponent = Component();\n              var Layout = ActiveComponent.Layout || _layout__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\n              return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Route\"], {\n                exact: exact,\n                key: path,\n                path: path,\n                render: function render() {\n                  var WrappedComponent = Object(ykfe_utils__WEBPACK_IMPORTED_MODULE_6__[\"getWrappedComponent\"])(ActiveComponent);\n                  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Layout, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(WrappedComponent, null));\n                }\n              });\n            })), document.getElementById('app'));\n\n            if (false) {}\n\n          case 2:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function clientRender() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar serverRender =\n/*#__PURE__*/\nfunction () {\n  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(ctx) {\n    var ActiveComponent, Layout, serverData;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染\n            ActiveComponent = Object(ykfe_utils__WEBPACK_IMPORTED_MODULE_6__[\"getComponent\"])(_config_config_ssr__WEBPACK_IMPORTED_MODULE_7__[\"routes\"], ctx.path)();\n            Layout = ActiveComponent.Layout || _layout__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\n\n            if (!ActiveComponent.getInitialProps) {\n              _context2.next = 8;\n              break;\n            }\n\n            _context2.next = 5;\n            return ActiveComponent.getInitialProps(ctx);\n\n          case 5:\n            _context2.t0 = _context2.sent;\n            _context2.next = 9;\n            break;\n\n          case 8:\n            _context2.t0 = {};\n\n          case 9:\n            serverData = _context2.t0;\n            ctx.serverData = serverData;\n            return _context2.abrupt(\"return\", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"StaticRouter\"], {\n              location: ctx.req.url,\n              context: serverData\n            }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Layout, {\n              layoutData: ctx\n            }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ActiveComponent, serverData))));\n\n          case 12:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function serverRender(_x) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ( false ? undefined : serverRender);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvZW50cnkuanM/ZDkwZSJdLCJuYW1lcyI6WyJjbGllbnRSZW5kZXIiLCJSZWFjdERPTSIsIndpbmRvdyIsIl9fVVNFX1NTUl9fIiwiUm91dGVzIiwibWFwIiwicGF0aCIsImV4YWN0IiwiQ29tcG9uZW50IiwiQWN0aXZlQ29tcG9uZW50IiwiTGF5b3V0IiwiZGVmYXVsdExheW91dCIsIldyYXBwZWRDb21wb25lbnQiLCJnZXRXcmFwcGVkQ29tcG9uZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInByb2Nlc3MiLCJzZXJ2ZXJSZW5kZXIiLCJjdHgiLCJnZXRDb21wb25lbnQiLCJnZXRJbml0aWFsUHJvcHMiLCJzZXJ2ZXJEYXRhIiwicmVxIiwidXJsIiwiX19pc0Jyb3dzZXJfXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbkI7QUFDQUMsNERBQVEsQ0FBQ0MsTUFBTSxDQUFDQyxXQUFQLEdBQXFCLFNBQXJCLEdBQWlDLFFBQWxDLENBQVIsQ0FDRSwyREFBQyw4REFBRCxRQUVJO0FBQ0FDLHFFQUFNLENBQUNDLEdBQVAsQ0FBVyxpQkFBZ0M7QUFBQSxrQkFBN0JDLElBQTZCLFNBQTdCQSxJQUE2QjtBQUFBLGtCQUF2QkMsS0FBdUIsU0FBdkJBLEtBQXVCO0FBQUEsa0JBQWhCQyxTQUFnQixTQUFoQkEsU0FBZ0I7QUFDekMsa0JBQU1DLGVBQWUsR0FBR0QsU0FBUyxFQUFqQztBQUNBLGtCQUFNRSxNQUFNLEdBQUdELGVBQWUsQ0FBQ0MsTUFBaEIsSUFBMEJDLCtDQUF6QztBQUNBLHFCQUFPLDJEQUFDLHNEQUFEO0FBQU8scUJBQUssRUFBRUosS0FBZDtBQUFxQixtQkFBRyxFQUFFRCxJQUExQjtBQUFnQyxvQkFBSSxFQUFFQSxJQUF0QztBQUE0QyxzQkFBTSxFQUFFLGtCQUFNO0FBQy9ELHNCQUFNTSxnQkFBZ0IsR0FBR0Msc0VBQW1CLENBQUNKLGVBQUQsQ0FBNUM7QUFDQSx5QkFBTywyREFBQyxNQUFELFFBQVEsMkRBQUMsZ0JBQUQsT0FBUixDQUFQO0FBQ0Q7QUFITSxnQkFBUDtBQUlELGFBUEQsQ0FISixDQURGLEVBY0lLLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUF4QixDQWRKOztBQWdCQSxnQkFBSUMsS0FBSixFQUEwRCxFQUV6RDs7QUFwQmtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVpoQixZQUFZO0FBQUE7QUFBQTtBQUFBLEdBQWxCOztBQXVCQSxJQUFNaUIsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUVBQUcsa0JBQU9DLEdBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ25CO0FBQ01ULDJCQUZhLEdBRUtVLCtEQUFZLENBQUNmLHlEQUFELEVBQVNjLEdBQUcsQ0FBQ1osSUFBYixDQUFaLEVBRkw7QUFHYkksa0JBSGEsR0FHSkQsZUFBZSxDQUFDQyxNQUFoQixJQUEwQkMsK0NBSHRCOztBQUFBLGlCQUlBRixlQUFlLENBQUNXLGVBSmhCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBSXdDWCxlQUFlLENBQUNXLGVBQWhCLENBQWdDRixHQUFoQyxDQUp4Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDJCQUkrRSxFQUovRTs7QUFBQTtBQUliRyxzQkFKYTtBQUtuQkgsZUFBRyxDQUFDRyxVQUFKLEdBQWlCQSxVQUFqQjtBQUxtQiw4Q0FNWiwyREFBQyw2REFBRDtBQUFjLHNCQUFRLEVBQUVILEdBQUcsQ0FBQ0ksR0FBSixDQUFRQyxHQUFoQztBQUFxQyxxQkFBTyxFQUFFRjtBQUE5QyxlQUNMLDJEQUFDLE1BQUQ7QUFBUSx3QkFBVSxFQUFFSDtBQUFwQixlQUNFLDJEQUFDLGVBQUQsRUFBcUJHLFVBQXJCLENBREYsQ0FESyxDQU5ZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVpKLFlBQVk7QUFBQTtBQUFBO0FBQUEsR0FBbEI7O0FBYWVPLHFFQUFhLEdBQUd4QixTQUFILEdBQW9CaUIsWUFBaEQiLCJmaWxlIjoiLi93ZWIvZW50cnkuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgU3RhdGljUm91dGVyLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgZGVmYXVsdExheW91dCBmcm9tICdAL2xheW91dCdcbmltcG9ydCB7IGdldFdyYXBwZWRDb21wb25lbnQsIGdldENvbXBvbmVudCB9IGZyb20gJ3lrZmUtdXRpbHMnXG5pbXBvcnQgeyByb3V0ZXMgYXMgUm91dGVzIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zc3InXG5cbmNvbnN0IGNsaWVudFJlbmRlciA9IGFzeW5jICgpID0+IHtcbiAgLy8g5a6i5oi356uv5riy5p+TfHxoeWRyYXRlXG4gIFJlYWN0RE9NW3dpbmRvdy5fX1VTRV9TU1JfXyA/ICdoeWRyYXRlJyA6ICdyZW5kZXInXShcbiAgICA8QnJvd3NlclJvdXRlcj5cbiAgICAgIHtcbiAgICAgICAgLy8g5L2/55So6auY6Zi257uE5Lu2Z2V0V3JhcHBlZENvbXBvbmVudOS9v+W+l2Nzcummluasoei/m+WFpemhtemdouS7peWPimNzci9zc3LliIfmjaLot6/nlLHml7bosIPnlKhnZXRJbml0aWFsUHJvcHNcbiAgICAgICAgUm91dGVzLm1hcCgoeyBwYXRoLCBleGFjdCwgQ29tcG9uZW50IH0pID0+IHtcbiAgICAgICAgICBjb25zdCBBY3RpdmVDb21wb25lbnQgPSBDb21wb25lbnQoKVxuICAgICAgICAgIGNvbnN0IExheW91dCA9IEFjdGl2ZUNvbXBvbmVudC5MYXlvdXQgfHwgZGVmYXVsdExheW91dFxuICAgICAgICAgIHJldHVybiA8Um91dGUgZXhhY3Q9e2V4YWN0fSBrZXk9e3BhdGh9IHBhdGg9e3BhdGh9IHJlbmRlcj17KCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgV3JhcHBlZENvbXBvbmVudCA9IGdldFdyYXBwZWRDb21wb25lbnQoQWN0aXZlQ29tcG9uZW50KVxuICAgICAgICAgICAgcmV0dXJuIDxMYXlvdXQ+PFdyYXBwZWRDb21wb25lbnQgLz48L0xheW91dD5cbiAgICAgICAgICB9fSAvPlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIDwvQnJvd3NlclJvdXRlcj5cbiAgICAsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgJiYgbW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgfVxufVxuXG5jb25zdCBzZXJ2ZXJSZW5kZXIgPSBhc3luYyAoY3R4KSA9PiB7XG4gIC8vIOacjeWKoeerr+a4suafkyDmoLnmja5jdHgucGF0aOiOt+WPluivt+axgueahOWFt+S9k+e7hOS7tu+8jOiwg+eUqGdldEluaXRpYWxQcm9wc+W5tua4suafk1xuICBjb25zdCBBY3RpdmVDb21wb25lbnQgPSBnZXRDb21wb25lbnQoUm91dGVzLCBjdHgucGF0aCkoKVxuICBjb25zdCBMYXlvdXQgPSBBY3RpdmVDb21wb25lbnQuTGF5b3V0IHx8IGRlZmF1bHRMYXlvdXRcbiAgY29uc3Qgc2VydmVyRGF0YSA9IEFjdGl2ZUNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMgPyBhd2FpdCBBY3RpdmVDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eCkgOiB7fVxuICBjdHguc2VydmVyRGF0YSA9IHNlcnZlckRhdGFcbiAgcmV0dXJuIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e2N0eC5yZXEudXJsfSBjb250ZXh0PXtzZXJ2ZXJEYXRhfT5cbiAgICA8TGF5b3V0IGxheW91dERhdGE9e2N0eH0+XG4gICAgICA8QWN0aXZlQ29tcG9uZW50IHsuLi5zZXJ2ZXJEYXRhfSAvPlxuICAgIDwvTGF5b3V0PlxuICA8L1N0YXRpY1JvdXRlcj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgX19pc0Jyb3dzZXJfXyA/IGNsaWVudFJlbmRlcigpIDogc2VydmVyUmVuZGVyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web/entry.js\n");

/***/ }),

/***/ "./web/layout/index.js":
/*!*****************************!*\
  !*** ./web/layout/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_common_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/assets/common.less */ \"./web/assets/common.less\");\n/* harmony import */ var _assets_common_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_common_less__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.less */ \"./web/layout/index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nvar commonNode = function commonNode(props) {\n  return (// 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ? <div>{ props.children }</div> : ''\n    props.children ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"normal\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n      className: \"title\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n      to: \"/\"\n    }, \"Egg + React + SSR\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"author\"\n    }, \"by ykfe\")), props.children) : ''\n  );\n};\n\nvar Layout = function Layout(props) {\n  if (false) {} else {\n    var serverData = props.layoutData.serverData;\n    var _props$layoutData$app = props.layoutData.app.config,\n        injectCss = _props$layoutData$app.injectCss,\n        injectScript = _props$layoutData$app.injectScript;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"html\", {\n      lang: \"en\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"head\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n      charSet: \"utf-8\"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n      name: \"viewport\",\n      content: \"width=device-width, initial-scale=1, shrink-to-fit=no\"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n      name: \"theme-color\",\n      content: \"#000000\"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"title\", null, \"React App\"), injectCss && injectCss.map(function (item) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"link\", {\n        rel: \"stylesheet\",\n        href: item,\n        key: item\n      });\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"body\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"app\"\n    }, commonNode(props)), serverData && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"script\", {\n      dangerouslySetInnerHTML: {\n        __html: \"window.__USE_SSR__=true; window.__INITIAL_DATA__ =\".concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_1___default()(serverData))\n      }\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      dangerouslySetInnerHTML: {\n        __html: injectScript && injectScript.join('')\n      }\n    })));\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Layout);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvbGF5b3V0L2luZGV4LmpzP2JjNGIiXSwibmFtZXMiOlsiY29tbW9uTm9kZSIsInByb3BzIiwiY2hpbGRyZW4iLCJMYXlvdXQiLCJfX2lzQnJvd3Nlcl9fIiwic2VydmVyRGF0YSIsImxheW91dERhdGEiLCJhcHAiLCJjb25maWciLCJpbmplY3RDc3MiLCJpbmplY3RTY3JpcHQiLCJtYXAiLCJpdGVtIiwiX19odG1sIiwic2VyaWFsaXplIiwiam9pbiJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQUMsS0FBSztBQUFBLFNBQ3RCO0FBQ0FBLFNBQUssQ0FBQ0MsUUFBTixHQUNJO0FBQUssZUFBUyxFQUFDO0FBQWYsT0FBd0I7QUFBSSxlQUFTLEVBQUM7QUFBZCxPQUFzQiwyREFBQyxxREFBRDtBQUFNLFFBQUUsRUFBQztBQUFULDJCQUF0QixFQUEyRDtBQUFLLGVBQVMsRUFBQztBQUFmLGlCQUEzRCxDQUF4QixFQUE4SEQsS0FBSyxDQUFDQyxRQUFwSSxDQURKLEdBRUk7QUFKa0I7QUFBQSxDQUF4Qjs7QUFPQSxJQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDRixLQUFELEVBQVc7QUFDeEIsTUFBSUcsS0FBSixFQUFtQixFQUFuQixNQUVPO0FBQUEsUUFDR0MsVUFESCxHQUNrQkosS0FBSyxDQUFDSyxVQUR4QixDQUNHRCxVQURIO0FBQUEsZ0NBRStCSixLQUFLLENBQUNLLFVBQU4sQ0FBaUJDLEdBQWpCLENBQXFCQyxNQUZwRDtBQUFBLFFBRUdDLFNBRkgseUJBRUdBLFNBRkg7QUFBQSxRQUVjQyxZQUZkLHlCQUVjQSxZQUZkO0FBR0wsV0FDRTtBQUFNLFVBQUksRUFBQztBQUFYLE9BQ0UseUVBQ0U7QUFBTSxhQUFPLEVBQUM7QUFBZCxNQURGLEVBRUU7QUFBTSxVQUFJLEVBQUMsVUFBWDtBQUFzQixhQUFPLEVBQUM7QUFBOUIsTUFGRixFQUdFO0FBQU0sVUFBSSxFQUFDLGFBQVg7QUFBeUIsYUFBTyxFQUFDO0FBQWpDLE1BSEYsRUFJRSxzRkFKRixFQU1JRCxTQUFTLElBQUlBLFNBQVMsQ0FBQ0UsR0FBVixDQUFjLFVBQUFDLElBQUk7QUFBQSxhQUFJO0FBQU0sV0FBRyxFQUFDLFlBQVY7QUFBdUIsWUFBSSxFQUFFQSxJQUE3QjtBQUFtQyxXQUFHLEVBQUVBO0FBQXhDLFFBQUo7QUFBQSxLQUFsQixDQU5qQixDQURGLEVBVUUseUVBQ0U7QUFBSyxRQUFFLEVBQUM7QUFBUixPQUFnQlosVUFBVSxDQUFDQyxLQUFELENBQTFCLENBREYsRUFHSUksVUFBVSxJQUFJO0FBQVEsNkJBQXVCLEVBQUU7QUFDN0NRLGNBQU0sOERBQXVEQywyREFBUyxDQUFDVCxVQUFELENBQWhFO0FBRHVDO0FBQWpDLE1BSGxCLEVBT0U7QUFBSyw2QkFBdUIsRUFBRTtBQUM1QlEsY0FBTSxFQUFFSCxZQUFZLElBQUlBLFlBQVksQ0FBQ0ssSUFBYixDQUFrQixFQUFsQjtBQURJO0FBQTlCLE1BUEYsQ0FWRixDQURGO0FBd0JEO0FBQ0YsQ0EvQkQ7O0FBaUNlWixxRUFBZiIsImZpbGUiOiIuL3dlYi9sYXlvdXQvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBzZXJpYWxpemUgZnJvbSAnc2VyaWFsaXplLWphdmFzY3JpcHQnXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCAnQC9hc3NldHMvY29tbW9uLmxlc3MnXG5pbXBvcnQgJy4vaW5kZXgubGVzcydcblxuY29uc3QgY29tbW9uTm9kZSA9IHByb3BzID0+IChcbiAgLy8g5Li65LqG5ZCM5pe25YW85a65c3NyL2Nzcuivt+S/neeVmeatpOWIpOaWre+8jOWmguaenOS9oOeahGxheW91dOayoeacieWGheWuueivt+S9v+eUqCBwcm9wcy5jaGlsZHJlbiA/IDxkaXY+eyBwcm9wcy5jaGlsZHJlbiB9PC9kaXY+IDogJydcbiAgcHJvcHMuY2hpbGRyZW5cbiAgICA/IDxkaXYgY2xhc3NOYW1lPSdub3JtYWwnPjxoMSBjbGFzc05hbWU9J3RpdGxlJz48TGluayB0bz0nLyc+RWdnICsgUmVhY3QgKyBTU1I8L0xpbms+PGRpdiBjbGFzc05hbWU9J2F1dGhvcic+YnkgeWtmZTwvZGl2PjwvaDE+e3Byb3BzLmNoaWxkcmVufTwvZGl2PlxuICAgIDogJydcbilcblxuY29uc3QgTGF5b3V0ID0gKHByb3BzKSA9PiB7XG4gIGlmIChfX2lzQnJvd3Nlcl9fKSB7XG4gICAgcmV0dXJuIGNvbW1vbk5vZGUocHJvcHMpXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgeyBzZXJ2ZXJEYXRhIH0gPSBwcm9wcy5sYXlvdXREYXRhXG4gICAgY29uc3QgeyBpbmplY3RDc3MsIGluamVjdFNjcmlwdCB9ID0gcHJvcHMubGF5b3V0RGF0YS5hcHAuY29uZmlnXG4gICAgcmV0dXJuIChcbiAgICAgIDxodG1sIGxhbmc9J2VuJz5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgPG1ldGEgY2hhclNldD0ndXRmLTgnIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT0ndmlld3BvcnQnIGNvbnRlbnQ9J3dpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBzaHJpbmstdG8tZml0PW5vJyAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9J3RoZW1lLWNvbG9yJyBjb250ZW50PScjMDAwMDAwJyAvPlxuICAgICAgICAgIDx0aXRsZT5SZWFjdCBBcHA8L3RpdGxlPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluamVjdENzcyAmJiBpbmplY3RDc3MubWFwKGl0ZW0gPT4gPGxpbmsgcmVsPSdzdHlsZXNoZWV0JyBocmVmPXtpdGVtfSBrZXk9e2l0ZW19IC8+KVxuICAgICAgICAgIH1cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8ZGl2IGlkPSdhcHAnPnsgY29tbW9uTm9kZShwcm9wcykgfTwvZGl2PlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlcnZlckRhdGEgJiYgPHNjcmlwdCBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICBfX2h0bWw6IGB3aW5kb3cuX19VU0VfU1NSX189dHJ1ZTsgd2luZG93Ll9fSU5JVElBTF9EQVRBX18gPSR7c2VyaWFsaXplKHNlcnZlckRhdGEpfWBcbiAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgIF9faHRtbDogaW5qZWN0U2NyaXB0ICYmIGluamVjdFNjcmlwdC5qb2luKCcnKVxuICAgICAgICAgIH19IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web/layout/index.js\n");

/***/ }),

/***/ "./web/layout/index.less":
/*!*******************************!*\
  !*** ./web/layout/index.less ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvbGF5b3V0L2luZGV4Lmxlc3M/MWM3YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU8sS0FBVSxFQUFFLGtCQUtkIiwiZmlsZSI6Ii4vd2ViL2xheW91dC9pbmRleC5sZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU3MDY4NjgzODA1OFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web/layout/index.less\n");

/***/ }),

/***/ "./web/page/index/index.js":
/*!*********************************!*\
  !*** ./web/page/index/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.less */ \"./web/page/index/index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nfunction Page(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"normal\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"welcome\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: \"list\"\n  }, props.news && props.news.map(function (item) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      key: item.id\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"\\u6587\\u7AE0\\u6807\\u9898: \", item.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"toDetail\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/news/\".concat(item.id)\n    }, \"\\u70B9\\u51FB\\u67E5\\u770B\\u8BE6\\u60C5\")));\n  })));\n}\n\nPage.getInitialProps = function (ctx) {\n  return Promise.resolve({\n    news: [{\n      id: '1',\n      title: 'Racket v7.3 Release Notes'\n    }, {\n      id: '2',\n      title: 'Free Dropbox Accounts Now Only Sync to Three Devices'\n    }, {\n      id: '3',\n      title: 'Voynich Manuscript Decoded by Bristol Academic'\n    }, {\n      id: '4',\n      title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'\n    }, {\n      id: '5',\n      title: 'How much do YouTube celebrities charge to advertise your product? '\n    }]\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvcGFnZS9pbmRleC9pbmRleC5qcz80ZDIwIl0sIm5hbWVzIjpbIlBhZ2UiLCJwcm9wcyIsIm5ld3MiLCJtYXAiLCJpdGVtIiwiaWQiLCJ0aXRsZSIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxJQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDcEIsU0FDRTtBQUFLLGFBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixJQURGLEVBRUU7QUFBSSxhQUFTLEVBQUM7QUFBZCxLQUVJQSxLQUFLLENBQUNDLElBQU4sSUFBY0QsS0FBSyxDQUFDQyxJQUFOLENBQVdDLEdBQVgsQ0FBZSxVQUFBQyxJQUFJO0FBQUEsV0FDL0I7QUFBSSxTQUFHLEVBQUVBLElBQUksQ0FBQ0M7QUFBZCxPQUNFLHNHQUFZRCxJQUFJLENBQUNFLEtBQWpCLENBREYsRUFFRTtBQUFLLGVBQVMsRUFBQztBQUFmLE9BQTBCLDJEQUFDLHFEQUFEO0FBQU0sUUFBRSxrQkFBV0YsSUFBSSxDQUFDQyxFQUFoQjtBQUFSLDhDQUExQixDQUZGLENBRCtCO0FBQUEsR0FBbkIsQ0FGbEIsQ0FGRixDQURGO0FBZUQ7O0FBRURMLElBQUksQ0FBQ08sZUFBTCxHQUF1QixVQUFDQyxHQUFELEVBQVM7QUFDOUIsU0FBT0MsT0FBTyxDQUFDQyxPQUFSLENBQWdCO0FBQ3JCUixRQUFJLEVBQUUsQ0FDSjtBQUNFRyxRQUFFLEVBQUUsR0FETjtBQUVFQyxXQUFLLEVBQUU7QUFGVCxLQURJLEVBS0o7QUFDRUQsUUFBRSxFQUFFLEdBRE47QUFFRUMsV0FBSyxFQUFFO0FBRlQsS0FMSSxFQVNKO0FBQUVELFFBQUUsRUFBRSxHQUFOO0FBQ0VDLFdBQUssRUFBRTtBQURULEtBVEksRUFZSjtBQUFFRCxRQUFFLEVBQUUsR0FBTjtBQUNFQyxXQUFLLEVBQUU7QUFEVCxLQVpJLEVBZUo7QUFBRUQsUUFBRSxFQUFFLEdBQU47QUFDRUMsV0FBSyxFQUFFO0FBRFQsS0FmSTtBQURlLEdBQWhCLENBQVA7QUFxQkQsQ0F0QkQ7O0FBdUJlTixtRUFBZiIsImZpbGUiOiIuL3dlYi9wYWdlL2luZGV4L2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgJy4vaW5kZXgubGVzcydcblxuZnVuY3Rpb24gUGFnZSAocHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nbm9ybWFsJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSd3ZWxjb21lJyAvPlxuICAgICAgPHVsIGNsYXNzTmFtZT0nbGlzdCc+XG4gICAgICAgIHtcbiAgICAgICAgICBwcm9wcy5uZXdzICYmIHByb3BzLm5ld3MubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17aXRlbS5pZH0+XG4gICAgICAgICAgICAgIDxkaXY+5paH56ug5qCH6aKYOiB7aXRlbS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RvRGV0YWlsJz48TGluayB0bz17YC9uZXdzLyR7aXRlbS5pZH1gfT7ngrnlh7vmn6XnnIvor6bmg4U8L0xpbms+PC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuUGFnZS5nZXRJbml0aWFsUHJvcHMgPSAoY3R4KSA9PiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgIG5ld3M6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgdGl0bGU6ICdSYWNrZXQgdjcuMyBSZWxlYXNlIE5vdGVzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgdGl0bGU6ICdGcmVlIERyb3Bib3ggQWNjb3VudHMgTm93IE9ubHkgU3luYyB0byBUaHJlZSBEZXZpY2VzJ1xuICAgICAgfSxcbiAgICAgIHsgaWQ6ICczJyxcbiAgICAgICAgdGl0bGU6ICdWb3luaWNoIE1hbnVzY3JpcHQgRGVjb2RlZCBieSBCcmlzdG9sIEFjYWRlbWljJ1xuICAgICAgfSxcbiAgICAgIHsgaWQ6ICc0JyxcbiAgICAgICAgdGl0bGU6ICdCdXJnZXIgS2luZyB0byBEZWxpdmVyIFdob3BwZXJzIHRvIExBIERyaXZlcnMgU3R1Y2sgaW4gVHJhZmZpYydcbiAgICAgIH0sXG4gICAgICB7IGlkOiAnNScsXG4gICAgICAgIHRpdGxlOiAnSG93IG11Y2ggZG8gWW91VHViZSBjZWxlYnJpdGllcyBjaGFyZ2UgdG8gYWR2ZXJ0aXNlIHlvdXIgcHJvZHVjdD8gJ1xuICAgICAgfVxuICAgIF1cbiAgfSlcbn1cbmV4cG9ydCBkZWZhdWx0IFBhZ2VcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./web/page/index/index.js\n");

/***/ }),

/***/ "./web/page/index/index.less":
/*!***********************************!*\
  !*** ./web/page/index/index.less ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvcGFnZS9pbmRleC9pbmRleC5sZXNzPzFlZGEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPLEtBQVUsRUFBRSxrQkFLZCIsImZpbGUiOiIuL3dlYi9wYWdlL2luZGV4L2luZGV4Lmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTcwNjg2ODM4MTI4XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./web/page/index/index.less\n");

/***/ }),

/***/ "./web/page/news/index.js":
/*!********************************!*\
  !*** ./web/page/news/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ \"./web/page/news/index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar mockData = {\n  1: \"Racket-on-Chez continues to improve. Snapshot builds are currently available at pre.racket-lang.org, and we expect that Racket-on-Chez will be included as a download option in the next release.\",\n  2: \"This means anyone with more than three devices connected doesn't have to worry right this instant. That will change, however, when it comes time to replace one of your current devices or if you add another device to your collection. At that point, you will have to make a decision.\",\n  3: \"World's most mysterious text is finally cracked: Bristol academic deciphers lost language of 600-year-old Voynich manuscript to reveal astrological sex tips, herbal remedies and other pagan beliefs\",\n  4: \"After a successful test in Mexico City, fast-food chain Burger King will begin delivering food to drivers caught in traffic in Los Angeles in what they have dubbed The Traffic Jam Whopper.\",\n  5: \"Product advertisement and promotion on YouTube is a function of the dedicated audience (or influence) of the individual (influencer) anchoring the advertising or promotion.\"\n};\n\nfunction News(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"news-container\"\n  }, \"\\u6587\\u7AE0\\u8BE6\\u60C5: \", props.newsDetail);\n}\n\nNews.getInitialProps = function (ctx) {\n  var newsId =  false ? undefined : ctx.params.id;\n  return Promise.resolve({\n    newsDetail: mockData[newsId]\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (News);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvcGFnZS9uZXdzL2luZGV4LmpzP2RkMGEiXSwibmFtZXMiOlsibW9ja0RhdGEiLCJOZXdzIiwicHJvcHMiLCJuZXdzRGV0YWlsIiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4IiwibmV3c0lkIiwiX19pc0Jyb3dzZXJfXyIsInBhcmFtcyIsImlkIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBTUEsUUFBUSxHQUFHO0FBQ2Ysd01BRGU7QUFFZixnU0FGZTtBQUdmLDRNQUhlO0FBSWYsbU1BSmU7QUFLZjtBQUxlLENBQWpCOztBQVFBLFNBQVNDLElBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUNwQixTQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsbUNBQ1NBLEtBQUssQ0FBQ0MsVUFEZixDQURGO0FBS0Q7O0FBRURGLElBQUksQ0FBQ0csZUFBTCxHQUF1QixVQUFDQyxHQUFELEVBQVM7QUFDOUIsTUFBTUMsTUFBTSxHQUFHQyxNQUFhLEdBQUdGLFNBQUgsR0FBeUJBLEdBQUcsQ0FBQ0csTUFBSixDQUFXQyxFQUFoRTtBQUNBLFNBQU9DLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQjtBQUNyQlIsY0FBVSxFQUFFSCxRQUFRLENBQUNNLE1BQUQ7QUFEQyxHQUFoQixDQUFQO0FBR0QsQ0FMRDs7QUFPZUwsbUVBQWYiLCJmaWxlIjoiLi93ZWIvcGFnZS9uZXdzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0ICcuL2luZGV4Lmxlc3MnXG5cbmNvbnN0IG1vY2tEYXRhID0ge1xuICAxOiBgUmFja2V0LW9uLUNoZXogY29udGludWVzIHRvIGltcHJvdmUuIFNuYXBzaG90IGJ1aWxkcyBhcmUgY3VycmVudGx5IGF2YWlsYWJsZSBhdCBwcmUucmFja2V0LWxhbmcub3JnLCBhbmQgd2UgZXhwZWN0IHRoYXQgUmFja2V0LW9uLUNoZXogd2lsbCBiZSBpbmNsdWRlZCBhcyBhIGRvd25sb2FkIG9wdGlvbiBpbiB0aGUgbmV4dCByZWxlYXNlLmAsXG4gIDI6IGBUaGlzIG1lYW5zIGFueW9uZSB3aXRoIG1vcmUgdGhhbiB0aHJlZSBkZXZpY2VzIGNvbm5lY3RlZCBkb2Vzbid0IGhhdmUgdG8gd29ycnkgcmlnaHQgdGhpcyBpbnN0YW50LiBUaGF0IHdpbGwgY2hhbmdlLCBob3dldmVyLCB3aGVuIGl0IGNvbWVzIHRpbWUgdG8gcmVwbGFjZSBvbmUgb2YgeW91ciBjdXJyZW50IGRldmljZXMgb3IgaWYgeW91IGFkZCBhbm90aGVyIGRldmljZSB0byB5b3VyIGNvbGxlY3Rpb24uIEF0IHRoYXQgcG9pbnQsIHlvdSB3aWxsIGhhdmUgdG8gbWFrZSBhIGRlY2lzaW9uLmAsXG4gIDM6IGBXb3JsZCdzIG1vc3QgbXlzdGVyaW91cyB0ZXh0IGlzIGZpbmFsbHkgY3JhY2tlZDogQnJpc3RvbCBhY2FkZW1pYyBkZWNpcGhlcnMgbG9zdCBsYW5ndWFnZSBvZiA2MDAteWVhci1vbGQgVm95bmljaCBtYW51c2NyaXB0IHRvIHJldmVhbCBhc3Ryb2xvZ2ljYWwgc2V4IHRpcHMsIGhlcmJhbCByZW1lZGllcyBhbmQgb3RoZXIgcGFnYW4gYmVsaWVmc2AsXG4gIDQ6IGBBZnRlciBhIHN1Y2Nlc3NmdWwgdGVzdCBpbiBNZXhpY28gQ2l0eSwgZmFzdC1mb29kIGNoYWluIEJ1cmdlciBLaW5nIHdpbGwgYmVnaW4gZGVsaXZlcmluZyBmb29kIHRvIGRyaXZlcnMgY2F1Z2h0IGluIHRyYWZmaWMgaW4gTG9zIEFuZ2VsZXMgaW4gd2hhdCB0aGV5IGhhdmUgZHViYmVkIFRoZSBUcmFmZmljIEphbSBXaG9wcGVyLmAsXG4gIDU6IGBQcm9kdWN0IGFkdmVydGlzZW1lbnQgYW5kIHByb21vdGlvbiBvbiBZb3VUdWJlIGlzIGEgZnVuY3Rpb24gb2YgdGhlIGRlZGljYXRlZCBhdWRpZW5jZSAob3IgaW5mbHVlbmNlKSBvZiB0aGUgaW5kaXZpZHVhbCAoaW5mbHVlbmNlcikgYW5jaG9yaW5nIHRoZSBhZHZlcnRpc2luZyBvciBwcm9tb3Rpb24uYFxufVxuXG5mdW5jdGlvbiBOZXdzIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSduZXdzLWNvbnRhaW5lcicgPlxuICAgICAg5paH56ug6K+m5oOFOiB7cHJvcHMubmV3c0RldGFpbH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5OZXdzLmdldEluaXRpYWxQcm9wcyA9IChjdHgpID0+IHtcbiAgY29uc3QgbmV3c0lkID0gX19pc0Jyb3dzZXJfXyA/IGN0eC5tYXRjaC5wYXJhbXMuaWQgOiBjdHgucGFyYW1zLmlkXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgIG5ld3NEZXRhaWw6IG1vY2tEYXRhW25ld3NJZF1cbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV3c1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./web/page/news/index.js\n");

/***/ }),

/***/ "./web/page/news/index.less":
/*!**********************************!*\
  !*** ./web/page/news/index.less ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvcGFnZS9uZXdzL2luZGV4Lmxlc3M/ZDBhOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU8sS0FBVSxFQUFFLGtCQUtkIiwiZmlsZSI6Ii4vd2ViL3BhZ2UvbmV3cy9pbmRleC5sZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU3MDY4NjgzODE3NVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web/page/news/index.less\n");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/asyncToGenerator\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIj8wNzJjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@babel/runtime/helpers/asyncToGenerator\n");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/regenerator\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiPzY4NGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@babel/runtime/regenerator\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIj81ZTlhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0LWRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-dom\n");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCI/NTNiOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJyZWFjdC1yb3V0ZXItZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-router-dom\n");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiPzE2ZjkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic2VyaWFsaXplLWphdmFzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///serialize-javascript\n");

/***/ }),

/***/ "ykfe-utils":
/*!*****************************!*\
  !*** external "ykfe-utils" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ykfe-utils\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ5a2ZlLXV0aWxzXCI/NDBlMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ5a2ZlLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieWtmZS11dGlsc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///ykfe-utils\n");

/***/ })

/******/ });
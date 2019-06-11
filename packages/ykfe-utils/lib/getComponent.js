"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRouterDom = require("react-router-dom");

const getComponent = (Routes, path) => {
  // 根据请求的path来匹配到对应的component
  const activeRoute = Routes.find(route => (0, _reactRouterDom.matchPath)(path, route)) || {};
  const activeComponent = activeRoute.Component;
  return activeComponent;
};

var _default = getComponent;
exports.default = _default;
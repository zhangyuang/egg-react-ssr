import React from 'react';
import { matchPath } from 'react-router-dom';
function NotFound() {
    return (React.createElement("div", null, "\u8DEF\u7531\u67E5\u8BE2404"));
}
const getComponent = (Routes, path) => {
    // 根据请求的path来匹配到对应的component
    const activeRoute = Routes.find(route => matchPath(path, route)) || { Component: () => NotFound }; // 找不到对应的组件时返回NotFound组件
    const activeComponent = activeRoute.Component;
    return activeComponent;
};
export default getComponent;
//# sourceMappingURL=getComponent.js.map
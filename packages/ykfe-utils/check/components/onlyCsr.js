// 通过使用该HOC使得组件只在客户端进行渲染
import React, { Component } from 'react';
function onlyCsr(WrappedComponent) {
    class OnlyCsrClass extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isCsr: false
            };
        }
        componentDidMount() {
            this.setState({
                isCsr: true
            });
        }
        render() {
            return this.state.isCsr ? React.createElement(WrappedComponent, Object.assign({}, this.props)) : React.createElement("div", null);
        }
    }
    for (const key in WrappedComponent) {
        // 静态属性传递
        // @ts-ignore for this issue https://github.com/Microsoft/TypeScript/issues/6480
        OnlyCsrClass[key] = WrappedComponent[key];
    }
    return OnlyCsrClass;
}
export default onlyCsr;
//# sourceMappingURL=onlyCsr.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function OnlyCsr(WrappedComponent) {
  class OnlyCsrClass extends _react.Component {
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
      return this.state.isCsr ? _react.default.createElement(WrappedComponent, this.props) : _react.default.createElement("div", null);
    }

  }

  for (let key in WrappedComponent) {
    OnlyCsrClass[key] = WrappedComponent[key];
  }

  return OnlyCsrClass;
}

var _default = OnlyCsr;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function GetInitialProps(WrappedComponent) {
  class GetInitialPropsClass extends _react.Component {
    constructor(props) {
      super(props);
      this.state = {
        extraProps: {},
        getProps: false
      };
    }

    componentDidMount() {
      const props = this.props;

      if (window.__USESSR__) {
        window.onpopstate = () => {
          this.getInitialProps();
        };
      }

      const getProps = !window.__USESSR__ || props.history && props.history.action === 'PUSH';

      if (getProps) {
        this.getInitialProps();
      }
    }

    async getInitialProps() {
      // csr首次进入页面以及csr/ssr切换路由时才调用getInitialProps
      const props = this.props;
      const extraProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(props) : {};
      this.setState({
        extraProps,
        getProps: true
      });
    }

    render() {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      return _react.default.createElement(WrappedComponent, Object.assign({}, this.state.getProps ? {} : window.__INITIAL_DATA__, this.state.extraProps));
    }

  }

  return (0, _reactRouterDom.withRouter)(GetInitialPropsClass);
}

var _default = GetInitialProps;
exports.default = _default;
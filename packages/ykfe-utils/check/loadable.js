// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
const ALL_INITIALIZERS = [];
const READY_INITIALIZERS = [];
function isWebpackReady(getModuleIds) {
    if (typeof __webpack_modules__ !== 'object') { // eslint-disable-line
        return false;
    }
    return getModuleIds().every(moduleId => {
        return (typeof moduleId !== 'undefined' &&
            typeof __webpack_modules__[moduleId] !== 'undefined' // eslint-disable-line
        );
    });
}
function load(loader) {
    let promise = loader();
    let state = {
        loading: true,
        loaded: null,
        error: null
    };
    state.promise = promise
        .then(loaded => {
        state.loading = false;
        state.loaded = loaded;
        return loaded;
    })
        .catch(err => {
        state.loading = false;
        state.error = err;
        console.log(err);
    });
    return state;
}
function loadMap(obj) {
    let state = {
        loading: false,
        loaded: {},
        error: null
    };
    let promises = [];
    try {
        Object.keys(obj).forEach(key => {
            let result = load(obj[key]);
            if (!result.loading) {
                state.loaded[key] = result.loaded;
                state.error = result.error;
            }
            else {
                state.loading = true;
            }
            promises.push(result.promise);
            result.promise
                .then(res => {
                state.loaded[key] = res;
            })
                .catch(err => {
                state.error = err;
            });
        });
    }
    catch (err) {
        state.error = err;
    }
    state.promise = Promise.all(promises)
        .then(res => {
        state.loading = false;
        return res;
    })
        .catch(err => {
        state.loading = false;
        throw err;
    });
    return state;
}
function resolve(obj) {
    return obj && obj.__esModule ? obj.default : obj;
}
function render(loaded, props, Layout) {
    const Loadable = resolve(loaded);
    return (Layout ? React.createElement(Layout, null,
        React.createElement(Loadable, Object.assign({}, props))) : React.createElement(Loadable, Object.assign({}, props)));
}
function createLoadableComponent(loadFn, options) {
    var _a;
    if (!options.loading) {
        throw new Error('react-loadable requires a `loading` component');
    }
    let opts = Object.assign({
        loader: null,
        loading: null,
        delay: 200,
        timeout: null,
        render: render,
        webpack: null,
        modules: null
    }, options);
    let res = null;
    function init() {
        if (!res) {
            res = loadFn(opts.loader);
        }
        return res.promise;
    }
    ALL_INITIALIZERS.push(init);
    if (typeof opts.webpack === 'function') {
        READY_INITIALIZERS.push(() => {
            if (isWebpackReady(opts.webpack)) {
                return init();
            }
        });
    }
    let _this = null;
    const popStateFn = () => {
        // 使用popStateFn保存函数防止addEventListener重复注册
        if (_this && _this.getInitialProps) {
            _this.getInitialProps();
        }
    };
    return _a = class LoadableComponent extends React.Component {
            constructor(props) {
                super(props);
                init();
                this.state = {
                    error: res.error,
                    pastDelay: false,
                    timedOut: false,
                    loading: res.loading,
                    loaded: res.loaded,
                    extraProps: {},
                    getProps: false
                };
            }
            static preload() {
                return init();
            }
            componentWillMount() {
                this._mounted = true;
                this._loadModule();
            }
            async componentDidMount() {
                const props = this.props;
                if (window.__USE_SSR__) {
                    _this = this; // 修正_this指向，保证_this指向当前渲染的页面组件
                    window.addEventListener('popstate', popStateFn);
                }
                const getProps = !window.__USESSR__ || (props.history && props.history.action === 'PUSH');
                if (getProps) {
                    await this.getInitialProps();
                }
            }
            async getInitialProps() {
                // csr首次进入页面以及csr/ssr切换路由时才调用getInitialProps
                const props = this.props;
                const WrappedComponent = this.state.loaded;
                const extraProps = (WrappedComponent && WrappedComponent.default.getInitialProps) ? await WrappedComponent.default.getInitialProps(props) : {};
                const Layout = WrappedComponent && WrappedComponent.default.Layout;
                this.setState({
                    extraProps,
                    getProps: true,
                    Layout
                });
            }
            _loadModule() {
                if (this.context.loadable && Array.isArray(opts.modules)) {
                    opts.modules.forEach(moduleName => {
                        this.context.loadable.report(moduleName);
                    });
                }
                if (!res.loading) {
                    return;
                }
                if (typeof opts.delay === 'number') {
                    if (opts.delay === 0) {
                        this.setState({ pastDelay: true });
                    }
                    else {
                        this._delay = setTimeout(() => {
                            this.setState({ pastDelay: true });
                        }, opts.delay);
                    }
                }
                if (typeof opts.timeout === 'number') {
                    this._timeout = setTimeout(() => {
                        this.setState({ timedOut: true });
                    }, opts.timeout);
                }
                let update = () => {
                    if (!this._mounted) {
                        return;
                    }
                    this.setState({
                        error: res.error,
                        loaded: res.loaded,
                        loading: res.loading
                    });
                    this._clearTimeouts();
                };
                res.promise
                    .then(async (Module) => {
                    if (Module.default && Module.default.getInitialProps) {
                        const moduleProps = await Module.default.getInitialProps(this.props);
                        const Layout = Module.default.Layout;
                        this.setState({
                            moduleProps,
                            Layout
                        });
                    }
                    update();
                })
                    .catch(_ => {
                    update();
                });
            }
            componentWillUnmount() {
                this._mounted = false;
                this._clearTimeouts();
            }
            _clearTimeouts() {
                clearTimeout(this._delay);
                clearTimeout(this._timeout);
            }
            retry() {
                this.setState({ error: null, loading: true, timedOut: false });
                res = loadFn(opts.loader);
                this._loadModule();
            }
            render() {
                if (this.state.loading || this.state.error) {
                    return React.createElement(opts.loading, {
                        isLoading: this.state.loading,
                        pastDelay: this.state.pastDelay,
                        timedOut: this.state.timedOut,
                        error: this.state.error,
                        retry: this.retry
                    });
                }
                else if (this.state.loaded) {
                    return opts.render(this.state.loaded, Object.assign({}, this.props, this.state.extraProps, this.state.moduleProps), this.state.Layout);
                }
                else {
                    return null;
                }
            }
        },
        _a.contextTypes = {
            loadable: PropTypes.shape({
                report: PropTypes.func.isRequired
            })
        },
        _a;
}
function Loadable(opts) {
    return createLoadableComponent(load, opts);
}
function LoadableMap(opts) {
    if (typeof opts.render !== 'function') {
        throw new Error('LoadableMap requires a `render(loaded, props)` function');
    }
    return createLoadableComponent(loadMap, opts);
}
Loadable.Map = LoadableMap;
class Capture extends React.Component {
    getChildContext() {
        return {
            loadable: {
                report: this.props.report
            }
        };
    }
    render() {
        return React.Children.only(this.props.children);
    }
}
Capture.propTypes = {
    report: PropTypes.func.isRequired
};
Capture.childContextTypes = {
    loadable: PropTypes.shape({
        report: PropTypes.func.isRequired
    }).isRequired
};
Loadable.Capture = Capture;
function flushInitializers(initializers) {
    let promises = [];
    while (initializers.length) {
        let init = initializers.pop();
        promises.push(init());
    }
    return Promise.all(promises).then(() => {
        if (initializers.length) {
            return flushInitializers(initializers);
        }
    });
}
Loadable.preloadAll = () => {
    return new Promise((resolve, reject) => {
        flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
    });
};
Loadable.preloadReady = () => {
    return new Promise((resolve, reject) => {
        // We always will resolve, errors should be handled within loading UIs.
        flushInitializers(READY_INITIALIZERS).then(resolve, resolve);
    });
};
export default Loadable;
//# sourceMappingURL=loadable.js.map
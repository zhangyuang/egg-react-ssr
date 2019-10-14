interface Window {
    __USE_SSR__?: string
}

declare const window: Window

interface NodeModule {
    hot?: Hot
}

interface Hot {
    accept(path?: string): void
}

declare const __isBrowser__: boolean

interface SFC<P> extends React.SFC<Props> {
    getInitialProps ?: any,
}

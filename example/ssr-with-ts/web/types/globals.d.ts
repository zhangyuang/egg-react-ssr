export { global,__isBrowser__}
declare global {
    interface Window {
        __USE_SSR__?: string
    }
    interface NodeModule {
        hot?: Hot
    }
    
}
interface Hot {
    accept(path?: string): void
}
declare const __isBrowser__: boolean


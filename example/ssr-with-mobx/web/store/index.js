import PageStore from './page'
import NewsStore from './news'

class Store {
  constructor (options) {
    const { initialState } = options
    this.pageStore = new PageStore(initialState)
    this.newsStore = new NewsStore(initialState)
  }
}

let store = null

function initializeStore (options) {
  const isServer = !options.__isBrowser__

  if (isServer || store === null) {
    store = new Store(options)
  }

  return store
}
export default initializeStore

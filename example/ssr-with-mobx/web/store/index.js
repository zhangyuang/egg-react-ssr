import PageStore from './page'
import NewsStore from './news'

class Store {
  constructor () {
    this.pageStore = new PageStore(this)
    this.newsStore = new NewsStore(this)
  }
}

let store = null

function initializeStore (options) {
  const isServer = !options.__isBrowser__
  const initialState = options.initialState

  if (isServer || store === null) {
    store = new Store(isServer, initialState)
  }

  return store
}
export default initializeStore

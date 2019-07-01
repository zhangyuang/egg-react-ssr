import PageStore from './page'
import NewsStore from './news'

class RootStore {
  constructor () {
    this.pageStore = new PageStore(this)
    this.newsStore = new NewsStore(this)
  }
}

export default RootStore

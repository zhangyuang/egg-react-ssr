import { useStaticRendering } from 'mobx-react'
import PageStore from './page'
import NewsStore from './news'

useStaticRendering(!__isBrowser__)

class Store {
  constructor (options) {
    const { initialState } = options
    this.pageStore = new PageStore(initialState)
    this.newsStore = new NewsStore(initialState)
  }
}

export default Store

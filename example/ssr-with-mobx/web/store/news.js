import { observable } from 'mobx'

class PageStore {
    @observable newsDeatil = ''
    constructor (rootStore) {
      this.rootStore = rootStore
    }
}

export default PageStore

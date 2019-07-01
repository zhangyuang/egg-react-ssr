const delay = time => new Promise(resolve => { setTimeout(() => resolve(), time) })

function unique(arr) {
  return Array.from(new Set(arr));
}

export default {
  namespace: 'news',
  state: {
    data: [],
    detail: {}
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: unique([...state.data, ...payload])
      }
    },
    saveOne(state, { payload }) {
      return {
        ...state,
        detail: payload
      }
    }
  },
  effects: {
    * load({ payload }, { call, put }) {
      const { page } = payload
      const { data, meta } = yield call(api.load, page)
      yield put({
        type: 'save',
        payload: data
      })

      return new Promise((resolve, reject) => {
        if (!data) {
          reject('没有内容了')
        }
        resolve({ data, meta })
      })
    },
    * loadOne({ payload }, { call, put }) {
      const { id } = payload
      const { data, meta } = yield call(api.loadOne, id)

      yield put({
        type: 'saveOne',
        payload: data
      })

      return new Promise((resolve, reject) => {
        if (!data) {
          reject('没有内容了')
        }
        resolve({ data, meta })
      })
    }
  }
}

// ---------------------------------------------------------
// 模拟请求
const api = {
  load: async page => {
    const pagesize = 5
    const isLast = page > Math.floor(mockData.length / pagesize)
    if (isLast) {
      return {
        data: [],
        msg: '没有内容了.',
        meta: {
          page: page
        }
      }
    }
    const startIndex = (page - 1) * pagesize
    let data = mockData.slice(startIndex, startIndex + pagesize)
    return {
      data: data,
      msg: 'ok.',
      meta: {
        page: page
      }
    }
  },
  loadOne: async id => {
    let data = mockData.filter(v => v.id === id)
    return {
      data: data[0] || {},
      msg: 'ok.',
      meta: {}
    }
  }
}

// 模拟数据
const mockData = [
  { id: '1', title: '111Racket v7.3 Release Notes', body: '11111111' },
  { id: '2', title: '222Free Dropbox Accounts Now Only Sync to Three Devices', body: '222' },
  { id: '3', title: '333Voynich Manuscript Decoded by Bristol Academic', body: '333' },
  { id: '4', title: '4444Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic', body: '4444' },
  { id: '5', title: '555555How much do YouTube celebrities charge to advertise your product? ', body: '5555' },
  { id: '6', title: '66666Racket v7.3 Release Notes', body: '666' },
  { id: '7', title: '7777Free Dropbox Accounts Now Only Sync to Three Devices', body: '777' },
  { id: '8', title: '888888Voynich Manuscript Decoded by Bristol Academic', body: '888' },
  { id: '9', title: '999999Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic', body: '999' },
  { id: '10', title: '10 ow much do YouTube celebrities charge to advertise your product? ', body: '10101010' },
  { id: '11', title: '11 Racket v7.3 Release Notes', body: '666' },
  { id: '12', title: '12 Free Dropbox Accounts Now Only Sync to Three Devices', body: '777' },
  { id: '13', title: '13 Voynich Manuscript Decoded by Bristol Academic', body: '888' },
  { id: '14', title: '14 Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic', body: '999' },
  { id: '15', title: '15 How much do YouTube celebrities charge to advertise your product? ', body: '10101010' }
]

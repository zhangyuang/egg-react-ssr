const getData = async () => {
  return Promise.resolve({
    news: [
      {
        id: '1',
        title: 'Racket v7.3 Release Notes'
      },
      {
        id: '2',
        title: 'Free Dropbox Accounts Now Only Sync to Three Devices'
      },
      { id: '3',
        title: 'Voynich Manuscript Decoded by Bristol Academic'
      },
      { id: '4',
        title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'
      },
      { id: '5',
        title: 'How much do YouTube celebrities charge to advertise your product? '
      }
    ]
  })
}
export default {
  namespace: 'page',
  state: {
    news: []
  },
  reducers: {
    init (state, { payload }) {
      return {
        ...state,
        news: payload.news
      }
    }
  },
  effects: {
    * getData ({ payload }, { call, put }) {
      const data = yield call(getData)
      yield put({
        type: 'init',
        payload: data
      })
    }
  }

}

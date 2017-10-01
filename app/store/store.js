import Vuex from 'vuex'
import mutations from './mutations.js'
import * as actions from './actions.js'
import * as getters from './getters'

const storeConf = {
  state: {
    items: [
      {
        Id: 1,
        Name: 'asdasdasd',
        Done: true
      }
    ]
  },
  mutations,
  actions,
  getters
}

export default storeConf;
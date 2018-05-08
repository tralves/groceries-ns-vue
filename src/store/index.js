import mutations from './mutations.js'
import * as actions from './actions.js'
import * as getters from './getters'

const storeConf = {
  state: {
    // array of grocery items
    items: [],
    // array of ongoing tasks. We keep track of the tasks to show/hide the
    // activity indicator in the groceries page.
    processingTasks: []
  },
  mutations,
  actions,
  getters
}

export default storeConf;
import Vue from 'vue'
import Vuex from 'vuex'
import Log from '@/models/Log'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // The variable to be shared between components
  state: {
    // An empty list of logs to be stored when called
    logs: Array<Log>()
  },
  // A function to be accessed with commit to modify any states
  mutations: {
    // Mutations are necessary to push any changes to states
    addLog(state, newLog: Log) {
      // Pushing new logs from the API call to the list of logs
      state.logs.push(newLog)
    }
  },
  // Functions that can be called outside of the index.ts file for when needed and can interface with mutations
  actions: {
    getAllLogs() {
      return axios
        // Call the api at localhost:8000
        .get('http://localhost:8000')
        // Retrieve the response when available
        .then(res => 
          // Loop through all logs within the response
          //   and add each to the log state
          res.data.map((log: Log) => this.commit('addLog', log)) // Commit is used with the data to push data to a mutation
        )
        // Simple catch to output if error occurs
        .catch(err => console.log(err))
      }
  },
  // Used if we create separate stores (state, mutations, actions, etc.) to import
  modules: {
  }
})

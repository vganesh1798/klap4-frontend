import Vue from 'vue'
import Vuex from 'vuex'
import Log from '@/models/Log'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // An empty list of logs to be stored when called
    logs: Array<Log>()
  },
  mutations: {
    // Mutations are necessary to push any changes to states
    addLog(state, newLog: Log) {
      // Pushing new logs from the API call to the list of logs
      state.logs.push(newLog)
    }
  },
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
  modules: {
  }
})

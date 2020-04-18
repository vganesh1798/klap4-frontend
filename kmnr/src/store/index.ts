import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Log from '@/models/Log'
import ChartData from '@/models/ChartData'

Vue.use(Vuex)

export default new Vuex.Store({
  // The variable to be shared between components
  state: {
    // An empty list of logs to be stored when called
    logs: Array<Log>(),
    allChart: Array<ChartData>(),
    newChart: Array<ChartData>()
  },
  // A function to be accessed with commit to modify any states
  mutations: {
    // Mutations are necessary to push any changes to states
    addLog(state, newLog: Log) {
      // Pushing new logs from the API call to the list of logs
      state.logs.push(newLog);
    },
    addToAllChart(state, nextChartData: ChartData) {
      state.allChart.push(nextChartData);
    },
    addToNewChart(state, nextChartData: ChartData) {
      state.newChart.push(nextChartData);
    }
  },
  // Functions that can be called outside of the index.ts file for when needed and can interface with mutations
  actions: {
    getAllLogs() {
      return axios
        // Call the api at localhost:8000
        .get('http://localhost:8000')
        // Retrieve the response when available
        .then(res =>  {
          // Loop through all logs within the response
          //   and add each to the log state
          res.data.map((log: Log) => this.commit('addLog', log)) // Commit is used with the data to push data to a mutation
          return res.data
        })
        // Simple catch to output if error occurs
        .catch(err => console.log(err))
      },
    getAllChartData() {
      return axios
      .get('http://localhost:5000/charts/all/2')
      .then(res => {
        res.data.map((albumData: ChartData) => this.commit('addToAllChart', albumData))
        return res.data
      })
      .catch(err => console.log(err))
    },
    getNewChartData() {
      return axios
      .get('http://localhost:8000/search/album')
      .then(res =>
        res.data.map((albumData: ChartData) => {if(albumData.isNew) {this.commit('addToNewChart', albumData)}}) )
      .catch(err => console.log(err))
    }
  },
  // Used if we create separate stores (state, mutations, actions, etc.) to import
  modules: {
  }
})

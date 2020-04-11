import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ChartData from '@/models/ChartData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allChart: Array<ChartData>(),
    newChart: Array<ChartData>()
  },
  mutations: {
    addToAllChart(state, nextChartData: ChartData) {
      state.allChart.push(nextChartData);
    },
    addToNewChart(state, nextChartData: ChartData) {
      state.newChart.push(nextChartData);
    }
  },
  actions: {
    getAllChartData() {
      return axios
      .get('http://localhost:8000/search/album')
      .then(res =>
        res.data.map((albumData: ChartData) => this.commit('addToAllChart', albumData)))
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
  modules: {
  }
})

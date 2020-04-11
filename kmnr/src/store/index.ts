import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// maybe store this structure elsewhere
// all typed to be string until we know if that's what they for sure should be
interface ChartData {
  name: string;
  artist: string;
  runtime: string; // number
  recommended: string; // possibly a boolean
  albumTag: string; // number?
  atristTag: string; // number?
  releaseDate: string; // Date is a type that could be used here
  totalPlays: string; // number
}

export default new Vuex.Store({
  state: {
    allCharts: Array<ChartData>(),
    newCharts: Array<ChartData>()
  },
  mutations: {
    addToChart(state, newChartData: ChartData) {
      state.allCharts.push(newChartData);
    }
    // could filter by date here to determine whether to add to new charts as well or not
  },
  actions: {
    getChartData() {
      return axios
      .get('http://localhost:8000')
      .then(res => // understand how to use API endpoints
        res.data.map((albumData: ChartData) => this.commit('addToChart', albumData))) // will this return as all the pieces of ChartData or be converted to be ChartData already
      .catch(err => console.log(err))
    }
  },
  modules: {
  }
})

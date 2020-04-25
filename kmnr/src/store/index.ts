import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Log from '@/Models/Playlist'
import ChartData from '@/Models/ChartData'
import SingleArtist  from '../Models/Artist'
import Artist  from '../Models/Artist'

import DisplayAlbum, {Album, AlbumSearch} from '../Models/Album'

Vue.use(Vuex)

export default new Vuex.Store({
  // The variable to be shared between components
  state: {
    // An empty list of logs to be stored when called
    logs: Array<Log>(),
    allChart: Array<ChartData>(),
    newChart: Array<ChartData>(),
    artists: Array<Artist>(),
    singleArtist: {},
    albums: Array<Album>(),
    singleAlbum: {}
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
    },
    addToArtists(state, newArtist: Artist) {
      state.artists.push(newArtist);
    },
    singleArtistMut(state, sArtist: Artist){
      state.singleArtist = sArtist
    },
    addToAlbums(state, newAlbum: Array<Album>) {
      state.albums = newAlbum
    },
    addSingleAlbum(state, sAlbum: DisplayAlbum) {
      state.singleAlbum = sAlbum
    },
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
      .get('http://localhost:5000/charts/all')
      .then(res => {
        res.data.map((albumData: ChartData) => this.commit('addToAllChart', albumData))
        return res.data
      })
      .catch(err => console.log(err))
    },
    getNewChartData() {
      return axios
      .get('http://localhost:5000/charts/new')
      .then(res => {
        res.data.map((albumData: ChartData) => this.commit('addToNewChart', albumData))
        return res.data
      })
      .catch(err => console.log(err))
    },
    getAllArtists() {
      return axios.get('http://localhost:5000/search/artist')
      .then(res =>{
        res.data.map((artist: Artist) => this.commit('addToArtists', artist))
        return res.data
      })
      .catch(err => console.log(err))
    },
    getQueryArtists({commit, state}, query) {
      const searchQuery = {
          'genre': query.genre,
          'name': query.name
      };

      return axios.post('http://localhost:5000/search/artist', searchQuery)
      .then(res =>{ 
          res.data.map((artist: Artist) => this.commit('addToArtists', artist))
          return res.data
      })
      .catch(err => console.log(err))
    },
    displayArtists({commit, state}, id: string) {
      return axios.get(`http://localhost:5000/display/artist/${id}`)
      .then(res =>{ 
          this.commit('singleArtistMut', (res.data as SingleArtist))
          return res.data
          // OR
          //res.data.map(artist => {this.commit('addToArtists', artist))
      })
    },
    getAllAlbums() {
      return axios.get('http://localhost:5000/search/album')
        .then(res => {
          this.commit('addToAlbums', (res.data as Array<Album>))
          return res.data
        })
        .catch(err => console.log(err))
    },
    getQueriedAlbums({commit, state}, albumParams: AlbumSearch) {
      const searchQuery = {
        'genre': albumParams.genre_abbr,
        'name': albumParams.album,
        'artistName': albumParams.artist,
      }

      return axios.post('http://localhost:5000/search/album', searchQuery)
        .then(res => {
          this.commit('addToAlbums', (res.data as Array<Album>))
          return res.data
        })
        .catch(err => console.log(err))
    },
    displayAlbum({commit, state}, id: string) {
      return axios.get(`http://localhost:5000/display/album/${id}`)
        .then(res => {
          this.commit('addSingleAlbum', (res.data as DisplayAlbum))
          console.log(res.data)
          return res.data
        })
        .catch(err => console.log(err))
    },
    login({commit, state}, encoding: string) {
      return axios.post(`http://localhost:5000/token/auth`, {}, {headers: {'Authorization': encoding}, withCredentials: true})
        .then(res => {
          if (res.status !== 200)
            return false

          return true
        }).catch(err => {
          console.log(err)
        })
    },
    logout() {
      return axios.post(`http://localhost:5000/token/remove`, {}, {withCredentials: true})
        .then(res => {
          if (res.status !== 200)
            return false

          return true
        }).catch(err => {
          console.log(err)
        })
    },
    getCurrUser() {
      let secure = {}
      return axios.get('http://localhost:5000/', {withCredentials: true})
        .then(res => {
          console.log(res.data['logged-in-as'])
        })
    }
  },
  // Used if we create separate stores (state, mutations, actions, etc.) to import
  modules: {
  }
})

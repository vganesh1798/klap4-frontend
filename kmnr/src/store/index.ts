import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Playlist from '@/Models/Playlist'
import PlaylistEntry from '@/Models/Playlist'
import ChartData from '@/Models/ChartData'
import SingleArtist  from '../Models/Artist'
import Artist  from '../Models/Artist'
import Program, {ProgramSearch, ProgramSlots} from '../Models/Program'

import DisplayAlbum, {Album, AlbumSearch} from '../Models/Album'

Vue.use(Vuex)

export default new Vuex.Store({
  // The variable to be shared between components
  state: {
    // An empty list of logs to be stored when called
    playlists: Array<Playlist>(),
    playlist: {},
    allChart: Array<ChartData>(),
    newChart: Array<ChartData>(),
    artists: Array<Artist>(),
    singleArtist: {},
    albums: Array<Album>(),
    singleAlbum: {},
    currentUser: '',
    programs: Array<Program>(),
    schedule: Array<ProgramSlots>()
  },
  // A function to be accessed with commit to modify any states
  mutations: {
    // Mutations are necessary to push any changes to states
    addPlaylist(state, newPlaylist: Playlist) {
      // Pushing new logs from the API call to the list of logs
      state.playlists.push(newPlaylist);
    },
    displayPlaylist(state, newPlaylistEntry: PlaylistEntry) {
      state.playlist = newPlaylistEntry;
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
    setUser(state, curUser: string) {
      console.log("recieved", curUser)
      state.currentUser = curUser
    },
    addToPrograms(state, newProgram: Array<Program>) {
      state.programs = newProgram
    },
    addToProgramSlots(state, newProgramSlots: Array<ProgramSlots>) {
      state.schedule = newProgramSlots
    }
  },
  // Functions that can be called outside of the index.ts file for when needed and can interface with mutations
  actions: {
    getPlaylist({commit, state}, playlistDisplay: any) {
      return axios
        // Call the api at localhost:8000
        .get(`http://localhost:5000/playlist/display/${playlistDisplay.dj_id}/${playlistDisplay.playlistName}`, {withCredentials: true})
        // Retrieve the response when available
        .then(res =>  {
          // Loop through all logs within the response
          //   and add each to the log state
          this.commit('displayPlaylist', (res.data as PlaylistEntry)) // Commit is used with the data to push data to a mutation
          return res.data
        })
        // Simple catch to output if error occurs
        .catch(err => console.log(err))
    },
    addPlaylistEntry({commit, state}, playlistDisplay: any) {
      return axios
        // Call the api at localhost:8000
        .post(`http://localhost:5000/playlist/display/${playlistDisplay.dj_id}/${playlistDisplay.playlistName}`, playlistDisplay,{withCredentials: true})
        // Retrieve the response when available
        .then(res =>  {
          // Loop through all logs within the response
          //   and add each to the log state
          //sthis.commit('displayPlaylist', (res.data as PlaylistEntry)) // Commit is used with the data to push data to a mutation
          return res.data
        })
        // Simple catch to output if error occurs
        .catch(err => console.log(err))
    },
    deletePlaylistEntry({commit, state}, playlistDelete: any) {
      axios.delete(`http://localhost:5000/playlist/display/${playlistDelete.dj_id}/${playlistDelete.playlistName}`, {
        data: {
          'index': playlistDelete.index,
          //'ref': playlistDelete.ref
          'entry': playlistDelete.entry
        },
        withCredentials: true
      })
      .catch(err => console.log(err))
    },
    updatePlaylistEntry({commit, state}, playlistEntry: any) {
      return axios
      
      .put(`http://localhost:5000/playlist/display/${playlistEntry.dj_id}/${playlistEntry.playlistName}`, playlistEntry, {withCredentials: true})
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => console.log(err))
    },

    uploadPlaylist({commit, state}, playlistEntry) {
      const fileinfo = {
        'file': playlistEntry.file
    };
      return axios

      .post(`http://localhost:5000/playlist/upload/${playlistEntry.dj_id}/${playlistEntry.playlistName}`, playlistEntry, {withCredentials: true})
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
    },


    createNewPlaylist({commit, state}, newPlaylist: any) {
      const playlistData = {
        'username': newPlaylist.dj_id,
        'playlistName': newPlaylist.p_name,
        'show': newPlaylist.show
      }
      
      return axios.post(`http://localhost:5000/playlist/${newPlaylist.dj_id}`, playlistData, {withCredentials: true})
        .then(res => {
          return res.data
        }).catch(err => console.error(err))
    },
    updatePlaylist({commit, state}, editedPlaylist: any) {
      const playlistData = {
        'username': editedPlaylist.dj_id,
        'playlistName': editedPlaylist.p_name,
        'show': editedPlaylist.show
      }

      return axios.put(`http://localhost:5000/playlist/${editedPlaylist.dj_id}`, playlistData, {withCredentials: true})
        .then(res => {
          return res.data
        }).catch(err => console.error(err))
    },
    getAllChartData() {
      return axios
      .get('http://localhost:5000/charts/all', {withCredentials: true})
      .then(res => {
        res.data.map((albumData: ChartData) => this.commit('addToAllChart', albumData))
        console.log(res.data)
        return res.data
      })
      .catch(err => console.log(err))
    },
    getNewChartData() {
      return axios
      .get('http://localhost:5000/charts/new', {withCredentials: true})
      .then(res => {
        res.data.map((albumData: ChartData) => this.commit('addToNewChart', albumData))
        return res.data
      })
      .catch(err => console.log(err))
    },
    getAllArtists() {
      return axios.get('http://localhost:5000/search/artist', {withCredentials: true})
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

      return axios.post('http://localhost:5000/search/artist', searchQuery, {withCredentials: true})
      .then(res =>{ 
          res.data.map((artist: Artist) => this.commit('addToArtists', artist))
          return res.data
      })
      .catch(err => console.log(err))
    },
    displayArtists({commit, state}, id: string) {
      return axios.get(`http://localhost:5000/display/artist/${id}`, {withCredentials: true})
      .then(res =>{ 
          this.commit('singleArtistMut', (res.data as SingleArtist))
          return res.data
          // OR
          //res.data.map(artist => {this.commit('addToArtists', artist))
      })
      .catch(err => console.log(err))
    },
    getAllAlbums() {
      return axios.get('http://localhost:5000/search/album', {withCredentials: true})
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

      return axios.post('http://localhost:5000/search/album', searchQuery, {withCredentials: true})
        .then(res => {
          this.commit('addToAlbums', (res.data as Array<Album>))
          return res.data
        })
        .catch(err => console.log(err))
    },
    displayAlbum({commit, state}, id: string) {
      return axios.get(`http://localhost:5000/display/album/${id}`, {withCredentials: true})
        .then(res => {
          this.commit('addSingleAlbum', (res.data as DisplayAlbum))
          return res.data
        })
        .catch(err => console.log(err))
    },
    displayPlaylists({commit, state}, dj_id: string) {
      return axios.get(`http://localhost:5000/playlist/${dj_id}`, {withCredentials: true})
      .then(res=> {
        this.commit('addPlaylist', (res.data as Array<Playlist>))
        
        return res.data
      })
      .catch(err => console.log(err))
    },
    deletePlaylist({commit, state}, playlistDelete: any) {
      axios.delete(`http://localhost:5000/playlist/${playlistDelete.dj_id}`, {
        data: {
          'username': playlistDelete.dj_id,
          'playlistName': playlistDelete.p_name
        },
        withCredentials: true
      })
      .catch(err => console.log(err))
    },
    getAllPrograms() {
      return axios.get('http://localhost:5000/search/program')
        .then(res => {
          this.commit('addToPrograms', (res.data as Array<Program>))
          return res.data
        })
        .catch(err => console.log(err))
    },
    getQueriedPrograms({commit, state}, programParams: ProgramSearch) {
      const searchQuery = {
        'programType': programParams.type,
        'name': programParams.name,
      }

      return axios.post('http://localhost:5000/search/program', searchQuery)
        .then(res => {
          this.commit('addToPrograms', (res.data as Array<Program>))
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
          this.commit('setUser', res.data['logged_in_as'])
          return res.data
        })
    },
    getProgramSlots() {
      return axios.get('http://localhost:5000/programming/log')
        .then(res => {
          this.commit('addToProgramSlots', (res.data as Array<ProgramSlots>))
          return res.data
        })
    },
    quicksearch({commit, state}, searchParam: any) {
      return axios
        .get(`http://localhost:5000/quickjump/${searchParam.id}`, {withCredentials: true})
        .then(res =>  {
          console.log(res.data)
          return res.data
        })
        .catch(err => console.log(err))
    }
  },
  // Used if we create separate stores (state, mutations, actions, etc.) to import
  modules: {
  }
})

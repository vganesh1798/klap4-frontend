import Vuex from 'vuex';
import Vue from 'vue';

import SingleArtist  from '../Models/Artist'
import Artist  from '../Models/Artist'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        artists: Array<Artist>(),
        singleArtist: {}
    },
    mutations: {
        addToArtists(state, newArtist: Array<Artist>) {
            state.artists = newArtist
            // OR
            //state.artists.append(newArtist)
        },
        singleArtistMut(state, sArtist: Artist){
            state.singleArtist = sArtist
        }
    },
    actions: {
        getAllArtists() {
            return axios.get('http://localhost:8000/search/artist')
            .then(res =>{ 
                this.commit('addToArtists', (res.data as Array<Artist>))
                // OR
                //res.data.map(artist => {this.commit('addToArtists', artist))
            })
        },
        getQueryArtists({commit, state}, query) {
            const searchQuery = {
                'genre': query.genre,
                'artist': query.artist
            };

            return axios.post('http://localhost:8000/search/artist', searchQuery)
            .then(res =>{ 
                this.commit('addToArtists', (res.data as Array<Artist>))
                // OR
                //res.data.map(artist => {this.commit('addToArtists', artist))
            })
        },
        displayArtists({commit, state}, id) {
            return axios.get(`http://localhost:8000/display/artist/${id}`)
            .then(res =>{ 
                this.commit('singleArtistMut', (res.data as SingleArtist))
                // OR
                //res.data.map(artist => {this.commit('addToArtists', artist))
            })
        }
    },
    modules: {
    }
})
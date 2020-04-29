<template>
    <div class="playlist-selector">
        <div class="close">
            <a @click="closeSwitch" class="close-button"><i class="material-icons">close</i></a>
        </div>
        <div class="row">
            <div class="col-l11">
                <div class="whomstdve">
                    {{this.$store.state.currentUser}}'s Playlists
                </div>
                <div class="playlists">
                    <ul id="playlist-list">
                        <li 
                            class="playlist-element" 
                            v-for="playlist in playlists" 
                            :key="playlist['id']">
                            <defaultButton class="playlistName" @click.native="updatePlaylist(playlist['dj_id'], playlist['name'], playlist['show'])">
                            <span>{{playlist['name']}}</span>
                            </defaultButton>
                            <defaultButton @click.native="deletePlaylist(playlist['name'])" class="deleteBtn btn-floating btn waves-effect waves-light">
                            <i class="material-icons">delete</i>
                            </defaultButton>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Playlist from '../Models/Playlist';
import defaultButton from "./Button.vue";

@Component ({
    components: { defaultButton }
})
export default class PlaylistSwitch extends Vue {
    @Prop(Array)
    playlists

    closed = false;
    dj = "";

    created() {
        this.getCurrentUser();
        //this.getPlaylists();
      }

    getCurrentUser() {
       this.$store.dispatch('getCurrUser').then(() => {
                console.log("after", this.$store.state.currentUser)
                this.getPlaylists();
            });
    }

    getPlaylists() {
        const djParam = {
                dj_id: this.$store.state.currentUser
            }
        this.$store.dispatch('displayPlaylists', djParam.dj_id).then(res => {
            this.playlists = res;
            console.log(this.playlists);
        });
    }

    deletePlaylist(playlistName) {
        const playlistParam = {
                dj_id: this.$store.state.currentUser,
                p_name: playlistName
            }
        console.log(playlistParam);
        this.$store.dispatch('deletePlaylist', playlistParam).then(res => {
            //this.playlists = res;
            console.log(res);
            this.getPlaylists();
        });
        if(this.$store.state.currentPlaylist == playlistParam.p_name) {
             const PlaylistParam = {
                playlist_name: ''
            }
            console.log("i am updating to a new playlist", PlaylistParam.playlist_name)
            this.$store.dispatch('setCurrPlaylist', PlaylistParam).then(() => {
                console.log("after", this.$store.state.currentPlaylist)
                this.closeSwitch();
            });
        }
    }

    updatePlaylist(id, playlist, show) {
        console.log(playlist)
         const PlaylistParam = {
                playlist_name: playlist
            }
        console.log("i am updating to a new playlist", PlaylistParam.playlist_name)
        this.$store.dispatch('setCurrPlaylist', PlaylistParam).then(() => {
                console.log("after", this.$store.state.currentPlaylist)

                this.newPlaylist(id, playlist, show)
            });
    }

    @Emit('closeSwitch')
    closeSwitch() {
        this.closed = true;
    }

    @Emit('newPlaylist')
    newPlaylist(id, playlist, show) {
        console.log("emit new playlist");
        this.closeSwitch();
    }
}
</script>

<style lang="scss" scoped>
    .whomstdve {
        font-family: 'Montserrat';
        font-size: 1.8vw;
        font-weight: lighter;
        text-align: center;
        padding-top: 1%;
        padding-bottom: 4%;
        color: black;
    }

    .playlist-selector {
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        height: 30vw;
        width: 40vw;
        padding: 0% 2% 20% 2%;
        border-radius: 1.2%;
        border-top-left-radius: 1%; border-top-right-radius: 1%;
        transform: translate(-50%, -50%);
        z-index: 999;
    }


    .playlists {
        color: whitesmoke;
        height: 23vw;
        max-height: 23vw;
        overflow: auto;
        //background-color: #253e4d;
        background-color: white;
    }

    .playlist-list {
        max-height: 50px;
        overflow: auto;
    }

    .playlist-element {
        background-color:rgba(192, 189, 189, 0.4);
        margin-top: 1%;
        margin-bottom: 1%;
        width: 100%;
    }

    .playlistName {
        text-align: left !important;
        width: 93%;
    }

    .deleteBtn {  
        margin-right: 0; 
    }

    .close {
        padding-left: 36vw;
        padding-top: 1%;

        .close-button {
            cursor: pointer;

            &:hover {
                text-decoration: none;
            }
        }

        i {
            color: #4F9DB4 !important;
        }
    }
</style>
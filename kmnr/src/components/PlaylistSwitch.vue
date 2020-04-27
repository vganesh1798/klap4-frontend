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
                            <defaultButton class="colored" @click.native="newPlaylist(playlist['name'])">
                            {{playlist['name']}}
                            </defaultButton>
                            <button type="button" @click="deletePlaylist(playlist['name'])" class="btn-floating btn waves-effect waves-light red">
                            <i class="material-icons">delete</i>
                            </button>
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
            //console.log(this.playlists);
    });
    this.getPlaylists();
    }

    @Emit('closeSwitch')
    closeSwitch() {
        this.closed = true;
    }

    @Emit('newPlaylist')
    newPlaylist(name) {
        console.log("emit new playlist");
        this.closeSwitch();
    }
}
</script>

<style lang="scss" scoped>
    .whomstdve {
        font-size: 1.8vw;
        font-weight: lighter;
        text-align: center;
        padding-top: 3%;
        padding-bottom: 2%;
        color: white;
    }

    .playlist-selector {
        background-color: rgb(25, 40, 50);
        position: fixed;
        top: 50%;
        left: 50%;
        height: 30vw;
        width: 40vw;
        padding: 0% 5% 20% 5%;
        border-radius: 1.2%;
        border-top-left-radius: 1%; border-top-right-radius: 1%;
        transform: translate(-50%, -50%);
    }

    .playlist-selector::after {
        background: linear-gradient(to right, #269E84 25%,#D9CF9F 25%, #E9B342 50%, #EA3C36 50%, #EA3C36 75%, #4F9DB4 75%);
        position: absolute;
        border-radius: 10px;
        content: '';
        height: 4px;
        right: 0;
        left: 0;
        top: 0;
    }

    .playlists {
        color: whitesmoke;
        height: 20vw;
        max-height: 20vw;
        overflow: auto;
        background-color: #253e4d;
    }

    .playlist-list {
        max-height: 50px;
        overflow: auto;
    }
    .close {
        padding-left: 32vw;
        padding-top: 4%;

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
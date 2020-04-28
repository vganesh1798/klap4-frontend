<template>
    <div class="playlist">
        <div class="row">
            <p>{{this.current_playlist}}</p>
            <p>{{this.current_show}}</p>
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closeEdit" type="submit">X</defaultButton>
            </div>
        </div>
        <div class="row">
            <h1>Edit Playlist</h1>
        </div>
        <form class="col offset-s3 s6" @submit.prevent="updatePlaylist">
                <div class="row">
                    <div class="input-field">
                        <label required for="playlist">Playlist</label>
                        <input type="text" id="playlist" v-model="playlistName" />
                    </div>
                    <div class="input-field">
                        <label required for="show">Show</label>
                        <input type="text" id="show" v-model="showName" />
                    </div>
                </div>
                <div class="row"/>
                <button class="btn" type="submit">Save Changes</button>
            </form>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import defaultButton from "../components/Button.vue";

    @Component ({
        components: { defaultButton }
    })
    export default class playlist extends Vue {
        
        close = false;
        name = ''
        playlistName = ''
        showName = ''
        @Prop(String) current_playlist!: string
        @Prop(String) current_show!: string

        constructor() {
            super()
        }

        created() {
        this.getCurrentUser();
      }

    getCurrentUser() {
       this.$store.dispatch('getCurrUser').then(() => {
                console.log("after", this.$store.state.currentUser)
                this.name = this.$store.state.currentUser
            });
    }

        @Emit('closeEdit') 
            closeEdit() {
                this.close = true;
            }

    updatePlaylist() {
        console.log(this.name, this.current_playlist, this.current_show, this.playlistName, this.showName);
        const playlistParams = {
            dj_id: this.name,
            show: this.current_show,
            p_name: this.current_playlist,
            new_name: this.playlistName,
            new_show: this.showName
        }
        this.$store.dispatch('updatePlaylist', playlistParams).then(res => {
            console.log(res);
            //this.newPlaylistCreated(playlistParams.dj_id, playlistParams.p_name, playlistParams.show);
        })
    }
}
</script>

<style lang="scss" scoped>
h1 {
    color: black;
    text-align: center;
    font-size: 48px;
}

a {
    font-size: 14px;
    position: absolute;
    bottom: 0%;
    right: 5%;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.playlist {
    background-color:white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 550px;
    width: 500px;
    padding: 0% 5% 20% 5%;
    border-radius: 3%;
    font-family: 'Montserrat';
    z-index: 9999;
}

.btn {
    background-color: rgba(100,100,100, .4);
    position: absolute;
    color: black;
    left: 25%;
    bottom: 15%;
    border: 0 0 0 0;
    margin: 0 0 0 0;
    width: 50%;
}

</style>
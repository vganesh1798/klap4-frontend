<template>
    <div class="displayPlaylists">
        <div class="col s11"></div>
        <div class="col s1">
            <defaultButton class="corner-btn" style="font-size: 20px;" @click.native="closeEdit()" type="submit">X</defaultButton>
        </div>
        <h1>Select a playlist</h1>
        <form action="#">
            <p v-for="playlist in playlistName" :key="playlist.id">
                <label>
                    <input name="group1" type="radio" checked />
                    <span>{{ playlist }}</span>
                </label>
            </p>
        </form>
        <defaultButton class="colored uploadBtn" type="submit">Sumbit</defaultButton>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import axios from "axios";
    import defaultButton from "../components/Button.vue";
    
    @Component ({ 
        components: {defaultButton}
    })
    export default class currentPlaylists extends Vue {
        playlistName = ['playlist 1', 'playlist 2', 'playlist 3', 'playlist 4']
        close = false
        
        constructor() {
            super()
        }

        @Emit('closeEdit') 
            closeEdit() {
                this.close = true;
            }
        
        select() {
            console.log("clicked");
        }
    }
</script>

<style lang="scss" scoped>
h1 {
    color:black;
    text-align: center;
    font-family: "Montserrat";
}

.displayPlaylists {
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 600px;
    padding: 0% 5% 17% 5%;
    border-radius: 3%;
}

p {
    text-align: center;
}

.uploadBtn {
    position: absolute;
    padding: 2% 2%;
    margin: 0 0 0 0;
    width: 25%;
    bottom: 5%;
    left: 40%;
}

.corner-btn {
    position: absolute;
    left: 94%;
    top: 1%;
}

</style>
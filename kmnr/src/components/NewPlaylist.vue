<template>
    <div class="playlist">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closePlaylist" type="submit">X</defaultButton>
            </div>
        </div>
        <div class="row">
            <h1>Create New Playlist</h1>
        </div>
        <form class="col offset-s3 s6">
                <div class="row">
                    <div class="input-field">
                        <label required for="name">Name</label>
                        <input type="text" id="name" />
                    </div>
                    <div class="input-field">
                        <label required for="show">Show</label>
                        <input type="text" id="show" />
                    </div>
                </div>
                <div class="row">
                    <div class="input-field">
                        <label for="comment">Comment</label>
                        <input required class="col lg6" type="text" id="label" />
                    </div>
                </div>
                <div class="row"/>
                <button class="btn" type="submit">Create new Playlist</button>
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
        constructor() {
            super()
        }

        @Emit('closePlaylist') 
            closePlaylist() {
                this.close = true;
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
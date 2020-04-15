<template>
    <div class="full-page">
        <div class="container log-container">
            <button class="btn uploadButton" @click="allowUpload()">Upload A Playlist
                <uploadBox v-if="uploadBox"></uploadBox>
            </button>
            <button class="btn editButton">Switch Playlist</button>
            <h1>Playlists</h1>
            <!--div class="row">
                <div class="col s4">
                    <h2>Saved Playlists</h2>
                </div>
                <div class="col s5"></div>
                <div class="col s3">
                    <h2> {{ playlist_name }}</h2>
                </div>
            </div-->
            <div class="row">
                <div class="col s2">
                    <!--h2>Your Saved Playlists</h2--->
                    <!--table class="defaultTable savedPlaylists" v-if="savedPlaylists.length > 0">
                    <thead>
                        <tr>
                            <th>Playlist Name</th>
                            <th>Songs</th>
                            <th>Runtime </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entry in savedPlaylists" :key="entry.num">
                                <td>
                                    <p>{{entry.name}}</p>
                                </td>
                                <td>
                                    <p>{{entry.totalSongs}}</p>
                                </td>
                                <td>
                                    <p>12min</p>
                                </td>
                                <td>
                                    <button>Edit Playlist</button>
                                </td>
                            </tr>
                        </tbody>
                    </table-->
                </div>
                <div class="col s1"></div>
                <div class="col s6">
                    <div class="form">
                        <form>
                            <div class="row">
                                <div class="col s12">
                                    <label for="song">Song</label>
                                    <input v-model="song" required type="text" id="song" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <label for="artist">Artist</label>
                                    <input v-model="artist" required type="text" id="artist" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <label for="album">Album</label>
                                    <input v-model="album" required type="text" id="album" />
                                </div>
                            </div>
                            <button class="btn longbtn" style="margin-bottom: 10px;" type="button" v-on:click="addSong">Add to log!</button>
                            <br/>

                            <button class="btn mybtn" type="submit" style="margin-right: 10px;">Post playlist!</button>
                            <button class="btn mybtn" type="button" v-on:click="savePlaylist">Save playlist!</button>
                        </form>
                    </div>
                </div>

                <div class="col s1"></div>
                <div class="col s2">
                    <table class="defaultTable newPlaylist" v-if="entries.length > 0" v-bind="entries">
                        <thead>
                        <tr>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th class="delete"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, index) in entries" :key="entry.id">
                                <td>
                                    <p>{{ entry.song }}</p>
                                </td>
                                <td>
                                    <p>{{entry.artist}}</p>
                                </td>
                                <td>
                                    <p>{{entry.album}}</p>
                                </td>
                                <td>
                                    <button class="borderless-btn" v-on:click="removeSong(index)">
                                        <i class="material-icons">clear</i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./LogPage.ts" />
    

<style lang="scss" scoped>
h1 {
    margin-top: 0px;
    font-size: 70px;
    font-weight: 100;
    padding-top: 0%;
    margin-bottom: 0px;
    text-align: center;
    padding-bottom: 0% !important;
    color: rgb(70, 68, 68);
    font-family: 'Covered By Your Grace';
}

h2 {
    font-size: 30px;
    font-family: 'Montserrat';
    padding: 0% 0%;
    margin: 0 0 0 0;
}

.full-page {
    background-image: url('../../assets/new7.jpg');
    background-size: 100% auto;
    background-repeat: repeat;
    padding-top: 7%;
    width: 100%;
    height: 100%;
}

.newPlaylist {
    position: absolute;
    right: 2%;
    display: block;
    height: 550px;
    width: 475px;
    overflow: auto;
}

.savedPlaylists {
    display: block;
    height: 500px;
    width: 450px;
    overflow: auto;
    margin-left: -150px;
    grid-auto-columns: 0%;
}

.uploadButton {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    position: fixed;
    top: 10%;
    left: 1%;
    width: 200px;
}

.editButton {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    position: fixed;
    top: 16%;
    left: 1%;
    width: 200px;
}

td.last {
    width: 1px;
    white-space: nowrap;
}

.form {
    padding: 5% 5%;
    background-color: rgba(114, 107, 107, 0.2);
    //background-color: rgba(100,100,100,.2);
    border-radius: 3%;
    margin-top: 50px;
}

input {
    color: rgb(70,68,68);
    border-bottom: 1px rgb(70, 68, 68) !important;
    box-shadow: 0 1px 0 0 rgb(70, 68, 68) !important;
}

label {
    color: rgb(70,68,68);
}

.log-container { 
    width: 100% !important;
    //padding-left: 2% !important;
    //padding-right: 2% !important;
}

.delete {
    width: 5%;
}

.mybtn {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    width: 270px;
}
.browsebtn {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    width: 195px;
    margin-top: -50px;
}

.longbtn {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    width: 550px;
    
}
</style>

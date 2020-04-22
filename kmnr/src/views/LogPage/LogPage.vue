<template>
    <div class="full-page">
        <div class="container log-container">
            <div v-if="playlistSelected">
            <defaultButton class="colored uploadButton" @click.native="allowUpload()">Upload A Playlist</defaultButton>
            <uploadBox v-if="uploadBox" @closeUpload="closeUpload"></uploadBox>
            <defaultButton class="colored editButton">Switch Playlist</defaultButton>
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
                            <defaultButton class="colored longbtn" style="margin-bottom: 10px;" type="button" @click.native="addSong()">Add to log!</defaultButton>
                            <br/>

                            <defaultButton class="colored mybtn" type="submit" style="margin-right: 15px;">Post playlist!</defaultButton>
                            <defaultButton class="colored mybtn" type="button" @click.native="savePlaylist()">Save playlist!</defaultButton>
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
                                    <defaultButton  @click.native="removeSong(index)">
                                        <i class="material-icons">clear</i>
                                    </defaultButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <div v-else>
                <h1>Playlists</h1>
                <div class="row topbutton">
                    <div class="col s2 offset-s4">
                        <defaultButton class="colored largebtn" @click.native="allowPlaylist()">Create Playlist</defaultButton>
                    </div>
                </div>
                <div class="row">
                    <div class="col s2 offset-s4">
                        <defaultButton class="colored largebtn" @click.native="allowUpload()">Upload Playlist</defaultButton>
                    </div>
                </div>
                <div class="row">
                    <div class="col s2 offset-s4">
                        <defaultButton class="colored largebtn">Edit Playlist</defaultButton>
                    </div>
                </div>
                <playlist v-if="playlistBox" @closePlaylist="closePlaylist"></playlist>
                <uploadBox v-if="uploadBox" @closeUpload="closeUpload"></uploadBox>
                <table v-if="showPlaylists">
                     <tbody>
                        <tr v-for="playlist in myPlaylists" v-bind:key="playlist.id">
                        <td class="Playlist">
                            <p>{{ playlist }}</p>
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

.topbutton {
    padding-top: 10%;
}
h2 {
    font-size: 30px;
    font-family: 'Montserrat';
    padding: 0% 0%;
    margin: 0 0 0 0;
}

.largebtn {
    margin-left: 30%;
    padding: 10% !important;
    font-size: 24px !important;
    border-radius: 5% !important;
    width: 15vw;
}

.full-page {
    background-image: url('../../assets/back2.jpg');
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
    width: 27vw;
    overflow: auto;
    background-color: rgba(114, 107, 107, 0.2); 
    border-radius: 2%;
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
    position: fixed;
    top: 10%;
    left: 1%;
    width: 13%;
    font-size: .8vw;
}

.editButton {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    position: fixed;
    font-size: .8vw;
    top: 16%;
    left: 1%;
    width: 13%;
}

td.last {
    width: 1px;
    white-space: nowrap;
}

.form {
    padding: 5% 5%;
    background-color: rgba(114, 107, 107, 0.2);
    border-radius: 3%;
    margin-top: 50px;
    width: 35vw;
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
}

.delete {
    width: 5%;
}

.mybtn {
    background-color: rgba(100, 100, 100, .2);
    color: rgb(70, 68, 68);
    width: 15vw;
    font-size: .8vw;
    padding: 1.5% !important;
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
    width: 31vw;
    padding: 1.5% !important;
}
</style>

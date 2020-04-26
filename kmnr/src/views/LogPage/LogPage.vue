<template>
    <div class="full-page">
        <div class="container log-container">
            <div v-if="playlistSelected">
                <defaultButton class="colored uploadButton" @click.native="allowUpload()">Upload A Playlist</defaultButton>
                <uploadBox v-if="uploadBox" @closeUpload="closeUpload"></uploadBox>
                <defaultButton class="colored editButton" @click.native="switchPlaylist()">Switch Playlist</defaultButton>
                <switchPlaylist v-if="switchBox" @closeSwitch="closeSwitch" @newPlaylist="newPlaylist"></switchPlaylist>
                <edit v-if="editBox" @closeEdit="closeEdit"></edit>
                <h1>{{currentShow}}</h1>
                <div class="row">
                    <div class="col s6 offset-s3">
                        <div class="form">
                            <form @submit.prevent="addSong">
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
                                <defaultButton class="colored mybtn" type="submit" @click.native="savePlaylist()">Save playlist!</defaultButton>
                            </form>
                        </div>
                    </div>
                    <div class="col s1"></div>
                    <div class="col s2">
                        <table class="defaultTable newPlaylist" v-if="entries.length > 0" v-bind="entries">
                            <thead>
                                <tr>
                                    <th scope="col" class="header">Song</th>
                                    <th scope="col" class="header">Artist</th>
                                    <th scope="col" class="header">Album</th>
                                    <th scope="col" class="delete" style="min-width: 35px;"></th>
                                </tr>
                            </thead>
                            <!--tbody-->
                                <draggable v-model="entries" group="people" @start="drag=true" @end="drag=false">
                                    <tr v-for="(entry, index) in entries" :key="entry.id">
                                        <td >
                                            <p>{{ entry.reference }}</p>
                                        </td>
                                        <td class="tablecols">
                                            <p>{{entry.artist}}</p>
                                        </td>
                                        <td class="tablecols">
                                            <p>{{entry.album}}</p>
                                        </td>
                                        <td style="min-width: 20px;">
                                            <defaultButton  @click.native="removeSong(index)">
                                                <i class="material-icons">clear</i>
                                            </defaultButton>
                                        </td>
                                    </tr>
                                </draggable>
                            <!--/tbody-->
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
                        <defaultButton class="colored largebtn" @click.native="switchPlaylist()">Edit Playlist</defaultButton>
                    </div>
                </div>
                <playlist v-if="playlistBox" @closePlaylist="closePlaylist" @newPlaylistCreated="newPlaylistCreated"></playlist>
                <uploadBox v-if="uploadBox" @closeUpload="closeUpload"></uploadBox>
                <!--edit v-if="editBox" @closeEdit="closeEdit"></edit-->
                <switchPlaylist v-if="switchBox" @closeSwitch="closeSwitch" @newPlaylist="newPlaylist"></switchPlaylist>
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
</template>

<script lang="ts" src="./LogPage.ts" />
    
<style lang="scss" scoped src="./LogPage.scss"></style>

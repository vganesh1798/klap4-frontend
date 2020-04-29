<template>
    <div class="full-page">
        <div class="container log-container">
            <!--h1>{{this.$store.state.currentUser}}</h1>
            <h1>{{this.$store.state.currentPlaylist}}</h1-->
            <div v-if="this.$store.state.currentUser === 'Anonymous'">
                    <h1>Playlists</h1>
                    <h2 style="text-align: center;">Please Log In</h2>
            </div>
            <div v-else>
            <!--div v-if="playlistSelected"-->
            <div v-if="this.$store.state.currentPlaylist !== ''">
                <!--defaultButton class="colored uploadButton" @click.native="allowUpload()">Upload A Playlist</defaultButton>
                <uploadBox v-if="uploadBox" @closeUpload="closeUpload"></uploadBox-->
                <defaultButton class="colored newButton" @click.native="allowPlaylist()">Create Playlist</defaultButton>
                <playlist v-if="playlistBox" @closePlaylist="closePlaylist" @newPlaylistCreated="newPlaylistCreated"></playlist>
                <defaultButton class="colored editButton" @click.native="switchPlaylist()">Switch Playlist</defaultButton>
                <switchPlaylist v-if="switchBox" @closeSwitch="closeSwitch" @newPlaylist="newPlaylist"></switchPlaylist>
                <!--edit v-if="editBox" @closeEdit="closeEdit"></edit-->
                <h1>
                    {{this.$store.state.currentPlaylist}} 
                    <defaultButton @click.native="editPlaylist()">
                        <i class="material-icons">edit</i>
                    </defaultButton>
                </h1>
                <editPlaylist :current_playlist="this.$store.state.currentPlaylist" :current_show="currentShow" v-if="editBox" @closeEdit="closeEdit" @editPlaylist="editPlaylist"></editPlaylist>
                <div class="row tables-row">
                    <div class="col s5">
                        <table class="defaultTable newPlaylist" v-if="entries.length > 0" v-bind="entries">
                            <thead>
                                <tr>
                                    <th scope="col" style="min-width: 35px;"></th>
                                    <th scope="col" class="header">Song</th>
                                    <th scope="col" style="min-width: 30px;"></th>
                                    <th scope="col" class="header">Artist</th>
                                    <th scope="col" style="min-width: 30px;"></th>
                                    <th scope="col" class="header">Album</th>
                                    <th scope="col" style="min-width: 35px"></th>
                                    <th scope="col" class="delete" style="min-width: 20px;"></th>
                                </tr>
                            </thead>
                            <!--tbody-->
                                <draggable v-model="entries" group="people" @start="drag=true" @end="drag=false" @change="movePlaylistEntry($event)">
                                    <tr v-for="(entry, index) in entries" :key="entry.id">
                                        <!--td id="tablecols" v-html="song" @blur="updateSong" contenteditable="true" @click="storeOriginal(entry)" @focusout="editstuff(entry)" @keyup.enter="editstuff(entry.index)"--->
                                        <!--td id="tablecols" @blur="updateSong" contenteditable="true" @click="storeOriginal(entry)"-->
                                        <td style="min-width: 45px;">
                                            <defaultButton>
                                                <i class="material-icons">drag_indicator</i>
                                            </defaultButton>
                                        </td>
                                        <td id="tablecols">
                                            <p v-html="entry.entry.song" @blur="updateSong($event, entry)" contenteditable="true">
                                                {{ entry.entry.song }}
                                            </p>
                                        </td>
                                         <td id="routingcols">
                                            <router-link v-if="entry.reference_type==1" style="padding-left: 30%;" :to="{name:'ArtistDetail', params:{albumParam:entry.reference.substring(0,3)} }">
                                                <i class="material-icons" style="display:inline-block; font-size: 18px;">launch</i>
                                            </router-link>
                                        </td>
                                        <td id="tablecols">
                                            <p v-html="entry.entry.artist" @blur="updateArtist($event, entry)" :="allowEdits" contenteditable="allowEdits" style="display: inline-block;">
                                                {{entry.entry.artist }}
                                            </p>
                                        </td>
                                       <td id="routingcols">
                                            <router-link v-if="entry.reference_type==1" style="padding-left: 30%;" :to="{name:'AlbumDetail', params:{albumParam:entry.reference} }">
                                                <i class="material-icons" style="display:inline-block; font-size: 18px;">launch</i>
                                            </router-link>
                                        </td>
                                        <td id="tablecols">
                                            <p v-html="entry.entry.album" @blur="updateAlbum($event, entry)" contenteditable="true" style="display: inline-block;">
                                                {{entry.entry.album}}
                                            </p>
                                        </td>
                                        
                                        <td style="min-width: 45px;">
                                            <defaultButton  @click.native="removeSong(entry)">
                                                <i class="material-icons">clear</i>
                                            </defaultButton>
                                        </td>
                                    </tr>
                                </draggable>
                            <!--/tbody-->
                        </table>
                    </div>
                        <div class="col s1 inner-col"></div>
                        <div class="col s6">
                        <div class="form">
                            <form @submit.prevent="addSong">
                                <div class="row">
                                    <h2 class="form-header">Add Songs to Playlist</h2>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <label for="song">Song</label>
                                        <input required v-model="song" type="text" id="song" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <label for="artist">Artist</label>
                                        <input required v-model="artist" type="text" id="artist" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <label for="album">Album</label>
                                        <input required v-model="album" type="text" id="album" />
                                    </div>
                                </div>
                                <defaultButton class="colored longbtn" style="margin-bottom: 10px;" type="submit">Add to log!</defaultButton>
                                <br/>

                                <div class="row">
                                    <div class="col s6">
                                <defaultButton class="colored mybtn" type="submit">Post playlist!</defaultButton>
                                    </div>
                                    <div class="col s6">
                                <defaultButton class="colored mybtn" type="submit">Save playlist!</defaultButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <!--div v-if="this.djname=='Anonymous'"-->
                <!--div v-if="this.$store.state.currentUser === 'Anonymous'">
                    <h1>Playlists</h1>
                    <h2 style="text-align: center;">Please Log In</h2>
                </div>
                <div v-else-->
                <h1>Playlists</h1>
                <div class="row topbutton">
                    <div class="col s2 offset-s4">
                        <defaultButton class="colored largebtn" @click.native="allowPlaylist()">Create Playlist</defaultButton>
                    </div>
                </div>
                <div class="row">
                    <div class="col s2 offset-s4">
                        <defaultButton class="colored largebtn" @click.native="switchPlaylist()">Edit Playlist</defaultButton>
                    </div>
                </div>
                <playlist v-if="playlistBox" @closePlaylist="closePlaylist" @newPlaylistCreated="newPlaylistCreated"></playlist>
                <!--uploadBox v-if="uploadBox" @closeUpload="closeUpload"></uploadBox--->
                <switchPlaylist v-if="switchBox" @closeSwitch="closeSwitch" @newPlaylist="newPlaylist"></switchPlaylist>
                <editPlaylist v-if="editBox" @closeEdit="closeEdit" @newPlaylistSelected="newPlaylistSelected"></editPlaylist>
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
    
<style lang="scss" scoped src="./LogPage.scss"></style>

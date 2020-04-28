import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from "axios";
import uploadBox from "../../components/Upload.vue";
import defaultButton from "../../components/Button.vue"
import playlist from "../../components/NewPlaylist.vue";
import defaultTable from "../../components/Table.vue";
import edit from "../../components/CurrentPlaylists.vue";
import editPlaylist from "../../components/EditPlaylist.vue";
import switchPlaylist from "../../components/PlaylistSwitch.vue";
import draggable from "vuedraggable";
import Playlist from '@/Models/Playlist';

    @Component ({
        components: { uploadBox,
                      defaultButton,
                      playlist,
                      defaultTable,
                      edit,
                      switchPlaylist,
                      editPlaylist,
                      draggable }
    })

export default class LogPage extends Vue {
    playlistSelected: Boolean = false;
    currentPlaylist: string = "EXAMPLE_SHOW";
    currentShow: string = "";
    name="";
    song: string = "";
    artist: string = "";
    album: string = "";
    entries: Object[] = [];
    //num: number = 0;
    uploadBox: Boolean = false;
    playlistBox: Boolean = false;
    editBox: Boolean = false;
    switchBox: Boolean = false;
    showPlaylists: Boolean = false;
    djname = "";
    allowEdits: Boolean = false;

    getSongs() {
        console.log("in getSongs function, ", this.$store.state.currentUser, this.$store.state.currentPlaylist)
        const PlaylistParam = {
                dj_id: this.$store.state.currentUser,
                //dj_id: "test",
                //playlistName: this.currentPlaylist
                playlistName: this.$store.state.currentPlaylist
            }
        this.$store.dispatch('getPlaylist', PlaylistParam).then(res => {
            this.entries = res.playlist_entries || [];
            console.log("the state variable" ,this.$store.state.logs)
            //this.num = this.entries.length;
            console.log(this.entries);
        });
    }

    addSong() {
     console.log(this.$store.state.currentPlaylist)
     const PlaylistParam = {
       //dj_id: "test",
       dj_id: this.$store.state.currentUser,
       playlistName: this.$store.state.currentPlaylist,
       //playlistName: this.currentPlaylist,
       //index: ++this.num,
       entry: {song: this.song, artist: this.artist, album: this.album}
     }
     this.$store.dispatch('addPlaylistEntry', PlaylistParam).then(res => {
        this.entries = res.playlist_entries;
        console.log(res);
        this.getSongs();
     });
    }

    mounted() { 
        this.getSongs();
    }

    removeSong(row) {
        const PlaylistParam = {
            //dj_id: "test",
            dj_id: this.$store.state.currentUser,
            playlistName: this.$store.state.currentPlaylist,
            //playlistName: this.currentPlaylist,
            index: row.index,
            entry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album}
          }
          this.$store.dispatch('deletePlaylistEntry', PlaylistParam).finally(() => {
             this.getSongs();
          });
          //this.num--;
    }

    updateEntry(row) {
        console.log("updating entry", row.index)
        const PlaylistParam = {
            dj_id: "test",
            //playlistName: this.currentPlaylist,
            playlistName: this.$store.state.currentPlaylist,
            index: row.index,
            entry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album},
            newEntry: {song: 'newsong', artist: 'newartist', album:'newalbum'}
        }
        this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
            console.log(res);
            this.getSongs();
         });
    }

    movePlaylistEntry(val){
        //console.log("moved row", val.moved.newIndex, val.moved.oldIndex)
        //console.log("updating entry")
        const PlaylistParam = {
            dj_id: "test",
            //playlistName: this.currentPlaylist,
            playlistName: this.$store.state.currentPlaylist,
            index: val.moved.oldIndex+1,
            newIndex: val.moved.newIndex+1
            //entry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album},
            //newEntry: {song: 'newsong', artist: 'newartist', album:'newalbum'}
        }
        console.log(PlaylistParam.index, PlaylistParam.newIndex);
        this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
            console.log(res);
            this.getSongs();
         });
    }

    allowUpload() {
      this.uploadBox = true;
    }

    @Watch('closeUpload')
    closeUpload() {
        this.uploadBox = false;
        return this.uploadBox;
    }

    allowPlaylist() {
        this.playlistBox = true;
    }

    @Watch('closePlaylist')
    closePlaylist() {
        this.playlistBox = false;
        return this.playlistBox;
    }

    editPlaylist() {
        this.editBox = true; 
    }

    @Watch('closeEdit')
    closeEdit() {
        this.editBox = false;
        this.getSongs();
        return this.editBox;
    }

    @Watch('newPlaylistSelected')
    newPlaylistSelected() {
        console.log("caught newplaylistselected")
        this.editBox = false;
        return this.editBox;
        this.getSongs();
    }

    switchPlaylist() {
        this.switchBox = true;
    }

    @Watch('closeSwitch')
    closeSwitch() {
        this.switchBox = false;
        return this.switchBox;
    }

    @Watch('newPlaylistCreated')
        newPlaylistCreated(id) {
            this.djname = id[0]
            this.currentPlaylist = id[1];
            this.currentShow = id[2];
            this.playlistSelected = true;
            this.playlistBox = false;
            console.log("dj= ", this.djname, "currentPlaylist= ", this.currentPlaylist, "currentShow= ", this.currentShow)
            this.getSongs();
            return this.playlistSelected;
        }

    @Watch('newPlaylist')
        newPlaylist(id, playlist, show) {
            console.log("newPlaylist caught")
            this.playlistSelected = true;
            this.djname = id[0];
            this.currentPlaylist = id[1];
            this.currentShow = id[2];
            console.log(this.djname, this.currentPlaylist, this.currentShow)
            this.getCurrentPlaylist(this.currentPlaylist);
            this.getCurrentUser();
            //this.getCurrentPlaylist(this.currentPlaylist);
            this.getSongs();
        }
    
    getCurrentUser() {
        this.$store.dispatch('getCurrUser').then(() => {
                console.log("after", this.$store.state.currentUser)
                this.djname = this.$store.state.currentUser
            });
    }
    
    getCurrentPlaylist(pl) {
        const param = {
            playlist_name: pl
        }
        console.log("playlist name im sending", param.playlist_name)
        this.$store.dispatch('setCurrPlaylist', param).then(() => {
            console.log("after", this.$store.state.currentPlaylist)
        });
    }

    updateSong(e, entry) {
        console.log("update songs");
        console.log(e.target.innerHTML);
        console.log(entry)

        const PlaylistParam = {
            dj_id: "test",
            //playlistName: this.currentPlaylist,
            playlistName: this.$store.state.currentPlaylist,
            index: entry.index,
            entry: {song: entry.entry.song, artist: entry.entry.artist, album: entry.entry.album},
            newEntry: {song: e.target.innerHTML, artist: entry.entry.artist, album: entry.entry.album}
          }
     
           this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
              //this.entries = res.playlist_entries;
              console.log(res);
              this.getSongs();
           });
        // console.log(entry.index);
    }

    updateArtist(e, entry) {
        console.log("update songs");
        console.log(e.target.innerHTML);
        console.log(entry)

        const PlaylistParam = {
            dj_id: "test",
            //playlistName: this.currentPlaylist,
            playlistName: this.$store.state.currentPlaylist,
            index: entry.index,
            entry: {song: entry.entry.song, artist: entry.entry.artist, album: entry.entry.album},
            newEntry: {song: entry.entry.song, artist: e.target.innerHTML, album: entry.entry.album}
          }
     
           this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
              //this.entries = res.playlist_entries;
              console.log(res);
              this.getSongs();
           });
        // console.log(entry.index);
    }

    updateAlbum(e, entry) {
        console.log("update songs");
        console.log(e.target.innerHTML);
        console.log(entry)

        const PlaylistParam = {
            dj_id: "test",
            //playlistName: this.currentPlaylist,
            playlistName: this.$store.state.currentPlaylist,
            index: entry.index,
            entry: {song: entry.entry.song, artist: entry.entry.artist, album: entry.entry.album},
            newEntry: {song: entry.entry.song, artist: entry.entry.artist, album: e.target.innerHTML}
          }
     
           this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
              //this.entries = res.playlist_entries;
              console.log(res);
              this.getSongs();
           });
        // console.log(entry.index);
    }
}
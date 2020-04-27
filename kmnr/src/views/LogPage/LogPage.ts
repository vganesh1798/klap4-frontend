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
    name="";
    song: string = "";
    artist: string = "";
    album: string = "";
    prevsong: string = "";
    prevartist: string = "";
    prevalbum: string = "";
    entries: Object[] = [];
    num: number = 0;
    uploadBox: Boolean = false;
    playlistBox: Boolean = false;
    editBox: Boolean = false;
    switchBox: Boolean = false;
    showPlaylists: Boolean = false;
    djname = "";

    addSong() {
     console.log(this.song, this.artist, this.album)
     const PlaylistParam = {
       dj_id: "test",
       playlistName: this.currentPlaylist,
       show: this.name,
       index: this.num++,
       //ref: this.song + this.artist + this.album
       entry: {song: this.song, artist: this.artist, album: this.album}
       //entry: {song: 'song1', artist: 'artist1', album: 'album1'}
     }

     this.$store.dispatch('addPlaylistEntry', PlaylistParam).then(res => {
        this.entries = res.playlist_entries;
        console.log(res);
        this.getSongs();
     });
    }

    removeSong(row) {
        const PlaylistParam = {
            dj_id: "test",
            playlistName: this.currentPlaylist,
            index: row.index,
            //ref: "songartistalbum"
            entry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album}
            //entry: {song: 'song1', artist: 'artist1', album: 'album1'}
          }
     
          this.$store.dispatch('deletePlaylistEntry', PlaylistParam).then(res => {
             //this.entries = res.playlist_entries;
             console.log(res);
             this.getSongs();
          });
        //   this.getSongs();
    }

    updateSong(e) {
        console.log("update");
        console.log(e.target.innerHTML);

        const PlaylistParam = {
            dj_id: "test",
            playlistName: this.currentPlaylist,
            show: this.name,
            ///index: this.num,
            ref: 1,
            index: 0,
            newIndex: 0,
            //ref: this.song + this.artist + this.album
            //entry: {song: 'song1', artist: 'artist1', album: 'album1'},
            entry: {song: this.prevsong, artist: this.prevartist, album: this.prevalbum},
            newEntry: {song: e.target.innerHTML, artist: this.prevartist, album: this.prevalbum}
            //newEntry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album}
          }
     
          this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
             //this.entries = res.playlist_entries;
             console.log(res);
             this.getSongs();
          });
        //console.log(entry.index);
    }

    updateArtist(e) {
        console.log("update");
        console.log(e.target.innerHTML);

        const PlaylistParam = {
            dj_id: "test",
            playlistName: this.currentPlaylist,
            show: this.name,
            ///index: this.num,
            ref: 1,
            index: 0,
            newIndex: 0,
            //ref: this.song + this.artist + this.album
            //entry: {song: 'song1', artist: 'artist1', album: 'album1'},
            entry: {song: this.prevsong, artist: this.prevartist, album: this.prevalbum},
            newEntry: {song: this.prevsong, artist: e.target.innerHTML, album: this.prevalbum}
            //newEntry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album}
          }
     
          this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
             //this.entries = res.playlist_entries;
             console.log(res);
             this.getSongs();
          });
        //console.log(entry.index);
    }

    updateAlbum(e) {
        console.log("update");
        console.log(e.target.innerHTML);

        const PlaylistParam = {
            dj_id: "test",
            playlistName: this.currentPlaylists,
            show: this.name,
            ///index: this.num,
            ref: 1,
            index: 0,
            newIndex: 0,
            //ref: this.song + this.artist + this.album
            //entry: {song: 'song1', artist: 'artist1', album: 'album1'},
            entry: {song: this.prevsong, artist: this.prevartist, album: this.prevalbum},
            newEntry: {song: this.prevsong, artist: this.prevartist, album: e.target.innerHTML}
            //newEntry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album}
          }
     
          this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
             //this.entries = res.playlist_entries;
             console.log(res);
             this.getSongs();
          });
        //console.log(entry.index);
    }

    editstuff(row) {
        console.log("fired");
        console.log("editing to", row.entry.song);
        console.log(this.entries[2])
        //console.log(this.artist, this.album);
        const PlaylistParam = {
            dj_id: "test",
            playlistName: this.currentPlaylist,
            show: this.name,
            ///index: this.num,
            ref: 1,
            index: row.index,
            newIndex: row.index,
            //ref: this.song + this.artist + this.album
            //entry: {song: 'song1', artist: 'artist1', album: 'album1'},
            entry: {song: this.prevsong, artist: this.prevartist, album: this.prevalbum},
            newEntry: {song: 'newsong', artist: 'newartist', album: 'newalbum'}
            //newEntry: {song: row.entry.song, artist: row.entry.artist, album: row.entry.album}
          }
     
          this.$store.dispatch('updatePlaylistEntry', PlaylistParam).then(res => {
             //this.entries = res.playlist_entries;
             console.log(res);
             this.getSongs();
          });
    }

    storeOriginal(row) {
        //this.startingVal = song: 'this.entries[index].elements.song'
        this.prevsong = row.entry.song;
        this.prevartist = row.entry.artist;
        this.prevalbum = row.entry.album;
        console.log(row.entry.song)
        console.log(row.entry.artist)
        console.log(row.entry.album)
        //console.log("please work")
    }
    // savePlaylist() {
    //   let entry = {
    //     name: "test playlist",
    //     totalSongs: 2
    // };

    // this.savedPlaylists.push(entry);
    // }

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
        return this.editBox;
    }

    switchPlaylist() {
        this.switchBox = true;
    }

    @Watch('closeSwitch')
    closeSwitch() {
        this.switchBox = false;
        return this.switchBox;
    }
    onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    }

    @Watch('newPlaylistCreated')
        newPlaylistCreated(id) {
            console.log(id[0], id[1], id[2]);
            this.currentPlaylist = id[1];
            this.name = id[2];
            this.playlistSelected = true;
            this.getSongs();
            return this.playlistSelected;
        }
    
    getSongs() {
        const PlaylistParam = {
                dj_id: "test",
                playlistName: this.currentPlaylist
            }
        this.$store.dispatch('getPlaylist', PlaylistParam).then(res => {
            this.entries = res.playlist_entries || [];
            console.log("the state variable" ,this.$store.state.logs)
            this.num = this.entries.length;
            //console.log(res);
            console.log(this.entries);
            //console.log(this.entries.length);
        });
    }

    @Watch('newPlaylist')
        newPlaylist(name) {
            console.log("newPlaylist caught")
            this.playlistSelected = true;
            this.currentPlaylist = name;
            this.getSongs();
        }

        //this isn't the right event, but idk which one it is
        created() {
            this.getCurrentUser();
          }
    
        getCurrentUser() {
           this.$store.dispatch('getCurrUser').then(() => {
                    console.log("after", this.$store.state.currentUser)
                    this.djname = this.$store.state.currentUser
                });
        }
}
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from "axios";
import uploadBox from "../../components/Upload.vue";
import defaultButton from "../../components/Button.vue"
import playlist from "../../components/NewPlaylist.vue";
import defaultTable from "../../components/Table.vue";
import edit from "../../components/CurrentPlaylists.vue";
import switchPlaylist from "../../components/PlaylistSwitch.vue";
import draggable from "vuedraggable";

    @Component ({
        components: { uploadBox,
                      defaultButton,
                      playlist,
                      defaultTable,
                      edit,
                      switchPlaylist,
                      draggable }
    })

export default class LogPage extends Vue {
    playlistSelected: Boolean = true;
    currentShow: string = "EXAMPLE_SHOW";
    song: string = "";
    artist: string = "";
    album: string = "";
    entries: Object[] = [];
    num: number = 0;
    savedPlaylists: Object[] = [];
    playlist_name: string = " ";
    uploadBox: Boolean = false;
    playlistBox: Boolean = false;
    editBox: Boolean = false;
    switchBox: Boolean = false;
    showPlaylists: Boolean = false;

    addSong() {
      this.playlist_name = "default";
        let entry = {
            num: this.num++,
            song: this.song,
            artist: this.artist,
            album: this.album

        };

        this.entries.push(entry);
    }

    removeSong(val: number) {
        this.currentShow = val.toString();
        this.$delete(this.entries, val)
        num: this.num--;
    }

    savePlaylist() {
      let entry = {
        name: "test playlist",
        totalSongs: 2
    };

    this.savedPlaylists.push(entry);
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

    choosePlaylist() {
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
}
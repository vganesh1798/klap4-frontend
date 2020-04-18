import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from "axios";
import uploadBox from "../../components/Upload.vue";
import defaultButton from "../../components/Button.vue"

    @Component ({
        components: { uploadBox,
                      defaultButton }
    })

export default class LogPage extends Vue {
    currentShow: string = "EXAMPLE_SHOW";
    song: string = "";
    artist: string = "";
    album: string = "";
    entries: Object[] = [];
    num: number = 0;
    savedPlaylists: Object[] = [];
    playlist_name: string = " ";
    uploadBox: Boolean = false;

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
        //this.entries.splice(val, 1);
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
}
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LogPage extends Vue {
    currentShow: string = "EXAMPLE_SHOW";
    song: string = "";
    artist: string = "";
    album: string = "";
    entries: Object[] = []
    num: number = 0;

    addSong() {
        let entry = {
            num: this.num++,
            song: this.song,
            artist: this.artist,
            album: this.album

        };

        this.entries.push(entry);
    }

    removeSong() {
        this.entries.pop();
    }
}
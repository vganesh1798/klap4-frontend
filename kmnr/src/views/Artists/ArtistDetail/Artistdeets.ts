import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class Albumdeets extends Vue {
    constructor() {
        super();
    }

    artist = {};
    albums = [];

    getArtistInfo() {
        this.$store.dispatch('displayArtist', this.$route.params.albumParam).then(res => {
            this.artist = this.$store.state.singleArtist;
            this.albums = this.$store.state.singleArtist["albums"];
        })
    }

    get curPath() {
        return this.$route.path
      }
  
    @Watch('curPath')
    newPath(newPath, oldPath) {
        this.$store.dispatch('displayArtist', this.$route.params.albumParam).then(res => {
            this.artist = this.$store.state.singleArtist;
            this.albums = this.$store.state.singleArtist["albums"];
        })
    }

    created() {
        this.getArtistInfo();
    }

}
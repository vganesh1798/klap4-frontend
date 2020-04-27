import { Component, Vue } from 'vue-property-decorator';

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

    created() {
        this.getArtistInfo();
    }

}
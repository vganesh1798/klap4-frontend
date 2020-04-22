import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";

import defaultButton from "../../components/Button.vue";
import albumCard from "../../components/Card.vue";

import {AlbumSearch} from "../../Models/Album";

  @Component({
    components: { defaultButton,
                  albumCard }
  })
  export default class Albums extends Vue {
    constructor() {
      super()
    }

    albums = []
    range = 0
    albumSearch = ""
    cancelSearchVisibility = "hidden"
    previousBtnVisibility = "visible"
    nextBtnVisibility = "visible"

    route = "AlbumDetail"
    artistid = "AL1B"

    get albumsPaginated() {
      return this.albums.slice(this.range, this.range + 5);
    }

    getAlbums() {
      this.$store.dispatch('getAllAlbums')
        .then(res => this.albums = this.$store.state.albums)
    }

    hidePreviousBtn() {
      this.previousBtnVisibility = "hidden";
    }

    showPreviousBtn() {
      this.previousBtnVisibility = "visible";
    }

    hideNextBtn() {
      this.nextBtnVisibility = "hidden";
    }

    showNextBtn() {
      this.nextBtnVisibility = "visible";
    }

    nextAlbums() {
      if (this.albums.length - this.range > 5) {
        this.range += 5;
      }
    }

    previousAlbums() {
      if (this.range > 0) {
        this.range -= 5;
      }
    }

    SearchByAlbumName() {
      const searchParam: AlbumSearch = {
        genre_abbr: '',
        artist: '',
        album: this.albumSearch.toLowerCase(),
        label: '',
        format: '',
        promoter: '',
        new_tag: false
      }
      this.$store.dispatch('getQueriedAlbums', searchParam)
        .then(res => {
          this.albums = this.$store.state.albums
        })

      this.cancelSearchVisibility = "visible";
    }

    CancelSearch() {
      this.getAlbums();
      this.albumSearch = "";
      this.cancelSearchVisibility = "hidden";
    }

    created() {
      this.getAlbums();
    }
  };
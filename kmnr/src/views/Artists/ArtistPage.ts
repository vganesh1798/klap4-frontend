import { Component, Vue } from 'vue-property-decorator';

import axios from 'axios';
import defaultButton from "../../components/Button.vue";
import artistCard from "../../components/Card.vue";

  @Component({
    components: { defaultButton,
                  artistCard }
  })
  export default class Artist extends Vue {
    constructor() {
      super()
    }

    artists = []
    range = 0
    genreSearch = ""
    artistSearch = ""
    cancelSearchVisibility = "hidden"
    previousBtnVisibility = "visible"
    nextBtnVisibility = "visible"

    get artistsPaginated() {
      return this.artists.slice(this.range, this.range + 5);
    }

    getArtists() {
        this.$store.dispatch('getAllArtists').then(res => {
            this.artists = res;
        });
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

    nextArtists() {
      if (this.artists.length - this.range > 5) {
        this.range += 5;
      }
    }

    previousArtists() {
      if (this.range > 0) {
        this.range -= 5;
      }
    }

    SearchByArtistName() {
        let searchSlug = {
            'genre': this.genreSearch,
            'name': this.artistSearch
        };
        
        this.$store.dispatch('getQueryArtists', searchSlug ).then(res => {
            this.artists = res;
        });

      this.cancelSearchVisibility = "visible";
    }

    CancelSearch() {
      this.getArtists();
      this.genreSearch = "";
      this.artistSearch = "";
      this.cancelSearchVisibility = "hidden";
    }

    created() {
      this.getArtists();
    }
  }; 
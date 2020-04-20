import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";

import defaultButton from "../../components/Button.vue";
import albumCard from "../../components/Card.vue";

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

    get albumsPaginated() {
      return this.albums.slice(this.range, this.range + 5);
    }

    getAlbums() {
      axios
        .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
        .then(response => {
          this.albums = response.data.feed.entry;
        })
        .catch(error => {
          alert(error);
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
      this.albums = this.albums.filter((alb: any) => {
        return alb["im:name"].label.toLowerCase().includes(this.albumSearch.toLowerCase());
      });

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
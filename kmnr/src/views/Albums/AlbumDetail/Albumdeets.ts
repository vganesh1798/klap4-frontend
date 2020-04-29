import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator';

import defaultButton from "../../../components/Button.vue";
import review from "../../../components/Review.vue";
import issue from "../../../components/Issue.vue";

import M, { options } from 'materialize-css';

@Component({
  components: { defaultButton,
                review,
                issue }
})
export default class Albumdeeets extends Vue {
  album = {}
  tracks = []
  issueOpen = false;
  reviewOpen = false;
  fcc = 0;
  fccOpen = false;
  tooltipped = true;
  droppeddown = true;

  loaded = false;

  beforeCreate() {
    this.$store.dispatch('displayAlbum', this.$route.params.albumParam).then(res => {
      this.tracks = this.$store.state.singleAlbum.songs
      this.album = this.$store.state.singleAlbum
      console.log(this.album)
    })
    .finally(() => {
      this.loaded = true
    })
  }

  get curPath() {
    return this.$route.path
  }

  @Watch('curPath')
  newPath(newPath, oldPath) {
    this.loaded = false
          this.$store.dispatch('displayAlbum', this.$route.params.albumParam).then(res => {
      this.tracks = this.$store.state.singleAlbum.songs
      this.album = this.$store.state.singleAlbum
      console.log(this.album)
    })
    .finally(() => {
      this.loaded = true
    })
  }  
  
  updated() {
      if(this.tooltipped) {
          this.tooltipped = false;
          this.$nextTick(()=>{
              const elemsTooltip = document.querySelectorAll('.tooltipped');
              const tooltipInstance = M.Tooltip.init(elemsTooltip);
          });
      }
      if(this.droppeddown) {
          this.droppeddown = false;
          this.$nextTick(()=>{
              const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
              const dropdownInstance = M.dropdown.init(elemsDropdown, options);
          });
      }
  }

  getFCCStatus(fccNum: number) {
    if(fccNum === 1) {
        return "clean";
    }
    else if(fccNum === 2) {
        return "indecent";
    }
    else if(fccNum === 3) {
        return "obscene";
    }
    else if(fccNum === 4) {
        return "unrated"
    }
    else {
        return "???"
    }
} 

changeSingleFCC(songNumber) {
    const FCCParams = {
      'id': this.$route.params.albumParam,
      'songNumber': songNumber,
      'fcc': this.fcc
    };
    this.$store.dispatch('changeSingleFCC', FCCParams)
      .then(res => {
        console.log(res.data);
      })
  }

  changeAlbumFCC() {
    const FCCParams = {
      'id': this.$route.params.albumParam,
      'songNumber': null,
      'fcc': this.fcc
    };
    this.$store.dispatch('changeAlbumFCC', FCCParams)
      .then(res => {
        console.log(res.data);
      })
  }

  openReview() {
    this.$store.dispatch('displayAlbum', this.$route.params.albumParam).then(res => {
      this.tracks = this.$store.state.singleAlbum.songs
      this.album = this.$store.state.singleAlbum
      console.log(this.album)
    })
    .finally(() => {
      this.loaded = true
       this.reviewOpen = true;
    return this.reviewOpen;
    })
  }

  @Watch('closeReview')
    closeReview() {
      this.reviewOpen = false;
      return this.reviewOpen;
    }

  openIssue() {
    this.issueOpen = true;
    return this.issueOpen;
  }

  toggleFCC() {
      console.log(!this.fccOpen)
      this.fccOpen = !this.fccOpen
      return this.fccOpen
  }

  formatImage(formatCode) {
    let imgPath: string = '';
    let parsedFormat: string = '';
    switch(formatCode) {
        case 0b00001:
            imgPath = 'LP.png';
            parsedFormat = 'LP';
            break;
        case 0b00010:
            imgPath = 'CD.png';
            parsedFormat = 'CD';
            break;
        case 0b00100:
            imgPath = 'Digital.png';
            parsedFormat = 'Digital';
            break;
        case 0b10000:
            imgPath = '7.png';
            parsedFormat = '7\"';
            break;
        case 0b01001:
            imgPath = '12.png';
            parsedFormat = '12\" (Single)';
            break;
        case 0b01010:
            imgPath = 'CDS.png';
            parsedFormat = 'CD (Single)';
            break;
        case 0b01100:
            imgPath = 'Digital.png';
            parsedFormat = 'Digital (Single)';
            break;
        default:
            break;
    }
    return require('../../../assets/formats/'+imgPath)
}

  @Watch('closeIssue')
    closeIssue() {
      this.issueOpen = false;
      return this.issueOpen;
    }

  addToPlaylist(item, album) {
    console.log(item)
    const PlaylistParam = {
     dj_id: "test",
     playlistName: this.$store.state.currentPlaylist,
     //try to get it so that you don't need to pass an index to add a song
     //index: 1,
     entry: {song: item.song_name, artist: album.artist, album: album.name }
   }
   this.$store.dispatch('addPlaylistEntry', PlaylistParam).then(res => {
      //this.entries = res.playlist_entries;
      //console.log(res);
      //this.getSongs();
   });
  }
}
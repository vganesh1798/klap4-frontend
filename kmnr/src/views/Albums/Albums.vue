<template>
  <div id="Albums-page" class="albums_container">
      <span class="albums-heading-main">Explore Albums</span>
      <div class="container animated bounceIn ease-in-quad d-2 mt4">
        <div class="row justify-content-center" id="search_bar">
          <div class="col s6 offset-s3">
            <input v-model="albumSearch" type="text" class="form-control" placeholder="Search by album name">
          </div>
          <div class="col s1" id="submit">
            <button class="btn btn-light" @click="SearchByAlbumName()"><img
                src="https://img.icons8.com/color/24/000000/guitar-amp.png"></button>
          </div>
          <div class="col s5">
            <a :style="{visibility:cancelSearchVisibility}" class="cancelSearch" href="#"
              @click.prevent="CancelSearch()"> Cancel search </a>
          </div>
        </div>
          <!--div class="nav" aria-label="Page navigation example">
            <ul class="pagination">
              <li class="prev"><a class="page-link" @click="previousAlbums()"><img
                    src="https://img.icons8.com/plasticine/64/000000/back.png" /></a></li>
              <li class="next"><a class="page-link" @click="nextAlbums()"><img
                    src="https://img.icons8.com/plasticine/64/000000/forward.png" /></a></li>
            </ul>
          </div--->
            <button class="borderless-btn prev" @click="previousAlbums()">
              <i class="material-icons" style="font-size: 60px;">navigate_before</i>
            </button>
            <button class="borderless-btn next" @click="nextAlbums()">
              <i class="material-icons" style="font-size: 60px;">navigate_next</i>
            </button>

        <div class="row">
          <div class="col s1"></div>
          <div class="col s11">
            <div class="d-flex justify-content-start flex-wrap albums" id="albums_container">
              <display v-for="album in albumsPaginated" :key="album.id.attributes.id"
                :id-album="album.id.attributes['im:id']" :album="album">
              </display>

            </div>

          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator';
  import axios from "axios"

  import Display from './display.vue'

  @Component({
    components: {
      Display
    }
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
        return alb["im:name"].label.toLowerCase().includes(this.albumSearch);
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
</script>

<style lang="scss" scoped>
  .albums_container {
    background-image: url('../../assets/back6.jpg');
    background-size: 100% auto;
    background-repeat: repeat;
    padding-top: 7%;
    width: 100%;
    height: 100%;
    position: absolute;
    margin-left: 0;
    margin-right: 0;
  }

  .albums-heading-main {
    display: block;
    font-size: 100px;
    font-weight: 100;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Covered By Your Grace';
  }

  #search_bar {
    margin-bottom: 30px;
  }

  .cancelSearch {
    font-size: 14px;
    text-align: right;
  }

  #albums_container {
    padding-top: 10px;
  }

  .container_pagination {
    padding-top: 10px;
    text-align: center;
  }

  .container_pagination .nav ul li a {
    border: none;
    background: transparent;
  }

  .nav {
    position: relative !important;
  }

  .page-link {
    color: black;
  }

  #submit {
    padding-top: 1%;
  }

  .btn {
    float: right;
  }

  .form-control {
    margin: 0;
  }

  h1 {
    margin: 0;
  }

  .next {
    position: absolute;
    right: 18%;
    top: 42%;
  }

  .prev {
    position: absolute;
    left: 18%;
    top: 42%;
  }
</style>
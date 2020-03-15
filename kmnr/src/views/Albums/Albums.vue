<template>
  <div id="Albums-page">
      <img class="back" src="../../../public/back.jpg" />
      <h1 class = "albums-heading">
          <span class="albums-heading-main">Explore Albums</span>
    <div class="container">
            <div class="row justify-content-center" id="search_bar">
                <div class="col-6">
                    <input v-model="albumSearch" type="text" class="form-control" placeholder="Search by album name">             
                </div>
                <div class="col-1" id="submit">
                    <button class="btn btn-light"><img src="https://img.icons8.com/color/24/000000/guitar-amp.png"></button>          
                </div>
            </div>


            <div class="row justify-content-between">
                <div class="col-3 offset-2">
                  <h3 class="albums_header">Albums</h3>  
                </div>
                <div class="col-5">
                    <a :style="{visibility:cancelSearchVisibility}" class="cancelSearch" href="#" @click.prevent="CancelSearch()"> Cancel search </a>
                </div>
            </div>


        <div class="row justify-content-center">
            <div class="col-8"> 
                    <div class="d-flex justify-content-start flex-wrap albums" id="albums_container">
                    <display v-for="album in albumsPaginated" 
                            :key="album.id.attributes.id" 
                            :id-album="album.id.attributes['im:id']"
                            :album="album">
                    </display>    
                    
                    </div>

            </div>
        </div>
 
      
            <div class="container_pagination">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                            <li class="page-item"><a class="page-link" @click="previousAlbums()"><img src="https://img.icons8.com/plasticine/64/000000/back.png"/></a></li>
                            <li class="page-item"><a class="page-link" @click="nextAlbums()"><img src="https://img.icons8.com/plasticine/64/000000/forward.png"/></a></li>
                    </ul>
                </nav>
        </div>
        </div>
      </h1>
  </div>
 
</template>

<script>
"./Albums.ts"
import axios from "axios"
import display from './display'
export default {
  components: {
    display
  },
  data() {
    return {
      albums: [],
      range: 0,
      albumSearch: "",
      cancelSearchVisibility: "hidden",
      previousBtnVisibility: "visible",
      nextBtnVisibility: "visible"
    };
  },
  computed: {
    albumsPaginated() {
      return this.albums.slice(this.range, this.range + 8);
    }
  },
  methods: {
    getAlbums() {
      axios
        .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
        .then(response => {
          this.albums = response.data.feed.entry;
        })
        .catch(error => {
          alert(error);
        });
    },
    hidePreviousBtn() {
      this.previousBtnVisibility = "hidden";
    },
    showPreviousBtn() {
      this.previousBtnVisibility = "visible";
    },
    hideNextBtn() {
      this.nextBtnVisibility = "hidden";
    },
    showNextBtn() {
      this.nextBtnVisibility = "visible";
    },
    nextAlbums() {
      if (this.albums.length - this.range > 8) {
        this.range += 8;
      }
    },
    previousAlbums() {
      if (this.range > 0) {
        this.range -= 8;
      }
    },
    SearchByAlbumName() {
      this.albums = this.albums.filter(alb => {
        return alb["im:name"].label.toLowerCase().includes(this.albumSearch);
      });
      this.cancelSearchVisibility = "visible";
    },
    CancelSearch() {
      this.getAlbums();
      this.albumSearch = "";
      this.cancelSearchVisibility = "hidden";
    }
  },
  created() {
    this.getAlbums();
  }
};
</script>
<style scoped>
.back {
    position: fixed;
    z-index: -1;
    /* Allows the background pic to not have any white lines on edge */
    transform: scale(1.3);
    -webkit-filter: scale(1.1);
    -moz-filter: scale(1.1);
    -o-filter: scale(1.1);
    -ms-filter: scale(1.1);
}
.albums-heading-main {
    display: block;
    font-size: 100px;
    font-weight: 100;
    padding-top: 3%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Covered By Your Grace';
}
#search_bar {
  margin-bottom: 30px;
}

.albums_header {
  text-align: left;
  font-weight: bolder;
  padding-left: 5px;
  color: black;
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

.container_pagination nav ul li a {
  border: none;
  background: transparent;
}
.page-link{
  color: black;
}
#submit{
  padding-top: 1%;
}

.btn{
    float: right;
}
</style>
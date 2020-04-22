  <template>
    <div id="Albums-page" class="albums_container">
        <span class="albums-heading-main">Explore Albums</span>
        <div class="container animated bounceIn ease-in-quad d-2 mt4">
          <div class="row">
            <div class="col s6 offset-s3">
              <div class="inputSearch">
                <input v-model="albumSearch" type="text" class="search-bar" placeholder="Search albums"  @keyup.enter="SearchByAlbumName()">
                <defaultButton class="clr-btn" :style="{visibility:cancelSearchVisibility}" @click.native="CancelSearch()">
                  <i class="material-icons">clear</i>
                </defaultButton>
                <defaultButton class="search-btn" @click.native="SearchByAlbumName()">
                  <i class="material-icons">search</i>
                </defaultButton>
              </div>
            </div>
          </div>
            <div class="row">
              <div class="col s1">
                <defaultButton class="prev" @click.native="previousAlbums()">
              <i class="material-icons" style="font-size: 5vw;">navigate_before</i>
            </defaultButton>
              </div>
              <div class="col s10">
                <div class="d-flex justify-content-start flex-wrap albums" id="albums_container">
                  <albumCard v-for="album in albumsPaginated" :key="album.id"
                  :id="album.id" :item="album" 
                  :val1="album.name" :val2="album.genre_abbr" newRoute="AlbumDetail">
                  </albumCard>
                </div>
              </div>
              <div class="col s1">
                <defaultButton class="next" @click.native="nextAlbums()">
              <i class="material-icons" style="font-size: 5vw;">navigate_next</i>
            </defaultButton>
              </div>
            </div>
        </div> 
    </div>
  </template>

  <script lang="ts" src="./Albums.ts"></script>

  <style lang="scss" scoped>
    .albums_container {
      background-image: url('../../assets/back6.jpg');
      background-size: cover;
      background-size: cover;
      height: 100%;
      //background-size: 100% auto;
      //background-repeat: repeat;
      padding-top: 7%;
      //width: 100%;
      //height: 100%;
      //position: absolute;
      //margin-left: 0;
      //margin-right: 0;
    }

    .albums-heading-main {
      display: block;
      font-size: 100px;
      font-weight: 100;
      text-align: center;
      //padding-left: 35%;
      padding-bottom: 1%;
      color:black;
      font-family: 'Covered By Your Grace';
    }

    #search_bar {
      margin-bottom: 30px;
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
    position: relative;
    padding-top: 50%;
  }

  .prev {
    position: relative;
    padding-top: 50%;
  }

  </style>
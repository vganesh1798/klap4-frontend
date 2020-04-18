<template>
 <div id="Artists-page" class="artists_container">
    <span class="artists-heading-main">Explore Artists</span>
    <div class="container animated bounceIn ease-in-quad d-2 mt4">
        <div class="row">
          <div class="col s6 offset-s4">
            <div class="inputSearch">
              <input v-model="artistSearch" type="text" class="search-bar" placeholder="Search artists"  @keyup.enter="SearchByArtistName()">
              <defaultButton class="clr-btn" :style="{visibility:cancelSearchVisibility}" @click.native="CancelSearch()">
                <i class="material-icons">clear</i>
              </defaultButton>
              <defaultButton class="search-btn" @click.native="SearchByArtistName()">
                <i class="material-icons">search</i>
              </defaultButton>
            </div>
          </div>
        </div>
          <defaultButton class="prev" @click.native="previousArtists()">
            <i class="material-icons" style="font-size: 60px;">navigate_before</i>
          </defaultButton>
          <defaultButton class="next" @click.native="nextArtists()">
            <i class="material-icons" style="font-size: 60px;">navigate_next</i>
          </defaultButton>
          <div class="row">
            <div class="col s1"></div>
            <div class="col s11">
              <div class="d-flex justify-content-start flex-wrap artists" id="artists_container">
                <display v-for="artist in artistsPaginated" :key="artist.id"
                  :id-artist="artist.id" :artist="artist">
                </display>
              </div>
            </div>
          </div>
      </div>


    <!--div id="flex-container">
        <div class="flex-child card-expansion">
            <md-card>
      <md-card-media>
        <img src="../../assets/artist1.jpeg" alt="People">
      </md-card-media>

      <md-card-header v-model="artistList">
        <div class="md-title">{{artistList[0].name}}</div>
        <div class="md-subhead">{{artistList[0].tag}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Rate</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button>Learn more</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
              Albums:<br/>
              {{artistList[0].albums[0]}}<br/>
              {{artistList[0].albums[1]}}


          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card> 
        </div>
         <div class="flex-child card-expansion">
            <md-card>
      <md-card-media>
        <img src="../../assets/artist3.jpg" alt="People">
      </md-card-media>

      <md-card-header v-model="artistList">
        <div class="md-title">{{artistList[1].name}}</div>
        <div class="md-subhead">{{artistList[1].tag}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Rate</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button>Learn more</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
              Albums:<br/>
              {{artistList[1].albums[0]}}<br/>
              {{artistList[1].albums[1]}}


          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card> 
        </div>
         <div class="flex-child card-expansion">
            <md-card>
      <md-card-media>
        <img src="../../assets/artist3.jpg" alt="People">
      </md-card-media>

      <md-card-header v-model="artistList">
        <div class="md-title">{{artistList[2].name}}</div>
        <div class="md-subhead">{{artistList[2].tag}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Rate</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button>Learn more</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
              Albums:<br/>
              {{artistList[2].albums[0]}}<br/>
              {{artistList[2].albums[1]}}


          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card> 
        </div>
    </div--->
  </div>
</template>

<script lang='ts' src="./ArtistPage.ts">
</script>

<style lang="scss" scoped>
  .artists_container {
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

  .artists-heading-main {
    display: block;
    font-size: 100px;
    font-weight: 100;
    padding-left: 35%;
    padding-bottom: 1%;
    color:black;
    font-family: 'Covered By Your Grace';
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
    top: 39%;
  }

  .prev {
    position: absolute;
    left: 18%;
    top: 39%;
  }

.ArtistPage{
    margin: 40px 0 0;
    color: #42b983
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #42b983
}
#flex-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin-left: 10%;
}
.card-expansion {
  height: 480px;
}

.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.flex-child{
  margin-left: 10%;
}

h1 {
  height: 15rem !important;
  margin-top: 0px;
}

#flex-container {
  margin-left: 0px;
}
</style>

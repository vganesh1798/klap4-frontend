<template>
 <div id="Artists-page" class="artists_container">
    <span class="artists-heading-main">Explore Artists</span>
    <div class="container animated bounceIn ease-in-quad d-2 mt4">
        <div class="row">
          <div class="col s6 offset-s3">
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
          <!--defaultButton class="prev" @click.native="previousArtists()">
            <i class="material-icons" style="font-size: 60px;">navigate_before</i>
          </defaultButton-->
          <!--defaultButton class="next" @click.native="nextArtists()">
            <i class="material-icons" style="font-size: 60px;">navigate_next</i>
          </defaultButton--->
          <div class="row">
            <div class="col s1">
              <defaultButton class="prev" @click.native="previousArtists()">
                <i class="material-icons" style="font-size: 5vw;">navigate_before</i>
              </defaultButton>
            </div>
            <div class="col s10">
              <div class="d-flex justify-content-start flex-wrap artists" id="artists_container">
                <artistCard v-for="artist in artistsPaginated" :key="artist.id"
                  :id="artist.id" :item="artist" :val1="artist.name" :val2="artist.genre_abbr" :imgPath="artist.image" :akt="artist.name" newRoute="ArtistDetail">
                </artistCard>
              </div>
            </div>
            <div class="col s1">
              <defaultButton class="next" @click.native="nextArtists()">
                <i class="material-icons" style="font-size: 5vw;">navigate_next</i>
              </defaultButton>
            </div>
          </div>
      </div>
    </div>
</template>

<script lang='ts' src='./ArtistPage.ts'>

</script>

<style lang="scss" scoped>
  .artists_container {
    background-image: url('../../assets/back6.jpg');
      background-size: cover;
      background-size: cover;
      height: 100%;
      padding-top: 7%;
  }

  .artists-heading-main {
    display: block;
    font-size: 70px;
    font-weight: 100;
    //padding-left: 35%;
    text-align: center;
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
    position: relative;
    padding-top: 50%;
  }

  .prev {
    position: relative;
    padding-top: 50%;
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

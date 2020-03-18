<template>
<div class="container">
    <h1>
          <span class="albums-heading-main">Artists Page</span>
    </h1>
    <div id="flex-container">

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
    </div>
</div>
</template>

<script lang='ts'>
    import Vue from 'vue';

    export default Vue.extend({
        name: "ArtistPage",
        props: ["artists"],

    data() {
        return {
            artistList: [
                {
                    id: 1,
                    name: "artist 1",
                    tag: "nutty",
                    albums: [
                        "album1",
                        "album2"
                    ]
                },
                {
                    id: 2,
                    name: "artist 2",
                    tag: "semi-nutty",
                    albums: [
                        "album1",
                        "album2"
                    ]
                },
                {
                    id: 3,
                    name: "artist 3",
                    tag: "nutty",
                    albums: [
                        "album1",
                        "album2"
                    ]
                },
                {
                    id: 4,
                    name: "artist 4",
                    tag: "nutty",
                    albums: [
                        "album1",
                        "album2"
                    ]
                },
                {
                    id: 5,
                    name: "artist 5",
                    tag: "bunk",
                    albums: [
                        "album1",
                        "album2"
                    ]
                }
                ]
            }
        }
    }); 
</script>

<style scoped>
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
.albums-heading-main {
    display: block;
    font-size: 60px;
    font-weight: 60;
    padding-top: 10%;
    padding-left: 45%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
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

.container {
  margin-left: 10% !important;
}

#flex-container {
  margin-left: 0px;
}
</style>

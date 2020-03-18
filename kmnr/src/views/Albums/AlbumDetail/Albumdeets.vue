<template>
  <div class="full-deets">
    <h1>
      <span class="albums-heading-main">Album Information</span>
    </h1>
    <div id="flex-container">
      <div class=" animated fadeInUp ease-out-circ d-1 a-2 flex-child">
        <md-card>
          <md-card-media>
            <img class="album-image" :src="album['im:image'][2].label">
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{album['im:name'].label}}</div>
            <div class="md-subhead">{{album['im:artist'].label}}</div>

          </md-card-header>
          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>
              <div>
                <md-button>Rate</md-button>
              </div>

              <md-card-expand-trigger>
                <md-button>Details</md-button>
              </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
              <md-card-content>
                Release Date: {{album['im:releaseDate'].attributes.label}} <br />
                Categoory: {{ album.category.attributes.label }} <br />
                Tracks: {{ album['im:itemCount'].label }}
              </md-card-content>
            </md-card-expand-content>
          </md-card-expand>
        </md-card>
      </div>

      <div class="container">
          <div class="row">
            <div class="input-field col s4">
              <label for="first">First Name</label>
              <input type="text" id="first" />
            </div>

            <div class="col s6">
              <md-table class="table" v-model="Tracks" md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Tracks</h1>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Track" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Runtime" md-sort-by="title">{{ item.run }}</md-table-cell>
                  <md-table-cell md-label="Plays" md-sort-by="title">{{ item.plays }}</md-table-cell>

                </md-table-row>
              </md-table>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <label for="last">Last Name</label>
              <input type="text" id="last" />
            </div>
          </div>

          <div class="row">
            <div class="input-field col s4">
              <label for="review">Write a review</label>
              <textarea type="text" class="materialize-textarea" id="review"></textarea>
              <button class="btn">Submit</button>
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

  @Component({})
  export default class Albumdeeets extends Vue {
    album = {}
    Tracks = [{
        id: 1,
        name: 'Shawna Dubbin',
        run: '3:56',
        plays: '245'
      },
      {
        id: 2,
        name: 'Odette Demageard',
        run: '4:12',
        plays: '2422'

      },
      {
        id: 3,
        name: 'Lonnie Izkovitz',
        run: '3:02',
        plays: '445'
      },
      {
        id: 4,
        name: 'Thatcher Stave',
        run: '3:42',
        plays: '3545'
      },
      {
        id: 5,
        name: 'Clarinda Marieton',
        run: '5:00',
        plays: '335'
      },
      {
        id: 6,
        name: 'Clarinda Marieton',
        run: '5:00',
        plays: '345'
      },
      {
        id: 7,
        name: 'Clarinda Marieton',
        run: '5:00',
        plays: '665'
      }
    ]

    created() {
      this.album = this.$route.params.albumParam
    }
  }
</script>


<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

  .main {

    margin: 0 auto;
  }

  .table {
    position: absolute;
    width: 30% !important;
    margin-left: 5% !important;
  }

  .albums-heading-main {
    display: block;
    font-size: 60px;
    font-weight: 60;
    padding-top: 5%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
  }

  .album-image {
    border: 7px solid black;
    /* border-radius: 50%; */
    padding: 2px;
    width: 100%;
    background-color: black;
  }

  .md-card {
    width: 220px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-title {
    font-family: 'Montserrat';
  }

  #flex-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 10%;
    padding-top: 5%;
  }

  .flex-child {
    margin-left: 10%;
  }

  .md-card {
    opacity: 90%
  }

  .md-table {
    width: 100%;
    opacity: 90%;
  }

  #first {
    color: black;
  }

  #review {
    color: black;
  }

  #last {
    color: black;
  }

  .row {
    margin-right: 0px;
    margin-left: 10%;
  }

  h1 {
    margin: 0px;
  }

  .full-deets {
    padding-top: 4%;
  }
</style>
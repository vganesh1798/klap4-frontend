<template>
  <div class="full-deets">
    <h1>
      <span class="prog-heading-main">Programming</span>
    </h1>
    <div id="flex-container">
      <div class=" animated fadeInUp ease-out-circ d-1 a-2 flex-child">
        <md-card>
          <md-card-media>
            
          </md-card-media>

          <md-card-header>
            <div class="md-title">Programming</div>
            <div class="md-subhead">Name</div>

          </md-card-header>
          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <md-card-expand-trigger>
                <md-button>Details</md-button>
              </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
              <md-card-content>
                Content
              </md-card-content>
            </md-card-expand-content>
          </md-card-expand>
        </md-card>
      </div>

      <div class="container">
          <div class="row">
            <div class="col s6">
              <md-table class="table" v-model="Tracks" md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Category</h1>
                </md-table-toolbar>
                <md-dialog-alert
                    :md-active.sync="second"
                    md-title="Post created!"
                    md-content="Your post <strong>Material Design is awesome</strong> has been created." />
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Number" md-sort-by="id" md-numeric>{{ item.id }}
                  </md-table-cell>
                  <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}
                     <md-tooltip md-direction="top">Info Text</md-tooltip> </md-table-cell>
                </md-table-row>
              </md-table>
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
  export default class Programming extends Vue {
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
  .full-deets{
    background-image: url('../../assets/back7.jpg');
    background-size: cover;
    min-height: 100%;
    height: auto;
  } 
  .table {
    position: absolute;
    color: black;
    width: 30% !important;
    margin-left: 5% !important;
  }

  .prog-heading-main {
    display: block;
    font-size: 5vw;
    font-weight: 60;
    padding-top: 5%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
  }

  .album-image {
    border: 7px solid black;
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
    padding-top: 5%;
  }
@media screen and (max-width: 800px) {
  #flex-container{
    flex-direction: column;
    margin-left: 10%;
  }
  .flex-child {
    margin-left: 20%;
    padding-bottom: 50px;
  }
  .row{
    margin-left: 20%;
  }
}
  .flex-child {
    margin-left: 30%;
  }

  .md-card {
    opacity: 90%
  }

  .md-table {
    width: 100vw;
    height: 50vh;
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
  }

  h1 {
    margin: 0px;
  }

  .full-deets {
    padding-top: 4%;
  }
</style>
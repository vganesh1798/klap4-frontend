<template>
  <div class="full-deets">
    <h1>
      <span class="artists-heading-main">Artist Information</span>
    </h1>
    <div id="container">
      <div class="row">
        <div class="col s2 offset-s2">
        <div class="card">
          <div class="card-image">
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png">
          </div>
          <div class="card-content">
            <span class="card-title">{{artist.name}}</span>
            <p>{{artist.genre}}</p>
          </div>
        </div>
        </div>

        <div class="albums col s4 offset-s1">
          <table class="albumsTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Format</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in albums" :key="item.id">
                <td>{{ item.id }}</td>
                <td>by <router-link :to="{name:'AlbumDetail', params:{albumParam:item.id} }" class="albumLink">{{item.album_name}}</router-link></td>
                <td><img :src="formatImage(item.album_format)" v-bind:alt="item.album_format" class="tooltipped" data-tooltip=/></td>
                <td>
                  <i v-if="item.missing" class="material-icons-round tooltipped" data-tooltip="Missing">error</i>
                  <i v-if="item.has_reviews" class="material-icons-round tooltipped" data-tooltip="Has review">rate_review</i>
                  <i v-if="item.has_problems" class="material-icons-round tooltipped" data-tooltip="Has problems">warning</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src='./Artistdeets.ts' />


<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

  #container {
    padding-top: 3%;
  }

  .albums {
    max-height: 53vh;
    min-width: 250px;
    overflow: auto;
  }

  .artists-heading-main {
    display: block;
    font-size: 60px;
    font-weight: 60;
    padding-top: 5%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
  }

  .card {
    width: 250px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    background-color: rgba(100,100,100,.3);
    padding: 4%;
  }

  .row {
    margin-right: 0px;
    margin-left: 10%;
  }

  h1 {
    margin: 0px;
  }

  .full-deets {
    background-image: url('../../../assets/back8.jpg');
    background-size: cover;
    min-height: 100%;
    height: auto;
    padding-top: 4%;
  }

  .albumLink {
    color: black !important;
  }
</style>
<template>
  <div class="full-deets">
    <h1>
      <span class="albums-heading-main fadein">Album Information</span>
    </h1>
    <div class="header-container">
      <div class="row">
        <div class="col s1 offset-s10">
          <defaultButton class="colored headerbtn" @click.native="openReview()">Reviews</defaultButton>      
        </div>
      </div>
      <div class="row buttons">
        <div class="col s1 offset-s10">
          <defaultButton class="colored headerbtn" @click.native="openIssue()">Report an issue</defaultButton>
        </div>
      </div>
      <br/>
      <div class="row buttons">
        <div class="col s1 offset-s10">
          <defaultButton class="colored headerbtn" @click.native="openFcc()">Change all FCC</defaultButton>
        </div>
      </div>
    </div>
    <review :album="album.name" :artist="album.artist" :reviews="album.reviews" v-if="reviewOpen" @closeReview="closeReview"></review>
    <issue :album="album.name" :artist="album.artist" :problems="album.problems" v-if="issueOpen" @closeIssue="closeIssue"></issue>
    <FCC v-if="fccModalOpen" :album_id="album.id" @status="handleStatus" @closeFcc="closeFcc"/>

    <div id="container">
      <div class="row">
        <div class="col s2 offset-s2">
        <div class="card">
          <div class="card-image">
            <img :src="album.image" :alt="album.name">
          </div>
          <div class="card-content" v-if="loaded">
            <span class="card-title"><em>{{album.id}}</em> {{album.name}} <img :src="formatImage(album.format)" v-bind:alt="album.format"></span>
            <p>by <router-link :to="{name:'ArtistDetail', params:{albumParam:album.artist_id} }" class="artistLink">{{album.artist}}</router-link></p>
            <p>Genre: {{ album.genre }}</p>
            <p v-if="album.label">{{album.label}}</p>
            <p v-if="album.promoter">{{album.promoter}}<p>
            <p>Added on {{album.date_added.substr(0, 11)}}</p>
            <br/>
            <p>Additional notes:</p>
            <i v-if="album.missing" class="material-icons-round lime-text text-darken-4 tooltipped" data-tooltip="Missing">warning</i>
            <i v-if="album.reviews.length > 0" class="material-icons-round green-text text-accent-4 tooltipped" data-tooltip="Has review">rate_review</i>
            <i v-if="album.problems.length > 0" class="material-icons-round tooltipped" data-tooltip="Has problems">report</i>
            <i v-if="album.new_album" class="material-icons-round light-blue-text text-accent-4 tooltipped" data-tooltip="New album!">fiber_new</i>
          </div>
        </div>
        </div>

        <div class="tracks col s7">
          <table class="tracksTable">
            <thead>
              <tr>
                <th style="width: 10%;">Track</th>
                <th style="width: 15%;">Recommended</th>
                <th style="width: 16.67%;">Name</th>
                <th style="width: 10%;">FCC Status</th>
                <th style="width: 16.67%;">Last Played</th>
                <th style="width: 8%;">Plays</th>
                <th style="width: 8%;"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tracks" :key="item.number">
                <td>{{ item.number }}</td>
                <td>
                  <i v-if="item.recommended" class="material-icons-round yellow-text text-accent-4">grade</i>
                </td>
                <td>{{ item.song_name }}</td>
                <td>
                  <defaultButton @click.native="toggleFCC(item)" class="dropdown-trigger btn" data-target='dropdown1'>
                    <i v-if="getFCCStatus(item.fcc_status) == 'clean'" class="material-icons-round green-text tooltipped" data-tooltip="Clean">check_circle</i>
                    <i v-if="getFCCStatus(item.fcc_status) == 'indecent'" class="material-icons-round orange-text text-lighten-2 tooltipped" data-tooltip="Indecent">error</i>
                    <i v-if="getFCCStatus(item.fcc_status) == 'obscene'" class="material-icons-round red-text tooltipped" data-tooltip="Obscene">error</i>
                    <i v-if="getFCCStatus(item.fcc_status) == 'unrated'" class="material-icons-round gray tooltipped" data-tooltip="Unrated">help</i>
                  </defaultButton>
                </td>
                <td>{{ item.last_played.substr(0, 11) }}</td>
                <td>{{ item.times_played }}</td>
                <td>
                  <defaultButton @click.native="addToPlaylist(item, album)">
                    <i class="material-icons tooltipped" data-tooltip="Add to active playlist">add</i>
                  </defaultButton>
                </td>
                <td v-if="album.format === 4">
                    <defaultButton @click.native="addToQueue(item)">
                      <i class="material-icons tooltipped song-queue" data-tooltip="Add to song queue">playlist_add</i>
                  </defaultButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dropdown-content" id="dropdown1">    
          <ul>
            <li @click="changeStatus(1)"><i class="material-icons-round green-text">check_circle</i>Clean</li>
            <li @click="changeStatus(2)"><i class="material-icons-round orange-text text-lighten-2">error</i>Indecent</li>
            <li @click="changeStatus(3)"><i class="material-icons-round red-text">error</i>Obscene</li>
            <li @click="changeStatus(4)"><i class="material-icons-round gray">help</i>Unrated</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src='./Albumdeets.ts'/>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

  .song-queue {
    position: relative;
    margin-left: 13%;
  }


  .full-deets {
    background-image: url('../../../assets/back6.jpg');
    background-size: 100% auto;
    background-repeat: repeat;
    width: 100%;
    min-height: 100%;
    height: auto;
    position: absolute;
  }

  .albums-heading-main {
    padding-top: 8%;
    padding-bottom: 10%;
    display: block;
    font-size: 3.75vw;
    text-align:center;
    padding-bottom: 0%;
    margin-bottom: 0%;
    color: rgb(70, 68, 68);
    font-family: 'Covered By Your Grace';
    -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 3s; /* Firefox < 16 */
        -ms-animation: fadein 3s; /* Internet Explorer */
         -o-animation: fadein 3s; /* Opera < 12.1 */
            animation: fadein 3s;
  }

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
  .tracks {
    max-height: 53vh;
    min-width: 25vw;
    overflow: auto;
  }

  .headerbtn {
    padding: 5% !important;
    width: 8vw;
  }

  .buttons {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }

  .card {
    margin-left: -10vw !important;
    margin-top: -10vh !important;
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

  .artistLink {
    color: #1976d2 !important;
  }
</style>
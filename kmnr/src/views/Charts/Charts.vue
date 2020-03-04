<template>
    <div class="charts-page">
      <img class="back" src="../../../public/testbackground.jpg" />
      <div class="container charts-content">
        <!--h2>Explore Charts</h2-->
        <h2>Explore Charts</h2>
          <div class="row">
            <div class="col l3">
              <ul class="tabs">
                <li class="button"><a href="#test1">Top Albums</a></li>
                <li class="button"><a href="#test2">Top Songs</a></li>
                <li class="button"><a href="#test3">Top Artists</a></li>
                <li class="button"><a href="#test4">Top Other</a></li>
              </ul>
            </div>
            <div class="col l12">
              <div class="row">
                <div class="input-field col s12">
                  <!--i class="material-icons prefix">textsms</i--->
                  <input type="text" id="autocomplete-input" class="autocomplete">
                  <label for="autocomplete-input">Search for an artist, genre, or album</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col l12">
              <table class="highlight striped">
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>song1</td>
                    <td>artist1</td>
                    <td>album1</td>
                  </tr>
                  <tr>
                    <td>song2</td>
                    <td>artist2</td>
                    <td>album2</td>
                  </tr>
                  <tr>
                    <td>song3</td>
                    <td>artist3</td>
                    <td>album3</td>
                  </tr>
                  <tr>
                    <td>song4</td>
                    <td>artist4</td>
                    <td>album4</td>
                  </tr>
                  <tr>
                    <td>song5</td>
                    <td>artist5</td>
                    <td>album5</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <!---ul class="tabs">
          <li class="button"><a href="#test1">Top Albums</a></li>
          <li class="button"><a class="active" href="#test2">Top Songs</a></li>
          <li class="button"><a href="#test3">Top Artists</a></li>
          <li class="button"><a href="#test4">Top Other</a></li>
        </ul--->
          <!---/div>
          <div id="test1" class="col s12">Test 1</div>
          <div id="test2" class="col s12">Test 2</div>
          <div id="test3" class="col s12">Test 3</div>
          <div id="test4" class="col s12">Test 4</div>
        </div--->
        <div class="row">
          <div class="col l12">
            <table id="secondTable" class="highlight striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in topCharts" v-bind:key="item.id">
                  <td v-for="col in columns" v-bind:key="col.id">{{ item[col] }}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
"./Charts.js"
//import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
//import '../../../node_modules/materialize-css/dist/js/materialize.min.js';

export default {
    data () {
        return {
            msg: 'helloo',
            columns: ['name', 'artist', 'album'],
            topCharts: [
               { name: 'song1', artist: 'artist1', album: '1' },
               { name: 'song2', artist: 'artist2', album: '2' },
               { name: 'song3', artist: 'artist3', album: '3' },
               { name: 'song4', artist: 'artist4', album: '4' }
            ]
        }
    }
}
</script>

<style>
.back {
    position: fixed;
    z-index: -1;

    /* Allows the background pic to not have any white lines on edge */
    transform: scale(2);
    -webkit-filter: scale(1.1);
    -moz-filter: scale(1.1);
    -o-filter: scale(1.1);
    -ms-filter: scale(1.1);
}

.charts-content {
    padding-top: 10%;
    text-align: center;
    height: 100em;
    z-index: -1;
}

.card-title {
  font-size: 36px;
}

.card-text {

}
.card {
  width: 325px;
  height: 300px;
  text-align: center;
  font-size: 16px;
  border-radius: 15px;
}

</style>

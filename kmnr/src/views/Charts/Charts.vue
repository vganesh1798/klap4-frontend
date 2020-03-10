<template>
  <div id="charts-page">
    <img class="back" src="../../../public/back.jpg" />
    <h1 class="heading-charts">
      <span class="heading-charts-main">Explore Charts</span>
      <div class="container">
        <div class="row">
          <div class="col-lg-3"></div>
          <div class="col-lg-2">
            <button type="button" class="btn">New Charts</button>
          </div>
          <div class="col-lg-2">
            <button type="button" class="btn">Top charts</button>
          </div>
        </div>
      </div>
    </h1>

    <div class="container">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Recommended</th>
            <th scope="col">Album</th>
            <th scope="col">Artist</th>
            <th scope="col">Runtime</th>
            <th scope="col">Album Tag</th>
            <th scope="col">Artist Tag</th>
            <th scope="col">Release Date</th>
            <th scope="col">Total Plays</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in topCharts" v-bind:key="item.id">
              <!--button type="button" class="btn">
                <p v-if="item['Recommended']">rec</p>
                <p v-else>not rec</p>
              </button--->
              <!--img class="recpic" v-show="item['Recommended']" src="../../assets/logo.png"/-->
            <td v-for="col in columns" v-bind:key="col.id">
              <p v-if="col==='Recommended'">
                <!---img class="recpic" v-show="item['Recommended']" src="../../assets/logo.png"/--->
                <button class="circlebtn" v-on:click="item['Recommended'] = !item['Recommended']">
                  <img class="recpic" v-show="item['Recommended']" src="../../../public/star_button.jpg"/>
                </button>
              </p>
              <p v-else>
                {{ item[col] }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang='ts' src="./Charts.ts" />


<script>
"./Charts.ts"

export default {
    data () {
        return {
            columns: ['Recommended', 'Album', 'Artist', 'Runtime', 'Album Tag', 'Artist Tag', 'Release Date', 'Total Plays'],
            topCharts: [
               { Recommended: true, Album: 'album1', Artist: 'artist1', Runtime: '354', 'Album Tag': '1234', 'Artist Tag': '3384', 'Release Date': '12/2/2009', 'Total Plays': '245' },
               { Recommended: false, Album: 'album2', Artist: 'artist2', Runtime: '213', 'Album Tag': 'RM2T5', 'Artist Tag': 'CO329F', 'Release Date': '2/22/2003', 'Total Plays': '244' },
               { Recommended: true, Album: 'album3', Artist: 'artist3', Runtime: '100', 'Album Tag': '3843', 'Artist Tag': '39CL', 'Release Date': '8/13/2011', 'Total Plays': '214' },
               { Recommended: true, Album: 'album4', Artist: 'artist4', Runtime: '298', 'Album Tag': 'RXO20', 'Artist Tag': '24SLS', 'Release Date': '6/28/1976', 'Total Plays': '198' },
               { Recommended: false, Album: 'album5', Artist: 'artist5', Runtime: '245', 'Album Tag': 'ZO22', 'Artist Tag': '3245', 'Release Date': '3/2/1994', 'Total Plays': '194' },
               { Recommended: false, Album: 'album6', Artist: 'artist6', Runtime: '198', 'Album Tag': '9284', 'Artist Tag': '49042', 'Release Date': '12/12/2002', 'Total Plays': '187' },
               { Recommended: false, Album: 'album7', Artist: 'artist7', Runtime: '412', 'Album Tag': '1104', 'Artist Tag': '2393', 'Release Date': '1/26/2000', 'Total Plays': '175' },
               { Recommended: true, Album: 'album8', Artist: 'artist8', Runtime: '190', 'Album Tag': 'K203L', 'Artist Tag': 'K2DSA0', 'Release Date': '8/19/1970', 'Total Plays': '164' },
               { Recommended: true, Album: 'album9', Artist: 'artist9', Runtime: '245', 'Album Tag': 'CSOS2', 'Artist Tag': '30931', 'Release Date': '9/2/2001', 'Total Plays': '160' },
               { Recommended: false, Album: 'album10', Artist: 'artist10', Runtime: '198', 'Album Tag': '2948', 'Artist Tag': 'XCO333', 'Release Date': '4/29/2009', 'Total Plays': '140' },
               { Recommended: true, Album: 'album11', Artist: 'artist11', Runtime: '412', 'Album Tag': '10333', 'Artist Tag': 'OIO233', 'Release Date': '6/7/2014', 'Total Plays': '110' },
               { Recommended: false, Album: 'album12', Artist: 'artist12', Runtime: '190', 'Album Tag': '292', 'Artist Tag': '290923', 'Release Date': '1/2/2000', 'Total Plays': '106' }
            ]
        }
    }
}
</script>

<style>
.heading-charts-main {
    display: block;
    font-size: 100px;
    font-weight: 100;
    padding-top: 3%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Covered By Your Grace';
}

.heading-charts-sub {
    display: block;
    text-align: center;
    font-size: 25px;
    padding-top: 0%;
    font-family: Montserrat;
    margin-top: 10px;
    color: black; }

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

.recpic {
  transform: scale(.8);
  height: 25px;
}

.btn {
    background-color: gray;
    border-radius: 20px;
    width: 150px;
    font-family: Montserrat;
}

.circlebtn {
  border: none;
  border-radius: 50%;
  opacity: 40%;
  height: 30px;
  width: 30px;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.table {
  color: black;
  width: 1100px;
  font-size: 16px;
  font-family: Montserrat;
}

tbody > tr {
  height: 20px;
}

.table-hover > tbody > tr:hover {
  /*background-color: #595959 !important;*/
  background-color: #566D7E !important;
}

.table-striped > tbody > tr:nth-child(even){
  background-color:  #a0cfec;
  /*background-color: #AFDCEC;*/
  /*background-color: #1569C7;*/
}

.table-striped > tbody > tr:nth-child(odd){
  /*background-color:#0099cc;*/
  background-color: #659EC7;
  /*background-color: #6495ED;*/
}
</style>

<template>
  <div id="charts-page">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <img class="back" src="../../../public/back.jpg" />
    <h1 class="heading-charts">
      <span class="heading-charts-main">Explore Charts</span>
    </h1>

    <div class="container">
      <div class="row">
        <div class="col l10">
          <input v-model="chartsSearch" type="text" class="form-control" placeholder="Search by genre">
        </div>
        <div class="col l1" id="submit">
          <button class="btn btn-light" @click="SearchByChartName()" v-on:keyup.enter="SearchByChartName()">Search</button>
        </div>
        <div class="col l1">
            <a :style="{visibility:cancelSearchVisibility}" class="cancelSearch" href="#" @click.prevent="CancelSearch()"> Clear </a>
        </div>
      </div>
      <table class="table striped highlight centered sorted">
        <thead>
          <tr>
            <th>Recommended</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Runtime</th>
            <th>Album Tag</th>
            <th>Artist Tag</th>
            <th>Release Date</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in chartsPaginated" v-bind:key="item.id">
            <td v-for="col in columns" v-bind:key="col.id">
              <p v-if="col==='Recommended'">
                <favbutton>
                  <span></span>
                </favbutton>
              </p>
              <p v-else-if="col==='Album'">
                {{ item['im:name'].label}}
              </p>
              <p v-else-if="col==='Artist'">
                {{ item['im:artist'].label}}
              </p>
              <p v-else-if="col==='Runtime'">
              </p>
              <p v-else-if="col==='Album Tag'">
                {{ item['id'].attributes['im:id'] }}
              </p>
              <p v-else-if="col==='Artist Tag'">
                {{ item['category'].attributes['im:id']}}
              </p>
              <p v-else-if="col==='Release Date'">
                {{item['im:releaseDate'].attributes.label}}
              </p>
              <p v-else-if="col==='Total Plays'">
                {{ item['category'].attributes.label}}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col l10"></div>
        <div class="col l1">
          <a class="page-link" @click="previousCharts()"><img src="https://img.icons8.com/plasticine/64/000000/back.png"/></a>
        </div>
        <div class="col l1">
          <a class="page-link" @click="nextCharts()"><img src="https://img.icons8.com/plasticine/64/000000/forward.png"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import "./Charts.scss"
import "./Charts.ts"
import favbutton from "../../components/favbutton.vue"
import axios from "axios"

export default {
  components: {
    favbutton
  },
  data () {
    return {
      columns: ['Recommended', 'Album', 'Artist', 'Runtime', 'Album Tag', 'Artist Tag', 'Release Date', 'Total Plays'],
      charts: [],
      range: 0,
      chartsSearch: "",
      cancelSearchVisibility: "hidden",
      previousBtnVisibility: "visible",
      nextBtnVisibility: "visible",
      isToggle: true
    }
  },
  computed: {
    chartsPaginated() {
      return this.charts.slice(this.range, this.range + 10);
    }
  },
  methods: {
    getCharts() {
      axios
        .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
        .then(response => {
          this.charts = response.data.feed.entry;
        })
        .catch(error => {
          alert(error);
        });
    },
    hidePreviousBtn() {
      this.previousBtnVisibility = "hidden";
    },
    showPreviousBtn() {
      this.previousBtnVisibility = "visible";
    },
    hideNextBtn() {
      this.nextBtnVisibility = "hidden";
    },
    showNextBtn() {
      this.nextBtnVisibility = "visible";
    },
    nextCharts() {
      if (this.charts.length - this.range > 10) {
        this.range += 10;
      }
    },
    previousCharts() {
      if (this.range > 0) {
        this.range -= 10;
      }
    },
    SearchByChartName() {
      this.charts = this.charts.filter(alb => {
        return alb['category'].attributes.label.toLowerCase().includes(this.chartsSearch);
      });
      this.cancelSearchVisibility = "visible";
    },
    CancelSearch() {
      this.getCharts();
      this.chartsSearch = "";
      this.cancelSearchVisibility = "hidden";
    }
  },
  created() {
    this.getCharts();
  }
}
</script>

<style lang="scss">

</style>

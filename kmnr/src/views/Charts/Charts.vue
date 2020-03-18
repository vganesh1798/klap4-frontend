<template>
  <div id="charts-page" class="full-container">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--img class="back" src="../../assets/back.jpg" /-->
    <h1 class="heading-charts">
      <span class="heading-charts-main">Explore Charts</span>
    </h1>

    <div class="container">
      <div class="row"></div>
      <div class="row">
        <div class="col l3"></div>
        <div class="col l5">
          <input v-model="chartsSearch" type="text" class="form-control" placeholder="Search by genre">
        </div>
        <div class="col l1" id="submit">
          <button class="btn btn-light" @click="SearchByChartName()">Search</button>
        </div>
        <div class="col l1">
            <a :style="{visibility:cancelSearchVisibility}" class="cancelSearch" href="#" @click.prevent="CancelSearch()"> Cancel search </a>
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
              <a v-else-if="col==='Album'" class="albumsLink" href="#">
                {{ item['im:name'].label}}
              </a>
              <a v-else-if="col==='Artist'" class="chartsLink" href="#">
                {{ item['im:artist'].label}}
              </a>
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
        <div class="col l9"></div>
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

<script lang='ts' src="./Charts.ts"/>

<style lang="scss" src="./Charts.scss">
</style>

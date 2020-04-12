<template>
  <div class="full-charts">
    <div class="full-container">
      <div class="bg-charts table-container">
        <div class="row">
          <span class="heading-charts-main">Explore Charts</span>
        </div>
        <div class="row">
          <div class="col l5"></div>
          <div class="col l1">
            <button class="borderless-btn topBtn" @click="getCharts()">Top Charts</button>
          </div>
          <div class="col l2">
            <button class="borderless-btn topBtn" @click="getNewCharts()">New Charts</button>
          </div>
        </div>
        
        <div class="row">
          <div class="col l3"></div>
          <div class="col l6">
            <div class="inputSearch">
              <input v-model="chartsSearch" type="text" class="search-bar" placeholder="Search by genre"  @keyup.enter="SearchByChartName()">
              <button class="clr-btn borderless-btn" :style="{visibility:cancelSearchVisibility}" v-on:click="CancelSearch()">
                <i class="material-icons gray-icon">clear</i>
              </button>
              <button class="search-btn borderless-btn" @click="SearchByChartName()">
                <i class="material-icons gray-icon">search</i>
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col l1">
        <div id="dropdown">Sort By:<i class="material-icons">arrow_drop_down</i>
          <div id="dropdown-list">
            <a class="dropdown-item">Genre></a>
            <a class="dropdown-item">Artist</a>
            <a class="dropdown-item">Release Date</a>
            <a class="dropdown-item">Number of Likes</a>
          </div>
        </div>
          </div>
        </div>

        <table class="defaultTable">
          <tbody>
            <tr v-for="item in chartsPaginated" v-bind:key="item.id">
              <td class="rank">
                <p class="class-ranking">{{num}}</p>
              </td>
              <td class="names">
                <ul>
                  <li>{{ item['im:name'].label}}</li>
                  <li> {{ item['im:artist'].label}}</li>
                </ul>
              </td>
              <td class="explore">
                <ul>
                  <li>{{ item['category'].attributes.label}}</li>
                  <li> {{ item['im:releaseDate'].attributes.label}}</li>
                </ul>
              </td>
              <td class="liked">
                  <i class="material-icons fav-icon">favorite</i>
                    <p class="numfav">25</p>
              </td>
              <td class="more">
                <!--https://router.vuejs.org/guide/essentials/navigation.html look into this instead-->
                <router-link to="/albums">
                  <button class="borderless-btn">
                    <i class="material-icons gray-icon">info</i>
                  </button>
                </router-link>
              </td>
              <td class="add">
                <button class="borderless-btn" v-if="loggedIn">
                  <i class="material-icons gray-icon">add</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="col l5"></div>
          <div class="col l2">
            <button class="page-link borderless-btn" @click="previousCharts()">
              <i class="material-icons nav-icon">navigate_before</i>
            </button>
          </div>
          <div class="col l1">
            <button class="page-link borderless-btn" @click="nextCharts()">
              <i class="material-icons nav-icon">navigate_next</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' src="./Charts.ts"/>

<style lang="scss" src="./Charts.scss">
</style>

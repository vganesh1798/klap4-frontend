<template>
    <div class="full-container">
      <div class="bg-charts table-container">
        <button class="borderless-btn coloredBtn exportBtn">Export for NACC</button>
        <div class="row">
          <span class="heading-charts-main">Explore Charts</span>
        </div>
        <div class="row">
          <div class="col s5"></div>
          <!--div class="col s2"-->
            <button class="borderless-btn coloredBtn" style="margin-right: 5%;" @click="getCharts()">Top Charts</button>
          <!--/div>
          <div class="col s2"-->
            <button class="borderless-btn coloredBtn" @click="getNewCharts()">New Charts</button>
          <!--/div-->
        </div>
        
        <div class="row">
          <div class="col s3"></div>
          <div class="col s6">
            <div class="inputSearch">
              <input v-model="chartsSearch" type="text" class="search-bar" placeholder="Search by genre"  @keyup.enter="SearchByChartName()">
              <button class="clr-btn borderless-btn" :style="{visibility:cancelSearchVisibility}" v-on:click="CancelSearch()">
                <i class="material-icons">clear</i>
              </button>
              <button class="search-btn borderless-btn" @click="SearchByChartName()">
                <i class="material-icons">search</i>
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s3">
            <div id="dropdown" v-bind="sort_selection">Sort By: {{ sort_selection }}<i class="material-icons">arrow_drop_down</i>
              <div id="dropdown-list">
                <a class="dropdown-item" v-on:click="sortBy('Pop')">Popularity</a>
                <a class="dropdown-item" @click="sortBy('Genre')">Genre</a>
                <a class="dropdown-item" @click="sortBy('Artist')">Artist</a>
                <a class="dropdown-item" @click="sortBy('Release')">Release Date</a>
                <a class="dropdown-item" @click="sortBy('Likes')">Number of Likes</a>
              </div>
            </div>
          </div>
          <div class="col s8"></div>
          <div class="col s1">
            <button class="borderless-btn coloredBtn">Filter</button>
          </div>
        </div>

        <table class="defaultTable">
          <tbody>
            <tr v-for="item in chartsPaginated" v-bind:key="item.id">
              <td class="rank">
                <p class="class-ranking">{{num}}</p>
              </td>
              <td style="width: 50%;">
                <ul>
                  <li>{{ item['im:name'].label}}</li>
                  <li> {{ item['im:artist'].label}}</li>
                </ul>
              </td>
              <td style="width: 15%;">
                <ul>
                  <li>{{ item['category'].attributes.label}}</li>
                  <li> {{ item['im:releaseDate'].attributes.label}}</li>
                </ul>
              </td>
              <td style="width: 15%;">
                  <i class="material-icons fav-icon">favorite</i>
                    <p class="numfav">25</p>
              </td>
              <td style="width: 5%;">
                <!--https://router.vuejs.org/guide/essentials/navigation.html look into this instead-->
                <router-link to="/albums">
                  <button class="borderless-btn" title="Album Info">
                    <i class="material-icons">info</i>
                  </button>
                </router-link>
              </td>
              <td style="width: 5%;">
                <button class="borderless-btn" title="Add to Playlist" v-if="loggedIn">
                  <i class="material-icons">add</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="col s5"></div>
          <div class="col s2">
            <button class="borderless-btn" @click="previousCharts()">
              <i class="material-icons" style="font-size: 60px;">navigate_before</i>
            </button>
          </div>
          <div class="col s1">
            <button class="borderless-btn" @click="nextCharts()">
              <i class="material-icons" style="font-size: 60px;">navigate_next</i>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang='ts' src="./Charts.ts"/>

<style lang="scss" src="./Charts.scss">
</style>

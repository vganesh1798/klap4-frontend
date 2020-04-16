<template>
    <div class="bg-charts full-container">
      <div class=" table-container">
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
            <div id="dropdown" v-bind="sort_selection">Sort By: {{ sort_selection }}
              <i class="material-icons">arrow_drop_down</i>
              <div id="dropdown-list">
                <a class="dropdown-item" @click="sortBy('Popularity')">Popularity</a>
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

        <table class="defaultTable chartsTable" v-if="chartsPaginated.length > 0">
          <tbody>
            <tr v-for="item in chartsPaginated" v-bind:key="item.id">
              <td class="rank">
                <p class="class-ranking">{{num}}</p>
              </td>
              <td style="width: 60%;">
                <ul>
                  <li>{{ item['im:name'].label}}</li>
                  <li> {{ item['im:artist'].label}}</li>
                </ul>
              </td>
              <td style="width: 28%;">
                <ul>
                  <li>{{ item['category'].attributes.label}}</li>
                  <li> {{ item['im:releaseDate'].attributes.label}}</li>
                </ul>
              </td>
              <td style="width: 20%;">
                <a style="cursor: pointer">
                  <svg width="72" height="72" fill-rule="evenodd" viewBox="0 0 60 55" clip-rule="evenodd">
                    <path 
                      d="M12 38.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
                    <text x=10% y=58% style="font-size: 70%">
                      30
                    </text>
                  </svg>
                  </a>
              </td>
              <!--td style="width: 5%;">
                <router-link to="/albums">
                  <button class="borderless-btn" title="Album Info">
                    <i class="material-icons">info</i>
                  </button>
                </router-link>
              </td-->
            </tr>
          </tbody>
        </table>
        <h1 v-else>No Results Found</h1>

        <div class="row bottom-button">
          <div class="col s5"></div>
          <div class="col s1">
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
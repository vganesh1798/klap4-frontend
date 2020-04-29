<template>
    <div class="bg-charts full-container">
      <div class=" table-container">
        <defaultButton disabled class="colored exportBtn">Export for NACC (Coming soon)</defaultButton>
        <div class="row">
          <span class="heading-charts-main fadein">Explore Charts</span>
        </div>
        <div class="row btns">
          <div class="col s5"></div>
          <defaultButton class="colored" style="margin-right: 5%;" @click.native="getCharts()">Top Charts</defaultButton>
          <defaultButton class="colored" @click.native="getNewCharts()">New Charts</defaultButton>
        </div>
        
        <div class="row">
          <div class="col s3"></div>
          <div class="col s6">
            <div class="inputSearch">
              <input v-model="chartsSearch" type="text" class="search-bar" placeholder="Search by album, artist, or genre"  @keyup.enter="SearchByChartName()">
              <defaultButton class="clr-btn" :style="{visibility:cancelSearchVisibility}" @click.native="CancelSearch()">
                <i class="material-icons">clear</i>
              </defaultButton>
              <defaultButton class="search-btn" @click.native="SearchByChartName()">
                <i class="material-icons">search</i>
              </defaultButton>
            </div>
          </div>
        </div>

        <div class="row table-header">
          <div class="col s3">
            <div id="dropdown">Sort By: {{ sort_selection }}
              <i class="material-icons">arrow_drop_down</i>
              <div id="dropdown-list">
                <a class="dropdown-item" @click="sortBy('Popularity')">Popularity</a>
                <a class="dropdown-item" @click="sortBy('Genre')">Genre</a>
                <a class="dropdown-item" @click="sortBy('Artist')">Artist</a>
                <a class="dropdown-item" @click="sortBy('Album')">Album</a>
                <!--a class="dropdown-item" @click="sortBy('Likes')">Number of Likes</a-->
              </div>
            </div>
          </div>
          <div class="col s5"></div>
          <div class="col s3" v-if="new_charts">
              <p style="text-align: right;">New album charts for the last {{weeks}} weeks</p>
            <!--a v-if="new_charts">Charts for the last weeks:  </a>
            <input class="chooseweeks" type="number" min=1 max=52 v-model.number="weeks" v-if="new_charts"-->
          </div>
          <div class="col s3" v-else>
            <p style="text-align: right;">All charts for the last {{weeks}} weeks</p>
          </div>
          <div class="col s1" v-if="new_charts">
            <p class="range-field">
            <input v-model='weeks' type="range" id="test5" min="1" max="52" @change="getNewCharts()"/>
            </p>
          </div>
          <div class="col s1" v-else>
            <p class="range-field">
              <input v-model='weeks' type="range" id="test5" min="1" max="52" @change="getCharts()"/>
            </p>
          </div>

        </div>
        <div class="row">
          <div class="col s12">
            <table class="defaultTable chartsTable" v-if="chartsPaginated.length > 0">
              <tbody>
                <tr v-for="item in chartsPaginated" :key="item.album_id">
                  <td class="rank">
                    <p class="class-ranking">{{item.rank}}</p>
                  </td>
                  <td style="width: 60%;">
                    <ul>
                      <router-link :to="{name:'AlbumDetail', params:{albumParam:item.album_id} }" class="links">{{item.album_name}}</router-link> 
                      <!--router-link :to="{name:'ArtistDetail', params:{albumParam:item.artist_id} }">{{item.artist_name}}</router-link--> 
                      <li>{{ item.artist_name }}</li>
                    </ul>
                  </td>
                  <td style="width: 28%;">
                    <ul>
                      <li>{{ item.genre }}</li>
                      <li> {{ item.album_id }}</li>
                    </ul>
                  </td>
                  <td class="play-time tooltipped" data-tooltip="Times played">
                    {{ item.times_played }}
                  </td>
                </tr>
              </tbody>
            </table>
            <h1 class="noresults" v-else>No Results Found</h1>

            <div class="row bottom-button">
              <div class="col s5"></div>
              <div class="col s1">
                <defaultButton @click.native="previousCharts()">
                  <i class="material-icons" style="font-size: 7vh;">navigate_before</i>
                </defaultButton>
              </div>
              <div class="col s1">
                <defaultButton @click.native="nextCharts()">
                  <i class="material-icons" style="font-size: 7vh;">navigate_next</i>
                </defaultButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang='ts' src="./Charts.ts"/>

<style lang="scss" src="./Charts.scss">
</style>
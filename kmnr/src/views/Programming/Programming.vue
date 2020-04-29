<template>
  <div class="full-deets" :class="{'opened-table': timeTableOpen}">
    <div class="container" v-if="curUser !== ''">
      <div class="row">
        <div class="col s12">
          <h1>
            <span class="heading-charts-main fadein">Programming</span>
          </h1>
        </div>
      </div>
      <div class="row program-contents">
        <div class="col s6">
          <div class="log-container">
            <div class="log-contents">
              <div v-for="(log, index) in schedule[curIndex]" :key="log[0].id">
                <div class="log-entry">
                  <div class="log-header">
                    <span class="time">{{toTime(log[0].time)}}</span>
                    <span class="day">{{curDay(log[0].day)}}</span>
                    <span class="station-id"><span class="sid-label">Station Identified</span><a @click="stationIdentified(index)">
                      <i class="material-icons-round" :class="{
                        'disabled': Math.abs(curIndex - today) > 1,
                        'enabled': Math.abs(curIndex - today) <= 1
                        }" v-if="identEnteredList[(curIndex * 3) + (index - offset)] !== false">check_circle</i>
                      <i class="material-icons-round" :class="{
                        'disabled': Math.abs(curIndex - today) > 1,
                        'enabled': Math.abs(curIndex - today) <= 1
                        }" v-else>radio_button_unchecked</i>
                    </a></span>
                  </div>
                  <div class="log-body" v-for="(type, index2) in log" :key="type.id">
                    <span class="type">{{type.program_type}}</span>
                    <span class="delete" v-if="Math.abs(curIndex - today) <= 1 && entrySchedule[curIndex][index][index2] !== ''">
                      <a @click="deleteProgram(index, index2)"><i class="material-icons-round">delete</i></a>
                    </span>
                    <span class="delete-disabled" v-else>
                      <a><i class="material-icons-round">delete_outline</i></a>
                    </span>
                    <div v-if="typeof entrySchedule[curIndex][index][index2] === 'string' || entrySchedule[curIndex][index][index2] === null" class="program-name input-field">
                      <input :id="type.id + 'a'"
                        class="program-input"
                        type="text"
                        v-model="entrySchedule[curIndex][index][index2]"
                        :disabled="Math.abs(curIndex - today) > 1"
                        :class="{'disabled': Math.abs(curIndex - today) > 1,
                                  ['autocomplete-' + type.program_type.replace(/[^0-9A-Za-z]+/g, '-')]: true}"
                        @keyup.enter="insertProgram(index, index2)"
                        @keyup.esc="cancelInsert(index,index2)"
                        placeholder="Program Name"/>
                    </div>
                    <div v-else class="program-name">
                      <a class="program-name-entered" @click="editProgramEntry(index, index2)">{{entrySchedule[curIndex][index][index2].program_name}}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-buttons col s1">
          <div class="up">
            <a @click="pageDown()"><i class="material-icons-round">keyboard_arrow_up</i></a>
          </div>
          <div class="current-day">
            <a @click="setToCurDay()"><i class="material-icons-round tooltipped" data-tooltip="Today">today</i></a>
          </div>
          <div class="down">
            <a @click="pageUp()"><i class="material-icons-round">keyboard_arrow_down</i></a>
          </div>
        </div>
        <div class="col s5">
          <md-table class="table" v-model="programs" md-card>
            <md-table-toolbar>
              <div class="inputSearch center">
                <input v-model=typeSearch type="text" class="search-bar" placeholder="Search programming by type"
                  @keyup.enter="searchProgram()">
                <input v-model=nameSearch type="text" class="search-bar" placeholder="Search programming by name">
              </div>
            </md-table-toolbar>
            <md-dialog-alert md-title="Post created!"
              md-content="Your post <strong>Material Design is awesome</strong> has been created." />
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell class="add-btn-col" md-label="Add">
                <a class="program-adder" @click="addToQueue(item)"><i class="material-icons-round">playlist_add</i></a>
                <a class="program-adder" @click="openLogEntries(item)"><i class="material-icons-round">queue</i></a>
              </md-table-cell>
              <md-table-cell md-label="Type" md-sort-by="id" md-numeric>{{ item.type }}
                <md-tooltip md-direction="top">More information</md-tooltip>
              </md-table-cell>
              <md-table-cell md-label="Name" md-sort-by="name">{{item.name}} </md-table-cell>
              <md-table-cell md-label="Months"></md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
    <TimeTable id="time-table" class="time-table" v-if="timeTableOpen" :possibleTimes="openTimes" @closeTable="closeTable" @addToSlot="addToSlot" />
  </div>
</template>

<script lang="ts" src="./Programming.ts" />


<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");
  .heading-charts-main {
    padding-top: 5.5%;
    display: block;
    font-size: 3.75vw;
    text-align:center;
    padding-bottom: 0%;
    padding-left: 10%;
    margin-bottom: 0%;
    color: black;
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
  .nav-buttons {
    padding-left: 0px;
    padding-right: 0px;

    width: 3em !important;

    position: relative;
    top: 14.5em;

    user-select: none;

    .material-icons-round {
      cursor: pointer;
      color: black;
      font-size: 40px;
    }

    .up {
      margin-bottom: 2em;
    }

    .down {
      margin-top: 2em;
    }
  }

  .row {
    margin-bottom: 0px;
  }

  .container {
    margin-left: 13%;
  }

  .log-container {
    background-color: rgba(0,0,0,.25);
    height: 40em;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    position: relative;
    margin-top: 4px;

    .log-entry {
      height: 13rem;
    }

    .log-header {
      background-color: #d5fefd;
      background-image: linear-gradient(315deg, #d5fefd 0%, #fffcff 74%);
      opacity: 80%;
      height: 2.5em;
      user-select: none;
    }

    .log-body {
      position: relative;
      margin-top: 1.5em;
      margin-left: 1em;
      margin-right: 1em;
      height: 3em;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
      background-color:rgba(220,225,220,.15);
      border-radius: 5px;

      z-index: 99;

      .type {
        position: relative;
        left: 3%;
        top: 25%;
        width: 25%;
        height: 1.2em;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .time {
      color: black;
      font-size: 1.7em;
      top: 15%;
      left: 1%;
      position: relative;
    }

    .day {
      color: rgba(0,0,0,.5);
      left: 2%;
      position: relative;
      top: 15%;
      font-size: 15px;
    }

    .station-id {
      position: relative;
      float: right;
      margin-right: 2em;
      margin-top: .5%;

      .sid-label {
        position: relative;
        bottom: .7em;
        margin-right: .5em;
      }

      .material-icons-round {
        font-size: 30px;
      }

      .enabled {
        cursor: pointer;
        color: #4daf7c;
      }

      .disabled {
        cursor: not-allowed;
        color: #393939;
      }

      a:hover {
        text-decoration: none;
      }
    }

    .program-name {
      width: 10vw;
      margin-right: 25%;
      bottom: 1.5em;
      height: 0px;
      position: relative;
      float: right;

      .program-name-entered {
        color: black;
        font-size: 1.5em;
        top: 1.6em;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 10vw;
        height: 30px;
        white-space: nowrap;
        display: inline-block;
      }

      label {
        margin-top: 7px;
        color: black;
      }

      .disabled {
        cursor: not-allowed;
      }
    }

    .delete {
      position: relative;
      float: right;
      margin-top: .8em;

      right: 2em;

      .material-icons-round {
        color: black;
        cursor: pointer;
        user-select: none;
      }
    }

    .delete-disabled {
      position: relative;
      float: right;
      margin-top: .8em;

      right: 2em;

      .material-icons-round {
        color: #393939;
        cursor: not-allowed;
        user-select: none;
      }
    }
  }

  .main {
    margin: 0 auto;
  }
  .full-deets{
    background-image: url('../../assets/back7.jpg');
    background-size: cover;
    min-height: 100%;
    height: auto;

    .program-contents {
      margin-top: 3em;
    }
  } 
  .table {
    position: absolute;
    color: black;
    width: 35% !important;
    margin-left: 5% !important;
    height: 40em !important;

    .inputSearch {
      width: 39em;
      display: inherit;
    }

    .search-bar {
      margin-right: 2em;
    }

    .add-btn-col {
      width: 0%;
    }

    .program-adder {
      position: relative;
      top: 3px;

      .material-icons-round {
        cursor: pointer;
        color: black;
        font-size: 1.5em;
        user-select: none;
      }
    }
  }

  .prog-heading-main {
    display: block;
    font-size: 3.5vw;
    font-weight: 60;
    padding-top: 3%;
    padding-left: 38%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
  }

  .album-image {
    border: 7px solid black;
    padding: 2px;
    width: 100%;
    background-color: black;
  }

  .md-card {
    width: 220px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-title {
    font-family: 'Montserrat';
  }


  #flex-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: 5%;
  }
@media screen and (max-width: 800px) {
  #flex-container{
    flex-direction: column;
    margin-left: 10%;
  }
  .flex-child {
    margin-left: 20%;
    padding-bottom: 50px;
  }
  .row{
    margin-left: 20%;
  }
}
  .flex-child {
    margin-left: 30%;
  }

  .md-card {
    opacity: 90%
  }

  .md-table {
    width: 100vw;
    height: 50vh;
    opacity: 90%;
  }

  #first {
    color: black;
  }

  #review {
    color: black;
  }

  #last {
    color: black;
  }

  .row {
    margin-right: 0px;
  }

  h1 {
    margin: 0px;
  }

  .full-deets {
    padding-top: 4%;
  }

  .time-table {
    position: absolute;
    z-index: 999;
    left: 35%;
    top: 25%;
  }
 
  //----------- Fixing materialize stuff to get better looks -----------//
  /* label focus color */
  .duration input[type=text]:focus + label {
      color: #000;
  }

  /* label underline focus color */
  .duration input[type=text]:focus {
      border-bottom: 1px solid #000;
      box-shadow: 0 1px 0 0 #000;
  }


  /* Inactive/Active Default input field color */
    .input-field input[type=text]:not([readonly])::placeholder,
    .input-field input[type=text]:focus:not([readonly])::placeholder,
    .input-field textarea:not([readonly])::placeholder,
    .input-field textarea:focus:not([readonly])::placeholder {
      color: black;
      position: relative;
    }

    .input-field input[type=text]:not([readonly]):disabled::placeholder,
    .input-field input[type=text]:focus:not([readonly]):disabled::placeholder,
    .input-field textarea:not([readonly]):disabled::placeholder,
    .input-field textarea:focus:not([readonly]):disabled::placeholder {
      color: #393939;
      position: relative;
    }

    .input-field input[type=text]:not([readonly]),
    .input-field input[type=text]:focus:not([readonly]),
    .input-field textarea:not([readonly]),
    .input-field textarea:focus:not([readonly]) {
        border-bottom: 1px solid black;
        box-shadow: 0 0px 0 0 black;
    }

    .input-field input[type]:not([readonly]):disabled,
    .input-field input[type]:focus:not([readonly]):disabled,
    .input-field textarea:not([readonly]):disabled,
    .input-field textarea:focus:not([readonly]):disabled {
        border-bottom: 1px dotted #393939;
        box-shadow: 0 0px dotted 0 0 #393939 !important;
    }

    /* Inactive/Active Default input label color */
    .input-field input[type]:focus:not([readonly])+label,
    .input-field textarea:focus:not([readonly])+label {
        color: #000;
    }

    /* Active/Inactive Invalid input field colors */
    .input-field input[type].invalid,
    .input-field input[type].invalid:focus,
    .input-field textarea.invalid,
    .input-field textarea.invalid:focus {
        border-bottom: 1px solid #e57373;
        box-shadow: 0 1px 0 0 #e57373;
    }

    /* Active/Inactive Invalid input label color */
    .input-field input[type].invalid:focus+label,
    .input-field input[type].invalid~.helper-text::after,
    .input-field input[type].invalid:focus~.helper-text::after, 
    .input-field textarea.invalid:focus+label,
    .input-field textarea.invalid~.helper-text::after,
    .input-field textarea.invalid:focus~.helper-text::after {
        color: #e57373;
    }

    /* Active/Inactive Valid input field color */
    .input-field input[type].valid,
    .input-field input[type].valid:focus,
    .input-field textarea.valid,
    .input-field textarea.valid:focus {
        border-bottom: 1px solid #26a69a;
        box-shadow: 0 1px 0 0 #26a69a;
    }

    /* Active/Inactive Valid input label color */
    .input-field input[type].valid:focus+label,
    .input-field input[type].valid~.helper-text::after,
    .input-field input[type].valid:focus~.helper-text::after,
    .input-field textarea.valid:focus+label,
    .input-field textarea.valid~.helper-text::after,
    .input-field textarea.valid:focus~.helper-text::after {
        color: #26a69a;
    }
</style>
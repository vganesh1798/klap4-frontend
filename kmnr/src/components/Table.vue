<template>
    <div id="defaultTable">
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Table extends Vue {
}
</script>

<style lang="scss">
.defaultTable {
  //background-color: rgba(70, 68, 68, .07);
  color:rgb(70, 68, 68);
  //width: 100%;
  //width: 1350px;
  font-size: 14px;
  font-family: Montserrat;
  table-layout: fixed !important;
  //border-radius: 3%;
}

.defaultTable tr {
  height: 40px !important;
}

.defaultTable td {
  height: 20px !important;
  padding: 0 0 0 0%;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap;
}
</style>
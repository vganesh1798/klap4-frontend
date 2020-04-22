<template>
  <button id="defaultButton">
    <slot>Button</slot>
  </button>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
}
</script>

<style lang="scss" scoped>

#defaultButton {
  font-family: 'Montserrat';
  font-size: 14px;
  text-align: center;
  border: 0;
  background: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

#defaultButton:focus {
  background: none;
  box-shadow: none;
  outline: none;
}

.colored {
  background-color: rgba(100, 100, 100, .2) !important;
  border-radius: 3% !important;
  padding: .5% !important;
}

.colored:focus {
  background-color: rgba(100, 100, 100, .2) !important;
}

</style>
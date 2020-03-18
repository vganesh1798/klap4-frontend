<template>
    <div id="favbutton">
      <button class="btn-flat" v-on:click="isToggled = !isToggled">
        <i class="material-icons" v-if="!isToggled">star_border</i>
        <i class="material-icons icon-yellow" v-if="isToggled">star</i>
      </button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class favbutton extends Vue {
    isToggled = false
}
</script>

<style lang="scss">
</style>
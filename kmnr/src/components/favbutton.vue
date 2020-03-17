<template>
    <div id="favbutton">
      <button class="btn-flat" @click="isToggled = !isToggled">
        <i class="material-icons" v-show="!isToggled">star_border</i>
        <i class="material-icons icon-yellow" v-show="isToggled">star</i>
      </button>
    </div>
</template>

<script lang='ts'>
export default {
  data(){
    return{
      isToggled: false
    }
  }
}
</script>

<style lang="scss">
</style>

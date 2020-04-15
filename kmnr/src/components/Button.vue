<template>
    <div id="defaultButton">
        <button></button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
}
</script>

<style lang="scss">
.defaultButton {
    background-color: purple;
}
</style>
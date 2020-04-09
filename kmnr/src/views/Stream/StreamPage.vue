<template>
    <div>
        <StreamingFooter />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    // import {Howl, Howler} from 'howler';
    import StreamingFooter from '../../components/StreamingFooter.vue'

    export default Vue.extend({
        name: "stream-page",
        components: {
            StreamingFooter,
        }
    });
</script>

<style type="scss" scoped>
    
</style>
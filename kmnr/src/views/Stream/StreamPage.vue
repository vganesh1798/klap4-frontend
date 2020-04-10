<template>
    <div>
        <h1>Queue</h1>
        <StreamingFooter v-if="queue.length" :musicList="queue"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import StreamingFooter from '../../components/StreamingFooter.vue'

    export default Vue.extend({
        name: "stream-page",
        components: {
            StreamingFooter,
        },
        data() {
            return {
                queue: [
                    '../../music/bitches_aint_shit.mp3'
                ]
            }
        }
    });
</script>

<style type="scss" scoped>
    
</style>
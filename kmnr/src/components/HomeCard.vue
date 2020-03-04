<template>
    <div class="card">

    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class HomeCard extends Vue {
        @Prop() private message!: string;
    }
</script>
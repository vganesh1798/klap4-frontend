<template>
    <div class="card horizontal">
        <div v-if="image_link !== null" class="card-image">
            <img :src="loadImage()">
        </div>
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">{{this.title}}</span>

                {{this.description}}
            </div>
            <div class="card-action">
                <router-link :to="search_route" class="btn green right waves-effect waves-light">
                    <i class="material-icons">keyboard_arrow_right</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class HomeCard extends Vue {
        @Prop({default: "logo.png", type: String}) private image_link!: string
        @Prop({default: "The developer forgot to pass in an actual text. Congratulations, you played yourself.", type: String}) private description!: string
        @Prop({default: "Title!", type: String}) private title!: string
        @Prop({default: "/home", type: String}) private search_route!: string

        constructor() {
            super()
        }

        loadImage() {
            if (this.image_link == 'logo.png') return require('../assets/' + this.image_link)
            else return this.image_link
        }
    }
</script>

<style lang="scss" scoped>
    .card-action {
        align-content: left !important;
    }
    .card{
        background: rgba(255, 255, 255, 0.2);
    }
    .card-stacked{
        opacity: 1;
    }
    .card-image{
        opacity: 1;
    }
    .card-title{
        color: white;
    }

    .card-content{
        color: white;
    }
</style>
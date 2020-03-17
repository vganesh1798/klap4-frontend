<template>
<div>
    <div class = "ArtistPage" v-if="artists">
        
        <h3>
            {{artistList[artists].name}} {{artistList[artists].tag}}
        </h3>

    </div>

    <div class = "ArtistPage" v-if="!artists">
        <div v-for="artist in artistList" :key="artist">

        <h3>
            {{artist.name}} {{artist.tag}} {{artist.albums}}
        </h3>

        </div>
    </div>
</div>
</template>

<script lang='ts'>
    import Vue from 'vue';

    export default Vue.extend({
        name: "ArtistPage",
        props: ["artists"],

    data() {
        return {
            artistList: {
                artist1: {
                    id: 1,
                    name: "artist 1",
                    tag: "nutty",
                    albums: [
                        "album1",
                        "album2"
                    ]
                },
                artist2: {
                    id: 2,
                    name: "artist 2",
                    tag: "semi-nutty",
                    albums: [
                        "album1",
                        "album2"
                    ]
                }
            }
        }
    }
    });
    
</script>

<style scoped>
.ArtistPage{
    margin: 40px 0 0;
    color: #42b983
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #42b983
}
</style>

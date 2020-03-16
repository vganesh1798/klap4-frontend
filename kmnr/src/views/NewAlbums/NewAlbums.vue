<template>
    <div>
        <div>
            <h1>
                <span class="heading">New Albums</span>
            </h1>
        </div>
        <div class="grid-container">
            <div class="grid-title">Album</div>
            <div class="grid-title">Artist</div>
            <div class="grid-title">Runtime</div>
            <div class="grid-title">Recommended</div>
            <div class="grid-title">Album tag</div>
            <div class="grid-title">Artist tag</div>
            <div class="grid-title">Date</div>
            <div class="grid-title">Plays</div>
            <div class="grid-item">album1</div>
            <div class="grid-item">artist1</div>
            <div class="grid-item">1234</div>
            <div class="grid-item">yess</div>
            <div class="grid-item">2345</div>
            <div class="grid-item">3456</div>
            <div class="grid-item">01/01/01</div>
            <div class="grid-item">4567</div>
            <div class="grid-item">album2</div>
            <div class="grid-item">artist2</div>
            <div class="grid-item">5678</div>
            <div class="grid-item">nooo</div>
            <div class="grid-item">6789</div>
            <div class="grid-item">7890</div>
            <div class="grid-item">02/02/02</div>
            <div class="grid-item">8901</div>
            <div class="grid-item">album2</div>
            <div class="grid-item">artist2</div>
            <div class="grid-item">5678</div>
            <div class="grid-item">nooo</div>
            <div class="grid-item">6789</div>
            <div class="grid-item">7890</div>
            <div class="grid-item">02/02/02</div>
            <div class="grid-item">8901</div>
            <div class="grid-item">album2</div>
            <div class="grid-item">artist2</div>
            <div class="grid-item">5678</div>
            <div class="grid-item">nooo</div>
            <div class="grid-item">6789</div>
            <div class="grid-item">7890</div>
            <div class="grid-item">02/02/02</div>
            <div class="grid-item">8901</div>
            <div class="grid-item">album2</div>
            <div class="grid-item">artist2</div>
            <div class="grid-item">5678</div>
            <div class="grid-item">nooo</div>
            <div class="grid-item">6789</div>
            <div class="grid-item">7890</div>
            <div class="grid-item">02/02/02</div>
            <div class="grid-item">8901</div>
            
        </div>
    </div>
</template>

<script lang='ts' src="./NewAlbums.ts">
      
</script>

<style lang="scss">
    .heading {
        display: block;
        font-size: 150px;
        font-weight: 90;
        margin-top: 100;
        left: 50%;
        color: black;
        font-family: 'Covered By Your Grace';
        animation-name: moveInleft;
        animation-duration: 1s; }

    .grid-container {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto auto auto auto;
        grid-gap: 5px;
        background: rgba(253, 240, 185, .8);
        border:black;
        border-style: solid;
        border-width:3px;
        padding: 10px;
        margin-left: 1%; // cannot for the life of me figure out how to center this
        margin-right: 1%;
        color: black;
        text-align: center;
        white-space: nowrap; }

    .grid-title {
        font-family: 'Covered By Your Grace';
        font-size: 30px;
        padding: 20px;
        background: rgba(190, 190, 190, 1); }

    .grid-item {
        font-family: Montserrat;
        font-size: 20px;
        padding: 10px;
        background: rgba(210, 210, 210, 1); }

</style>
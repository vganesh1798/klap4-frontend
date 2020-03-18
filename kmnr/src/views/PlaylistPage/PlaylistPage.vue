<template>
    <div class="full-page container">
        <div class="row">
            <h1 class="col s5 offset-s3 title">Create New Log</h1>
        </div>
        <div class="row">
            <form class="col offset-s3 s6">
                <div class="row">
                    <div class="input-field col s6">
                        <label required for="name">Name</label>
                        <input type="text" id="name" />
                    </div>
                    <div class="input-field col s6">
                        <label required for="show">Show</label>
                        <input type="text" id="show" />
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <label for="comment">Comment</label>
                        <input required class="col lg6" type="text" id="label" />
                    </div>
                </div>
                <button class="btn purple" type="submit" v-on:click="jumpLog">Create new Playlist</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./PlaylistPage.ts" />

<style lang="scss" scoped>
    .full-page {
        padding-top: 15%;
    }

    .title {
        margin: 0px;
    }
</style>
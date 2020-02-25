<template>
    <div>
        <div class="text">
            <h1 class="heading-primary">
                <span class="heading-primary-main">KMNR</span>
                <span class="heading-primary-sub">89.7FM</span>
            </h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-page"
    }
</script>

<style >
    .text {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center; }

    .heading-primary-main {
        display: block;
        font-size: 60px;
        font-weight: 100;
        animation-name: moveInleft;
        animation-duration: 2s;
        color: white;
        font-family: Montserrat;
    }

    .heading-primary-sub {
        display: block;
        font-size: 16.5px;

        font-family: Copperplate;
        margin-top: 10px;
        animation-name: moveInright;
        animation-duration: 2s;
        color: white; }

    @keyframes moveInleft {
        0% {
            opacity: 0;
            transform: translateX(-20px); }
        100% {
            opacity: 1;
            transform: translate(0); } }

    @keyframes moveInright {
        0% {
            opacity: 0;
            transform: translateX(20px); }
        100% {
            opacity: 1;
            transform: translate(0); } }


</style>

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
        font-size: 150px;
        font-weight: 100;
        padding-bottom: 45%;
        animation-name: moveInleft;
        animation-duration: 2s;
        color: Black;
        font-family: 'Covered By Your Grace';
    }

    .heading-primary-sub {
        display: block;
        font-size: 50px;
        padding-top: 30%;
        font-family: Montserrat;
        margin-top: 10px;
        animation-name: moveInright;
        animation-duration: 2s;
        color: black; }

    @keyframes moveInleft {
        0% {
            opacity: 0;
            transform: translateX(-180px); }
        100% {
            opacity: 1;
            transform: translate(0); } }

    @keyframes moveInright {
        0% {
            opacity: 0;
            transform: translateX(180px); }
        100% {
            opacity: 1;
            transform: translate(0); } }


</style>

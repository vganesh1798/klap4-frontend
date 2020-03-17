<template>
    <div class="full-home">
        <div class="bg-home">
            <div class="text">
                <h1 class="heading-primary">
                    <span class="heading-primary-main">KMNR</span>
                    <span class="heading-primary-sub">89.7FM</span>
                </h1>
            </div>
        </div>
        
        <div class="container row">
            <div id="cards">
                <HomeCard class="card card-left-on-scroll col s12 l6" :style="{
                        'visibility': scrolledL ? 'visible' : 'hidden',
                        'animation-name': scrolledL ? 'moveInLeft' : ''
                    }"/>
                <HomeCard class="card card-right-on-scroll col s12 l6 offset-l4" :style="{
                        'visibility': scrolledR ? 'visible' : 'hidden',
                        'animation-name': scrolledR ? 'moveInRight' : ''
                    }"/>
            </div>
        </div>
    </div>
</template>

<script lang='ts' src="./HomePage.ts" />

<style lang="scss">
    .full-home {
        height: 200%;
    }

    .bg-home {
        background-image: url('../assets/back.jpg');
        background-size: cover;
        background-repeat: repeat;
        background-attachment:local;
        background-position: center;
        height: 50%;
    }

    .text {
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .heading-primary-main {
        display: block;
        font-size: 150px;
        font-weight: 100;
        padding-bottom: 65%;
        animation-name: moveInLeft;
        animation-duration: 2s;
        color: Black;
        font-family: 'Covered By Your Grace';
    }

    .heading-primary-sub {
        display: block;
        font-size: 50px;
        padding-top: 60%;
        font-family: Montserrat;
        margin-top: 10px;
        animation-name: moveInRight;
        animation-duration: 2s;
        color: black; 
    }

    #cards {
        top: 85%;
        position: absolute;
    }
    
    .card {
        margin-top: 10em;
    }

    .card-left-on-scroll {
        animation-duration: 2s;
    }

    .card-right-on-scroll {
        animation-duration: 2s;
    }

    @keyframes moveInLeft {
        0% {
            opacity: 0;
            transform: translateX(-180px); 
        }
        100% {
            opacity: 1;
            transform: translate(0); 
        } 
    }

    @keyframes moveInRight {
        0% {
            opacity: 0;
            transform: translateX(180px);
        }
        100% {
            opacity: 1;
            transform: translate(0); 
        }
    }

    @keyframes moveInFront {
        0% {
            opacity: 0;
            transform: scale(.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>

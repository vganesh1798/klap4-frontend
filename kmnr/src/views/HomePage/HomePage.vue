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
        
        <div class="bg-cards">
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
    </div>
</template>

<script lang='ts' src="./HomePage.ts" />

<style lang="scss">
    .full-home {
        height: 200%;
    }

    .bg-home {
        background-image: url('../../assets/back.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment:local;
        background-position: center;
        height: 50%;
    }

    .text {
        position: absolute;
        top: 48%;
        left: 48%;
        transform: translate(-90%, -30%);
        text-align: center;
    }

    .heading-primary{
            width: 10vw;
            margin: 0 auto;
    }
    .heading-primary-main {
        display: block;
        font-size: 6vw;
        font-weight: 50;
        text-align: left;
        padding-bottom: 65%;
        animation-name: moveInLeft;
        animation-duration: 2s;
        color: Black;
        font-family: 'Covered By Your Grace';
    }

    .heading-primary-sub {
        display: block;
        font-size: 3vw;
        padding-left: 60%;
        font-family: Montserrat;
        margin-top: 10px;
        animation-name: moveInRight;
        animation-duration: 2s;
        color: black; 
    }

    #cards {
        top: 90%;
        position: absolute;
    }
    
    .bg-cards {
        background-image: url('../../assets/back1.jpg');
        height: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .card {
        margin-top: 10em;
        opacity: 1;
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

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

    body {
    overflow-x: hidden;
}
    .heading-primary{
            display: flex;

    }
    .heading-primary-main {
        font-size: 12vw;
        font-weight: 50;
        float: left;
        text-align: left;
        margin-top: 5vw;
        padding-left: 250vw;
        animation-name: moveInLeft;
        animation-duration: 2s;
        color: Black;
        font-family: 'Covered By Your Grace';
    }

    .heading-primary-sub {
        flex-direction: row;
        float: right;
        font-size: 8vw;
        font-family: Montserrat;
        padding-top: 25vw;
        animation-name: moveInRight;
        animation-duration: 2s;
        color: black; 
    }

    #cards {
        position: absolute;
        width: 90vw;
        padding-right: 4vw;
    }
    
    .bg-cards {
        background-image: url('../../assets/back1.jpg');
        background-size: 100%;
        height: 70%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    body {
    border: 1px solid transparent;
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

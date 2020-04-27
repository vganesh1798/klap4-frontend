<template>
    <div class="full-time-table">
        <div class="blur-background" @click="closeTable"></div>
        <div class="time-table container">
            <div class="row">
                <div class="col l11"></div>
                <div class="col l1">
                    <defaultButton class="closeBtn" @click.native="closeTable" type="submit">X</defaultButton>
                </div>
                <h1>Choose a Slot</h1>
            </div>
            <div class="row">
                <div class="col s6 offset-s2">
                    <div class="table">
                        <ul>
                            <li class="time-slot" v-for="time in possibleTimes" :key="time.time + time.slot.toString()">
                                <span class="time">{{time.time}}</span><span class="slot">Slot ID:{{time.slot}}</span>
                                <span class="add-btn"><a @click="addToSlot()"><i class="material-icons-round">playlist_add</i></a></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import defaultButton from './Button.vue';

@Component({
    components: {
        defaultButton
    }
})
export default class TimeTable extends Vue {
    @Prop({type: Array, default: []}) possibleTimes
    close = false


    @Emit('closeTable') 
    closeTable() {
        this.close = true
    }
}
</script>

<style lang="scss" scoped>
    .row {
        height: 2em;
    }

    h1 {
        color: black;
        text-align: center;
        font-size: 48px;
    }
    
    .time-table {
        width: 30%;
        height: 50%;
        background-color: white;
        border-radius: 3px;
        position: fixed;
        z-index: 9999;
    }
    
    .blur-background {
        backdrop-filter: blur(2px);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        width: 100%;
        padding: 0% 5% 20% 5%;
        z-index: -1;
        background-color: rgba(0,0,0,.65)
    }

    .closeBtn {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: black;
    }

    .table {
        position: fixed;
        margin-top: 1.5em;
        height: 30%;
        width: 20%;
        overflow-y: auto;
        background-color: rgba(200,200,200,.4);

        .material-icons-round {
            cursor: pointer;
            font-size: 25px;
            color: black;
            float: right;
            padding-right: 10px;
        }

        .time-slot {
            height: 2em;
            margin-bottom: 5px;

            &:hover {
                background-color: rgba(0,0,0,.3)
            }
        }

        .time {
            font-size: 20px;
            margin-bottom: 30px;
            margin-left: .5em;
        }

        .slot {
            color: rgba(0,0,0,.5);
            font-size: 13px;
            margin-left: 10px;
        }
    }
</style>
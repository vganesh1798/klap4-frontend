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
                            <li class="time-slot" v-for="time in possibleTimeWithDays" :key="time.id">
                                <div v-if="!time.header">
                                    <span class="time">{{toTime(time.time)}}</span><span class="slot">Slot ID: {{time.id}}</span>
                                    <span class="add-btn"><a @click="addToSlot(time)"><i class="material-icons-round">playlist_add</i></a></span>
                                </div>
                                <div v-else>
                                    <span class="day">{{getDay(time.day)}}</span>
                                </div>
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

enum Days {
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
}

@Component({
    components: {
        defaultButton
    }
})
export default class TimeTable extends Vue {
    @Prop({type: Array, default: []}) possibleTimes
    close = false

    possibleTimeWithDays: any = []

    created() {
        this.createListOfDays()
    }

    createListOfDays() {
        let firstDaySet = true
        let secondDaySet = false
        let firstDay = 0

        for (let idx in this.possibleTimes) {
            let time: any = this.possibleTimes[idx]
            if (firstDaySet) {
                firstDay = time.day
                firstDaySet = false
                secondDaySet = true
                this.possibleTimeWithDays.push({'time': '0','day': time.day, 'id': time.id*3, 'header': true})
            } else if (secondDaySet && time.day !== firstDay) {
                secondDaySet = false
                this.possibleTimeWithDays.push({'time': '0','day': time.day, 'id': time.id*3, 'header': true})
            }
            this.possibleTimeWithDays.push({'time': time.time,'day': time.day, 'id': time.id, 'header': false})
        }
        console.log(this.possibleTimeWithDays)
    }

    toTime(time) {
        let hours = time.substr(0,time.indexOf(':'))
        let finalTime = '12:00 PM'

        if (hours > 12 || hours == 0) {
            hours = Math.abs(hours - 12)
            finalTime = hours + ':00 '
            if (hours % 12 === 0) finalTime += 'AM'
            else finalTime += 'PM'
        } else {
            finalTime = hours + ':00 '
            if (hours % 12 === 0) finalTime += 'PM'
            else finalTime += 'AM'
        }

        return finalTime
    }

    @Emit('closeTable') 
    closeTable() {
        this.close = true
    }

    getDay(idx) {
        return Days[idx]
    }

    @Emit('addToSlot')
    addToSlot(timeSlot) {
        return timeSlot
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

        border-radius: 3px;

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
            border-bottom: 1px solid;
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

        .day {
            font-size: 25px;
            margin-left: .25em;
        }
    }
</style>
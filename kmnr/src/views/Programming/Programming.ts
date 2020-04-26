import { Component, Vue } from 'vue-property-decorator';

import {ProgramSearch, ProgramSlots, ProgramLogEntry} from '../../Models/Program';


enum Days {
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
}

@Component
export default class Programming extends Vue {
    constructor() {
        super()
    }

    range: any = (start, stop, step = 1) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

    programs = [];
    typeSearch = "";
    nameSearch = "";
    
    logEntry = [];
    slotIdSearch = "";
    djSearch = "";
    newNameSearch = "";
    timestampSearch = "";


    logList = []

    schedule: any = []
    curIndex: number = 0
    today: number = 0

    identified = true

    programName = ''
    duration = ''

    scheduleInputs: any = [['', ''], ['', ''], ['', '']]

    curDay(ind) {
        return Days[ind]
    }

    getAllPrograms() {
        this.$store.dispatch('getAllPrograms')
            .then(res => {
                this.programs = this.$store.state.programs;
            });
    }

    getAllLogs() {
        this.$store.dispatch('getProgramSlots').then(() => {
            this.logList = this.$store.state.schedule.program_slots.yesterday.concat(this.$store.state.schedule.program_slots.today, this.$store.state.schedule.program_slots.tomorrow)
            this.pagnateHours(this.logList.length/3)
        })
    }

    created() {
        this.getAllPrograms();
        this.getAllLogs();
    }

    stationIdentified() {
        this.identified = !this.identified
    }

    pagnateHours(fullHour) {
        for (let idx = 0; idx < this.logList.length; idx++) {
            if ((this.logList[idx] as ProgramSlots).program_type === 'station_id')
                this.logList.splice(+idx,1)
        }
    
        let curHour = new Date().getHours() + 24
        
        if (curHour === 0) curHour = 24

        const beginLogs = [this.setLogs(0), this.setLogs(1), this.setLogs(2)]
        const endLogs = [this.setLogs(fullHour - 3), this.setLogs(fullHour - 2), this.setLogs(fullHour - 1)]

        const midToBackRange = this.range(curHour, fullHour - 2, 3)
        const frontToMidRange = this.range(curHour, 1, -3)

        let frontToMidLogs: any  = []
        let midToBackLogs: any = []

        for (let i in frontToMidRange) {
            frontToMidLogs.push([this.setLogs(frontToMidRange[i] - 1), this.setLogs(frontToMidRange[i]), this.setLogs(frontToMidRange[i] + 1)])
        }

        console.log(frontToMidLogs)

        for (let i in midToBackRange) {
            if (midToBackRange[i] !== curHour) {
                midToBackLogs.push([this.setLogs(midToBackRange[i] - 1), this.setLogs(midToBackRange[i]), this.setLogs(midToBackRange[i] + 1)])
            }
        }

        frontToMidLogs.reverse()

        this.schedule = [beginLogs, ...frontToMidLogs, ...midToBackLogs, endLogs]

        this.curIndex = frontToMidLogs.length

        this.today = this.curIndex
    }

    pageUp() {
        if (this.curIndex + 1 < this.schedule.length)
            this.curIndex += 1

    }   

    pageDown() {
        if (this.curIndex - 1 > 0)
            this.curIndex -= 1

        console.log(this.curIndex)
    }

    setToCurDay() {
        this.curIndex = this.today
    }

    setLogs(index): Array<number> {
        const newIndex = index * 2
        return [this.logList[newIndex], this.logList[newIndex + 1]]
    }

    searchProgram() {
        const searchParam: ProgramSearch = {
            type: this.typeSearch.toLowerCase(),
            name: this.nameSearch.toLowerCase(),
        };
        this.$store.dispatch('getQueriedPrograms', searchParam)
            .then(res => {
                this.programs = this.$store.state.programs;
            });
    }

    postLogEntry() {
        const logParams: ProgramLogEntry = {
            type: this.typeSearch.toLowerCase(),
            name: this.nameSearch.toLowerCase(),
            slotId: +this.slotIdSearch,
            dj: this.djSearch,
            newName: '',
            timestamp: ''
        };
        this.$store.dispatch('postProgramLogEntry', logParams)
            .then(res => {
               this.logEntry = this.$store.state.logEntry;
            }
        );
    }

    updateLogEntry() {
        const logParams: ProgramLogEntry = {
            type: this.typeSearch.toLowerCase(),
            name: this.nameSearch.toLowerCase(),
            slotId: +this.slotIdSearch,
            dj: this.djSearch,
            newName: this.newNameSearch,
            timestamp: ''
        };

        this.$store.dispatch('updateProgramLogEntry', logParams)
            .then(res => {
               this.logEntry = this.$store.state.logEntry;
            }
        );
    }

    removeLogEntry() {
        const logParams: ProgramLogEntry = {
            type: this.typeSearch.toLowerCase(),
            timestamp: this.timestampSearch,
            dj: this.djSearch,
            slotId: 0,
            name: '',
            newName: ''
        };

        this.$store.dispatch('removeProgramLogEntry', logParams)
            .then(res => {
               this.logEntry = this.$store.state.logEntry;
            }
        );
    }

    toTime(time) {
        let hours = time.substr(0,time.indexOf(':'))
        let finalTime = '12:00 PM'

        if (hours > 12 || hours == 0) {
            hours = Math.abs(hours - 12)
            finalTime = hours + ':00 '
            if (hours === 12) finalTime += 'AM'
            else finalTime += 'PM'
        } else {
            finalTime = hours + ':00 '
            if (hours === 12) finalTime += 'PM'
            else finalTime += 'AM'
        }

        return finalTime
    }
}
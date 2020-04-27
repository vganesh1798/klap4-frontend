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

    logList: any = []
    identList: any = []

    editingEntry: any = {}

    offset: number = 0

    identEnteredList: any = []

    logEntries: any = []
    logEntriesResponse: any = []

    schedule: any = []
    entrySchedule: any = []

    curIndex: number = 0
    today: number = 0

    identified = true
    editing = false

    programName = ''
    duration = ''

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
            this.logEntriesResponse = this.$store.state.schedule.program_log_entries.yesterday.concat(this.$store.state.schedule.program_log_entries.today, this.$store.state.schedule.program_log_entries.tomorrow)

            for (let i in this.logList) {
                let entryIdx = this.logEntriesResponse.map(entry => {return entry.slot_id}).indexOf(this.logList[i].id)
                if (entryIdx !== -1)
                    this.logEntries.push(this.logEntriesResponse[entryIdx])
                else
                    this.logEntries.push(null)
            }

            this.pagnateHours(this.logList.length/3)
        })
    }

    created() {
        this.getAllPrograms();
        this.getAllLogs();
    }

    stationIdentified(idx) {
        const identIndex = (this.curIndex * 3) + (idx - this.offset)
        if (Math.abs(this.curIndex - this.today) <= 1) {
            if (this.$store.state.currentUser !== '' || this.$store.state.currentUser !== 'Anonymous') {
                if (this.identEnteredList[identIndex] !== false) {
                    const stationIdParams: ProgramLogEntry = {
                        type: 'station_id',
                        name: '',
                        slotId: this.identEnteredList[identIndex].slot_id,
                        timestamp: this.identEnteredList[identIndex].timestamp,
                        dj: this.$store.state.currentUser,
                        newName: ''
                    }

                    this.$store.dispatch('removeProgramLogEntry', stationIdParams).then(res => {
                        this.identEnteredList[identIndex] = false
                        this.$forceUpdate()
                    })
                } else {
                    const stationIdParams: ProgramLogEntry = {
                        type: 'station_id',
                        name: '',
                        slotId: this.identList[identIndex].id,
                        timestamp: '',
                        dj: this.$store.state.currentUser,
                        newName: ''
                    }

                    this.$store.dispatch('postProgramLogEntry', stationIdParams).then(res => {
                        this.identEnteredList[identIndex] = res
                        console.log(res)
                        this.$forceUpdate()
                    })
                }
            }
        }
    }

    editProgramEntry(schedOffsetIdx, logIdx) {
        if (Math.abs(this.curIndex - this.today) <= 1) {
            this.editing = true
            let progName = this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].program_name
            this.editingEntry = {...this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx]}
            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = progName
            this.$forceUpdate()
        }
    }

    cancelInsert(schedOffsetIdx, logIdx) {
        if (this.editing) {
            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = this.editingEntry
            this.editing = false
            console.log(this.entrySchedule)
        } else {
            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = null
        }
    }

    insertProgram(schedOffsetIdx, logIdx) {
        const nameIndex = (this.curIndex * 6) + ((schedOffsetIdx * 2) + logIdx - (this.offset * 2))

        if (Math.abs(this.curIndex - this.today) <= 1) {
            if (this.editing) {
                this.editing = false

                //TODO: Add the update query here
            } else {
                const stationIdParams: ProgramLogEntry = {
                    type: 'station_id',
                    name: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx],
                    slotId: this.logList[nameIndex].id,
                    timestamp: '',
                    dj: this.$store.state.currentUser,
                    newName: ''
                }
                console.log(stationIdParams, this.logList)
                this.$store.dispatch('postProgramLogEntry', stationIdParams).then(res => {
                    this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = res
                    console.log(res)
                    this.$forceUpdate()
                })
            }
        }
    }

    deleteProgram(schedOffsetIdx, logIdx) {
        if (Math.abs(this.curIndex - this.today) <= 1) {
            const stationIdParams: ProgramLogEntry = {
                type: 'station_id',
                name: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx],
                slotId: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].slot_id,
                timestamp: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].timestamp,
                dj: this.$store.state.currentUser,
                newName: ''
            }

            this.$store.dispatch('removeProgramLogEntry', stationIdParams).then(res => {
                this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = null
                this.$forceUpdate()
            })
        }
    }

    pagnateHours(fullHour) {
        for (let idx = 0; idx < this.logList.length; idx++) {
            if ((this.logList[idx] as ProgramSlots).program_type === 'station_id') {
                if (this.logEntries[idx] !== null)
                    if (this.logEntries[idx].program_type === 'station_id')
                        this.identEnteredList.push(this.logEntries[idx])
                    else
                        this.identEnteredList.push(false)
                else
                    this.identEnteredList.push(false)

                this.identList.push(this.logList[+idx])
                this.logList.splice(+idx,1)
                this.logEntries.splice(+idx,1)
            }
        }

        let curHour = new Date().getHours() + 24
        
        if (curHour === 0) curHour = 24

        const beginLogs = [this.setLogs(0), this.setLogs(1), this.setLogs(2)]
        const endLogs = [this.setLogs(fullHour - 3), this.setLogs(fullHour - 2), this.setLogs(fullHour - 1)]

        const beginLogsEntries = [this.setLogEntries(0), this.setLogEntries(1), this.setLogEntries(2)]
        const endLogEntries = [this.setLogEntries(fullHour - 3), this.setLogEntries(fullHour - 2), this.setLogEntries(fullHour - 1)]

        const midToBackRange = this.range(curHour, fullHour - 2, 3)
        const frontToMidRange = this.range(curHour, 1, -3)

        let frontToMidLogs: any  = []
        let midToBackLogs: any = []

        let frontToMidEntries: any  = []
        let midToBackEntries: any = []

        for (let i in frontToMidRange) {
            frontToMidLogs.push([this.setLogs(frontToMidRange[i] - 1), this.setLogs(frontToMidRange[i]), this.setLogs(frontToMidRange[i] + 1)])
            frontToMidEntries.push([this.setLogEntries(frontToMidRange[i] - 1), this.setLogEntries(frontToMidRange[i]), this.setLogEntries(frontToMidRange[i] + 1)])
        }

        for (let i in midToBackRange) {
            if (midToBackRange[i] !== curHour) {
                midToBackLogs.push([this.setLogs(midToBackRange[i] - 1), this.setLogs(midToBackRange[i]), this.setLogs(midToBackRange[i] + 1)])
                midToBackEntries.push([this.setLogEntries(frontToMidRange[i] - 1), this.setLogEntries(frontToMidRange[i]), this.setLogEntries(frontToMidRange[i] + 1)])
            }
        }

        frontToMidLogs.reverse()
        frontToMidEntries.reverse()

        this.schedule = [beginLogs, ...frontToMidLogs, ...midToBackLogs, endLogs]
        this.entrySchedule = [beginLogsEntries, ...frontToMidEntries, ...midToBackEntries, endLogEntries]

        switch(frontToMidLogs[0][0][0].time) {
            case '03:00:00':
                this.offset = 0
                break
            case '02:00:00':
                this.offset = 1
                break
            case '01:00:00':
                this.offset = 2
                break
        }

        this.curIndex = frontToMidLogs.length
        this.today = this.curIndex
        console.log(this.curIndex)
        console.log(this.logEntries)
    }

    pageUp() {
        if (this.curIndex + 1 < this.schedule.length)
            this.curIndex += 1

    }   

    pageDown() {
        if (this.curIndex - 1 >= 0)
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

    setLogEntries(index) {
        const newIndex = index * 2
        return [this.logEntries[newIndex], this.logEntries[newIndex + 1]]
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
import { Component, Vue } from 'vue-property-decorator';

const M = require('materialize-css')

import {ProgramSearch, ProgramSlots, ProgramLogEntry} from '../../Models/Program';
import TimeTable from '../../components/ProgramLog.vue'

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
        TimeTable
    }
})
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

    todayHour: number = 0

    identified = true
    editing = false

    programName = ''
    duration = ''

    timeTableOpen = false
    openTimes: any = []

    programSelected: any = {}
    tooltipped = true

    curDay(ind) {
        return Days[ind]
    }

    get curUser() {
        return this.$store.state.currentUser
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
                    this.logEntries.push('')
            }

            this.pagnateHours(this.logList.length/3)
        })
    }

    mounted() {
        this.getAllLogs();
        this.getAllPrograms();
        let autocompleteLoaded = false

        setInterval(() => {
            if (this.programs !== [] && !autocompleteLoaded) {
                autocompleteLoaded = true;
                this.loadAutocomplete()
            }
            if (this.todayHour !== new Date().getHours() + 24) {
                this.getAllPrograms()
                this.getAllLogs()
                autocompleteLoaded = false
            }
        }, 500)
    }

    updated() {
        if (this.tooltipped) {
            this.tooltipped = false
            const elemsTooltip = document.querySelectorAll('.tooltipped')
            const tooltipInstance = M.Tooltip.init(elemsTooltip)
        }
    }

    loadAutocomplete() {
        let autocomplete = {}
        const unique = [...new Set(this.programs.map((item: any) => item.type.replace(/\s+/g, '-')))];
        console.log(unique)
        for (let i in unique) {
            autocomplete[unique[i]] = []
            for (let j in this.programs) {
                autocomplete[unique[i]][(this.programs[j] as any).name] = (this.programs[j] as any).name
            }
        }

        for (let i in unique) {
            const autocompleteOptions = {
                data: autocomplete[unique[i]]
            }
            let elems = document.querySelectorAll('.autocomplete-' + unique[i]);
            let instances = M.Autocomplete.init(elems, autocompleteOptions);
        }
    }

    stationIdentified(idx) {
        const identIndex = (this.curIndex * 3) + (idx - this.offset)
        const hours = this.identList[identIndex].time.substr(0,this.identList[identIndex].time.split(':'))
        let user = ''

        if (+hours === new Date().getHours() && this.$store.state.currentUser !== '') {
            user = this.identEnteredList[identIndex]
        } else {
            user = this.$store.state.currentUser
        }

        if (this.identEnteredList[identIndex] !== user) {
            if (Math.abs(this.curIndex - this.today) <= 1) {
                if (this.$store.state.currentUser !== '' || this.$store.state.currentUser !== 'Anonymous') {
                    if (this.identEnteredList[identIndex] !== false) {
                        const stationIdParams: ProgramLogEntry = {
                            type: 'station_id',
                            name: '',
                            slotId: this.identEnteredList[identIndex].slot_id,
                            timestamp: this.identEnteredList[identIndex].timestamp,
                            dj: user,
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
                            dj: user,
                            newName: ''
                        }

                        this.$store.dispatch('postProgramLogEntry', stationIdParams).then(res => {
                            this.identEnteredList[identIndex] = res
                            this.$forceUpdate()
                        })
                    }
                }
            }
        } else {
            alert('You must be the user who identified to change this.')
        }
    }

    editProgramEntry(schedOffsetIdx, logIdx) {
        if (Math.abs(this.curIndex - this.today) <= 1) {
            let ref: any = this.schedule[this.curIndex][schedOffsetIdx][logIdx].id + 'a'
            this.editing = true
            let progName = this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].program_name
            this.editingEntry = {...this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx]}
            let logEntryIdx = this.logList.map(e => {return e.id}).indexOf(this.editingEntry.slot_id)
            this.logEntries[logEntryIdx] = this.editingEntry.program_name
            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = progName
            this.$forceUpdate()
            this.$nextTick(() => {
                (document.getElementById(ref) as HTMLElement).focus()
            })
        }
    }

    cancelInsert(schedOffsetIdx, logIdx) {
        if (this.editing) {
            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = this.editingEntry
            this.editing = false
        } else {
            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = null
        }

        this.$forceUpdate()
    }

    insertProgram(schedOffsetIdx?, logIdx?, newIdx?, slot?) {
        if (slot) {
            const stationIdParams: ProgramLogEntry = {
                type: this.programSelected.type,
                name: this.programSelected.name,
                slotId: slot.id,
                timestamp: '',
                dj: this.$store.state.currentUser,
                newName: ''
            }

            this.$store.dispatch('postProgramLogEntry', stationIdParams).then(res => {
                this.entrySchedule[newIdx][schedOffsetIdx][logIdx] = res
                this.$forceUpdate()
            })
        } else {
            const nameIndex = (this.curIndex * 6) + ((schedOffsetIdx * 2) + logIdx - (this.offset * 2))

            if (Math.abs(this.curIndex - this.today) <= 1) {
                if (this.editing) {
                    const userIndex = (this.curIndex * 6) + ((schedOffsetIdx * 2) + logIdx - (this.offset * 2))
                    let user = ''
                    let hours = this.schedule[this.curIndex][schedOffsetIdx][logIdx].time.substr(0,this.schedule[this.curIndex][schedOffsetIdx][logIdx].time.indexOf(':'))
            
                    if (+hours === new Date().getHours() && this.$store.state.currentUser !== '') {
                        user = this.editingEntry.dj_id
                    } else {
                        user = this.$store.state.currentUser
                    }

                    if (user === this.editingEntry.dj_id) {
                        let logEntryIdx = this.logList.map(e => {return e.id}).indexOf(this.editingEntry.slot_id)

                        const stationIdParams: ProgramLogEntry = {
                            type: this.editingEntry.program_type,
                            name: this.editingEntry.program_name,
                            slotId: this.editingEntry.slot_id,
                            timestamp: this.editingEntry.timestamp,
                            dj: user,
                            newName: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx]
                        }

                        this.$store.dispatch('updateProgramLogEntry', stationIdParams).then(res => {
                            this.logEntries[logEntryIdx] = res
                            this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx]  = res
                            this.editing = false
                            this.$forceUpdate()
                        })
                    } else {
                        alert('You must be the user who submitted this to edit it.')
                    }
                } else {
                    const stationIdParams: ProgramLogEntry = {
                        type: this.logList[nameIndex].program_type,
                        name: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx],
                        slotId: this.logList[nameIndex].id,
                        timestamp: '',
                        dj: this.$store.state.currentUser,
                        newName: ''
                    }
                    this.$store.dispatch('postProgramLogEntry', stationIdParams).then(res => {
                        this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = res
                        this.$forceUpdate()
                    })
                }
            }
        }
    }

    deleteProgram(schedOffsetIdx, logIdx) {
        const userIndex = (this.curIndex * 6) + ((schedOffsetIdx * 2) + logIdx - (this.offset * 2))
        let user = ''
        let hours = this.schedule[this.curIndex][schedOffsetIdx][logIdx].time.substr(0,this.schedule[this.curIndex][schedOffsetIdx][logIdx].time.indexOf(':'))

        if (+hours === new Date().getHours() && this.$store.state.currentUser !== '') {
            user = this.logEntries[userIndex].dj_id
        } else {
            user = this.$store.state.currentUser
        }
        if (Math.abs(this.curIndex - this.today) <= 1) {
            if (this.logEntries[userIndex].dj_id === user) {
                if (this.editing && this.editingEntry.slot_id === this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].slot_id) {
                    let logEntryIdx = this.logList.map(e => {return e.id}).indexOf(this.editingEntry.slot_id)

                    const stationIdParams: ProgramLogEntry = {
                        type: this.editingEntry.program_type,
                        name: this.editingEntry.program_name,
                        slotId: this.editingEntry.slot_id,
                        timestamp: this.editingEntry.timestamp,
                        dj: user,
                        newName: ''
                    }
                    
                    this.$store.dispatch('removeProgramLogEntry', stationIdParams).then(res => {
                        this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = ''
                            this.logEntries[logEntryIdx] = ''
                            this.$forceUpdate()
                    })
                } else {
                    const nameIndex = (this.curIndex * 6) + ((schedOffsetIdx * 2) + logIdx - (this.offset * 2))

                    const stationIdParams: ProgramLogEntry = {
                        type: this.logList[nameIndex].program_type,
                        name: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx],
                        slotId: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].slot_id,
                        timestamp: this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx].timestamp,
                        dj: user,
                        newName: ''
                    }

                    this.$store.dispatch('removeProgramLogEntry', stationIdParams).then(res => {
                        this.entrySchedule[this.curIndex][schedOffsetIdx][logIdx] = ''
                        this.logEntries[nameIndex] = ''
                        this.$forceUpdate()
                    })
                }
            } else {
                alert('You must be the user who submitted this to delete it.')
            }
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
        this.todayHour = curHour
        
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

        console.log(this.logEntries)
    }

    pageUp() {
        if (this.curIndex + 1 < this.schedule.length) {
            this.curIndex += 1
            if (Math.abs(this.curIndex - this.today) <= 1) {
                this.$nextTick(() => {
                    this.loadAutocomplete()
                })
            }
        }

    }   

    pageDown() {
        if (this.curIndex - 1 >= 0) {
            this.curIndex -= 1
            if (Math.abs(this.curIndex - this.today) <= 1) {
                this.$nextTick(() => {
                    this.loadAutocomplete()
                })
            }
        }
    }

    setToCurDay() {
        this.curIndex = this.today
        if (Math.abs(this.curIndex - this.today) <= 1) {
            this.$nextTick(() => {
                this.loadAutocomplete()
            })
        }
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
            if (hours % 12 === 0) finalTime += 'AM'
            else finalTime += 'PM'
        } else {
            finalTime = hours + ':00 '
            if (hours % 12 === 0) finalTime += 'PM'
            else finalTime += 'AM'
        }

        return finalTime
    }

    openLogEntries(entry) {
        let nameIndex = (this.today * 6)
        this.openTimes = []

        this.programSelected = entry

        for (let i in this.range(0,3)) {
            nameIndex = (this.today + +i - 1) * 6
            console.log(this.offset)

            for (let j in this.range(0,6)) {
                if (this.logList[nameIndex + +j - 2 - this.offset].program_type === entry.type && this.logEntries[nameIndex + +j - 2 - this.offset] === '') {
                    this.openTimes.push(this.logList[nameIndex + +j - 2 - this.offset])
                }
            }
        }

        this.timeTableOpen = true
    }

    addToSlot(logSlot) {
        let slotFound = false
        for (let i in this.schedule) {
            for (let j in this.schedule[i]) {
                for (let k in this.schedule[i][j]) {
                    if (this.schedule[i][j][k].id === logSlot.id) {
                        slotFound = true
                        this.insertProgram(j, k, i, logSlot)
                        break
                    }
                }
            }
            if (slotFound) break
        }

        let logEntryIdx = this.logList.map(e => {return e.id}).indexOf(logSlot.id)
        this.logEntries[logEntryIdx] = logSlot
    }

    addToQueue(program) {
        let newProgram = {
            title: program.name,
            file: "T:\\digilib\\E-Carts and Productions\\" + (program.type) + "\\" + (program.name),
            program: null
        }

        this.$store.commit('addToQueue', newProgram)
    }

    closeTable() {
        this.timeTableOpen = false
    }
}


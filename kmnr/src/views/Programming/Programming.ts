import { Component, Vue } from 'vue-property-decorator';

import {ProgramSearch} from '../../Models/Program';

@Component
export default class Programming extends Vue {
    constructor() {
        super()
    }

    const range = (start, stop, step = 1) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

    programs = [];
    typeSearch = "";
    nameSearch = "";

    getAllPrograms() {
        this.$store.dispatch('getAllPrograms')
            .then(res => {
                this.programs = this.$store.state.programs;
            });
    }

    created() {
        this.pagnateHours(30);
        this.getAllPrograms();
    }

    pagnateHours(fullHour) {
        let curHour = new Date().getHours()
        
        if (curHour === 0) curHour = 24

        const beginPeriod = [0, 1, 2]
        const endPeriod = this.range(fullHour - 3, fullHour)

        const midToBackRange = this.range(curHour, fullHour - 2, 3)
        const frontToMidRange = this.range(curHour, 1, -3)

        let frontToMid = []
        let midToBack = []

        for (const i in frontToMidRange) {
            frontToMid.push([frontToMidRange[i] - 1, frontToMidRange[i], frontToMidRange[i] + 1])
        }

        for (const i in midToBackRange) {
            if (midToBackRange[i] !== curHour)
                midToBack.push([midToBackRange[i] - 1, midToBackRange[i], midToBackRange[i] + 1])
        }

        frontToMid.reverse()
        console.log(frontToMid)

        console.log([beginPeriod, ...frontToMid, ...midToBack, endPeriod])
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
}
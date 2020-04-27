export default class Program {
    type: string = ''
    name: string = ''
    months: string = ''
}

export class ProgramSearch {
    type: string = ''
    name: string = ''
}
export class ProgramLogEntry {
    type: string = ''
    name: string = ''
    slotId: number = 0
    timestamp: string = ''
    dj: string = ''
    newName: string = ''
}

export class ProgramSlots {
    id: number = 0
    program_type: string = ''
    day: number = 0
    time: string = ''
}
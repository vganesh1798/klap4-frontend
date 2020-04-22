export default class Playlist {
    id: string
    dj_id: string
    name: string
    show: string

    constructor(id: string, n: string, s: string, real_id: string) {
        this.id = real_id
        this.dj_id = id
        this.name = n
        this.show = s
    }
}

export interface PlaylistEntry {
    song: string,
    album: string,
    artist: string
}
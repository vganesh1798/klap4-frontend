export default class Log {
    username: string
    playlist_name: string
    songs: Array<Song>

    constructor() {
        this.username = ''
        this.playlist_name = ''
        this.songs = []
    }
}

export class Song {
    name: string
    artist: string
    album: string

    constructor() {
        this.name = ''
        this.album = ''
        this.artist = ''
    }
}
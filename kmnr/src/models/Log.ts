// The default model for importing
export default class Log {
    // The data we need and what type each data is
    username: string
    playlist_name: string
    songs: Array<Song>

    // Constructor that sets all default values
    constructor() {
        this.username = ''
        this.playlist_name = ''
        this.songs = []
    }
}

// A class for song information taken by the log endpoint
export class Song {
    // Simple information currently known for songs
    name: string
    artist: string
    album: string

    constructor() {
        this.name = ''
        this.album = ''
        this.artist = ''
    }
}
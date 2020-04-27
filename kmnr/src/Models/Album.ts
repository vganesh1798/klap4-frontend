export class AlbumSearch {
    genre_abbr: string = ''
    artist: string = ''
    album: string = ''
    label: string = ''
    promoter: string = ''
    format: string = ''
    new_tag: boolean = false
}

export class Album {
    album_id?: number | null
    artist_id?: number | null
    album_name?: string | null
    artist_name ?: string | null
    genre ?: string | null
    label ?: string | null
    promoter ?: string | null
    date_added?: string | null
    format ?: string | null
    missing ?: boolean | null
    new_album ?: boolean | null
}

export class AlbumReview {
    date_entered ?: string | null
    reviewer ?: string | null
    review ?: string | null
}

export class AlbumProblem {
    reporter ?: string | null
    problem ?: string | null
}

export class Song {
    song_number ?: number | null
    song_name ?: string | null
    fcc_status ?: number | null
    times_played ?: number | null
    last_played ?: string | null
    recommended ?: boolean | null
}

export default class DisplayAlbum {
    album: Album = new Album()
    reviews: Array<AlbumReview> = []
    problems: Array<AlbumProblem> = []
    songs: Array<Song> = []
}
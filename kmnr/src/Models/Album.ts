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
    artist_num?: number | null
    date_added?: string | null
    format_bitfield?: number | null
    genre_abbr?: string | null
    id?: string | null
    label_id?: string | null
    letter?: string | null
    missing?: boolean | null
    name?: string | null
    promoter_id?: string | null
}

export class AlbumArtist {
    artist_num: number = 0
    genre_abbr: string = ''
    id: string = ''
    number: number = 0
}

export class Song {
    id: string = ''
    genre_abbr: string = ''
    artist_num: number = 0
    album_letter: string = ''
    number: number = 0
    name: string = ''
    fcc_status: number = 0
    last_played: string = ''
    times_played: number = 0
    recommended: boolean = false
}

export class Problem {
    genre_abbr: string = ''
    artist_num: number = 0
    album_letter: string = ''
    dj_id: string = ''
    content: string = ''
}

export class Reviews {
    genre_abbr: string = ''
    artist_num: number = 0
    album_letter: string = ''
    dj_id: string = ''
    date_entered: string = ''
    content: string = ''
}

export default class DisplayAlbum {
    album: Album = new Album()
    artist: AlbumArtist = new AlbumArtist()
    reviews: Array<Reviews> = []
    problems: Array<Problem> = []
    songs: Array<Song> = []
}
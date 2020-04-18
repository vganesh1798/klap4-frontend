export default interface Artist {
    name: string,
    artist_id: string,
    genre: string,
    track_amt: number
}

export interface singleArtist {
    genre_abbr: string,
    id: string,
    name: string,
    number: number,
    album_list: Array<albums>
}

export interface albums {
    artist_num: number,
    date_added: string,
    format_bitfield: number,
    genre_abbr: string,
    id: string,
    label_id: string,
    letter: string,
    missing: boolean,
    name: string,
    promoter_id: string
}
export default class Artist {
    genre: string;
    artist_id: string;
    artist_name: string;
    track_amt: number;

    constructor(artist_name, artist_id, genre, track_amt) {
        this.artist_name = artist_name;
        this.artist_id = artist_id;
        this.genre = genre;
        this.track_amt = track_amt;
    }
}

export class singleArtist {
    genre_abbr: string;
    id: string;
    name: string;
    number: number;
    album_list: Array<albums>;
    artist_picture:null;

    constructor(genre_abbr, id, name, number, album_list, artist_picture) {
        this.genre_abbr = genre_abbr;
        this.id = id;
        this.name = name;
        this.number = number;
        this.album_list = album_list;
        this.artist_picture = artist_picture;
    }
}

export class albums {
    artist_num: number;
    date_added: string;
    format_bitfield: number;
    genre_abbr: string;
    id: string;
    label_id: string;
    letter: string;
    missing: boolean;
    name: string;
    promoter_id: string;

    constructor(artist_num, date_added, format_bitfield, genre_abbr, id, label_id, letter, missing, name, promoter_id) {
        this.artist_num = artist_num;
        this.date_added = date_added;
        this.format_bitfield = format_bitfield;
        this.genre_abbr = genre_abbr;
        this.id = id;
        this.label_id = label_id;
        this.letter = letter;
        this.missing = missing;
        this.name = name;
        this.promoter_id = promoter_id;

    }

}

export class ArtistSearch {
    name: string = ''
    genre: string = ''
}
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
    genre: string;
    id: string;
    name: string;
    albums: Array<albums>;
    artist_picture:null;

    constructor(genre, id, name, albums, artist_picture) {
        this.genre = genre;
        this.id = id;
        this.name = name;
        this.albums = albums;
        this.artist_picture = artist_picture;
    }
}

export class albums {
    album_format: number;
    album_name: string;
    has_problems: boolean;
    has_reviews: boolean;
    id: string;
    missing: boolean;
    new_album: boolean;

    constructor(album_format, album_name, has_problems, has_reviews, id, missing, new_album) {
        this.album_format = album_format;
        this.album_name = album_name;
        this.has_problems = has_problems;
        this.has_reviews = has_reviews;
        this.id = id;
        this.missing = missing;
        this.new_album = new_album;

    }

}

export class ArtistSearch {
    name: string = ''
    genre: string = ''
}
export default class ChartData {
    // refer to spreadsheet for types, assume string if not specified
    // order is important
    album_id: string;
    album_name: string;
    artist_name: string;
    label_name: string;
    promoter_name: string;
    rank: number;
    recommended: boolean;
    song_name: string;
    times_played: number;

    // Constructor that sets all default values
    constructor(album_id, album_name, artist_name, label_name, promoter_name, rank, recommended, song_name, times_played) {
        this.album_id = album_id;
        this.album_name = album_name;
        this.artist_name = artist_name;
        this.label_name = label_name;
        this.promoter_name = promoter_name;
        this.rank = rank;
        this.recommended = recommended;
        this.song_name = song_name;
        this.times_played = times_played;
    }
}

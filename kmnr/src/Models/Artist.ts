export default interface Artist {
    name: string,
    artist_id: string,
    genre: string,
    track_amt: number
}

export interface singleArtist {
    name: string,
    genre: string,
    albums: Array<string>
}
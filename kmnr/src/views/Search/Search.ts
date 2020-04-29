import { Vue, Component, Prop } from 'vue-property-decorator'
import Albums from '@/components/Album.vue'
import ArtistPage from '@/components/Artist.vue'

import M from 'materialize-css'
import { AlbumSearch } from '@/Models/Album'
import { ArtistSearch } from '@/Models/Artist'

@Component({
    components: {
        Albums,
        ArtistPage
    }
})
export default class SearchPage extends Vue {
    @Prop({default: ''}) name?
    @Prop({default: ''}) artistName?
    @Prop({default: ''}) genre?

    searchInput: string = ''
    artistInput: string = ''
    genreInput: string = ''

    artistSearchParam: ArtistSearch = {
        genre: '',
        name: ''
    }

    albumSearchParam: AlbumSearch = {
        genre_abbr: '',
        album: '',
        artist: '',
        format: '',
        label: '',
        new_tag: false,
        promoter: ''
    }

    albumLoaded: boolean = false
    artistLoaded: boolean = false

    artistKey: string = 'none'
    albumKey: string = 'none'

    albumKeyGen() {
        this.albumKey = this.albumSearchParam.album + this.albumSearchParam.artist + this.albumSearchParam.genre_abbr

        if (this.albumKey !== '') {
            this.albumLoaded = true
        }
}

    artistKeyGen() {
        this.artistKey = this.artistSearchParam.genre + this.artistSearchParam.name

        if (this.artistKey !== '') {
            this.artistLoaded = true
        }
    }

    beforeMount() {
        if (this.name || this.artistName || this.genre) {
            this.searchInput = this.name
            this.genreInput = this.genre
            this.artistName = this.artistName

            this.search(null, true)
        }
    }

    mounted() {
        const elemsTooltip = document.querySelectorAll('.tooltipped')
        const tooltipInstance = M.Tooltip.init(elemsTooltip)
    }

    search(e, clicked: boolean = false) {
        if (clicked) {
            this.searchLoader()
        } else if (e) {
            if (e.keyCode === 13) {
                this.searchLoader()
            }
        }
    }

    searchLoader() {
        this.artistLoaded = false
        this.albumLoaded = false

        if (this.searchInput !== '') {
            this.$router.push({query: {name: this.searchInput}})
        } else {
            this.$router.push('/search')
        }
        
        if (this.genreInput !== '') {
            this.$router.push({query: {genre: this.genreInput}})
        } else {
            this.$router.push('/search')
        }

        if (this.artistInput !== '') {
            this.$router.push({query: {artistName: this.artistInput}})
        } else {
            this.$router.push('/search')
        }

        const alSearch: AlbumSearch = {
            album: this.searchInput,
            genre_abbr: this.genreInput,
            artist: this.artistInput,
            format: '',
            promoter: '',
            new_tag: false,
            label: ''
        }

        const artSearch: ArtistSearch = {
            genre: this.genreInput,
            name: this.searchInput
        }

        this.albumSearchParam = alSearch
        this.artistSearchParam = artSearch
        this.artistKeyGen()
        this.albumKeyGen()
    }

    clearSearch() {
        this.artistLoaded = false
        this.albumLoaded = false

        this.searchInput = ''
        this.artistInput = ''
        this.genreInput = ''

        this.search(null, true)
    }
}
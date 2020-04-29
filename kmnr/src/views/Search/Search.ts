import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
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

    queriedSearch: boolean = false

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

    get curPath() {
        return this.$route
      }
  
    @Watch('curPath')
    newPath(newPath, oldPath) {
        this.searchInput = this.name
        this.genreInput = this.genre
        this.artistName = this.artistName

        this.queriedSearch = true

        this.search(null, true)
    }

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

        if (!this.queriedSearch) {
            let newQuery = {}
            if (this.searchInput !== '') {
                newQuery['name'] = this.searchInput
            }
            
            if (this.genreInput !== '') {
                newQuery['genre'] = this.genreInput
            }

            if (this.artistInput !== '') {
                newQuery['artistName'] = this.artistInput
            }
            this.$router.push({query: newQuery})
        }

        this.queriedSearch = false

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
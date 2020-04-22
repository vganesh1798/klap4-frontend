import { Vue, Component } from 'vue-property-decorator'
import Albums from '@/components/Album.vue'
import ArtistPage from '@/components/Artist.vue'

import M from 'materialize-css'

@Component({
    components: {
        Albums,
        ArtistPage
    }
})
export default class SearchPage extends Vue {
    searchInput: string = ''
    artistInput: string = ''
    genreInput: string = ''

    mounted() {
        const elems = document.querySelectorAll('.collapsible')
        const instances = M.Collapsible.init(elems)

        const elemsTooltip = document.querySelectorAll('.tooltipped')
        const tooltipInstance = M.Tooltip.init(elemsTooltip)
    }

    search(e, clicked: boolean = false) {
        if (clicked) {
            console.log(this.searchInput)
            console.log(this.genreInput)
            console.log(this.artistInput)
        } else if (e) {
            if (e.keyCode === 13) {
                console.log(this.searchInput)
                console.log(this.genreInput)
                console.log(this.artistInput)
            }
        }
    }
}
import { Component, Vue, Watch } from 'vue-property-decorator';

import M from 'materialize-css';

@Component({})
export default class Albumdeets extends Vue {
    constructor() {
        super();
    }

    artist = {};
    albums = [];
    tooltipped = true;

    getArtistInfo() {
        this.$store.dispatch('displayArtist', this.$route.params.albumParam).then(res => {
            this.artist = this.$store.state.singleArtist;
            this.albums = this.$store.state.singleArtist["albums"];
        })
    }

    get curPath() {
        return this.$route.path
      }
  
    @Watch('curPath')
    newPath(newPath, oldPath) {
        this.$store.dispatch('displayArtist', this.$route.params.albumParam).then(res => {
            this.artist = this.$store.state.singleArtist;
            this.albums = this.$store.state.singleArtist["albums"];
        })
    }

    formatImage(formatCode) {
        let imgPath: string = '';
        let parsedFormat: string = '';
        switch(formatCode) {
            case 0b00001:
                imgPath = 'LP.png';
                parsedFormat = 'LP';
                break;
            case 0b00010:
                imgPath = 'CD.png';
                parsedFormat = 'CD';
                break;
            case 0b00100:
                imgPath = 'Digital.png';
                parsedFormat = 'Digital';
                break;
            case 0b10000:
                imgPath = '7.png';
                parsedFormat = '7\"';
                break;
            case 0b01001:
                imgPath = '12.png';
                parsedFormat = '12\" (Single)';
                break;
            case 0b01010:
                imgPath = 'CDS.png';
                parsedFormat = 'CD (Single)';
                break;
            case 0b01100:
                imgPath = 'Digital.png';
                parsedFormat = 'Digital (Single)';
                break;
            default:
                break;
        }
        return require('../../../assets/formats/'+imgPath)
    }

    created() {
        this.getArtistInfo();
    }

    updated() {
        if(this.tooltipped) {
            this.tooltipped = false;
            this.$nextTick(()=>{
                const elemsTooltip = document.querySelectorAll('.tooltipped')
                const tooltipInstance = M.Tooltip.init(elemsTooltip)
            })
        }
    }

}
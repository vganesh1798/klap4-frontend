import { Component, Watch, Vue } from 'vue-property-decorator';
import HomeCard from '../../components/HomeCard.vue';

@Component({
    components: {HomeCard}
})
export default class HomePage extends Vue {
    scrolledL = false
    scrolledLOnce = false
    scrolledR = false
    scrolledROnce = false

    search_des = "Search away at your hearts content! We have a plethroa of songs in the KMNR library."

    lxst_image = ''

    beforeMount() {
        window.addEventListener('scroll', () => {
            this.revealOnScroll('card-left-on-scroll', true)
            this.revealOnScroll('card-right-on-scroll')
        });
        let images = require.context('../../assets/', false, /\.jpeg$/)
        this.lxst_image = images('./LXST_Image.jpeg')
        console.log(this.lxst_image)
    }

    created() {

    }

    beforeDestroy() {
        window.removeEventListener('scroll', () => {
            this.revealOnScroll('card-left-on-scroll', true)
            this.revealOnScroll('card-right-on-scroll')
        });
    }

    revealOnScroll(eleName: string, left: boolean = false) {
        const ele = document.getElementsByClassName(eleName)[0]
        const offset = this.offset(ele).top

        if (left) {
            this.scrolledL = ((offset < (window.scrollY*4)) || this.scrolledLOnce)
            if (this.scrolledL) {
                this.scrolledLOnce = true
            }
        } else {
            this.scrolledR = ((offset < (window.scrollY*2.75)) || this.scrolledROnce)
            if (this.scrolledR) {
                this.scrolledROnce = true
            }
        }
    }

    offset(el) {
        if (el !== undefined) {
            let rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        } 
        
        return {top: 0, left: 0}
	}
}

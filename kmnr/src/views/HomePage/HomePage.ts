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
    stream_des = "Stream your favorite music from our endless collection!"
    aboutus = "KMNR is a free-format college radio station broadcasting at 89.7 MHz in Rolla, MO. KMNR's license is held by the University of Missouri's board of curators. KMNR is run by its executive board who are responsible for maintaining the station and ensuring compliance with FCC rules. KMNR Executive board are elected at the end of the Spring Semester and serve for a year. KMNR's faculty advisor is Dr. Jeff Schramm. KMNR's Public File is accessible at the station."
    lxst_image = ''
    stream_image = ''
    beforeMount() {
        window.addEventListener('scroll', () => {
            this.revealOnScroll('card-left-on-scroll', true)
            this.revealOnScroll('card-right-on-scroll')
        });
        let images = require.context('../../assets/', false, /\.jpeg$/)
        this.lxst_image = images('./LXST_Image.jpeg')
        this.stream_image = images('./stream.jpeg')
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

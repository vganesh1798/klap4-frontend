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

    beforeMount() {
        window.addEventListener('scroll', () => {
            this.revealOnScroll('card-left-on-scroll', true)
            this.revealOnScroll('card-right-on-scroll')
        });
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
	    let rect = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
}

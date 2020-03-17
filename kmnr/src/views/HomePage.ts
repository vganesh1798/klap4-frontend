import { Component, Vue } from 'vue-property-decorator';
import HomeCard from '../components/HomeCard.vue';

@Component({
    components: {HomeCard}
})
export default class HomePage extends Vue {

}

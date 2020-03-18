import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PlaylistPage extends Vue {
    jumpLog() {
        this.$router.push('log');
    }
}

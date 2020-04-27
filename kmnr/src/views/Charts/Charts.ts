import { Component, Vue } from 'vue-property-decorator';

import defaultTable from "../../components/Table.vue";
import defaultButton from "../../components/Button.vue";

@Component({
    components: { defaultTable,
                  defaultButton }
})
export default class ChartsPage extends Vue {
  constructor() {
    super()
  }
    charts = [];
    range = 0;
    chartsSearch = "";
    cancelSearchVisibility = "hidden";
    previousBtnVisibility = "visible";
    nextBtnVisibility = "visible";
    num = 0;
    sort_selection = "Popularity";
    new_charts = false;
    weeks = 1;
    val = 0;

    get chartsPaginated() {
        return this.charts.slice(this.range, this.range + 10);
    }

    getCharts() {
        this.new_charts = false;
        this.range = 0;
        this.$store.dispatch('getAllChartData', this.weeks).then(res => {
            this.charts = res;
            console.log(this.charts);
        });
    }

    getNewCharts() {
        this.new_charts = true;
        this.range = 0;
        this.$store.dispatch('getNewChartData', this.weeks).then(res => {
            this.charts = res;
            console.log(this.charts);
        });
    }

    hidePreviousBtn() {
        this.previousBtnVisibility = "hidden";
    }

    showPreviousBtn() {
        this.previousBtnVisibility = "visible";
    }

    hideNextBtn() {
        this.nextBtnVisibility = "hidden";
    }

    showNextBtn() {
        this.nextBtnVisibility = "visible";
    }

    nextCharts() {
        if (this.charts.length - this.range > 10) {
        this.range += 10;
        }
    }

    previousCharts() {
        if (this.range > 0) {
        this.range -= 10;
        }
    }

    SearchByChartName() {
        this.charts = this.charts
        .filter((alb: any) => {
            return (alb.artist_name.toLowerCase().includes(this.chartsSearch.toLowerCase()) || 
                    alb.album_name.toLowerCase().includes(this.chartsSearch.toLowerCase()) || 
                    alb.genre.toLowerCase().includes(this.chartsSearch.toLowerCase()));
        })

        this.cancelSearchVisibility = "visible";
    }

    CancelSearch() {
        this.getCharts();
        this.chartsSearch = "";
        this.cancelSearchVisibility = "hidden";
    }

    created() {
        this.getCharts();
      }

    sortBy(field) {
        this.sort_selection = field;
    }
};

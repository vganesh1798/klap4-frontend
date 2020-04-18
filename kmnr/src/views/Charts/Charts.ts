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
    sort_selection = "Popularity"

    get chartsPaginated() {
        return this.charts.slice(this.range, this.range + 10);
    }

    getCharts() {
        this.$store.dispatch('getAllChartData').then(res => {
            this.charts = res;
            console.log(this.charts);
        });
    }

    getNewCharts() {
        this.$store.dispatch('getNewChartData').then(res => {
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
        this.charts = this.charts.filter((alb: any) => {
        return alb.name.toLowerCase().includes(this.chartsSearch.toLowerCase());
        });

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

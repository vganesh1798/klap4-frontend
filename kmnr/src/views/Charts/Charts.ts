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
        });
    }

    getNewCharts() {
        this.new_charts = true;
        this.range = 0;
        this.$store.dispatch('getNewChartData', this.weeks).then(res => {
            this.charts = res;
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
        if(field=="Popularity") {
            this.getCharts();
            // this.charts.sort((n1, n2) => {
            //     if(n1.times_played < n2.times_played) {
            //         return 1;
            //     }
            //     if(n1.times_played > n2.times_played)
            //         return -1;
            //     return 0;
            // })
        }
        if(field=="Genre") {
            this.charts.sort((n1: any, n2: any) => {
                if(n1.genre > n2.genre) {
                    return 1;
                }
                if(n1.genre < n2.genre)
                    return -1;
                return 0;
            })
        }
        if(field=="Artist") {
            this.charts.sort((n1: any, n2: any) => {
                if(n1.artist_name > n2.artist_name) {
                    return 1;
                }
                if(n1.artist_name < n2.artist_name)
                    return -1;
                return 0;
            })
        }
        if(field=="Album") {
            this.charts.sort((n1: any, n2: any) => {
                if(n1.album_name > n2.album_name) {
                    return 1;
                }
                if(n1.album_name < n2.album_name)
                    return -1;
                return 0;
            })
        }
    }
};

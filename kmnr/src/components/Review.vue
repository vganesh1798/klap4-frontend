<template>
    <div class="review">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closeReview" type="submit">X</defaultButton>
            </div>
        </div>
        <div class="row">
            <a class="tooltipped" :data-tooltip="album"><h1 class="albumTitle">{{album}}</h1></a>
            <h2> by {{artist}}</h2>
        </div>
        <div v-if="reviews.length === 0">
            <h2 class="noentries">No reviews yet...write the first one!</h2>
            <div class="input-field">
              <label for="reviewbutton">Write a review</label>
                <textarea v-model="review" type="text" class="materialize-textarea" id="review"></textarea>
            </div>
              <button v-on:click="postReview()" class="btn">Submit</button>
          </div>
          <div v-else>
                <defaultButton class="colored writereviewbtn" @click.native="writeReview()">Write A Review</defaultButton>
                <div v-if="editSpace">
                     <div class="row">
                <form>
                    <div class="input-field">
                        <label for="review">Write a review</label>
                        <textarea required v-model="userreview" type="text" class="materialize-textarea" id="userreview"></textarea>
                    </div>
                
                </form>
                <defaultButton class="colored submitbutton" @click.native="postReview()"  type="submit">Submit</defaultButton>
                     </div>
                </div>
            
          
          <div class="row">
              <div :class="{
                'reviews': !editSpace,
                'shrunkreviews' : editSpace}">
                    <ul id="review-list">
                        <li 
                            class="review-element" 
                            v-for="review in reviews" 
                            :key="review['id']">
                            <p class="reviewerName">{{review.reviewer}}</p>
                            <p class="reviewedDate">{{review.date_entered.split(" ")[0]}}</p>
                            <p class="reviewText">{{review.review}}</p>
                        </li>
                    </ul>
                </div>
          </div>
          </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import defaultButton from "../components/Button.vue";
    import M from "materialize-css";

    @Component ({
        components: { defaultButton }
    })
    export default class review extends Vue {
        close = false;
        userreview = "";
        constructor() {
            super()
        }

        @Prop(String) album !: string
        @Prop(String) artist !: string
        @Prop(Object) reviews!: object
        editSpace: Boolean = false;
        tooltipped: Boolean = true;

        postReview() {
            console.log("posting review")
            this.editSpace = false;
            const reviewParams = {
                'id': this.$route.params.albumParam,
                'reviewer': this.$store.state.currentUser,
                'review': this.userreview
            }
            this.$store.dispatch('postReview', reviewParams)
                .then(res => {
                    this.reviews += res
                    console.log(res)
                    this.closeReview();
                })
        }

        writeReview() {
            this.editSpace = !this.editSpace;
        }

        mounted() {
            if (this.tooltipped) {
                this.tooltipped = false
                const elemsTooltip = document.querySelectorAll('.tooltipped')
                console.log(elemsTooltip)
                
                const tooltipInstance = M.Tooltip.init(elemsTooltip)
            }
        }

        @Emit('closeReview') 
            closeReview() {
                this.close = true;
            }
    }
</script>

<style lang="scss" scoped>
h1 {
    color: black;
    text-align: center;
    font-size: 48px;
}

h2 {
    text-align: center;
    font-size: 36px;
}

p {
    padding: 0;
    margin: 0;
}


.albumTitle {
    color: black;
    text-align: center;
    font-size: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.material-tooltip {
    z-index: 9999999 !important;
}

.reviewerName {
    font-size: 14px;   
}

.reviewedDate {
    color: rgb(61, 61, 61);
    font-size: 10px;
}

.reviewText {
    font-size: 20px;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.writereviewbtn {
    padding: 2% !important;
    margin-left: 40% !important;
    margin-bottom: 5%;
}

.noentries {
    padding-top: 25%;
    font-size: 20px;

}

.review {
    background-color:white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //height: 500px;
    //width: 500px;
    height: 90%;
    width: 35%;
    padding: 0% 2% 20% 2%;
    border-radius: 3%;
    font-family: 'Montserrat';
    z-index: 9999;
}

.btn {
    background-color: rgba(100,100,100, .4);
    position: absolute;
    color: black;
    left: 25%;
    bottom: 15%;
    border: 0 0 0 0;
    margin: 0 0 0 0;
    width: 50%;
}

.submitbutton {
    padding: 2% !important;
    margin-left: 44% !important;
}
.reviews {
    color: whitesmoke;
    height: 27vw;
    max-height: 27vw;
    overflow: auto;
    //background-color: #253e4d;
    background-color: rgb(245, 241, 241);
}

.shrunkreviews {
    color: whitesmoke;
    height: 19.3vw;
    max-height: 19.3vw;
    overflow: auto;
    //background-color: #253e4d;
    background-color: rgb(245, 241, 241);
}

.review-list {
    max-height: 50px;
    overflow: auto;
}

.review-element {
    color: black;
    background-color:rgba(146, 143, 143, 0.4);
    margin-top: 2%;
    margin-bottom: 2%;
    padding: 3%;
    width: 100%;
}


</style>
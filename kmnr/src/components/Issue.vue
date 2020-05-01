<template>
    <div class="problem">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closeIssue" type="submit">X</defaultButton>
            </div>
        </div>
        <div class="row">
            <a class="tooltipped" :data-tooltip="album"><h1 class="albumTitle">{{album}}</h1></a>
            <h2> by {{artist}}</h2>
        </div>
        <div v-if="alreadyWritten">
            <p class="warningmessage">You have already reported an issue!</p>
            <defaultButton class="colored warningbutton" @click.native="closeIssue" type="submit">OK</defaultButton>
        </div>
        <div v-if="problems.length === 0">
            <h2 class="noentries">Looks like you're the first one to have noticed an issue...</h2>
            <div>
                <div class="row">
                    <form>
                        <div class="input-field">
                            <label for="problembutton">Write a review</label>
                            <textarea required v-model="userProblem" type="text" class="materialize-textarea" id="userproblem"></textarea>
                        </div>
                    </form>
                    <defaultButton class="colored submitbutton" @click.native="postIssue()" type="submit">Submit</defaultButton>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="!hideReviewOption">
            <defaultButton class="colored writeproblembtn" @click.native="writeIssue()">Report a problem</defaultButton>
            <div v-if="editSpace">
                    <div class="row">
                        <form>
                            <div class="input-field">
                                <label for="problembutton">Write a review</label>
                                <textarea required v-model="userProblem" type="text" class="materialize-textarea" id="userproblem"></textarea>
                            </div>
                        </form>
                        <defaultButton class="colored submitbutton" @click.native="postIssue()"  type="submit">Submit</defaultButton>
                    </div>
                </div>
            </div>

            <div class="row">
                <div :class="{
                'problems': !editSpace,
                'shrunkproblems' : editSpace}">
                    <ul id="problem-list">
                        <li 
                            class="problem-element" 
                            v-for="problem in problems" 
                            :key="problem['id']">
                            <p class="reporterName">{{problem.reporter}}</p>
                            <p class="reportText">{{problem.problem}}</p>
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
    import M from 'materialize-css';

    @Component ({
        components: { defaultButton }
    })
    export default class issue extends Vue {
        close = false;
        userProblem = "";
        constructor() {
            super();
        }
        @Prop(String) album !: string
        @Prop(String) artist !: string
        @Prop(Array) problems !: []
        editSpace: Boolean = false;
        tooltipped: Boolean = true;
        alreadyWritten: Boolean = false;
        hideReviewOption: Boolean = false;

        postIssue() {
            console.log("posting issue", this.userProblem)
            this.editSpace = false;
            const problemParams = {
                'id': this.$route.params.albumParam,
                'reporter': this.$store.state.currentUser,
                'problem': this.userProblem
            }
            this.$store.dispatch('postProblem', problemParams)
                .then(res => {
                    console.log(res.data);
                    this.closeIssue();
                })
        }

        writeIssue() {
             if(this.problems
                .filter((prob: any) => {
                    return (prob.reporter.includes(this.$store.state.currentUser));
            }).length !== 0) {
                console.log("review already written")
                this.alreadyWritten = true;
                this.editSpace = false;
                this.hideReviewOption = true;
                return;
            }
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

        @Emit('closeIssue') 
            closeIssue() {
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

.warningmessage {
    text-align: center;
    font-style: bold;
    
}

.warningbutton {
    margin-left: 16.5vw;
    margin-top: .5vw;
    margin-bottom: 2vw;
    padding:  2%  2% !important;
    
}
.material-tooltip {
    z-index: 9999999 !important;
}

.reporterName {
    font-size: 14px;   
}

.reportText {
    font-size: 20px;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.writeproblembtn {
    padding: 2% !important;
    margin-left: 40% !important;
    margin-bottom: 5%;
}

.noentries {
    padding-top: 25%;
    font-size: 20px;

}

.problem {
    background-color:white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //height: 500px;
    //width: 500px;
    height: 90vh;
    width: 40vw;
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
.problems {
    color: whitesmoke;
    height: 27vw;
    max-height: 27vw;
    overflow: auto;
    //background-color: #253e4d;
    background-color: rgb(245, 241, 241);
}

.shrunkproblems {
    color: whitesmoke;
    height: 19.3vw;
    max-height: 19.3vw;
    overflow: auto;
    //background-color: #253e4d;
    background-color: rgb(245, 241, 241);
}

.problem-list {
    max-height: 50px;
    overflow: auto;
}

.problem-element {
    color: black;
    background-color:rgba(146, 143, 143, 0.4);
    margin-top: 2%;
    margin-bottom: 2%;
    padding: 3%;
    width: 100%;
}


</style>
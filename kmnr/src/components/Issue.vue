<template>
    <div class="issue">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closeIssue" type="submit">X</defaultButton>
            </div>
        </div>
        <div class="row">
            <h1>Issue</h1>
        </div>
          <div class="row">
            <div class="input-field">
              <label for="issue">Describe the issue</label>
              <textarea v-model="problem" type="text" class="materialize-textarea" id="review"></textarea>
            </div>
              <button v-on:click="postProblem()" class="btn">Submit</button>
            </div>
          </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import defaultButton from "../components/Button.vue";

    @Component ({
        components: { defaultButton }
    })
    export default class issue extends Vue {
        close = false;
        problem = "";
        constructor() {
            super()
        }

        postProblem() {
            const problemParams = {
                'id': this.$route.params.albumParam,
                'reporter': this.$store.state.currentUser,
                'problem': this.problem
            }
            this.$store.dispatch('postProblem', problemParams)
                .then(res => {
                    console.log(res.data)
                })
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

a {
    font-size: 14px;
    position: absolute;
    bottom: 0%;
    right: 5%;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.issue {
    background-color:white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 500px;
    width: 500px;
    padding: 0% 5% 20% 5%;
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

</style>
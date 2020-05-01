<template>
    <div class="problem">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closeFcc" type="submit">X</defaultButton>
            </div>
        </div>
        <div class="row">
            <h1>Change FCC Status</h1>
        </div>
        <div>
            <div class="row">
                <div class="input-field col s12">
                    <select v-model="selectInput">
                        <option value="0" disabled selected>Choose your option</option>
                        <option value="1"><span class="tag">Clean</span></option>
                        <option value="2"><span class="tag">Indecent</span></option>
                        <option value="3"><span class="tag">Obscene</span></option>
                        <option value="4"><span class="tag">Unrated</span></option>
                    </select>
                    <label>Materialize Select</label>
                </div>
            </div>
            <div class="row">
                <div class="col s10">
                    <defaultButton class="grey btn" :class="{'disabled': selectInput === 0}" @click.native="postFcc()">
                        Submit
                    </defaultButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import {
        Component,
        Prop,
        Vue,
        Emit
    } from 'vue-property-decorator';
    import defaultButton from "../components/Button.vue";
    import M from 'materialize-css';

    @Component({
        components: {
            defaultButton
        }
    })
    export default class FCC extends Vue {
        close = false;
        constructor() {
            super();
        }

        @Prop({type: String}) album_id

        selectInput = 0
        status = 0

        toggleFcc() {
            return true
        }

        mounted() {
            this.$nextTick(()=>{
                    var elems = document.querySelectorAll('select');
                    var instances = M.FormSelect.init(elems);
            });
        }

        postFcc() {
            if (this.selectInput !== 0) {
                const fccParams = {
                    'id': this.album_id,
                    'FCC': this.selectInput
                }
                this.$store.dispatch('changeAlbumFCC', fccParams)
                    .then(res => {
                        this.statusChanged()
                        this.closeFcc()
                    })
            }
        }

        @Emit('closeFcc')
        closeFcc() {
            this.close = true;
        }

        @Emit('status')
        statusChanged() {
            this.status = this.selectInput
            return this.selectInput
        }
    }
</script>

<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");
    h1 {
        color: black;
        text-align: center;
        font-size: 48px;
        font-family: 'Covered By Your Grace';
    }

    h2 {
        text-align: center;
        font-size: 36px;
    }

    p {
        padding: 0;
        margin: 0;
    }

    .tag {
        position: relative;
        bottom: 5px;
        margin-left: 10px;
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
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        //height: 500px;
        //width: 500px;
        height: auto;
        width: 20%;
        padding: 0% 2% 2%;
        border-radius: 3%;
        font-family: 'Montserrat';
        z-index: 9999;
    }

    .btn {
        background-color: rgba(100, 100, 100, .4);
        position: relative;
        color: black;
        left: 38%;
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
        background-color: rgba(146, 143, 143, 0.4);
        margin-top: 2%;
        margin-bottom: 2%;
        padding: 3%;
        width: 100%;
    }
</style>
<template>
    <div class="login">
            <form>
                <div class="row">
                    <div class="col l11"></div>
                    <div class="col l1">
                        <button @click="closeWindow" type="submit">X</button>
                    </div>
                </div>
                <h1>Login</h1>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="username">Username</label>
                        <input required type="text" id="username" />
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="password">Password</label>
                        <input required type="password" id="password" />
                    </div>
                </div>

                <button class="btn" type="submit">Login</button>
            </form>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class login extends Vue {
        //@Prop({default: false, type: Boolean}) private openLogin!: boolean
        constructor() {
            super()
        }
        //open() {
        //    this.openLogin = true;
        //}
        //close() {
        //    this.openLogin = false;
        //}
    }
</script>

<style lang="scss" scoped>
h1 {
    color:black;
    text-align: center;
}

.login {
    background-color:white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
    width: 500px;
    padding: 0% 5% 20% 5%;
}

.btn {
    background-color: rgba(100,100,100, .4);
    color: black;
    margin-left: 125px;
}

</style>
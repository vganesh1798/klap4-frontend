<template>
    <div class="login">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <button class="closeBtn" @click="closeWindow" type="submit">X</button>
            </div>
        </div>
        <form>
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

            <div class="row">
            <button class="btn" type="submit">Login</button>
            </div>
        </form>
        <a href="http://www.account.kmnr.org">Forgot Password</a>
</div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

    @Component
    export default class login extends Vue {
        duh = false;
        value = false;
        constructor() {
            super()
        }

        //closeWindow() {
        //    this.duh = true;
        //    this.$emit('close-log-in');
        //}

        //@Emit('close-log-in') 
        //    closeWindow() {
        //        this.duh = true;
        //}

        close() {
            this.$emit("input", !this.value);
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
    border-radius: 3%;
    font-family: 'Montserrat';
}

.btn {
    background-color: rgba(100,100,100, .4);
    position: absolute;
    color: black;
    left: 25%;
    bottom: 20%;
    border: 0 0 0 0;
    margin: 0 0 0 0;
    width: 50%;
}

</style>
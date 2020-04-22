<template>
    <div class="login">
        <div class="row">
            <div class="col l11"></div>
            <div class="col l1">
                <defaultButton class="closeBtn" @click.native="closeLogin" type="submit">X</defaultButton>
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
                <defaultButton class="colored btn" type="submit">Login</defaultButton>
            </div>
        </form>
        <a href="http://www.account.kmnr.org">Forgot Password</a>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import defaultButton from "../components/Button.vue";

    @Component ({
        components: { defaultButton }
    })
    export default class login extends Vue {
        close = false;
        constructor() {
            super()
        }

        @Emit('closeLogin') 
            closeLogin() {
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
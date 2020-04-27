<template>
    <div class="loginpage">
        <div class="blur-background" @click="closeLogin"></div>
        <div class="login">
            <div class="row">
                <div class="col l11"></div>
                <div class="col l1">
                    <defaultButton class="closeBtn" @click.native="closeLogin" type="submit">X</defaultButton>
                </div>
            </div>
            <form @submit.prevent="authenticate">
                <h1>Login</h1>
                <div class="row">
                    <div class="col s9 offset-s2">
                        <span v-show="error" class="error">Login failed, please try again.</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="username">Username</label>
                        <input required type="text" id="username" v-model="username"/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="password">Password</label>
                        <input required type="password" id="password" v-model="pswd"/>
                    </div>
                </div>
                <div class="row">
                    <defaultButton class="green btn" type="submit">Login</defaultButton>
                </div>
            </form>
            <a href="http://www.account.kmnr.org">Forgot Password</a>
        </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import defaultButton from "../components/Button.vue";

    @Component ({
        components: { defaultButton }
    })
    export default class login extends Vue {
        close = false

        username = ''
        pswd = ''

        error = false

        constructor() {
            super()
        }

        authenticate() {
            const encoding = 'Basic ' + btoa(this.username + ':' + this.pswd)
            console.log(encoding)
            this.$store.dispatch('login', encoding).then(isUserAuth => {
                console.log(isUserAuth)
                if (isUserAuth)
                    this.loggedIn()
                else
                    this.error = true
            })
        }

        @Emit('closeLogin') 
        closeLogin() {
            this.close = true
        }

        @Emit('loggedIn')
        loggedIn() {
            this.close = true
            this.$store.dispatch('getCurrUser').then(() => {
                console.log("after", this.$store.state.currentUser)
            });
        }
    }
</script>

<style lang="scss" scoped>
.error {
    background-color: red;
    color: black;
    border-radius: 7px;
}

.blur-background {
    backdrop-filter: blur(2px);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    padding: 0% 5% 20% 5%;
    z-index: 99;
}

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
    color: black;
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
    color: white;
    left: 25%;
    bottom: 15%;
    border: 0 0 0 0;
    margin: 0 0 0 0;
    width: 50%;
}

</style>
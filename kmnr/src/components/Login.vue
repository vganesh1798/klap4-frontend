<template>
    <div class="loginpage" >
        <div class="blur-background" @click="closeLogin"></div>
        <div class="login fade-in" >
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
                        <input required type="text" id="username" v-model="username" autocomplete="username" />
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="password">Password</label>
                        <input required type="password" id="password" autocomplete="current-password" v-model="pswd"/>
                    </div>
                </div>
                <div class="row center">
                    <md-button class="md-raised md-accent green" type="submit">Login</md-button>
                </div>
            </form>
            <a class='help' href="http://www.account.kmnr.org">Forgot Password?</a>
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
            this.$store.dispatch('login', encoding).then(isUserAuth => {
                if (isUserAuth) {
                    this.$store.dispatch('getCurrUser').then(res => {
                        this.loggedIn()
                    })
                } else
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
            return this.close
        }
    }
</script>

<style lang="scss" scoped>
.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: .25s;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.help{
    padding-bottom: 15%;
}
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
    z-index: 9999;
    background-color: rgba(0,0,0,.65)
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
    background-color: #F7F7F7;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
    width: 500px;
    padding: 0% 5% 25% 5%;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    // border-radius: 1%;
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
.mfp-zoom-in {
  
  /* start state */
  .mfp-with-anim {
    opacity: 0;
    transition: all 0.2s ease-in-out; 
    transform: scale(0.8); 
  }
  
  &.mfp-bg {
    opacity: 0;
	  transition: all 0.3s ease-out;
  }
  
  /* animate in */
  &.mfp-ready {
    .mfp-with-anim {
      opacity: 1;
      transform: scale(1); 
    }
    &.mfp-bg {
      opacity: 0.8;
    }
  }
  }
</style>
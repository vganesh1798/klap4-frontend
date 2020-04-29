<template>
  <div id="navigation-mobile">
    <div class="search">
      <input type="text" placeholder="Search" />
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/stream">Stream</router-link></li>
      <li><router-link to='/programming'>Programming</router-link></li>
      <li><router-link to="/log">Playlists</router-link></li>
      <li><router-link to="/search">Search</router-link></li>
      <li><router-link to="/charts">Charts</router-link></li>
      <li><a v-if="!userAuth" @click="openLogin()">Login</a>
      <a v-else @click="logOut()">Logout</a></li>
    </ul>
    <login v-if="loginOpen || (route === '/programming' && curUser === '')" @closeLogin="closeLogin" @loggedIn="loggedIn"></login>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
    import router from '../router/index';

    import login from './Login.vue';

    @Component({
    components: { login }
})
export default class HeaderMobile extends Vue {
  loginOpen = false
  on = false
  userAuth = false
  openLogin() {
            this.loginOpen = true;
        }
  get curUser() {
            return this.$store.state.currentUser
        }
  get route() {
            console.log(this.$route.path)
            return this.$route.path
        }
  @Watch('closeLogin')
        closeLogin() {
            this.on = true;
            this.loginOpen = false;
            return this.loginOpen;
        }
  loggedIn() {
            this.closeLogin()
            this.userAuth = true
        }

  beforeMount() {
            if (this.$cookies.isKey('csrf_access_token')) {
                this.$store.dispatch('getCurrUser')
                this.userAuth = true
            }
        }
  beforeUpdate() {
            if (this.$cookies.isKey('csrf_access_token')) {
                this.$store.dispatch('getCurrUser')
                this.userAuth = true
            }
        }
  logOut() {
            this.$store.dispatch('logout').then(res => this.userAuth = false)
        }
      
}
</script>

<style lang="scss" scoped>
#navigation-mobile {
  z-index: 99999;
  ul {
    list-style: none;
    width: 200px;
    padding-left: 40px;

    li {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        color: #111;
      }
    }
    
  }
  .search {
    position: relative;
    width: 240px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-top: 20px;
    input {
      border: none;
      outline: none;
      width: 180px;
      padding: 10px 50px 10px 20px;
      margin: 0;
      border-radius: 20px;
      background-color: #efefef;
      font-family: "Segoe UI", Tahoma;
      font-size: 1rem;
    }
    i {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: 1.6rem;
      color: #aaa;
      cursor: pointer;
    }
  }
}
</style>
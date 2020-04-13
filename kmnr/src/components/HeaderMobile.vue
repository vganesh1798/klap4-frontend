<template>
  <div id="navigation-mobile">
    <div class="search">
      <input type="text" placeholder="Search..." />
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/stream">Stream</router-link></li>
      <li><router-link to="/playlists">Playlists</router-link></li>
      <li><router-link to="/albums">Albums</router-link></li>
      <li><router-link to="/artists">Artists</router-link></li>
      <li><router-link to="/new-charts">Charts</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#navigation-mobile {
  ul {
    list-style: none;
    width: 200px;
    padding-left: 40px;
    li {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
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
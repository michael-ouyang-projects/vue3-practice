<template>
  <div>
    <router-link to="/">Customer</router-link> &nbsp;|&nbsp;
    <router-link to="/table">Table</router-link> &nbsp;|&nbsp;
    <router-link to="/card-game">Card Game</router-link> &nbsp;|&nbsp;
    <router-link to="/practice">Practice</router-link>
  </div><hr/><br/>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
}
</style>

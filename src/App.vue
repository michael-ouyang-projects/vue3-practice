<template>
  <div id="nav">
    <router-link to="/">Users</router-link> &nbsp;|&nbsp;
    <router-link to="/practice">Basic Practice</router-link> &nbsp;|&nbsp;
    <router-link to="/game">Game</router-link>
  </div><br/>
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

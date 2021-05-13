<template>
  <div id="nav"><br/>
      <router-link to="/">Product</router-link> |
      <router-link to="/practice">Practice</router-link>
  </div><br/>
  <router-view />
  <Footer />
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  components: {
    Footer
  },
  setup() {
  }
}
</script>

<style>
#app {
  font-family: 'Courier New';
  text-align: center;
  color: black
}
</style>
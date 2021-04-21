<template>
  <Menu :changeShowingType="changeShowingType"></Menu>
  <Practice v-if="showPractice"></Practice>
  <Product title="THIS IS TITLE" v-if="showProduct"></Product>
  <Footer footerText="== FOOTER =="></Footer>
</template>

<script>
import Menu from './components/product/Menu.vue'
import Practice from './components/practice/Practice.vue'
import Product from './components/product/Product.vue'
import Footer from './components/product/Footer.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Practice,
    Product,
    Footer
  },
  data() {
    return {
      showPractice: true,
      showProduct: false
    }
  },
  methods: {
    changeShowingType() {
      this.showPractice = !this.showPractice
      this.showProduct = !this.showProduct
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
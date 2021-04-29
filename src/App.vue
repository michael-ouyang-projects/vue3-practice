<template>
  <Menu :changeShowingType="changeShowingType"></Menu>
  <Product v-if="showProduct"></Product>
  <Practice v-if="showPractice" directlyTitle="THIS IS TITLE"></Practice>
  <Footer footerString="== FOOTER =="></Footer>
</template>

<script>
import { ref } from 'vue'
import Menu from './components/Menu.vue'
import Product from './components/Product.vue'
import Practice from './components/Practice.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Menu,
    Product,
    Practice,
    Footer
  },
  setup() {
    const showProduct = ref(false)
    const showPractice = ref(true)
    const changeShowingType = () => {
      showProduct.value = !showProduct.value
      showPractice.value = !showPractice.value
    }
    return {
      showProduct,
      showPractice,
      changeShowingType
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
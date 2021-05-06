<template>
  <Menu :changeShowingType="changeShowingType"></Menu>
  <Product v-if="showProduct"></Product>
  <Practice v-if="showPractice" title="THIS IS TITLE"></Practice>
  <Footer></Footer>
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
    const showProduct = ref(true)
    const showPractice = ref(false)
    const changeShowingType = type => {
      if (type == 'Product') {
        showProduct.value = true
        showPractice.value = false
      } else if (type == 'Practice') {
        showProduct.value = false
        showPractice.value = true
      }
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
  font-family: 'Courier New';
  text-align: center;
  color: black
}
</style>
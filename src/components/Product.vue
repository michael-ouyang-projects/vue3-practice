<template>
  <div id="app" v-for="(culture) in cultures" v-bind:key="culture">
    <Card :value='culture.showingText' @click="toggleShowingCardText(culture)" :changeCardShowingStatus="changeCardShowingStatus"></Card>
  </div>
</template>

<script>
import { ref } from 'vue'
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  props: {
    changeShowingType: null,
  },
  setup () {
    const showCard = ref(true)
    const changeCardShowingStatus = () => {
      
    }
    const openingCards = ref(null)
    const toggleShowingCardText = (culture) => {
      if(culture.showingText == 'BACK') {
        if(openingCards.value == null) {
          openingCards.value = culture
          culture.showingText = culture.data
        } else {
          if(openingCards.value.data == culture.data) {
            culture.showingText = culture.data
            openingCards.value = null
          } else {
            culture.showingText = culture.data
            setTimeout(() => culture.showingText = 'BACK', 2000);
            setTimeout(() => {openingCards.value.showingText = 'BACK'; 
                              openingCards.value = null}, 2000);
          }
        }
      }
    }
    const cultures = ref([
      { showingText: 'BACK', data: '實在' },
      { showingText: 'BACK', data: '實力' },
      { showingText: 'BACK', data: '責任' },
      { showingText: 'BACK', data: '團隊' },
      { showingText: 'BACK', data: '和諧' },
      { showingText: 'BACK', data: '快樂' },
      { showingText: 'BACK', data: '領先' },
      { showingText: 'BACK', data: '卓越' },
      { showingText: 'BACK', data: '榮譽' },
      { showingText: 'BACK', data: '知福' },
      { showingText: 'BACK', data: '惜緣' },
      { showingText: 'BACK', data: '感恩' },
      { showingText: 'BACK', data: '實在' },
      { showingText: 'BACK', data: '實力' },
      { showingText: 'BACK', data: '責任' },
      { showingText: 'BACK', data: '團隊' },
      { showingText: 'BACK', data: '和諧' },
      { showingText: 'BACK', data: '快樂' },
      { showingText: 'BACK', data: '領先' },
      { showingText: 'BACK', data: '卓越' },
      { showingText: 'BACK', data: '榮譽' },
      { showingText: 'BACK', data: '知福' },
      { showingText: 'BACK', data: '惜緣' },
      { showingText: 'BACK', data: '感恩' },
    ])
    return {
      showCard,
      changeCardShowingStatus,
      toggleShowingCardText,
      cultures
    }
  }
}
</script>

<style>
#app1 {
  display: grid;
  grid-template-columns: repeat(6, 4fr);
}
</style>
<template>
  Time: {{ counter }}
  <div id="card">
    <div v-for="card in cards" v-bind:key="card">
      <Card :value='card.showingText' @click="filpCard(card)"></Card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  props: {
    changeShowingType: null,
  },
  setup () {
    const counter = ref(0)
    onMounted(() => {
      setInterval(() => {
        counter.value++
      }, 1000)
    })

    const currentlyOpeningCards = ref(null)
    const filpCard = (card) => {
      if(card.showingText == 'BACK') {
        if(currentlyOpeningCards.value == null) {
          card.showingText = card.culture
          currentlyOpeningCards.value = card
        } else {
          if(currentlyOpeningCards.value.culture == card.culture) {
            card.showingText = card.culture
            currentlyOpeningCards.value = null
          } else {
            card.showingText = card.culture
            setTimeout(() => card.showingText = 'BACK', 2000);
            setTimeout(() => {currentlyOpeningCards.value.showingText = 'BACK'
                              currentlyOpeningCards.value = null}, 2000);
          }
        }
      }
    }
    const cards = ref([
      { showingText: 'BACK', culture: '實在' },
      { showingText: 'BACK', culture: '實力' },
      { showingText: 'BACK', culture: '責任' },
      { showingText: 'BACK', culture: '團隊' },
      { showingText: 'BACK', culture: '和諧' },
      { showingText: 'BACK', culture: '快樂' },
      { showingText: 'BACK', culture: '領先' },
      { showingText: 'BACK', culture: '卓越' },
      { showingText: 'BACK', culture: '榮譽' },
      { showingText: 'BACK', culture: '知福' },
      { showingText: 'BACK', culture: '惜緣' },
      { showingText: 'BACK', culture: '感恩' },
      { showingText: 'BACK', culture: '實在' },
      { showingText: 'BACK', culture: '實力' },
      { showingText: 'BACK', culture: '責任' },
      { showingText: 'BACK', culture: '團隊' },
      { showingText: 'BACK', culture: '和諧' },
      { showingText: 'BACK', culture: '快樂' },
      { showingText: 'BACK', culture: '領先' },
      { showingText: 'BACK', culture: '卓越' },
      { showingText: 'BACK', culture: '榮譽' },
      { showingText: 'BACK', culture: '知福' },
      { showingText: 'BACK', culture: '惜緣' },
      { showingText: 'BACK', culture: '感恩' },
    ])
    return {
      counter,
      filpCard,
      cards
    }
  }
}
</script>

<style scoped>
#card {
  display: grid;
  grid-template-columns: repeat(6, 4fr);
}
</style>
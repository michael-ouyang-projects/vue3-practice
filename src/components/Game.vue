<template>
  <div v-show="showStartGameBlock"><br/>
    Point to Win: <input v-model="pointToWin" />&nbsp;
    <button @click="startGame">Start Game</button><br/><br/>
  </div>
  Time: {{ counter }}, Point: {{ point }} / {{ pointToWin }}
  <div id="card">
    <div v-for="card in cards" :key="card">
      <Card :value='card.showingText' @click="filpCard(card)"></Card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  setup () {
    const showStartGameBlock = ref(true)
    const counter = ref(0)
    const cards = ref([])
    const datas = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
    var startCountingTime
    const startGame = () => {
      showStartGameBlock.value = false
      for(var i = 0; i < pointToWin.value; i++) {
        cards.value.push({ showingText: 'BACK', data: datas.value[i] })
        cards.value.push({ showingText: 'BACK', data: datas.value[i] })
      }
      shuffle(cards.value)
      startCountingTime = setInterval(() => {counter.value++}, 1000)
    }

    const point = ref(0)
    const pointToWin = ref(0)
    const canFlip = ref(true)
    const currentlyOpeningCard = ref(null)
    const filpCard = (card) => {
      if(card.showingText == 'BACK' && canFlip.value) {
        if(currentlyOpeningCard.value == null) {
          card.showingText = card.data
          currentlyOpeningCard.value = card
        } else {
          if(currentlyOpeningCard.value.data == card.data) {
            card.showingText = card.data
            currentlyOpeningCard.value = null
            if(++point.value == pointToWin.value) {
              setTimeout(() => {
                alert('Time to Win: ' + counter.value + ' seconds')
                cards.value = []
                showStartGameBlock.value = true
                clearInterval(startCountingTime)
                counter.value = 0
                point.value = 0}, 10);
            }
          } else {
            canFlip.value = false;
            card.showingText = card.data
            setTimeout(() => card.showingText = 'BACK', 2000);
            setTimeout(() => {currentlyOpeningCard.value.showingText = 'BACK'
                              currentlyOpeningCard.value = null
                              canFlip.value = true}, 2000);
          }
        }
      }
    }
    return {
      counter,
      startGame,
      showStartGameBlock,
      point,
      pointToWin,
      cards,
      filpCard,
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length;
  var randomIndex;
  var temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
</script>

<style scoped>
#card {
  display: grid;
  grid-template-columns: repeat(6, 4fr);
}
</style>
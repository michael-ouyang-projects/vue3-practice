<template>
  <!-- Reactive Data -->
  {{ refTitle }}<br/><br/>
  <input v-model="refTitle" /><br/><br/>

  Counter: {{ counter }}

  <div :title="hoverMessage">
    <br/>
    Hover your mouse over me for a few seconds to see my dynamically bound title!
  </div>

  <!-- Events -->
  <p>{{ message }}</p>
  <button @click="reverseMessage">Reverse Message</button><br/><br/><br/>

  <!-- Conditionals and Loops -->
  <span v-if="seen">See me (v-if)</span>&nbsp;
  <span v-show="seen">See me (v-show)</span>&nbsp;
  <button @click="toggle">Toggle</button><br/><br/>

  <ul>
    <li v-for="todo in todos" :key="todo">
      {{ todo.text }}
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const refTitle = ref('refTitle') 

    const counter = ref(0)
    onMounted(() => {
      setInterval(() => {
        counter.value++
      }, 1000)
    })

    const hoverMessage = ref('You loaded this page on ' + new Date().toLocaleString())
    
    const message = ref('Hello Vue.js!')
    const reverseMessage = () => {
      message.value = message.value.split('').reverse().join('')
    }
    
    const seen = ref(true)
    const toggle = () => {
      seen.value = !seen.value
    }

    const todos = ref([
        { text: 'Amy' },
        { text: 'Bob' },
        { text: 'Cathay' }
    ])

    return {
      refTitle,
      counter,
      hoverMessage,
      message,
      reverseMessage,
      seen,
      toggle,
      todos
    }
  }
}
</script>
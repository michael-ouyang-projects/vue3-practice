<template>
  <!-- Declarative Rendering -->
  {{ directlyTitle }}<br/><br/>
  {{ refTitle }}<br/><br/>
  <input v-model="refTitle" />

  Counter: {{ counter - 1000 }}

  <div :title="hoverMessage">
    <br/>
    Hover your mouse over me for a few seconds to see my dynamically bound title!
  </div>

  <!-- Handling User Input -->
  <p>{{ reverseMessage }}</p>
  <button @click="reverseMessageMethod">Reverse Message</button>

  <p>{{ bindingMessage }}</p>
  <input v-model="bindingMessage" />

  <!-- Conditionals and Loops -->
  <div id="conditional-rendering">
    <br/>
    <span v-if="seen">See me</span>&nbsp;
    <button @click="toggle">Toggle</button>
  </div>

  <div>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onMounted } from 'vue'

export default {
  props: {
    directlyTitle: String
  },
  setup(props) {
    const refTitle = ref(props.directlyTitle)
    const nonRefTitle = refTitle

    const counter = ref(0)
    onMounted(() => {
      setInterval(() => {
        counter.value++
      }, 1000)
    })

    const hoverMessage = ref('You loaded this page on ' + new Date().toLocaleString())
    
    const reverseMessage = ref('Hello Vue.js!')
    const reverseMessageMethod = () => {
      reverseMessage.value = reverseMessage.value.split('').reverse().join('')
    }

    const bindingMessage = ref('Type Something...')
    
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
      nonRefTitle,
      counter,
      hoverMessage,
      reverseMessage,
      reverseMessageMethod,
      bindingMessage,
      seen,
      toggle,
      todos
    }
  }
}
</script>
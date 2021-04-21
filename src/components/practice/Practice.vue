<template>
  <!-- Declarative Rendering -->
  <br/>
  Counter: {{ counter - 1000 }}

  <div v-bind:title="hoverMessage">
    <br/>
    Hover your mouse over me for a few seconds to see my dynamically bound title!
  </div>

  <!-- Handling User Input -->
  <p>{{ reverseMessage }}</p>
  <button v-on:click="reverseMessageMethod">Reverse Message</button>

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
export default {
  name: 'Practice',
  data() {
    return {
      title: "This is Title",
      counter: 0,
      hoverMessage: 'You loaded this page on ' + new Date().toLocaleString(),
      reverseMessage: "Hello Vue.js!",
      bindingMessage: "Type Something...",
      seen: true,
      todos: [
        { text: 'Amy' },
        { text: 'Bob' },
        { text: 'Cathay' }
      ]
    }
  },
  methods: {
    reverseMessageMethod() {
      this.reverseMessage = this.reverseMessage.split('').reverse().join('')
    },
    toggle() {
      this.seen = !this.seen
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
</script>
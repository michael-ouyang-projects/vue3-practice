<template>
  <!-- reactive rendering -->
  Counter: {{ counter }}<br/><br/><br/>

  <!-- two-way binding -->
  {{ title }}<br/><br/>
  <input v-model="title" /><br/><br/>

  <!-- reactive rendering on properties & events handling -->
  <p :style='colorStyle'>{{ message }}</p>
  <button @click="eventsHandling">Events Handling</button><br/><br/><br/>

  <!-- showing state -->
  <span v-if="seen">v-if</span>&nbsp;/
  <span v-show="seen">v-show</span>&nbsp;<br/><br/>
  <button @click="toggleSeen">ToggleSeen</button><br/><br/><br/>

  <!-- loops -->
  <div v-for="name in names" :key="name">
    {{ name.text }}
  </div><br/><br/>

  <!-- calling api -->  
  User : {{ user }}<br/><br/>
  <button @click="callApi">Call Api</button><br/><br/><br/>

  <!-- computed & watchEffect -->
  <span :style='colorStyle'>User Name: {{ userName }}</span><br/><br/>
  <input v-model="firstName" /><br/><br/>
  <input v-model="lastName" /><br/><br/><br/>
</template>

<script>
import axios from 'axios'
import { ref, onMounted, computed, watchEffect } from 'vue'

export default {
  setup() {
    // reactive rendering
    const counter = ref(0)
    onMounted(() => {
      setInterval(() => {
        counter.value++;
      }, 1000)
    })

    // two-way binding
    const title = ref('two-way binding') 

    // events handling & reactive rendering on properties
    const message = ref('message')
    const colorStyle = ref('color:black')
    const eventsHandling = () => {
      if(colorStyle.value === 'color:black') {
        colorStyle.value = 'color:red';
      } else {
        colorStyle.value = 'color:black';
      }
    }
    
    // showing state
    const seen = ref(true)
    const toggleSeen = () => {
      seen.value = !seen.value
    }

    // loops
    const names = ref([
        { text: 'Amy' },
        { text: 'Bob' },
        { text: 'Cathay' }
    ])

    // calling api
    const user = ref(null)
    const callApi = () => {
      let url = 'https://jsonplaceholder.typicode.com/users/' + (Math.floor(Math.random() * 10) + 1);
      axios.get(url).then(response => {
        user.value = response.data;
      });
    }

    // computed & watchEffect
    const firstName = ref('')
    const lastName = ref('')
    const userName = computed(() => {
      // console.log('in computed()');
      return firstName.value + ' ' + lastName.value;
    });
    watchEffect(() => {
      // console.log('in watchEffect()');
      if(userName.value === 'test test') {
        colorStyle.value = 'color:red';
      }
    });

    return {
      counter,
      title,
      message,
      colorStyle,
      eventsHandling,
      seen,
      toggleSeen,
      names,
      user,
      callApi,
      firstName,
      lastName,
      userName
    }
  }
}
</script>
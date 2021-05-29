<template>
  <button @click="closeTodoTable()">Close</button><br/><br/>
  <table>
    <tr>
      <th>Todo ID</th>
      <th>Title</th>
      <th>Completed</th>
      <th></th>
    </tr>
    <tr v-for="todo in todoList" :key="todo">
      <td>{{ todo.id }}</td>
      <td>{{ todo.title }}</td>
      <td>{{ todo.completed }}</td>
      <td><button>edit</button></td>
    </tr>
  </table><br/>
</template>

<script>
export default {
  props: {
    todoList: {}
  },
  emits: ['closeTodoTable'],
  setup(props, { emit }) {
    const closeTodoTable = () => {
      emit('closeTodoTable');
    };

    return {
      closeTodoTable
    }
  }
}
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}

th, td {
  padding: 10px;
  border: 1px solid black;
}

button {
  padding: 5px;
}
</style>

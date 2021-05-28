<template>
  <table v-show="showTodoListTable">
    <tr>
      <th>Todo ID</th>
      <th>Title</th>
      <th>Completed</th>
    </tr>
    <tr v-for="userTodo in userTodoList" :key="userTodo">
      <td>{{ userTodo.id }}</td>
      <td>{{ userTodo.title }}</td>
      <td>{{ userTodo.completed }}</td>
    </tr>
  </table><br/>
</template>

<script>
import { ref } from 'vue'
import userService from '@/api/user-service.js'

export default {
  setup() {
    const userTodoList = ref(null);
    const showTodoListTable = ref(false);
    const getUserTodoList = async userId => {
      userTodoList.value = await userService.getUserTodoList(userId);
      showTodoListTable.value = true;
    };

    return {
      userTodoList,
      getUserTodoList,
      showTodoListTable,
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
</style>
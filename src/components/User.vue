<template>
  <table v-show="showUserTable">
    <tr v-show="showSortingRow">
      <th>
        <button @click="sortIdAscending()">Asc</button>&nbsp;
        <button @click="sortIdDescending()">Desc</button>
      </th>
      <th>
        <button @click="sortNameAscending()">Asc</button>&nbsp;
        <button @click="sortNameDescending()">Desc</button>
      </th>
      <th>
        <button @click="sortPhoneAscending()">Asc</button>&nbsp;
        <button @click="sortPhoneDescending()">Desc</button>
      </th>
      <th>
        <button @click="sortEmailAscending()">Asc</button>&nbsp;
        <button @click="sortEmailDescending()">Desc</button>
      </th>
      <th></th>
    </tr>
    <tr>
      <th>User ID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th></th>
    </tr>
    <tr v-for="user in users" :key="user" v-show="user.show === true">
      <td><button @click="getUserTodoList(user.id)">{{ user.id }}</button></td>
      <td>{{ user.name }}</td>
      <td>{{ user.phone }}</td>
      <td>{{ user.email }}</td>
      <td><button>edit</button></td>
    </tr>
  </table><br/>

  <TodoTable v-if="showTodoTable" :todoList='userTodoList' @closeTodoTable="closeTodoTable()"/>
</template>

<script>
import { ref, onMounted } from 'vue'
import TodoTable from './TodoTable.vue'
import userService from '@/api/user-service.js'

export default {
  components: {
    TodoTable
  },
  setup() {
    const showSortingRow = ref(true);
    const users = ref(null);
    const showUserTable = ref(false);
    onMounted(async () => {
      users.value = await userService.getUsers();
      users.value.forEach(user => {
        user.show = true;
      });
      showUserTable.value = true;
    });

    const userTodoList = ref(null);
    const showTodoTable = ref(false);
    const closeTodoTable = () => {
      users.value.forEach(user => {
        user.show = true;
      });
      showSortingRow.value = true;
      showTodoTable.value = false;
    };
    const getUserTodoList = async userId => {
      userTodoList.value = await userService.getUserTodoList(userId);
      users.value.forEach(user => {
        if(userId !== user.id)
        user.show = false;
      });
      showSortingRow.value = false;
      showTodoTable.value = true;
    };

    const sortIdAscending  = () => {
      users.value.sort((a, b) => {
        return a.id - b.id;
      });
    };
    const sortIdDescending  = () => {
      users.value.sort((a, b) => {
        return b.id - a.id;
      });
    };

    const sortNameAscending = () => {
      users.value.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    };
    const sortNameDescending = () => {
      users.value.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    };

    const sortPhoneAscending = () => {
      users.value.sort((a, b) => {
        return a.phone.localeCompare(b.phone);
      });
    };
    const sortPhoneDescending = () => {
      users.value.sort((a, b) => {
        return b.phone.localeCompare(a.phone);
      });
    };

    const sortEmailAscending = () => {
      users.value.sort((a, b) => {
        return a.email.localeCompare(b.email);
      });
    };
    const sortEmailDescending = () => {
      users.value.sort((a, b) => {
        return b.email.localeCompare(a.email);
      });
    };

    return {
      showSortingRow,
      users,
      showUserTable,
      userTodoList,
      showTodoTable,
      closeTodoTable,
      getUserTodoList,
      sortIdAscending,
      sortIdDescending,
      sortNameAscending,
      sortNameDescending,
      sortPhoneAscending,
      sortPhoneDescending,
      sortEmailAscending,
      sortEmailDescending
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

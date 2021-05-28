<template>
  <table v-show="showUserTable">
    <tr>
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
    </tr>
    <tr>
      <th>User ID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
    </tr>
    <tr v-for="user in users" :key="user">
      <td><button @click="getUserTodoList(user.id)">{{ user.id }}</button></td>
      <td>{{ user.name }}</td>
      <td>{{ user.phone }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </table><br/>

  <Todo />
</template>

<script>
import { onMounted, ref } from 'vue'
import Todo from './Todo.vue'
import userService from '@/api/user-service.js'

export default {
  components: {
    Todo
  },
  setup() {
    const users = ref(null);
    const showUserTable = ref(false);
    onMounted(async () => {
      users.value = await userService.getUsers();
      showUserTable.value = true;
    });

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
      users,
      showUserTable,
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
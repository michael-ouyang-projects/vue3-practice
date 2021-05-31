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
    <tr v-for="user in users" :key="user" v-show="user.show">
      <td><button @click="getUserTodoList(user.id)">{{ user.id }}</button></td>
      <td>
        <div v-show="!user.edit">{{ user.name }}</div>
        <div v-show="user.edit"><input v-model="user.name" /></div>
      </td>
      <td>
        <div v-show="!user.edit">{{ user.phone }}</div>
        <div v-show="user.edit"><input v-model="user.phone" /></div>
      </td>
      <td>
        <div v-show="!user.edit">{{ user.email }}</div>
        <div v-show="user.edit"><input v-model="user.email" /></div>
      </td>
      <td>
        <div v-show="!user.edit"><button @click="editUser(user)">edit</button></div>
        <div v-show="user.edit">
          <button @click="confirmUpdate(user)">confirm</button>&nbsp;
          <button @click="deleteUser(user.id)">delete</button>
        </div>
      </td>
    </tr>
  </table><br/>

  <AccountsData v-if="showTodoTable" :todoList='userTodoList' @closeTodoTable="closeTodoTable()"/>
</template>

<script>
import { ref, onMounted } from 'vue'
import AccountsData from './AccountsData.vue'
import userService from '@/api/customer-service.js'

export default {
  components: {
    AccountsData
  },
  setup() {
    const showSortingRow = ref(true);
    const users = ref(null);
    const showUserTable = ref(false);
    onMounted(async () => {
      users.value = await userService.getUsers();
      users.value.forEach(user => {
        user.show = true;
        user.edit = false;
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

    const editUser = user => {
      user.edit = true;
    };
    const confirmUpdate = user => {
      user.edit = false;
    };
    const deleteUser = userId => {
      let confirmation = confirm('Please confirm to delete user ' + userId + ' ?');
      if (confirmation) {
        users.value.forEach((user, index) => {
          if(userId === user.id) {
            users.value.splice(index, 1);
          }
        });
      }
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
      editUser,
      confirmUpdate,
      deleteUser,
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

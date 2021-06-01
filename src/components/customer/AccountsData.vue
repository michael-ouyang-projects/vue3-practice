<template>
  <button @click="close()">Close</button><br/><br/>
  <table>
    <tr>
      <th>Todo ID</th>
      <th>Title</th>
      <th>Completed</th>
      <th></th>
    </tr>
    <tr v-for="account in accounts" :key="account">
      <td>
        <div v-show="!account.edit">{{ account.id }}</div>
        <div v-show="account.edit"><input v-model="account.id" /></div>
      </td>
      <td>
        <div v-show="!account.edit">{{ account.title }}</div>
        <div v-show="account.edit"><input v-model="account.title" /></div>
      </td>
      <td>
        <div v-show="!account.edit">{{ account.completed }}</div>
        <div v-show="account.edit"><input v-model="account.completed" /></div>
      </td>
      <td>
        <div v-show="!account.edit"><button @click="editAccount(account)">edit</button></div>
        <div v-show="account.edit">
          <button @click="confirmAccountUpdate(account)">confirm</button>&nbsp;
          <button @click="deleteAccount(account.id)">delete</button>
        </div>
      </td>
    </tr>
  </table><br/>
</template>

<script>
import { toRefs } from 'vue'

export default {
  props: {
    accounts: {}
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };
    const editAccount = account => {
      account.edit = true;
    };
    const confirmAccountUpdate = account => {
      account.edit = false;
    };
    const { accounts } = toRefs(props);
    const deleteAccount = accountId => {
      let confirmation = confirm('Please confirm to delete account ' + accountId + ' ?');
      if (confirmation) {
          accounts.value.forEach((account, index) => {
          if(accountId === account.id) {
            accounts.value.splice(index, 1);
          }
        });
      }
    };

    return {
      close,
      editAccount,
      confirmAccountUpdate,
      deleteAccount
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

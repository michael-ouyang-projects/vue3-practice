<template>
  <button @click="close()">Close</button><br/><br/>
  <table>
    <tr>
      <th>account_id</th>
      <th>currency</th>
      <th>account_open_date</th>
    </tr>
    <tr v-for="account in accounts" :key="account">
      <td>
        <div>{{ account.accountId }}</div>
      </td>
      <td>
        <div>{{ account.currency }}</div>
      </td>
      <td>
        <div>{{ account.accountOpenDate }}</div>
      </td>
    </tr>
  </table><br/>
</template>

<script>
export default {
  props: {
    accounts: {}
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    return {
      close
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

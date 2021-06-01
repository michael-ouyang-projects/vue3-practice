<template>
  <table v-show="isShowingCustomersData">
    <tr v-show="isShowingCustomersSortingRow">
      <th>
        <button @click="sortingCustomersUtil.sortCustomerIdAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerIdDesc(customers)">Desc</button>
      </th>
      <th>
        <button @click="sortingCustomersUtil.sortCustomerNameAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerNameDesc(customers)">Desc</button>
      </th>
      <th>
        <button @click="sortingCustomersUtil.sortCustomerPhoneAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerPhoneDesc(customers)">Desc</button>
      </th>
      <th>
        <button @click="sortingCustomersUtil.sortCustomerEmailAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerEmailDesc(customers)">Desc</button>
      </th>
      <th></th>
    </tr>
    <tr>
      <th>customer ID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th></th>
    </tr>
    <tr v-for="customer in customers" :key="customer" v-show="customer.show">
      <td><button @click="getCustomerAccounts(customer.id)">{{ customer.id }}</button></td>
      <td>
        <div v-show="!customer.edit">{{ customer.name }}</div>
        <div v-show="customer.edit"><input v-model="customer.name" /></div>
      </td>
      <td>
        <div v-show="!customer.edit">{{ customer.phone }}</div>
        <div v-show="customer.edit"><input v-model="customer.phone" /></div>
      </td>
      <td>
        <div v-show="!customer.edit">{{ customer.email }}</div>
        <div v-show="customer.edit"><input v-model="customer.email" /></div>
      </td>
      <td>
        <div v-show="!customer.edit"><button @click="editCustomer(customer)">edit</button></div>
        <div v-show="customer.edit">
          <button @click="confirmCustomerUpdate(customer)">confirm</button>&nbsp;
          <button @click="deleteCustomer(customer.id)">delete</button>
        </div>
      </td>
    </tr>
  </table><br/>

  <AccountsData v-if="isShowingCustomerAccountsData" :accounts='customerAccounts' @close="closeCustomerAccountsData()"/>
</template>

<script>
import { ref, onMounted } from 'vue'
import customerService from '@/api/customer/customer-service.js'
import sortingCustomersUtil from '@/utils/customer/sorting-customers-util.js'
import AccountsData from './AccountsData.vue'

export default {
  components: {
    AccountsData
  },
  setup() {
    const customers = ref(null);
    const isShowingCustomersData = ref(false);
    const isShowingCustomersSortingRow = ref(true);
    onMounted(async () => {
      customers.value = await customerService.getCustomers();
      customers.value.forEach(customer => {
        customer.show = true;
        customer.edit = false;
      });
      isShowingCustomersData.value = true;
    });
    const editCustomer = customer => {
      customer.edit = true;
    };
    const confirmCustomerUpdate = customer => {
      customer.edit = false;
    };
    const deleteCustomer = customerId => {
      let confirmation = confirm('Please confirm to delete customer ' + customerId + ' ?');
      if (confirmation) {
        customers.value.forEach((customer, index) => {
          if(customerId === customer.id) {
            customers.value.splice(index, 1);
          }
        });
      }
    };

    const customerAccounts = ref(null);
    const isShowingCustomerAccountsData = ref(false);
    const getCustomerAccounts = async customerId => {
      customerAccounts.value = await customerService.getCustomerAccounts(customerId);
      customerAccounts.value.forEach(account => {
        account.edit = false;
      });
      customers.value.forEach(customer => {
        if(customer.id !== customerId)
        customer.show = false;
      });
      isShowingCustomerAccountsData.value = true;
      isShowingCustomersSortingRow.value = false;
    };
    const closeCustomerAccountsData = () => {
      customers.value.forEach(customer => {
        customer.show = true;
      });
      isShowingCustomerAccountsData.value = false;
      isShowingCustomersSortingRow.value = true;
    };

    return {
      customers,
      isShowingCustomersData,
      isShowingCustomersSortingRow,
      sortingCustomersUtil,
      editCustomer,
      confirmCustomerUpdate,
      deleteCustomer,
      customerAccounts,
      isShowingCustomerAccountsData,
      getCustomerAccounts,
      closeCustomerAccountsData
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

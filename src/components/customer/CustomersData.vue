<template>
  <table v-show="isShowingCustomersData">
    <!-- SortingRow -->
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
        <button @click="sortingCustomersUtil.sortCustomerSexAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerSexDesc(customers)">Desc</button>
      </th>
      <th>
        <button @click="sortingCustomersUtil.sortCustomerAgeAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerAgeDesc(customers)">Desc</button>
      </th>
      <th>
        <button @click="sortingCustomersUtil.sortCustomerBalanceAsc(customers)">Asc</button>&nbsp;
        <button @click="sortingCustomersUtil.sortCustomerBalanceDesc(customers)">Desc</button>
      </th>
      <th></th>
    </tr>

    <!-- Header -->
    <tr>
      <th>Customer ID</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>Balance</th>
      <th><button v-show="!isAddingCustomer" @click="addCustomer()">Add</button></th>
    </tr>

    <!-- AddingRow -->
    <tr v-show="isAddingCustomer">
      <td>Automatic Generated</td>
      <td><input v-model="customerForAdding.name" /></td>
      <td>
        <input type="radio" id="male" value="male" v-model="customerForAdding.sex" />
        <label for="male">Male</label>
        <input type="radio" id="female" value="female" v-model="customerForAdding.sex" />
        <label for="female">Female</label>
      </td>
      <td><input v-model="customerForAdding.age" /></td>
      <td><input v-model="customerForAdding.balance" /></td>
      <td><button @click="addCustomer()">Add</button></td>
    </tr>

    <!-- Data -->
    <tr v-for="customer in customers" :key="customer" v-show="customer.show">
      <td><button @click="getCustomerAccounts(customer.customerId)">{{ customer.customerId }}</button></td>
      <td>
        <div v-show="!customer.edit">{{ customer.name }}</div>
        <div v-show="customer.edit"><input v-model="customer.name" /></div>
      </td>
      <td>
        <div v-show="!customer.edit">{{ customer.sex }}</div>
        <div v-show="customer.edit">
          <input type="radio" id="male" value="male" v-model="customer.sex" />
          <label for="male">Male</label>
          <input type="radio" id="female" value="female" v-model="customer.sex" />
          <label for="female">Female</label>
        </div>
      </td>
      <td>
        <div v-show="!customer.edit">{{ customer.age }}</div>
        <div v-show="customer.edit"><input v-model="customer.age" /></div>
      </td>
      <td>
        <div v-show="!customer.edit">{{ customer.balanceString }}</div>
        <div v-show="customer.edit"><input v-model="customer.balance" /></div>
      </td>
      <td>
        <div v-show="!customer.edit"><button @click="editCustomer(customer)">edit</button></div>
        <div v-show="customer.edit">
          <button @click="confirmCustomerUpdate(customer)">confirm</button>&nbsp;
          <button @click="deleteCustomer(customer)">delete</button>
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
    const customerForAdding = ref({});
    const isShowingCustomersData = ref(false);
    const isShowingCustomersSortingRow = ref(true);
    const isAddingCustomer = ref(false);
    onMounted(async () => {
      customers.value = await customerService.getCustomers();
      customers.value.forEach(customer => {
        customer.show = true;
        customer.edit = false;
        customer.balanceString = customer.balance.toLocaleString();
      });
      isShowingCustomersData.value = true;
    });
    const addCustomer = () => {
      isAddingCustomer.value = true;
    };
    const editCustomer = customer => {
      customer.edit = true;
    };
    const confirmCustomerUpdate = customer => {
      customer.balanceString = Number(customer.balance).toLocaleString();
      customer.edit = false;
      customerService.updateCustomer(customer);
    };
    const deleteCustomer = customer => {
      let confirmation = confirm('Please confirm to delete customer ' + customer.customerId + ' ?');
      if (confirmation) {
        customers.value.forEach((loopCustomer, index) => {
          if(customer.customerId === loopCustomer.customerId) {
            customers.value.splice(index, 1);
          }
        });
        customerService.deleteCustomer(customer.id);
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
        if(customer.customerId !== customerId)
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
      customerForAdding,
      isShowingCustomersData,
      isShowingCustomersSortingRow,
      isAddingCustomer,
      sortingCustomersUtil,
      addCustomer,
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

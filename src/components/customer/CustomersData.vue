<template>
  <!-- Condition -->
  <div>
    <button @click="previousPage()">Previous Page</button>&nbsp; | &nbsp;
    <button @click="nextPage()">Next Page</button>&nbsp;&nbsp;&nbsp;
    Condition: <input v-model="condition.where" />&nbsp;&nbsp;&nbsp;
    Sort: <input v-model="condition.sort" />&nbsp;&nbsp;&nbsp;
    Rows:
    <select v-model="condition.rows">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>&nbsp;&nbsp;&nbsp;
    <button @click="runSearch()">Run</button>
  </div><br/>

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
      <td>{{ customers.length }}</td>
    </tr>

    <!-- Header -->
    <tr>
      <th>customer_id</th>
      <th>name</th>
      <th>sex</th>
      <th>age</th>
      <th>balance</th>
      <th><button v-show="!isAddingCustomer" @click="showCustomerAddingRow()">Add</button></th>
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
      <td>
        <button @click="addCustomer()">Confirm</button>&nbsp;
        <button @click="cancelAddCustomer()">Cancel</button>
      </td>
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
        <div v-show="!customer.edit"><button @click="editCustomer(customer)">Edit</button></div>
        <div v-show="customer.edit">
          <button @click="confirmCustomerUpdate(customer)">Confirm</button>&nbsp;
          <button @click="deleteCustomer(customer)">Delete</button>
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
    const previousPage = async () => {
      if(condition.value.step > 0) {
        condition.value.step--;
        customers.value = await customerService.getCustomers(condition);
      }
    };
    const nextPage = async () => {
      condition.value.step++;
      customers.value = await customerService.getCustomers(condition);
    };
    const condition = ref({ rows: "10", step: 0 });
    const runSearch = async () => {
      condition.value.step = 0;
      customers.value = await customerService.getCustomers(condition);
    };

    const customers = ref({});
    const customerForAdding = ref({});
    const isShowingCustomersData = ref(false);
    const isShowingCustomersSortingRow = ref(true);
    const isAddingCustomer = ref(false);
    onMounted(async () => {
      customers.value = await customerService.getCustomers(condition);
      isShowingCustomersData.value = true;
    });
    const showCustomerAddingRow = () => {
      isAddingCustomer.value = true;
    };
    const addCustomer = async () => {
      await customerService.addCustomer(customerForAdding.value);
      customerForAdding.value = {};
      isAddingCustomer.value = false;
      condition.value.sort = "customer_id desc";
      customers.value = await customerService.getCustomers(condition);
      sortingCustomersUtil.sortCustomerIdDesc(customers.value);
    };
    const cancelAddCustomer = () => {
      isAddingCustomer.value = false;
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
        customers.value.forEach((loopCustomer, step) => {
          if(customer.customerId === loopCustomer.customerId) {
            customers.value.splice(step, 1);
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
      previousPage,
      nextPage,
      condition,
      runSearch,
      customers,
      customerForAdding,
      isShowingCustomersData,
      isShowingCustomersSortingRow,
      isAddingCustomer,
      sortingCustomersUtil,
      showCustomerAddingRow,
      addCustomer,
      cancelAddCustomer,
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

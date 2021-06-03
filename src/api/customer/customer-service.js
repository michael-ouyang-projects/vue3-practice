import axios from 'axios'

export default {
  getCustomers: async condition => {
    let url = 'http://localhost:8000/customers/';
    let response = await axios.post(url, condition.value);
    response.data.forEach(customer => {
      customer.show = true;
      customer.edit = false;
      customer.balanceString = customer.balance.toLocaleString();
    });
    return response.data;
  },

  addCustomer: async customer => {
    let url = 'http://localhost:8000/customer/';
    await axios.post(url, customer);
  },

  updateCustomer: async customer => {
    let url = 'http://localhost:8000/customer/';
    await axios.put(url, customer);
  },

  deleteCustomer: async id => {
    let url = 'http://localhost:8000/customer/' + id;
    await axios.delete(url);
  },

  getCustomerAccounts: async customerId => {
    let url = 'https://jsonplaceholder.typicode.com/todos?userId=' + customerId;
    let response = await axios.get(url);
    return response.data;
  }

  // getCustomers: async () => {
  //   let url = 'https://jsonplaceholder.typicode.com/users/';
  //   let response = await axios.get(url);
  //   return response.data;
  // },
}

import axios from 'axios'

export default {
  getCustomers: async () => {
    let url = 'https://jsonplaceholder.typicode.com/users/';
    let response = await axios.get(url);
    return response.data;
  },

  getCustomerAccounts: async customerId => {
    let url = 'https://jsonplaceholder.typicode.com/todos?userId=' + customerId;
    let response = await axios.get(url);
    return response.data;
  }
}
